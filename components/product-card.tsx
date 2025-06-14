'use client';

import type { Product } from 'lib/shopify/types';
import { formatPrice } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { title, handle, priceRange, images } = product;
  const firstImage = images[0];
  const price = priceRange.minVariantPrice.amount;

  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-holicraft-beige">
        <Link href={`/products/${handle}`}>
          {firstImage && (
            <Image
              src={firstImage.url}
              alt={firstImage.altText || title}
              width={500}
              height={500}
              className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
            />
          )}
        </Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-holicraft-brown">
            <Link href={`/products/${handle}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-holicraft-charcoal">
          {formatPrice(price)}
        </p>
      </div>
    </div>
  );
} 