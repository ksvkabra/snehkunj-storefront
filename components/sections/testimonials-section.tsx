'use client';

import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { urlFor } from 'sanity/lib/image';
import type { SanityTestimonialsSection } from 'sanity/lib/types/testimonials-section';

interface TestimonialsSectionProps {
  data: SanityTestimonialsSection;
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  if (!data.testimonials?.length) return null;

  return (
    <section className='w-full py-16 bg-holicraft-cream md:py-24' aria-labelledby='testimonials-heading'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <h2 id='testimonials-heading' className='mb-12 text-3xl font-bold tracking-tight text-center text-holicraft-brown sm:text-4xl'>
          {data.title}
        </h2>

        {/* Mobile: Horizontal Scroll */}
        <div className='md:hidden'>
          <div className='flex gap-4 px-4 pb-4 -mx-4 overflow-x-auto'>
            {data.testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className='hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-3'>
          {data.testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: SanityTestimonialsSection['testimonials'][0] }) {
  const avatarUrl = testimonial.avatar && urlFor(testimonial.avatar).url();

  return (
    <div className='flex flex-col h-full p-6 transition-shadow duration-300 border shadow-md rounded-xl border-holicraft-terracotta/30 bg-holicraft-beige hover:shadow-lg'>
      {/* Rating */}
      <div className='flex mb-4'>
        {[...Array(5)].map((_, i) => (
          <span key={i} className='text-holicraft-mustard'>
            {i < testimonial.rating ? <StarIcon className='w-5 h-5' /> : <StarOutlineIcon className='w-5 h-5' />}
          </span>
        ))}
      </div>

      {/* Quote */}
      <blockquote className='flex-1 mb-6 text-holicraft-brown/90'>
        <p className='text-base italic'>"{testimonial.quote}"</p>
      </blockquote>

      {/* Author */}
      <div className='flex items-center gap-4'>
        {avatarUrl && (
          <div className='w-12 h-12 overflow-hidden rounded-full'>
            <img src={avatarUrl} alt={testimonial.avatar?.alt || testimonial.name} className='object-cover w-full h-full' />
          </div>
        )}
        <div>
          <p className='font-semibold text-holicraft-brown'>{testimonial.name}</p>
          {testimonial.title && <p className='text-sm text-holicraft-brown/70'>{testimonial.title}</p>}
        </div>
      </div>
    </div>
  );
}
