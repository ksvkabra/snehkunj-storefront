import type { SanityCategorySection } from './category-section';
import type { SanityContentSection } from './content-section';
import type { SanityImageSection } from './image-section';
import type { SanityLayoutSection } from './layout-section';
import type { SanityProductSection } from './product-section';
import type { SanityShopifySection } from './shopify-section';

export type SanitySection = 
  | SanityContentSection
  | SanityImageSection
  | SanityProductSection
  | SanityCategorySection
  | SanityLayoutSection
  | SanityShopifySection;

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