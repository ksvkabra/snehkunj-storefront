import type { SanityAboutSection } from './about-section';
import type { SanityCTABannerSection } from './cta-banner-section';
import type { SanityFeaturedCategoriesSection } from './featured-categories-section';
import type { SanityHeroSection } from './hero-section';
import type { SanityImageTextBannerSection } from './image-text-banner-section';
import type { SanityNewsletterSignupSection } from './newsletter-signup-section';
import type { SanityTestimonialsSection } from './testimonials-section';
import type { SanityTrustBadgesSection } from './trust-badges-section';

export type SanitySection = {
  _type: 'section';
  type: 'heroSection' | 'aboutSection' | 'testimonialsSection' | 'featuredCategoriesSection' | 'imageTextBannerSection' | 'newsletterSignupSection' | 'trustBadgesSection' | 'ctaBannerSection';
  heroSection?: SanityHeroSection;
  aboutSection?: SanityAboutSection;
  testimonialsSection?: SanityTestimonialsSection;
  featuredCategoriesSection?: SanityFeaturedCategoriesSection;
  imageTextBannerSection?: SanityImageTextBannerSection;
  newsletterSignupSection?: SanityNewsletterSignupSection;
  trustBadgesSection?: SanityTrustBadgesSection;
  ctaBannerSection?: SanityCTABannerSection;
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