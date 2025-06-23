
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

// Base Shopify Section
export interface SanityBaseShopifySection extends SanitySectionStyling, SanityProductDisplayOptions {
  _type: 'shopifySection';
  sectionName?: string;
  title: string;
  description?: string;
  productSourceType: 'manual' | 'collection' | 'tag' | 'recent';
  productLimit?: number;
  cta?: SanityCTA;
}

// Featured Products Carousel Section
export interface SanityFeaturedProductsCarouselSection extends SanityBaseShopifySection, SanityCarouselConfig {
  sectionType: 'featured-products-carousel';
  collectionHandle?: string;
  productTags?: string[];
  manualProducts?: SanityManualProductItem[];
}

// Product Grid Section
export interface SanityProductGridSection extends SanityBaseShopifySection, SanityGridConfig {
  sectionType: 'product-grid';
  collectionHandle?: string;
  productTags?: string[];
  manualProducts?: SanityManualProductItem[];
}

// Collection Showcase Section
export interface SanityCollectionShowcaseSection extends SanityBaseShopifySection {
  sectionType: 'collection-showcase';
  collectionHandle: string;
}

// Recently Viewed Section
export interface SanityRecentlyViewedSection extends SanityBaseShopifySection, SanityCarouselConfig, SanityGridConfig {
  sectionType: 'recently-viewed';
}

// Bestsellers Section
export interface SanityBestsellersSection extends SanityBaseShopifySection, SanityCarouselConfig, SanityGridConfig {
  sectionType: 'bestsellers';
}

// New Arrivals Section
export interface SanityNewArrivalsSection extends SanityBaseShopifySection, SanityCarouselConfig, SanityGridConfig {
  sectionType: 'new-arrivals';
}

// Custom Collection Section
export interface SanityCustomCollectionSection extends SanityBaseShopifySection, SanityCarouselConfig, SanityGridConfig {
  sectionType: 'custom-collection';
  collectionHandle: string;
}

// Product Recommendations Section
export interface SanityProductRecommendationsSection extends SanityBaseShopifySection, SanityCarouselConfig, SanityGridConfig {
  sectionType: 'product-recommendations';
}

// Union type for all Shopify sections
export type SanityShopifySection = 
  | SanityFeaturedProductsCarouselSection
  | SanityProductGridSection
  | SanityCollectionShowcaseSection
  | SanityRecentlyViewedSection
  | SanityBestsellersSection
  | SanityNewArrivalsSection
  | SanityCustomCollectionSection
  | SanityProductRecommendationsSection; 