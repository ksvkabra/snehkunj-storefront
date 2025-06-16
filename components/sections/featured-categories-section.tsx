'use client';

import { urlFor } from '@sanity/lib/image';
import type { SanityFeaturedCategoriesSection } from '@sanity/lib/types/featured-categories-section';
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

  return (
    <section className='w-full py-16 bg-holicraft-cream md:py-24' aria-labelledby='categories-heading' ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'
      >
        {/* Header */}
        <div className='flex items-center justify-between mb-12'>
          <h2 id='categories-heading' className='text-3xl font-bold tracking-tight text-holicraft-brown sm:text-4xl'>
            {data.title}
          </h2>
          <Link href='/collections' className='text-sm font-semibold text-holicraft-brown underline-offset-4 hover:underline'>
            Shop all
          </Link>
        </div>

        {/* Category Cards */}
        <div className='grid gap-4 md:grid-cols-3'>
          {data.categories?.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.6, ease: 'easeOut' }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CategoryCard({ category }: { category: SanityFeaturedCategoriesSection['categories'][0] }) {
  const imageUrl = urlFor(category.image).url();

  return (
    <Link href={`/category/${category.slug.current}`} className='block group'>
      <div className='relative overflow-hidden h-[650px] w-full rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-[1.02] hover:shadow-lg'>
        <div className='absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105'>
          <img src={imageUrl} alt={category.image.alt || category.title} className='object-cover w-full h-full' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />
        </div>

        {/* Text Content */}
        <div className='absolute bottom-0 left-0 right-0 z-10 p-6 text-white'>
          <h3 className='mb-1 text-2xl font-semibold drop-shadow'>{category.title}</h3>
          {category.description && <p className='mb-3 text-sm text-white/80 drop-shadow'>{category.description}</p>}
          <span className='inline-block px-4 py-2 text-sm font-medium text-white transition rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20'>
            Shop now
          </span>
        </div>
      </div>
    </Link>
  );
}
