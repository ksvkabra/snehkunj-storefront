import type { SanityAboutSection } from './about-section';
import type { SanityHeroSection } from './hero-section';

export interface SanitySection {
  _type: 'section';
  type: 'heroSection' | 'aboutSection';
  heroSection?: SanityHeroSection;
  aboutSection?: SanityAboutSection;
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