import type { SanityImageObject } from '@sanity/image-url/lib/types/types';

// Common styling fields
export interface SanitySectionStyling {
  textAlign?: 'left' | 'center' | 'right';
  textColor?: string;
  backgroundColor?: string;
  paddingTop?: 'pt-0' | 'pt-4' | 'pt-8' | 'pt-12' | 'pt-16';
  paddingBottom?: 'pb-0' | 'pb-4' | 'pb-8' | 'pb-12' | 'pb-16';
  hideOnMobile?: boolean;
  customClassName?: string;
}

// Background Image Section
export interface SanityBackgroundImageSection extends SanitySectionStyling {
  _type: 'imageSection';
  sectionType: 'background';
  sectionName?: string;
  backgroundTitle?: string;
  backgroundSubtitle?: string;
  backgroundImage: SanityImageObject;
  backgroundOverlay?: string;
  backgroundCTA?: {
    text: string;
    link: string;
  };
}

// Gallery Image Item
export interface SanityGalleryImageItem {
  image: SanityImageObject;
  alt?: string;
  caption?: string;
  link?: string;
}

// Image Gallery Section
export interface SanityImageGallerySection extends SanitySectionStyling {
  _type: 'imageSection';
  sectionType: 'gallery';
  sectionName?: string;
  galleryTitle?: string;
  galleryDescription?: string;
  galleryImages: SanityGalleryImageItem[];
  galleryLayout?: 'grid' | 'masonry' | 'carousel';
  galleryColumns?: 2 | 3 | 4;
}

// Social Proof Image Item
export interface SanitySocialProofImageItem {
  image: SanityImageObject;
  alt?: string;
  title?: string;
  description?: string;
  link?: string;
}

// Social Proof Section
export interface SanitySocialProofSection extends SanitySectionStyling {
  _type: 'imageSection';
  sectionType: 'social-proof';
  sectionName?: string;
  socialProofTitle?: string;
  socialProofImages: SanitySocialProofImageItem[];
  socialProofLayout?: 'grid' | 'list' | 'carousel';
}

// Union type for all image sections
export type SanityImageSection = 
  | SanityBackgroundImageSection
  | SanityImageGallerySection
  | SanitySocialProofSection; 