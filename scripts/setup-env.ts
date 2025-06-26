#!/usr/bin/env tsx

/**
 * Script to help set up environment variables for Sanity scripts
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const envPath = path.join(process.cwd(), '.env.local');

function checkEnvVariables() {
  console.log('🔍 Checking environment variables...\n');

  const requiredVars = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET', 
    'SANITY_API_TOKEN'
  ];

  const missingVars: string[] = [];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
      console.log(`❌ Missing: ${varName}`);
    } else {
      console.log(`✅ Found: ${varName}`);
    }
  }

  if (missingVars.length > 0) {
    console.log('\n⚠️  Missing required environment variables!');
    console.log('\n📝 To fix this, you need to:');
    console.log('\n1. Create a `.env.local` file in your project root');
    console.log('2. Add the following variables:');
    
    missingVars.forEach(varName => {
      console.log(`   ${varName}=your_value_here`);
    });

    console.log('\n🔑 To get your SANITY_API_TOKEN:');
    console.log('1. Go to https://www.sanity.io/manage');
    console.log('2. Select your project');
    console.log('3. Go to API tab');
    console.log('4. Create a new token with "Editor" permissions');
    console.log('5. Copy the token and add it to your .env.local file');

    console.log('\n📁 Example .env.local file:');
    console.log('```');
    console.log('NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id');
    console.log('NEXT_PUBLIC_SANITY_DATASET=production');
    console.log('SANITY_API_TOKEN=sk...');
    console.log('```');

    return false;
  }

  console.log('\n🎉 All environment variables are set up correctly!');
  console.log('You can now run the seeding scripts.');
  return true;
}

function createEnvTemplate() {
  if (fs.existsSync(envPath)) {
    console.log('📄 .env.local file already exists');
    return;
  }

  const template = `# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Optional: API Version (defaults to 2024-03-13)
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-13
`;

  fs.writeFileSync(envPath, template);
  console.log('📄 Created .env.local template file');
  console.log('Please update it with your actual values');
}

async function main() {
  console.log('🚀 Sanity Environment Setup\n');

  // Create template if it doesn't exist
  createEnvTemplate();

  // Check if variables are set
  const isConfigured = checkEnvVariables();

  if (!isConfigured) {
    console.log('\n❌ Please configure your environment variables and try again.');
    process.exit(1);
  }
}

main(); 