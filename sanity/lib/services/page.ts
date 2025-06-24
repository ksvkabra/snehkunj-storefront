import { sanityClient } from '../client';
import { pageQuery } from '../queries/page';
import type { SanityPage } from '../types/page';
import { getHomePage } from './singletons';

export async function getPage(slug: string): Promise<SanityPage | null> {
  try {
    // Special handling for homepage singleton
    if (slug === 'home') {
      const homePage = await getHomePage();
      return homePage as SanityPage | null;
    }

    const page = await sanityClient.fetch<SanityPage>(pageQuery, { slug });
    return page;
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
} 