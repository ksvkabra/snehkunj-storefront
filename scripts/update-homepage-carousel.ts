#!/usr/bin/env tsx

/**
 * Script to update existing homepage to use carousel for featured products
 */

import dotenv from 'dotenv';
import { sanityAdminClient } from '../sanity/lib/admin-client';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function main() {
  console.log('🔄 Updating homepage to use carousel for featured products...');
  
  try {
    // Find existing homepage
    const existingHomepage = await sanityAdminClient.fetch(
      `*[_type == "homePage"][0]`
    );
    
    if (!existingHomepage) {
      console.log('❌ No homepage found. Please run the seeding script first.');
      return;
    }

    // Update the featured products section to use carousel
    const updatedSections = existingHomepage.sections.map((section: any) => {
      if (section._key === 'featured-products' && section._type === 'productSection') {
        return {
          ...section,
          sectionType: 'carousel',
          carouselAutoplay: true,
          carouselSpeed: 4,
          carouselShowArrows: true,
          carouselShowDots: true
        };
      }
      return section;
    });

    // Update the homepage
    await sanityAdminClient.patch(existingHomepage._id)
      .set({ sections: updatedSections })
      .commit();

    console.log('✅ Updated homepage to use carousel for featured products');
    console.log('🔄 Please restart your dev server to see the changes');
    
  } catch (error) {
    console.error('❌ Error updating homepage:', error);
    process.exit(1);
  }
}

main(); 