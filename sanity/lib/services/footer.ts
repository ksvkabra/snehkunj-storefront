import { sanityClient } from '../client';
import { footerQuery } from '../queries/footer';
import type { SanityFooter } from '../types/footer';

export async function getFooter(): Promise<SanityFooter | null> {
  try {
    const footer = await sanityClient.fetch<SanityFooter>(footerQuery);
    return footer;
  } catch (error) {
    console.error('Error fetching footer:', error);
    throw error;
  }
} 