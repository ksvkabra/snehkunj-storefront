import type { SanityAboutSection } from './about-section';
import type { SanityFeaturedCategoriesSection } from './featured-categories-section';
import type { SanityHeroSection } from './hero-section';
import type { SanityTestimonialsSection } from './testimonials-section';

export interface SanitySection {
  _type: 'section';
  type: 'heroSection' | 'aboutSection' | 'testimonialsSection' | 'featuredCategoriesSection';
  heroSection?: SanityHeroSection;
  aboutSection?: SanityAboutSection;
  testimonialsSection?: SanityTestimonialsSection;
  featuredCategoriesSection?: SanityFeaturedCategoriesSection;
}

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