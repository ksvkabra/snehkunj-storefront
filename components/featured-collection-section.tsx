'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import type { Product } from 'lib/shopify/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ProductCard from './grid/product-card';

interface FeaturedCollectionSectionProps {
  title: string;
  products: Product[];
  collectionHandle: string;
}

export default function FeaturedCollectionSection({ title, products, collectionHandle }: FeaturedCollectionSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxSlide, setMaxSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      mode: 'snap',
      slides: {
        perView: 1.2,
        spacing: 8,
      },
      breakpoints: {
        '(min-width: 640px)': {
          slides: { perView: 2.2, spacing: 8 },
        },
        '(min-width: 1024px)': {
          slides: { perView: 2.5, spacing: 8 },
        },
        '(min-width: 1280px)': {
          slides: { perView: 3, spacing: 8 },
        },
      },
      created(s) {
        let perViewValue = 1;

        const slidesOption = s.options.slides;
        if (typeof slidesOption === 'object' && slidesOption !== null && 'perView' in slidesOption) {
          const rawPerView = slidesOption.perView;

          if (typeof rawPerView === 'number') {
            perViewValue = rawPerView;
          } else if (typeof rawPerView === 'function') {
            const result = rawPerView();
            if (typeof result === 'number') {
              perViewValue = result;
            }
          }
        }

        setMaxSlide(s.track.details.slides.length - perViewValue);
      },

      slideChanged(s) {
        let perViewValue = 1;

        const slidesOption = s.options.slides;
        if (typeof slidesOption === 'object' && slidesOption !== null && 'perView' in slidesOption) {
          const rawPerView = slidesOption.perView;

          if (typeof rawPerView === 'number') {
            perViewValue = rawPerView;
          } else if (typeof rawPerView === 'function') {
            const result = rawPerView();
            if (typeof result === 'number') {
              perViewValue = result;
            }
          }
        }

        setCurrentSlide(s.track.details.rel);
        setMaxSlide(s.track.details.slides.length - perViewValue);
      },
    },
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className='w-full py-16 bg-holicraft-cream md:py-20' aria-labelledby='featured-collection-heading'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='flex items-center justify-between mb-10'>
          <h2 id='featured-collection-heading' className='text-3xl font-bold tracking-tight text-holicraft-brown sm:text-4xl lg:text-5xl'>
            {title}
          </h2>
          <Link
            href={`/search/${collectionHandle}`}
            onClick={() => setIsLoading(true)}
            className='inline-flex items-center justify-center px-8 py-4 text-base font-bold transition rounded-full shadow-md bg-holicraft-mustard text-holicraft-brown hover:bg-holicraft-hover focus:outline-none focus:ring-2 focus:ring-holicraft-terracotta focus:ring-offset-2'
            aria-label={`View all products in ${title}`}
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

        <div className='relative'>
          {/* Arrow Buttons */}
          {slider && (
            <>
              <button
                onClick={() => slider.current?.prev()}
                disabled={currentSlide === 0}
                className={`absolute z-10 items-center justify-center hidden w-10 h-10 transition -translate-y-1/2 border rounded-full shadow-md cursor-pointer left-[-24px] top-1/2 md:flex ${
                  currentSlide === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'bg-white border-holicraft-mustard text-holicraft-brown hover:bg-holicraft-mustard hover:text-white'
                }`}
                aria-label='Previous'
              >
                <ChevronLeft className='w-5 h-5' />
              </button>
              <button
                onClick={() => slider.current?.next()}
                disabled={currentSlide >= maxSlide}
                className={`absolute z-10 items-center justify-center hidden w-10 h-10 transition -translate-y-1/2 border rounded-full shadow-md cursor-pointer right-[-24px] top-1/2 md:flex ${
                  currentSlide >= maxSlide
                    ? 'opacity-30 cursor-not-allowed'
                    : 'bg-white border-holicraft-mustard text-holicraft-brown hover:bg-holicraft-mustard hover:text-white'
                }`}
                aria-label='Next'
              >
                <ChevronRight className='w-5 h-5' />
              </button>
            </>
          )}

          {/* Product Carousel */}
          <div ref={sliderRef} className='keen-slider'>
            {products?.map((product) => (
              <div key={product.handle} className='keen-slider__slide'>
                <Link href={`/product/${product.handle}`}>
                  <div className='w-full h-full'>
                    <ProductCard
                      title={product.title}
                      imageSrc={product.featuredImage.url}
                      price={`$${product.priceRange.maxVariantPrice.amount}`}
                      href={`/product/${product.handle}`}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
