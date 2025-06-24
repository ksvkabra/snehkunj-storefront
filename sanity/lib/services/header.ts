import { sanityClient } from '../client';
import { headerQuery } from '../queries/header';
import type { SanityHeader } from '../types/header';

export async function getHeader(): Promise<SanityHeader | null> {
  try {
    const header = await sanityClient.fetch(headerQuery);
    return header;
  } catch (error) {
    console.error('Failed to fetch header:', error);
    return null;
  }
} 