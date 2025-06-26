#!/usr/bin/env tsx

/**
 * Script to delete existing homepage for re-seeding
 */

import dotenv from 'dotenv';
import { sanityAdminClient } from '../sanity/lib/admin-client';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function main() {
  console.log('🗑️  Deleting existing homepage...');
  
  try {
    // Find and delete existing homepage
    const existingHomepage = await sanityAdminClient.fetch(
      `*[_type == "homePage"][0]`
    );
    
    if (existingHomepage) {
      await sanityAdminClient.delete(existingHomepage._id);
      console.log('✅ Deleted existing homepage');
    } else {
      console.log('ℹ️  No existing homepage found');
    }
  } catch (error) {
    console.error('❌ Error deleting homepage:', error);
    process.exit(1);
  }
}

main(); 