import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface SanityImageTextBannerSection {
  _type: 'imageTextBannerSection';
  headline: string;
  text: string;
  image: SanityImageObject & {
    alt?: string;
  };
  imagePosition: 'left' | 'right';
  ctaLabel: string;
  ctaLink: string;
} 