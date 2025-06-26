'use client';

import { urlFor } from '@sanity/lib/image';
import type { SanityFeaturedCategoriesSection } from '@sanity/lib/types/category-section';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

interface FeaturedCategoriesSectionProps {
  data: SanityFeaturedCategoriesSection;
}

export default function FeaturedCategoriesSection({ data }: FeaturedCategoriesSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  if (!data.categories?.length) return null;

  // Get grid configuration from data
  const gridColumns = data.gridColumns || 4; // Default to 4 columns for full-width
  const gridGap = data.gridGap || 'gap-4';

  // Full-width editorial grid classes - Cuyana-inspired
  const getGridClasses = () => {
    const baseClasses = 'grid';
    const gapClass = 'gap-1 md:gap-2'; // Minimal gap for editorial feel
    
    // Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns
    const responsiveClasses = 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4';
    
    return `${baseClasses} ${gapClass} ${responsiveClasses}`;
  };

  return (
    <section className={`w-full py-16 md:py-24 ${data.backgroundColor || 'bg-transparent'}`} aria-labelledby='categories-heading' ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='w-full px-4 md:px-6 lg:px-8'
      >
        {/* Optional Header - Only show if title exists */}
        {data.title && (
          <div className={`mb-12 max-w-6xl mx-auto ${data.textAlign === 'center' ? 'text-center' : ''}`}>
            <h2
              id='categories-heading'
              className={`text-2xl font-light tracking-wide sm:text-3xl ${data.textColor || 'text-holicraft-brown'}`}
            >
              {data.title}
            </h2>
          </div>
        )}

        {/* Full-Width Editorial Category Grid */}
        <div className={getGridClasses()}>
          {data.categories?.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
              className='relative overflow-hidden'
            >
              <CategoryTile category={category} aspectRatio={data.imageAspectRatio || 'square'} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CategoryTile({
  category,
  aspectRatio,
}: {
  category: SanityFeaturedCategoriesSection['categories'][0];
  aspectRatio: 'square' | 'landscape' | 'portrait';
}) {
  const imageUrl = category.image ? urlFor(category.image).url() : null;
  
  // Editorial aspect ratios - optimized for full-width grid
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'landscape':
        return 'aspect-[4/3]';
      case 'portrait':
        return 'aspect-[3/4]';
      default:
        return 'aspect-square';
    }
  };

  return (
    <Link href={category.link} className='block group'>
      <div className={`relative overflow-hidden w-full ${getAspectRatioClass()}`}>
        {/* Full-bleed image - no borders, no shadows */}
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={category.label} 
            className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.02]' 
          />
        ) : (
          <div className='flex items-center justify-center w-full h-full bg-gray-100'>
            <span className='text-gray-400 text-sm font-light'>No image</span>
          </div>
        )}

        {/* Minimal text overlay - bottom-left corner only */}
        <div className='absolute bottom-4 left-4 z-10'>
          <h3 className='text-sm md:text-base font-medium text-white drop-shadow-sm tracking-wide'>
            {category.label}
          </h3>
        </div>
      </div>
    </Link>
  );
}
