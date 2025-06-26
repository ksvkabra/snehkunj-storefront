import { AddToCart } from 'components/cart/add-to-cart';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <div className="pb-4">
          <h2 className="mb-2 text-lg font-medium">Description</h2>
          <div className="prose prose-sm">
            <div
              className="mb-6 text-sm leading-tight"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <AddToCart product={product} />
    </>
  );
}
