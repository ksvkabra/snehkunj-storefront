import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface SanityTestimonial {
  _type: 'testimonial';
  name: string;
  quote: string;
  avatar: SanityImageObject & {
    alt?: string;
  };
  title?: string;
  rating: number;
}

export interface SanityTestimonialsSection {
  _type: 'testimonialsSection';
  title: string;
  testimonials: SanityTestimonial[];
} 