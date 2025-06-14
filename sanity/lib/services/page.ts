import { sanityClient } from '../client';
import { pageQuery } from '../queries/page';
import type { SanityPage } from '../types/page';

export async function getPage(slug: string): Promise<SanityPage | null> {
  try {
    const page = await sanityClient.fetch<SanityPage>(pageQuery, { slug });
    return page;
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
} 