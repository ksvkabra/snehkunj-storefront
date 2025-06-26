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
  const gridColumns = data.gridColumns || 3;
  const gridGap = data.gridGap || 'gap-4';
  const showDescriptions = data.showCategoryDescriptions ?? true;
  const showCounts = data.showCategoryCounts ?? true;

  // Responsive grid classes based on design specs
  const getGridClasses = () => {
    const baseClasses = 'grid';
    const gapClass = gridGap;
    
    // Mobile: 2 columns, Tablet: 3 columns, Desktop: 4 columns (as per design)
    const responsiveClasses = 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4';
    
    return `${baseClasses} ${gapClass} ${responsiveClasses}`;
  };

  return (
    <section 
      className={`w-full py-16 md:py-24 ${data.backgroundColor || 'bg-transparent'}`} 
      aria-labelledby='categories-heading' 
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'
      >
        {/* Header */}
        <div className={`flex items-center justify-between mb-12 ${data.textAlign === 'center' ? 'flex-col space-y-4' : ''}`}>
          <h2 
            id='categories-heading' 
            className={`text-3xl font-bold tracking-tight sm:text-4xl ${
              data.textColor || 'text-holicraft-brown'
            } ${data.textAlign === 'center' ? 'text-center' : ''}`}
          >
            {data.title}
          </h2>
          {data.cta && (
            <Link 
              href={data.cta.link} 
              className={`text-sm font-semibold underline-offset-4 hover:underline ${
                data.textColor || 'text-holicraft-brown'
              }`}
            >
              {data.cta.text}
            </Link>
          )}
        </div>

        {/* Category Cards Grid */}
        <div className={getGridClasses()}>
          {data.categories?.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6, ease: 'easeOut' }}
            >
              <CategoryCard 
                category={category} 
                showDescription={showDescriptions}
                showCount={showCounts}
                aspectRatio={data.imageAspectRatio || 'square'}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CategoryCard({ 
  category, 
  showDescription, 
  showCount, 
  aspectRatio 
}: { 
  category: SanityFeaturedCategoriesSection['categories'][0];
  showDescription: boolean;
  showCount: boolean;
  aspectRatio: 'square' | 'landscape' | 'portrait';
}) {
  const imageUrl = category.image ? urlFor(category.image).url() : null;
  
  // Aspect ratio classes based on design specs
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'landscape': return 'aspect-[16/9]';
      case 'portrait': return 'aspect-[4/5]';
      default: return 'aspect-square';
    }
  };

  return (
    <Link href={category.link} className='block group'>
      <div className={`relative overflow-hidden w-full rounded-xl shadow-md transition-all duration-300 group-hover:scale-[1.03] hover:shadow-lg ${getAspectRatioClass()}`}>
        {/* Image with hover effects */}
        <div className='absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105'>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={category.label} 
              className='object-cover w-full h-full' 
            />
          ) : (
            <div className='flex items-center justify-center w-full h-full bg-gray-200'>
              <span className='text-gray-500 text-sm'>No image</span>
            </div>
          )}
          {/* Overlay on hover */}
          <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
        </div>

        {/* Text Content */}
        <div className='absolute bottom-0 left-0 right-0 z-10 p-4 text-white'>
          <div className='transition-transform duration-300 group-hover:translate-y-[-4px]'>
            <h3 className='mb-1 text-lg font-semibold drop-shadow-md md:text-xl'>
              {category.label}
            </h3>
            
            {showDescription && category.description && (
              <p className='mb-2 text-sm text-white/90 drop-shadow-md line-clamp-2'>
                {category.description}
              </p>
            )}
            
            {showCount && category.productCount && (
              <p className='mb-3 text-xs text-white/80 drop-shadow-md'>
                {category.productCount} products
              </p>
            )}
            
            <span className='inline-block px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:scale-105'>
              Shop now
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
