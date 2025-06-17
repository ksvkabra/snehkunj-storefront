'use client';

import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { urlFor } from '@sanity/lib/image';
import type { SanityTestimonialsSection } from '@sanity/lib/types/testimonials-section';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface TestimonialsSectionProps {
  data: SanityTestimonialsSection;
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  console.log('🚀 ~ TestimonialsSection ~ data:', data);
  if (!data.testimonials?.length) return null;

  return (
    <section className='w-full py-16 md:py-24 bg-holicraft-cream' aria-labelledby='testimonials-heading'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 id='testimonials-heading' className='text-3xl sm:text-4xl font-bold text-holicraft-brown mb-12'>
          {data.title}
        </h2>

        <div className='columns-1 md:columns-2 gap-6 space-y-6'>
          {data.testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='break-inside-avoid overflow-hidden rounded-2xl bg-white shadow hover:shadow-md transition-all'
            >
              {item.type === 'text' && (
                <div className='p-6'>
                  <p className='text-lg text-holicraft-brown/90 italic mb-4'>"{item.quote}"</p>
                  <p className='text-sm font-semibold text-holicraft-brown'>{item.name}</p>
                  {item.title && <p className='text-xs text-holicraft-brown/60'>{item.title}</p>}
                </div>
              )}

              {item.type === 'video' && item.media && (
                <div className='relative aspect-[3/4] w-full'>
                  <img src={urlFor(item.media).url()} alt={item.media.alt || ''} className='object-cover w-full h-full' />
                  <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                    <PlayCircleIcon className='w-12 h-12 text-white' />
                  </div>
                  {item.quote && (
                    <div className='absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent text-sm'>
                      {item.quote}
                    </div>
                  )}
                </div>
              )}

              {item.type === 'product' && item.product && (
                <div className='p-6'>
                  <p className='text-base font-semibold text-holicraft-brown mb-1'>Product Title</p>
                  {item.ctaLabel && item.ctaLink && (
                    <Link href={item.ctaLink} className='text-sm font-medium text-holicraft-mustard hover:underline'>
                      {item.ctaLabel}
                    </Link>
                  )}
                </div>
              )}

              {item.type === 'press' && (
                <div className='p-6 text-center'>
                  <p className='text-sm font-semibold text-holicraft-brown'>{item.source}</p>
                  <p className='text-xl text-holicraft-brown/90 font-serif mt-2'>{item.quote}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
