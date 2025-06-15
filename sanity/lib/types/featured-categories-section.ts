import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface SanityCategory {
  _type: 'category';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  image: SanityImageObject & {
    alt?: string;
  };
  description?: string;
}

export interface SanityFeaturedCategoriesSection {
  _type: 'featuredCategoriesSection';
  title: string;
  categories: SanityCategory[];
}
