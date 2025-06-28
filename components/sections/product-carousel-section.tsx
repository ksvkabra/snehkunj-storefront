'use client';

import { motion, useInView } from 'framer-motion';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { Product } from 'lib/shopify/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useProductCarousel } from '../../hooks/use-product-carousel';
import { SanityProductSection } from '../../sanity/lib/types/product-section';

interface ProductCarouselSectionProps {
  data: SanityProductSection;
  featuredProducts: Product[];
}

export default function ProductCarouselSection({ data, featuredProducts }: ProductCarouselSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const { products, loading, error } = useProductCarousel({ data, featuredProducts });

  const isGridLayout = data.sectionType === 'grid';
  const gridColumns = isGridLayout ? (data as any).gridColumns || 4 : 4;

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      mode: 'snap',
      slides: {
        perView: 1.2,
        spacing: 6,
      },
      breakpoints: {
        '(min-width: 640px)': {
          slides: { perView: 2.2, spacing: 6 },
        },
        '(min-width: 1024px)': {
          slides: { perView: 3, spacing: 6 },
        },
        '(min-width: 1280px)': {
          slides: { perView: 4, spacing: 6 },
        },
      },
    },
    []
  );

  useEffect(() => {
    if (slider && products.length > 0) {
      setTimeout(() => slider.current?.update(), 150);
    }
  }, [slider, products]);

  if (loading)
    return (
      <SectionShell ref={ref} data={data}>
        Loading...
      </SectionShell>
    );
  if (error)
    return (
      <SectionShell ref={ref} data={data}>
        Error: {error}
      </SectionShell>
    );
  if (!products?.length) return null;

  return (
    <SectionShell ref={ref} data={data}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
        {/* Section Header */}
        <div className='flex items-center justify-between mb-12'>
          <div>
            <h2 className={`text-5xl md:text-6xl font-bold tracking-tight ${data.textColor || 'text-gray-900'}`}>{data.sectionTitle}</h2>
            {data.description && <p className='text-gray-500 mt-2 font-dm-sans text-base'>{data.description}</p>}
          </div>
          {data.cta && (
            <Link
              href={data.cta.link}
              className='inline-flex items-center px-5 py-2 text-sm font-semibold border border-gray-200 rounded-full shadow-sm bg-white hover:bg-gray-50 transition-colors whitespace-nowrap'
            >
              {data.cta.text}
            </Link>
          )}
        </div>

        {isGridLayout ? (
          <div className={`grid gap-6 ${getGridColumnsClass(gridColumns)}`}>
            {products.map((product, index) => (
              <motion.div key={product.handle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * index }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className='relative flex items-center'>
            {/* Arrows */}
            <CarouselArrow direction='left' onClick={() => slider.current?.prev()} />
            <CarouselArrow direction='right' onClick={() => slider.current?.next()} />
            {/* Carousel */}
            <div ref={sliderRef} className='keen-slider w-full'>
              {products.map((product, index) => (
                <motion.div
                  key={product.handle}
                  className='keen-slider__slide'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </SectionShell>
  );
}

// 🧱 Section container (padding, background)
const SectionShell = ({ children, data, ...props }: any) => (
  <div
    ref={props.ref}
    className={`w-full ${data.backgroundColor || 'bg-white'} ${data.paddingTop || 'pt-16'} ${data.paddingBottom || 'pb-16'}`}
  >
    <div className='px-4 md:px-8 lg:px-16'>{children}</div>
  </div>
);

// 🛍 Product Card (hover-safe)
function ProductCard({ product }: { product: Product }) {
  return (
    <div className='relative bg-[#f9f9f9] rounded-md overflow-hidden w-full group cursor-pointer'>
      {/* Product Image */}
      <div className='relative aspect-[3/4] w-full overflow-hidden'>
        <img
          src={product.featuredImage.url}
          alt={product.title}
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
        {product.images[1]?.url && (
          <img
            src={product.images[1].url}
            alt={`${product.title} alt`}
            className='absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
          />
        )}
        {(product.tags?.includes('bestseller') || product.tags?.includes('new')) && (
          <div className='absolute top-3 right-3 bg-white text-[10px] uppercase font-medium px-2 py-1 z-10'>
            {product.tags.includes('bestseller') ? 'BEST SELLER' : 'NEW SHADE'}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className='p-4 space-y-1'>
        <h3 className='text-base font-semibold text-gray-900'>{product.title}</h3>
        {product.description && <p className='text-sm text-gray-500 line-clamp-2'>{product.description}</p>}
        <p className='text-sm font-medium text-black'>${product.priceRange.maxVariantPrice.amount}</p>
      </div>

      {/* Add to Cart Button (only appears on hover) */}
      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 z-30'>
        <button
          className='w-full py-3 rounded-full border-2 font-semibold text-base hover:text-white transition-all duration-200 keen-slider__slide__add-to-cart-button'
          style={{ backgroundColor: 'transparent' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--holicraft-terracotta)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ⬅️➡️ Arrows
function CarouselArrow({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  const isLeft = direction === 'left';
  const Icon = isLeft ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      className={`absolute z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-200 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-110 -translate-y-1/2 top-1/2 ${
        isLeft ? 'left-[-32px]' : 'right-[-32px]'
      }`}
      aria-label={isLeft ? 'Previous products' : 'Next products'}
    >
      <Icon className='w-6 h-6 text-holicraft-terracotta' />
    </button>
  );
}

// 🧮 Grid column helper
function getGridColumnsClass(columns: number): string {
  switch (columns) {
    case 2:
      return 'grid-cols-1 md:grid-cols-2';
    case 3:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    case 4:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    case 5:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
    default:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  }
}
