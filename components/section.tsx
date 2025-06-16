'use client';

import type { SanitySection } from '@sanity/lib/types/page';
import { Product } from 'lib/shopify/types';
import AboutSection from './about-section';
import HeroSection from './hero-section';
import CTABannerSection from './sections/cta-banner-section';
import FeaturedCategoriesSection from './sections/featured-categories-section';
import ImageTextBannerSection from './sections/image-text-banner-section';
import NewsletterSignupSection from './sections/newsletter-signup-section';
import ShopifySection from './sections/shopify-section';
import TestimonialsSection from './sections/testimonials-section';
import TrustBadgesSection from './sections/trust-badges-section';

interface SectionProps {
  section: SanitySection;
  featuredProducts: Product[];
}

export default function Section({ section, featuredProducts }: SectionProps) {
  switch (section.type) {
    case 'heroSection':
      return section.heroSection ? <HeroSection data={section.heroSection} /> : null;
    case 'aboutSection':
      return section.aboutSection ? <AboutSection data={section.aboutSection} /> : null;
    case 'testimonialsSection':
      return section.testimonialsSection ? <TestimonialsSection data={section.testimonialsSection} /> : null;
    case 'featuredCategoriesSection':
      return section.featuredCategoriesSection ? <FeaturedCategoriesSection data={section.featuredCategoriesSection} /> : null;
    case 'imageTextBannerSection':
      return section.imageTextBannerSection ? <ImageTextBannerSection data={section.imageTextBannerSection} /> : null;
    case 'newsletterSignupSection':
      return section.newsletterSignupSection ? <NewsletterSignupSection data={section.newsletterSignupSection} /> : null;
    case 'trustBadgesSection':
      return section.trustBadgesSection ? <TrustBadgesSection data={section.trustBadgesSection} /> : null;
    case 'ctaBannerSection':
      return section.ctaBannerSection ? <CTABannerSection data={section.ctaBannerSection} /> : null;
    case 'shopifySection':
      return section.shopifySection ? <ShopifySection data={section.shopifySection} featuredProducts={featuredProducts} /> : null;
    default:
      console.warn(`Unknown section type: ${section.type}`);
      return null;
  }
}
