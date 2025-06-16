import type { SanityShopifySection } from '@sanity/lib/types/shopify-section';
import FeaturedCollectionSection from 'components/featured-collection-section';
import { Product } from 'lib/shopify/types';
import { Suspense } from 'react';

interface ShopifySectionProps {
  data: SanityShopifySection;
  featuredProducts: Product[];
}

export default function ShopifySection({ data, featuredProducts }: ShopifySectionProps) {
  if (data.sectionId) {
    return (
      <Suspense fallback={<div className='w-full h-32 animate-pulse bg-holicraft-cream/20' />}>
        {featuredProducts.length > 0 && (
          <FeaturedCollectionSection title='Featured Collection' products={featuredProducts} collectionHandle='featured' />
        )}
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<div className='w-full h-32 animate-pulse bg-holicraft-cream/20' />}>
      <div data-shopify-section={data.sectionName} data-section-id={data.sectionId} />
    </Suspense>
  );
}
