import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { apiVersion, dataset, projectId } from '../env';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Admin client with write permissions for scripts
export const sanityAdminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // This token needs write permissions
  perspective: 'published',
}); 