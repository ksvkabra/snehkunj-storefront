import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface SanityHeroSection {
  _id: string;
  _type: 'heroSection';
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  ctaLink: string;
  backgroundImage: SanityImageObject;
} 