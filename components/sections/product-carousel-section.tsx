'use client';

import type { SanityProductCarouselSection } from '@sanity/lib/types/product-section';
import { motion, useInView } from 'framer-motion';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import type { Product } from 'lib/shopify/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useProductCarousel } from '../../hooks/use-product-carousel';
import ProductCard from '../grid/product-card';
import Section from '../section';

interface ProductCarouselSectionProps {
  data: SanityProductCarouselSection;
  featuredProducts: Product[];
}

export default function ProductCarouselSection({ data, featuredProducts }: ProductCarouselSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxSlide, setMaxSlide] = useState(0);

  // Use the product carousel hook
  const { products, loading, error } = useProductCarousel({ data, featuredProducts });

  // Carousel configuration from Sanity data
  const carouselConfig = {
    autoplay: data.carouselAutoplay || false,
    speed: data.carouselSpeed || 5,
    showArrows: data.carouselShowArrows ?? true,
    showDots: data.carouselShowDots ?? true,
  };

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      mode: 'snap',
      slides: {
        perView: 1.2,
        spacing: 16,
      },
      breakpoints: {
        '(min-width: 640px)': {
          slides: { perView: 2.2, spacing: 16 },
        },
        '(min-width: 1024px)': {
          slides: { perView: 3, spacing: 16 },
        },
        '(min-width: 1280px)': {
          slides: { perView: 4, spacing: 16 },
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

  // Show loading state
  if (loading) {
    return (
      <div ref={ref}>
        <Section className={`${data.backgroundColor || 'bg-transparent'} ${data.paddingTop || 'pt-16'} ${data.paddingBottom || 'pb-16'}`}>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div ref={ref}>
        <Section className={`${data.backgroundColor || 'bg-transparent'} ${data.paddingTop || 'pt-16'} ${data.paddingBottom || 'pb-16'}`}>
          <div className="text-center text-red-600">
            <p>Failed to load products: {error}</p>
          </div>
        </Section>
      </div>
    );
  }

  // Show empty state
  if (!products?.length) {
    return null;
  }

  return (
    <div ref={ref}>
      <Section 
        className={`${data.backgroundColor || 'bg-transparent'} ${data.paddingTop || 'pt-16'} ${data.paddingBottom || 'pb-16'}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          {/* Section Header */}
          <div className={`flex items-center justify-between mb-12 ${data.textAlign === 'center' ? 'flex-col space-y-4' : ''}`}>
            <div className={`${data.textAlign === 'center' ? 'text-center' : ''}`}>
              <h2 
                className={`font-playfair text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${
                  data.textColor || 'text-holicraft-brown'
                } ${data.textAlign === 'center' ? 'text-center' : ''}`}
              >
                {data.sectionTitle}
              </h2>
              {data.description && (
                <p className={`mt-4 text-base font-dm-sans text-gray-600 max-w-2xl ${
                  data.textAlign === 'center' ? 'mx-auto' : ''
                }`}>
                  {data.description}
                </p>
              )}
            </div>
            
            {data.cta && (
              <Link 
                href={data.cta.link} 
                className={`inline-flex items-center px-6 py-3 text-sm font-semibold transition-colors rounded-full ${
                  data.cta.style === 'primary' 
                    ? 'bg-holicraft-mustard text-holicraft-brown hover:bg-holicraft-hover' 
                    : data.cta.style === 'secondary'
                    ? 'bg-holicraft-brown text-white hover:bg-holicraft-dark'
                    : 'border-2 border-holicraft-mustard text-holicraft-brown hover:bg-holicraft-mustard hover:text-white'
                }`}
              >
                {data.cta.text}
              </Link>
            )}
          </div>

          {/* Carousel Container */}
          <div className='relative'>
            {/* Navigation Arrows */}
            {carouselConfig.showArrows && slider && (
              <>
                <motion.button
                  onClick={() => slider.current?.prev()}
                  disabled={currentSlide === 0}
                  className={`absolute z-10 items-center justify-center hidden w-12 h-12 transition-all duration-300 -translate-y-1/2 border rounded-full shadow-lg cursor-pointer left-[-32px] top-1/2 md:flex ${
                    currentSlide === 0
                      ? 'opacity-30 cursor-not-allowed'
                      : 'bg-white border-holicraft-mustard text-holicraft-brown hover:bg-holicraft-mustard hover:text-white hover:scale-110'
                  }`}
                  aria-label='Previous products'
                  whileHover={{ scale: currentSlide === 0 ? 1 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className='w-5 h-5' />
                </motion.button>
                <motion.button
                  onClick={() => slider.current?.next()}
                  disabled={currentSlide >= maxSlide}
                  className={`absolute z-10 items-center justify-center hidden w-12 h-12 transition-all duration-300 -translate-y-1/2 border rounded-full shadow-lg cursor-pointer right-[-32px] top-1/2 md:flex ${
                    currentSlide >= maxSlide
                      ? 'opacity-30 cursor-not-allowed'
                      : 'bg-white border-holicraft-mustard text-holicraft-brown hover:bg-holicraft-mustard hover:text-white hover:scale-110'
                  }`}
                  aria-label='Next products'
                  whileHover={{ scale: currentSlide >= maxSlide ? 1 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className='w-5 h-5' />
                </motion.button>
              </>
            )}

            {/* Product Carousel */}
            <div ref={sliderRef} className='keen-slider'>
              {products.map((product, index) => (
                <motion.div 
                  key={product.handle} 
                  className='keen-slider__slide'
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <Link href={`/product/${product.handle}`}>
                    <motion.div 
                      className='w-full h-full p-2'
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProductCard
                        title={product.title}
                        imageSrc={product.featuredImage.url}
                        price={`$${product.priceRange.maxVariantPrice.amount}`}
                        href={`/product/${product.handle}`}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Dot Indicators */}
            {carouselConfig.showDots && slider && (
              <div className='flex justify-center mt-8 space-x-2'>
                {Array.from({ length: maxSlide + 1 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => slider.current?.moveToIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === i 
                        ? 'bg-holicraft-mustard scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </Section>
    </div>
  );
} 