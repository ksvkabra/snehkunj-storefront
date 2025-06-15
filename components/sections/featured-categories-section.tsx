'use client';

import Link from 'next/link';
import { urlFor } from 'sanity/lib/image';
import type { SanityFeaturedCategoriesSection } from 'sanity/lib/types/featured-categories-section';

interface FeaturedCategoriesSectionProps {
  data: SanityFeaturedCategoriesSection;
}

export default function FeaturedCategoriesSection({ data }: FeaturedCategoriesSectionProps) {
  if (!data.categories?.length) return null;

  return (
    <section className='w-full py-16 bg-holicraft-cream md:py-24' aria-labelledby='categories-heading'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <h2 id='categories-heading' className='mb-12 text-3xl font-bold tracking-tight text-center text-holicraft-brown sm:text-4xl'>
          {data.title}
        </h2>

        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {data.categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: SanityFeaturedCategoriesSection['categories'][0] }) {
  const imageUrl = urlFor(category.image).url();

  return (
    <Link
      href={`/category/${category.slug.current}`}
      className='relative w-full h-64 overflow-hidden transition-transform duration-300 shadow-md rounded-xl group hover:scale-105 hover:shadow-lg'
    >
      <img src={imageUrl} alt={category.image.alt || category.title} className='object-cover w-full h-full' />
      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent' />
      {/* Category title */}
      <div className='absolute bottom-0 left-0 right-0 p-4'>
        <h3 className='text-lg font-semibold text-white drop-shadow'>{category.title}</h3>
      </div>
    </Link>
  );
}
