'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { urlFor } from 'sanity/lib/image';
import type { SanityHeroSection } from 'sanity/lib/types/hero-section';

interface HeroSectionProps {
  data: SanityHeroSection;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const imageUrl = data.backgroundImage && urlFor(data.backgroundImage).url();

  return (
    <section
      className='relative w-full h-[85vh] bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${imageUrl})` }}
      aria-label='Holicraft homepage hero'
    >
      {/* Background overlays */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#5d3b2f]/50 to-[#2e1f18]/70 mix-blend-multiply' />
      <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent' />

      <div className='relative z-10 flex flex-col items-start justify-end h-full px-4 pb-[10vh] mx-auto text-left max-w-7xl text-holicraft-cream sm:px-6 lg:px-8'>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className='mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl drop-shadow-lg'
        >
          {data.headline}
        </motion.h1>

        {data.subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className='max-w-2xl mb-6 text-lg sm:text-xl text-holicraft-cream/90'
          >
            {data.subheadline}
          </motion.p>
        )}

        {data.ctaLink && data.ctaLabel && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}>
            <Link
              href={data.ctaLink}
              className='inline-block px-8 py-4 text-base font-semibold transition-all duration-200 rounded-full shadow-md bg-holicraft-mustard sm:text-lg text-holicraft-brown hover:shadow-lg hover:bg-holicraft-hover focus:outline-none focus:ring-2 focus:ring-holicraft-terracotta focus:ring-offset-2'
              aria-label={data.ctaLabel}
            >
              {data.ctaLabel}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
