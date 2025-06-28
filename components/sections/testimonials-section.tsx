'use client';

import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import { urlFor } from '@sanity/lib/image';
import type { SanityTestimonialsSection } from '@sanity/lib/types/content-section';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TestimonialsSectionProps {
  data: SanityTestimonialsSection;
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  if (!data.testimonials?.length) return null;

  const {
    testimonialsTitle,
    testimonials,
    backgroundColor = 'bg-[#F9F8F4]',
    textColor = 'text-neutral-900',
    paddingTop = 'pt-16',
    paddingBottom = 'pb-16',
    hideOnMobile = false,
    customClassName = '',
  } = data;

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const duration = 6000;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, duration);
    return () => clearInterval(timer);
  }, [paused, testimonials.length]);

  const currentItem = testimonials[current];
  const testimonialImage = currentItem?.image;

  return (
    <section
      className={`w-full ${paddingTop} ${paddingBottom} ${backgroundColor} ${customClassName} ${hideOnMobile ? 'hidden md:block' : ''}`}
      aria-labelledby='testimonials-heading'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 id='testimonials-heading' className={`text-3xl sm:text-4xl font-bold ${textColor} mb-12`}>
          {testimonialsTitle}
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-8 items-center'>
          <div className='md:col-span-7'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentItem?.quote || currentItem?.pressQuote || ''}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className='text-left'
              >
                <p className='text-xs uppercase tracking-widest text-gray-600 mb-2'>Don’t just take it from us!</p>
                <p className='text-2xl md:text-3xl font-bold text-neutral-900 leading-relaxed'>
                  “{currentItem?.quote || currentItem?.pressQuote || ''}”
                </p>
                {currentItem?.name && <p className='mt-4 text-sm font-semibold text-gray-700'>— {currentItem.name}</p>}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className='md:col-span-5'>
            {testimonialImage && (
              <div className='relative'>
                <img
                  src={urlFor(testimonialImage).url()}
                  alt={testimonialImage.alt || 'Testimonial Image'}
                  className='object-cover w-full h-full'
                />
                {currentItem?.type === 'video' && (
                  <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                    <PlayCircleIcon className='w-12 h-12 text-white' />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className='mt-8 flex justify-end'>
          <button onClick={() => setPaused(!paused)} className='text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2'>
            {paused ? <PlayCircleIcon className='w-5 h-5' /> : <PauseCircleIcon className='w-5 h-5' />}
          </button>
        </div>
      </div>
    </section>
  );
}
