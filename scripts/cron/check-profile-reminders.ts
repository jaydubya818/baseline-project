/**
 * Profile Completion Reminder Cron Job
 * 
 * Finds buyers with incomplete profiles and sends reminder emails.
 * Runs daily at 10:00 AM (user's timezone).
 * 
 * Safeguards:
 * - Max 3 reminders per user
 * - Min 3 days between reminders
 * - Only send to verified email addresses
 * - Rate limit: 100 emails per minute
 * - Advisory lock prevents concurrent runs
 * 
 * Run manually: npx tsx scripts/cron/check-profile-reminders.ts
 */

import { prisma } from '../../lib/prisma'
import { sendBuyerProfileReminderEmail } from '../../lib/email/workflow-emails'

const MAX_REMINDERS_PER_USER = 3
const MIN_DAYS_BETWEEN_REMINDERS = 3
const RATE_LIMIT_PER_MINUTE = 100
const PROFILE_INCOMPLETE_THRESHOLD = 80 // Send if less than 80% complete

/**
 * Calculate profile completeness percentage
 */
function calculateProfileCompleteness(user: any): number {
  let completed = 0
  let total = 0
  
  // User-level fields
  const userFields = ['firstName', 'lastName', 'email', 'emailVerified', 'phone']
  userFields.forEach(field => {
    total++
    if (user[field]) completed++
  })
  
  // BuyerProfile fields
  if (user.buyerProfile) {
    const profileFields = ['bio', 'linkedinUrl', 'yearsExperience', 'capitalAvailableMin', 'industryExperience']
    profileFields.forEach(field => {
      total++
      const value = user.buyerProfile[field]
      if (value !== null && value !== undefined && (Array.isArray(value) ? value.length > 0 : true)) {
        completed++
      }
    })
  } else {
    // If no buyer profile exists, count those as missing
    total += 5
  }
  
  return Math.round((completed / total) * 100)
}

/**
 * Acquire advisory lock to prevent concurrent runs
 */
async function acquireAdvisoryLock(): Promise<boolean> {
  try {
    const result = await prisma.$queryRaw<Array<{ pg_try_advisory_lock: boolean }>>`
      SELECT pg_try_advisory_lock(1001) as pg_try_advisory_lock
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
    await prisma.$queryRaw`SELECT pg_advisory_unlock(1001)`
  } catch (error) {
    console.error('Error releasing advisory lock:', error)
  }
}

/**
 * Main cron job function
 */
export async function checkProfileReminders() {
  console.log('🔔 Starting profile reminder check...')
  
  // Acquire lock
  const lockAcquired = await acquireAdvisoryLock()
  if (!lockAcquired) {
    console.log('⏭️  Another instance is running, skipping...')
    return { skipped: true, reason: 'lock_not_acquired' }
  }
  
  try {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - MIN_DAYS_BETWEEN_REMINDERS)
    
    // Find buyers with incomplete profiles
    const buyers = await prisma.user.findMany({
      where: {
        role: 'BUYER',
        emailVerified: true,
        profileReminderCount: { lt: MAX_REMINDERS_PER_USER },
        OR: [
          { profileReminderSentAt: null },
          { profileReminderSentAt: { lt: threeDaysAgo } }
        ]
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        profileReminderCount: true,
        profileReminderSentAt: true,
        emailVerified: true,
        buyerProfile: {
          select: {
            bio: true,
            linkedinUrl: true,
            yearsExperience: true,
            capitalAvailableMin: true,
            industryExperience: true
          }
        }
      },
      take: RATE_LIMIT_PER_MINUTE
    })
    
    console.log(`📊 Found ${buyers.length} buyers to check`)
    
    let sent = 0
    let skipped = 0
    let errors = 0
    
    for (const buyer of buyers) {
      try {
        const completeness = calculateProfileCompleteness(buyer)
        
        // Skip if profile is complete enough
        if (completeness >= PROFILE_INCOMPLETE_THRESHOLD) {
          skipped++
          continue
        }
        
        // Send reminder email
        const result = await sendBuyerProfileReminderEmail(
          buyer.email,
          buyer.firstName || undefined,
          completeness,
          buyer.id
        )
        
        if (result.success) {
          // Update tracking
          await prisma.user.update({
            where: { id: buyer.id },
            data: {
              profileReminderSentAt: new Date(),
              profileReminderCount: { increment: 1 }
            }
          })
          sent++
          console.log(`✅ Sent to ${buyer.email} (${completeness}% complete)`)
        } else {
          errors++
          console.error(`❌ Failed to send to ${buyer.email}:`, result.error)
        }
        
        // Rate limiting: wait 600ms between sends (100/min)
        await new Promise(resolve => setTimeout(resolve, 600))
        
      } catch (error) {
        errors++
        console.error(`❌ Error processing ${buyer.email}:`, error)
      }
    }
    
    console.log(`\n📈 Profile Reminder Summary:`)
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
  checkProfileReminders()
    .then((result) => {
      console.log('\n✨ Done!', result)
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Fatal error:', error)
      process.exit(1)
    })
}
