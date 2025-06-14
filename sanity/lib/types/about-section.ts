import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface SanityAboutSection {
  _type: 'aboutSection';
  heading: string;
  content: string;
  image: SanityImageObject & {
    alt?: string;
  };
  ctaLabel?: string;
  ctaLink?: string;
} 