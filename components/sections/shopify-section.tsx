import { Suspense } from 'react';
import type { SanityShopifySection } from 'sanity/lib/types/shopify-section';

interface ShopifySectionProps {
  data: SanityShopifySection;
}

export default function ShopifySection({ data }: ShopifySectionProps) {
  return (
    <Suspense fallback={<div className="w-full h-32 animate-pulse bg-holicraft-cream/20" />}>
      <div data-shopify-section={data.sectionName} data-section-id={data.sectionId} />
    </Suspense>
  );
} 