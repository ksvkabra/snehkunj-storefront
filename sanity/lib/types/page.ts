import type { SanityFeaturedCategoriesSection } from './featured-categories-section';
import type { SanityHeroSection } from './hero-section';
import type { SanityImageTextBannerSection } from './image-text-banner-section';
import type { SanityShopifySection } from './shopify-section';
import type { SanityTestimonialsSection } from './testimonials-section';

export type SanitySection = {
  _type: 'section';
  type: 'heroSection' | 'testimonialsSection' | 'featuredCategoriesSection' | 'imageTextBannerSection' | 'shopifySection';
  heroSection?: SanityHeroSection;
  testimonialsSection?: SanityTestimonialsSection;
  featuredCategoriesSection?: SanityFeaturedCategoriesSection;
  imageTextBannerSection?: SanityImageTextBannerSection;
  shopifySection?: SanityShopifySection;
};

export interface SanityPage {
  _id: string;
  _type: 'page';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  sections: SanitySection[];
  seo?: {
    title?: string;
    description?: string;
  };
} 