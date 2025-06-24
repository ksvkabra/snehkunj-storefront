#!/usr/bin/env tsx

/**
 * Script to initialize singleton documents in Sanity
 * Run this script after setting up your Sanity project
 */

import { initializeSingletons } from '../sanity/lib/services/singletons';

async function main() {
  console.log('🚀 Initializing Sanity singletons...');
  
  try {
    await initializeSingletons();
    console.log('✅ Singletons initialized successfully!');
    console.log('');
    console.log('Created/verified the following singletons:');
    console.log('  • Header (ID: header)');
    console.log('  • Homepage (ID: homePage)');
    console.log('  • Global Footer (ID: globalFooter)');
    console.log('');
    console.log('You can now edit these in your Sanity Studio at /cms');
  } catch (error) {
    console.error('❌ Error initializing singletons:', error);
    process.exit(1);
  }
}

main(); 