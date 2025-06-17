import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import type { Reference } from '@sanity/types';

export type TestimonialType = 'text' | 'video' | 'product' | 'press';

export interface BaseTestimonial {
  _type: 'testimonialCard';
  type: TestimonialType;
}

export interface TextTestimonial extends BaseTestimonial {
  type: 'text';
  quote: string;
  name: string;
  title?: string;
}

export interface VideoTestimonial extends BaseTestimonial {
  type: 'video';
  media: SanityImageObject & {
    alt?: string;
  };
  quote?: string;
}

export interface ProductTestimonial extends BaseTestimonial {
  type: 'product';
  product: Reference;
  ctaLabel?: string;
  ctaLink?: string;
}

export interface PressTestimonial extends BaseTestimonial {
  type: 'press';
  quote: string;
  source: string;
}

export type SanityTestimonial = TextTestimonial | VideoTestimonial | ProductTestimonial | PressTestimonial;

export interface SanityTestimonialsSection {
  _type: 'testimonialsSection';
  title: string;
  testimonials: SanityTestimonial[];
} 