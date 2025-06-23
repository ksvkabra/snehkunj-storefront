'use client';

import type { SanitySection } from '@sanity/lib/types/page';
import { Product } from 'lib/shopify/types';
import HeroSection from './hero-section';
import FeaturedCategoriesSection from './sections/featured-categories-section';
import ImageTextBannerSection from './sections/image-text-banner-section';
import ShopifySection from './sections/shopify-section';
import TestimonialsSection from './sections/testimonials-section';

interface SanitySectionProps {
  section: SanitySection;
  featuredProducts: Product[];
}

export default function SanitySection({ section, featuredProducts }: SanitySectionProps) {
  switch (section.type) {
    case 'heroSection':
      return section.heroSection ? <HeroSection data={section.heroSection} /> : null;
    case 'testimonialsSection':
      return section.testimonialsSection ? <TestimonialsSection data={section.testimonialsSection} /> : null;
    case 'featuredCategoriesSection':
      return section.featuredCategoriesSection ? <FeaturedCategoriesSection data={section.featuredCategoriesSection} /> : null;
    case 'imageTextBannerSection':
      return section.imageTextBannerSection ? <ImageTextBannerSection data={section.imageTextBannerSection} /> : null;
    case 'shopifySection':
      return section.shopifySection ? <ShopifySection data={section.shopifySection} featuredProducts={featuredProducts} /> : null;
    default:
      console.warn(`Unknown section type: ${section.type}`);
      return null;
  }
} 