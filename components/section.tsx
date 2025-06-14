'use client';

import type { SanitySection } from 'sanity/lib/types/page';
import AboutSection from './about-section';
import HeroSection from './hero-section';
import FeaturedCategoriesSection from './sections/featured-categories-section';
import TestimonialsSection from './sections/testimonials-section';

interface SectionProps {
  section: SanitySection;
}

export default function Section({ section }: SectionProps) {
  console.log('🚀 ~ Section ~ section:', section);
  switch (section.type) {
    case 'heroSection':
      return section.heroSection && <HeroSection data={section.heroSection} />;
    case 'aboutSection':
      return section.aboutSection && <AboutSection data={section.aboutSection} />;
    case 'testimonialsSection':
      return section.testimonialsSection && <TestimonialsSection data={section.testimonialsSection} />;
    case 'featuredCategoriesSection':
      return section.featuredCategoriesSection && <FeaturedCategoriesSection data={section.featuredCategoriesSection} />;
    default:
      console.warn(`Unknown section type: ${section.type}`);
      return null;
  }
}
