'use client';

import { urlFor } from '@sanity/lib/image';
import type { SanityImageTextBannerSection } from '@sanity/lib/types/image-text-banner-section';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ImageTextBannerSectionProps {
  data: SanityImageTextBannerSection;
}

export default function ImageTextBannerSection({ data }: ImageTextBannerSectionProps) {
  const imageUrl = urlFor(data.image).url();

  return (
    <section className='w-full bg-black min-h-[500px]' aria-labelledby='banner-heading'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[500px]'>
        {/* Left: Text Content */}
        <motion.div
          className='flex flex-col justify-center gap-6 px-6 md:px-10 text-white'
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 id='banner-heading' className='text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight'>
            {data.headline}
          </h2>

          {data.text && <p className='text-lg text-white/80 leading-relaxed max-w-xl'>{data.text}</p>}

          {data.ctaLink && data.ctaLabel && (
            <Link
              href={data.ctaLink}
              className='inline-block w-fit px-8 py-3 text-base font-semibold bg-white text-black rounded-full shadow hover:bg-holicraft-mustard transition'
              aria-label={data.ctaLabel}
            >
              {data.ctaLabel}
            </Link>
          )}
        </motion.div>

        {/* Right: Full-cover Image */}
        <motion.div
          className='relative h-[400px] md:h-auto w-screen md:w-[50vw]'
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        >
          <img
            src={imageUrl}
            alt={data.image.alt || data.headline}
            className='absolute inset-0 w-full h-full object-cover rounded-l-xl md:rounded-none'
          />
        </motion.div>
      </div>
    </section>
  );
}
