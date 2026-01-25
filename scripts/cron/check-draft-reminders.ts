/**
 * Draft Listing Reminder Cron Job
 * 
 * Finds draft listings older than 3 days and sends reminder emails to sellers.
 * Runs daily at 11:00 AM (user's timezone).
 * 
 * Safeguards:
 * - Max 3 reminders per listing
 * - Min 3 days between reminders
 * - Only send for drafts 3+ days old
 * - Rate limit: 100 emails per minute
 * - Advisory lock prevents concurrent runs
 * 
 * Run manually: npx tsx scripts/cron/check-draft-reminders.ts
 */

import { prisma } from '../../lib/prisma'
import { sendSellerListingDraftReminderEmail } from '../../lib/email/workflow-emails'

const MAX_REMINDERS_PER_LISTING = 3
const MIN_DAYS_BETWEEN_REMINDERS = 3
const MIN_DAYS_IN_DRAFT = 3
const RATE_LIMIT_PER_MINUTE = 100

/**
 * Acquire advisory lock to prevent concurrent runs
 */
async function acquireAdvisoryLock(): Promise<boolean> {
  try {
    const result = await prisma.$queryRaw<Array<{ pg_try_advisory_lock: boolean }>>`
      SELECT pg_try_advisory_lock(1002) as pg_try_advisory_lock
    `
    return result[0]?.pg_try_advisory_lock || false
  } catch (error) {
    console.error('Error acquiring advisory lock:', error)
    return false
  }
}

/**
 * Release advisory lock
 */
async function releaseAdvisoryLock(): Promise<void> {
  try {
    await prisma.$queryRaw`SELECT pg_advisory_unlock(1002)`
  } catch (error) {
    console.error('Error releasing advisory lock:', error)
  }
}

/**
 * Main cron job function
 */
export async function checkDraftReminders() {
  console.log('📝 Starting draft reminder check...')
  
  // Acquire lock
  const lockAcquired = await acquireAdvisoryLock()
  if (!lockAcquired) {
    console.log('⏭️  Another instance is running, skipping...')
    return { skipped: true, reason: 'lock_not_acquired' }
  }
  
  try {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - MIN_DAYS_BETWEEN_REMINDERS)
    
    const draftThreshold = new Date()
    draftThreshold.setDate(draftThreshold.getDate() - MIN_DAYS_IN_DRAFT)
    
    // Find draft listings that need reminders
    const listings = await prisma.listing.findMany({
      where: {
        status: 'DRAFT',
        createdAt: { lt: draftThreshold },
        draftReminderCount: { lt: MAX_REMINDERS_PER_LISTING },
        OR: [
          { draftReminderSentAt: null },
          { draftReminderSentAt: { lt: threeDaysAgo } }
        ]
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        draftReminderSentAt: true,
        draftReminderCount: true,
        seller: {
          select: {
            id: true,
            email: true,
            firstName: true,
            emailVerified: true
          }
        }
      },
      take: RATE_LIMIT_PER_MINUTE
    })
    
    console.log(`📊 Found ${listings.length} draft listings to check`)
    
    let sent = 0
    let skipped = 0
    let errors = 0
    
    for (const listing of listings) {
      try {
        // Skip if seller email not verified
        if (!listing.seller.emailVerified) {
          skipped++
          continue
        }
        
        const daysInDraft = Math.floor(
          (Date.now() - listing.createdAt.getTime()) / (1000 * 60 * 60 * 24)
        )
        
        // Send reminder email
        const result = await sendSellerListingDraftReminderEmail(
          listing.seller.email,
          listing.seller.firstName || undefined,
          listing.title,
          listing.id,
          daysInDraft
        )
        
        if (result.success) {
          // Update tracking
          await prisma.listing.update({
            where: { id: listing.id },
            data: {
              draftReminderSentAt: new Date(),
              draftReminderCount: { increment: 1 }
            }
          })
          sent++
          console.log(`✅ Sent to ${listing.seller.email} for "${listing.title}" (${daysInDraft} days old)`)
        } else {
          errors++
          console.error(`❌ Failed to send to ${listing.seller.email}:`, result.error)
        }
        
        // Rate limiting: wait 600ms between sends (100/min)
        await new Promise(resolve => setTimeout(resolve, 600))
        
      } catch (error) {
        errors++
        console.error(`❌ Error processing listing ${listing.id}:`, error)
      }
    }
    
    console.log(`\n📈 Draft Reminder Summary:`)
    console.log(`   ✅ Sent: ${sent}`)
    console.log(`   ⏭️  Skipped: ${skipped}`)
    console.log(`   ❌ Errors: ${errors}`)
    
    return { sent, skipped, errors }
    
  } finally {
    await releaseAdvisoryLock()
  }
}

// Run if called directly
if (require.main === module) {
  checkDraftReminders()
    .then((result) => {
      console.log('\n✨ Done!', result)
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Fatal error:', error)
      process.exit(1)
    })
}
