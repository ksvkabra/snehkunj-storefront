import type { SanityCategorySection } from './category-section';
import type { SanityContentSection } from './content-section';
import type { SanityImageSection } from './image-section';
import type { SanityLayoutSection } from './layout-section';
import type { SanityProductSection } from './product-section';
import type { SanityShopifySection } from './shopify-section';

export interface SanityHomePage {
  _id: string;
  _type: 'homePage';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  sections: (
    | SanityContentSection
    | SanityImageSection
    | SanityProductSection
    | SanityCategorySection
    | SanityLayoutSection
    | SanityShopifySection
  )[];
  seo?: {
    title?: string;
    description?: string;
    ogImage?: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
      hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
      };
      crop?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
    };
  };
} 