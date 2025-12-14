/**
 * Seed Listing Photos Script
 * 
 * This script fetches placeholder photos from Unsplash based on 
 * each listing's asset type and updates the database.
 * 
 * Usage: npx tsx scripts/seed-listing-photos.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Unsplash photo URLs by asset type (curated, high-quality business photos)
const ASSET_TYPE_PHOTOS: Record<string, string[]> = {
  RESTAURANT: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&h=800&fit=crop',
  ],
  MANUFACTURING: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&h=800&fit=crop',
  ],
  RETAIL: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=800&fit=crop',
  ],
  SERVICE: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop',
  ],
  HEALTHCARE: [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&h=800&fit=crop',
  ],
  TECHNOLOGY: [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop',
  ],
  ECOMMERCE: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
  ],
  CONSTRUCTION: [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop',
  ],
  TRANSPORTATION: [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&h=800&fit=crop',
  ],
  HOSPITALITY: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=800&fit=crop',
  ],
  REAL_ESTATE: [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&h=800&fit=crop',
  ],
  OTHER: [
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop',
  ],
}

// Keyword-based photo matching for better relevance
const KEYWORD_PHOTOS: Record<string, string[]> = {
  cafe: ASSET_TYPE_PHOTOS.RESTAURANT,
  bakery: ASSET_TYPE_PHOTOS.RESTAURANT,
  restaurant: ASSET_TYPE_PHOTOS.RESTAURANT,
  food: ASSET_TYPE_PHOTOS.RESTAURANT,
  gym: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&h=800&fit=crop',
  ],
  fitness: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=800&fit=crop',
  ],
  saas: ASSET_TYPE_PHOTOS.TECHNOLOGY,
  software: ASSET_TYPE_PHOTOS.TECHNOLOGY,
  tech: ASSET_TYPE_PHOTOS.TECHNOLOGY,
  ecommerce: ASSET_TYPE_PHOTOS.ECOMMERCE,
  'e-commerce': ASSET_TYPE_PHOTOS.ECOMMERCE,
  retail: ASSET_TYPE_PHOTOS.RETAIL,
  manufacturing: ASSET_TYPE_PHOTOS.MANUFACTURING,
  industrial: ASSET_TYPE_PHOTOS.MANUFACTURING,
  hvac: ASSET_TYPE_PHOTOS.CONSTRUCTION,
  plumbing: ASSET_TYPE_PHOTOS.CONSTRUCTION,
  construction: ASSET_TYPE_PHOTOS.CONSTRUCTION,
  auto: [
    'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=800&fit=crop',
  ],
  car: [
    'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=800&fit=crop',
  ],
  service: ASSET_TYPE_PHOTOS.SERVICE,
}

// Get photos based on title keywords or asset type
function getPhotosForListing(title: string, assetType: string): string[] {
  const titleLower = title.toLowerCase()
  
  // Check for keyword matches in title
  for (const [keyword, photos] of Object.entries(KEYWORD_PHOTOS)) {
    if (titleLower.includes(keyword)) {
      const numPhotos = Math.floor(Math.random() * 3) + 1
      const shuffled = [...photos].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, numPhotos)
    }
  }
  
  // Fall back to asset type
  const photos = ASSET_TYPE_PHOTOS[assetType] || ASSET_TYPE_PHOTOS.OTHER
  const numPhotos = Math.floor(Math.random() * 3) + 1
  const shuffled = [...photos].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numPhotos)
}

async function seedListingPhotos() {
  const forceUpdate = process.argv.includes('--force')
  
  console.log('🖼️  Starting to seed listing photos...\n')
  if (forceUpdate) {
    console.log('⚠️  Force mode: Updating ALL listings\n')
  }

  try {
    // Get listings (all if force, or only without photos)
    const listings = await prisma.listing.findMany({
      where: forceUpdate ? {} : {
        OR: [
          { photos: { equals: [] } },
          { photos: { equals: null as any } },
        ]
      },
      select: {
        id: true,
        title: true,
        assetType: true,
        photos: true,
      }
    })

    console.log(`📋 Found ${listings.length} listings to update\n`)

    if (listings.length === 0) {
      console.log('✅ All listings already have photos!')
      return
    }

    let updated = 0
    for (const listing of listings) {
      const photos = getPhotosForListing(listing.title || '', listing.assetType)
      
      await prisma.listing.update({
        where: { id: listing.id },
        data: { photos }
      })

      console.log(`✅ ${listing.title || listing.id}`)
      console.log(`   Asset Type: ${listing.assetType}`)
      console.log(`   Added ${photos.length} photo(s)\n`)
      updated++
    }

    console.log(`\n🎉 Successfully updated ${updated} listings with photos!`)

  } catch (error) {
    console.error('❌ Error seeding photos:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
seedListingPhotos()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))

