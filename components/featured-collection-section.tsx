'use client';

import { GridTileImage } from 'components/grid/tile';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';
import { useState } from 'react';

interface FeaturedCollectionSectionProps {
  title: string;
  products: Product[];
  collectionHandle: string;
}

export default function FeaturedCollectionSection({ title, products, collectionHandle }: FeaturedCollectionSectionProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className='w-full py-12 bg-holicraft-cream md:py-16 lg:py-20' aria-labelledby='featured-collection-heading'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        {/* Section Title */}
        <div className='mb-10 text-center'>
          <h2 id='featured-collection-heading' className='text-3xl font-bold tracking-tight text-holicraft-brown sm:text-4xl lg:text-5xl'>
            {title}
          </h2>
        </div>

        {/* Mobile Scroll */}
        <div className='px-4 pb-6 -mx-4 overflow-x-auto md:hidden'>
          <ul className='flex space-x-4'>
            {products.map((product) => (
              <li key={product.handle} className='relative flex-none w-3/4 max-w-xs aspect-square'>
                <Link href={`/product/${product.handle}`} className='block w-full h-full'>
                  <GridTileImage
                    alt={product.title}
                    label={{
                      title: product.title,
                      amount: product.priceRange.maxVariantPrice.amount,
                      currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                    }}
                    src={product.featuredImage.url}
                    fill
                    sizes='(max-width: 768px) 75vw, 50vw'
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Grid */}
        <div className='hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3 xl:grid-cols-4'>
          {products.map((product) => (
            <div key={product.handle} className='relative group'>
              <Link href={`/product/${product.handle}`} className='block w-full h-full overflow-hidden rounded-md aspect-square'>
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                  }}
                  src={product.featuredImage.url}
                  fill
                  sizes='(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw'
                />
              </Link>
            </div>
          ))}
        </div>

        {/* View Collection CTA */}
        <div className='mt-12 text-center'>
          <Link
            href={`/search/${collectionHandle}`}
            className='inline-flex items-center justify-center px-8 py-4 text-base font-bold transition rounded-full shadow-md bg-holicraft-mustard text-holicraft-brown hover:bg-holicraft-hover focus:outline-none focus:ring-2 focus:ring-holicraft-terracotta focus:ring-offset-2'
            aria-label={`View all products in ${title}`}
            onClick={() => setIsLoading(true)}
          >
            {isLoading ? (
              <svg
                className='w-5 h-5 mr-2 animate-spin text-holicraft-brown'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
              </svg>
            ) : null}
            {isLoading ? 'Loading...' : 'View Collection'}
          </Link>
        </div>
      </div>
    </section>
  );
}
