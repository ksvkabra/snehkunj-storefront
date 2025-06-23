
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

// Manual Product Item
export interface SanityManualProductItem {
  productHandle: string;
  customTitle?: string;
  customDescription?: string;
}

// Product Display Options
export interface SanityProductDisplayOptions {
  showProductImages?: boolean;
  showProductPrices?: boolean;
  showProductTitles?: boolean;
  showAddToCart?: boolean;
  showQuickView?: boolean;
}

// Call to Action
export interface SanityCTA {
  text: string;
  link: string;
  style?: 'primary' | 'secondary' | 'outline';
}

// Carousel Configuration
export interface SanityCarouselConfig {
  carouselAutoplay?: boolean;
  carouselSpeed?: number;
  carouselShowArrows?: boolean;
  carouselShowDots?: boolean;
}

// Grid Configuration
export interface SanityGridConfig {
  gridColumns?: 2 | 3 | 4 | 5;
  gridGap?: 'gap-2' | 'gap-4' | 'gap-6' | 'gap-8';
}

// Featured Configuration
export interface SanityFeaturedConfig {
  featuredLayout?: 'grid' | 'list' | 'masonry';
  featuredHighlight?: boolean;
}

// Base Product Section
export interface SanityBaseProductSection extends SanitySectionStyling, SanityProductDisplayOptions {
  _type: 'productSection';
  sectionName?: string;
  sectionTitle: string;
  description?: string;
  productSourceType: 'manual' | 'collection' | 'tag' | 'recent';
  productLimit?: number;
  cta?: SanityCTA;
}

// Manual Product Section
export interface SanityManualProductSection extends SanityBaseProductSection {
  sectionType: 'carousel' | 'grid' | 'featured';
  manualProducts: SanityManualProductItem[];
}

// Shopify Collection Product Section
export interface SanityShopifyCollectionProductSection extends SanityBaseProductSection {
  sectionType: 'carousel' | 'grid' | 'featured';
  shopifyCollection: string;
}

// Shopify Tag Product Section
export interface SanityShopifyTagProductSection extends SanityBaseProductSection {
  sectionType: 'carousel' | 'grid' | 'featured';
  shopifyTag: string;
}

// Carousel Specific Section
export interface SanityProductCarouselSection extends SanityBaseProductSection, SanityCarouselConfig {
  sectionType: 'carousel';
  manualProducts?: SanityManualProductItem[];
  shopifyCollection?: string;
  shopifyTag?: string;
}

// Grid Specific Section
export interface SanityProductGridSection extends SanityBaseProductSection, SanityGridConfig {
  sectionType: 'grid';
  manualProducts?: SanityManualProductItem[];
  shopifyCollection?: string;
  shopifyTag?: string;
}

// Featured Specific Section
export interface SanityProductFeaturedSection extends SanityBaseProductSection, SanityFeaturedConfig {
  sectionType: 'featured';
  manualProducts?: SanityManualProductItem[];
  shopifyCollection?: string;
  shopifyTag?: string;
}

// Union type for all product sections
export type SanityProductSection = 
  | SanityProductCarouselSection
  | SanityProductGridSection
  | SanityProductFeaturedSection; 