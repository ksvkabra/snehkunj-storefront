import { sanityClient } from '../client';
import { heroSectionQuery } from '../queries/hero-section';
import type { SanityHeroSection } from '../types/hero-section';

export async function getHeroSection(): Promise<SanityHeroSection | null> {
  try {
    const heroSection = await sanityClient.fetch<SanityHeroSection>(heroSectionQuery);
    return heroSection;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    throw error;
  }
} 