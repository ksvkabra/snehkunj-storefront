'use client';

import Link from 'next/link';
import { urlFor } from 'sanity/lib/image';
import type { SanityHeroSection } from 'sanity/lib/types/hero-section';

interface HeroSectionProps {
  data: SanityHeroSection;
}

export default function HeroSection({ data }: HeroSectionProps) {
  console.log('🚀 ~ HeroSection ~ data:', data);
  const imageUrl = data.backgroundImage && urlFor(data.backgroundImage).url();

  return (
    <section
      className='relative w-full h-[80vh] bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${imageUrl})` }}
      aria-label='Holicraft homepage hero'
    >
      {/* Subtle warm gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#5d3b2f]/40 to-[#2e1f18]/60 mix-blend-multiply' />

      {/* Optional vignette (less intense) */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent' />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center h-full px-4 py-16 mx-auto text-center max-w-7xl text-holicraft-cream sm:px-6 lg:px-8 lg:items-start lg:text-left'>
        <h1 className='mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-holicraft-cream drop-shadow-sm'>
          {data.headline}
        </h1>

        {data.subheadline && <p className='max-w-2xl mb-8 text-lg sm:text-xl text-holicraft-cream/90'>{data.subheadline}</p>}

        {data.ctaLink && data.ctaLabel && (
          <Link
            href={data.ctaLink}
            className='inline-block px-8 py-4 text-base font-semibold transition duration-200 rounded-full shadow-md bg-holicraft-mustard sm:text-lg text-holicraft-brown hover:shadow-lg hover:bg-holicraft-hover focus:outline-none focus:ring-2 focus:ring-holicraft-terracotta focus:ring-offset-2'
            aria-label={data.ctaLabel}
          >
            {data.ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
