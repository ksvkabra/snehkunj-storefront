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

// Category Item
export interface SanityCategoryItem {
  label: string;
  image: SanityImageObject;
  link: string;
  description?: string;
  productCount?: number;
  featured?: boolean;
}

// Call to Action
export interface SanityCTA {
  text: string;
  link: string;
  style?: 'primary' | 'secondary' | 'outline';
}

// Featured Grid Configuration
export interface SanityFeaturedGridConfig {
  gridColumns?: 2 | 3 | 4 | 6;
  gridGap?: 'gap-2' | 'gap-4' | 'gap-6' | 'gap-8';
  showCategoryCounts?: boolean;
  showCategoryDescriptions?: boolean;
  imageAspectRatio?: 'square' | 'landscape' | 'portrait';
}

// Navigation Configuration
export interface SanityNavigationConfig {
  navigationStyle?: 'horizontal' | 'vertical' | 'grid';
  showImages?: boolean;
  showCounts?: boolean;
}

// Featured Categories Grid Section
export interface SanityFeaturedCategoriesSection extends SanitySectionStyling, SanityFeaturedGridConfig {
  _type: 'categorySection';
  sectionType: 'featured-grid';
  sectionName?: string;
  title: string;
  description?: string;
  categories: SanityCategoryItem[];
  cta?: SanityCTA;
}

// Category Navigation Section
export interface SanityCategoryNavigationSection extends SanitySectionStyling, SanityNavigationConfig {
  _type: 'categorySection';
  sectionType: 'navigation';
  sectionName?: string;
  title: string;
  description?: string;
  categories: SanityCategoryItem[];
  cta?: SanityCTA;
}

// Union type for all category sections
export type SanityCategorySection = 
  | SanityFeaturedCategoriesSection
  | SanityCategoryNavigationSection; 