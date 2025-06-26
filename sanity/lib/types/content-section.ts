import type { SanityImageObject } from '@sanity/image-url/lib/types/types';

// Common styling fields
export interface SanitySectionStyling {
  headingStyle?: 'h1' | 'h2' | 'h3' | 'display' | 'eyebrow';
  textAlign?: 'left' | 'center' | 'right';
  textColor?: string;
  backgroundColor?: string;
  paddingTop?: 'pt-0' | 'pt-4' | 'pt-8' | 'pt-12' | 'pt-16';
  paddingBottom?: 'pb-0' | 'pb-4' | 'pb-8' | 'pb-12' | 'pb-16';
  hideOnMobile?: boolean;
  customClassName?: string;
}

// Hero Section
export interface SanityHeroSection extends SanitySectionStyling {
  _type: 'contentSection';
  sectionType: 'hero';
  sectionName?: string;
  title: string;
  subheading?: string;
  description?: string;
  image?: {
    asset: SanityImageObject;
    alt?: string;
  };
  imagePosition?: 'left' | 'right';
  primaryCta?: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
  shippingBadge?: string;
}

// Craftsmanship Story Section
export interface SanityCraftsmanshipSection extends SanitySectionStyling {
  _type: 'contentSection';
  sectionType: 'craftsmanship';
  sectionName?: string;
  craftsmanshipTitle: string;
  craftsmanshipBody?: any[]; // PortableText
  craftsmanshipImage?: SanityImageObject;
  craftsmanshipImagePosition?: 'left' | 'right';
  craftsmanshipCTA?: {
    text: string;
    link: string;
  };
}

// Testimonials Section
export interface SanityTestimonialItem {
  type: 'text' | 'video' | 'product' | 'press';
  // Text testimonial fields
  quote?: string;
  name?: string;
  title?: string;
  // Video testimonial fields
  media?: {
    asset: SanityImageObject;
    alt?: string;
  };
  videoQuote?: string;
  // Product review fields
  product?: {
    title: string;
    handle: string;
  };
  ctaLabel?: string;
  ctaLink?: string;
  // Press quote fields
  source?: string;
  pressQuote?: string;
  // Common fields
  rating?: number;
  image?: {
    asset: SanityImageObject;
    alt?: string;
  };
}

export interface SanityTestimonialsSection extends SanitySectionStyling {
  _type: 'contentSection';
  sectionType: 'testimonials';
  sectionName?: string;
  title: string;
  testimonialsTitle?: string;
  testimonials: SanityTestimonialItem[];
}

// Chat Prompt Section
export interface SanityChatSection extends SanitySectionStyling {
  _type: 'contentSection';
  sectionType: 'chat';
  sectionName?: string;
  chatTextBlock?: any[]; // PortableText
  highlightedInstruction: string;
}

// Union type for all content sections
export type SanityContentSection = 
  | SanityHeroSection
  | SanityCraftsmanshipSection
  | SanityTestimonialsSection
  | SanityChatSection; 