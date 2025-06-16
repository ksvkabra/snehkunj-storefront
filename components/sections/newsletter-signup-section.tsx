'use client';

import type { SanityNewsletterSignupSection } from '@sanity/lib/types/newsletter-signup-section';
import { useState } from 'react';

interface NewsletterSignupSectionProps {
  data: SanityNewsletterSignupSection;
}

export default function NewsletterSignupSection({ data }: NewsletterSignupSectionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate async newsletter signup
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className='relative w-full py-20 overflow-hidden bg-holicraft-blush' aria-labelledby='newsletter-heading'>
      <div className='absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-holicraft-cream/30' />

      <div className='relative z-10 max-w-3xl px-4 mx-auto text-center sm:px-6 lg:px-8'>
        <h2 id='newsletter-heading' className='text-4xl font-extrabold tracking-tight text-holicraft-brown sm:text-5xl'>
          {data.headline}
        </h2>

        <p className='mt-4 text-lg text-holicraft-brown/80 sm:text-xl'>{data.subtext}</p>

        <form onSubmit={handleSubmit} className='mt-8 sm:mt-10'>
          <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
            <label htmlFor='email' className='sr-only'>
              Email address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='email'
              placeholder='Your email address'
              disabled={status === 'loading' || status === 'success'}
              className='w-full px-5 py-3 text-base transition bg-white rounded-full sm:w-80 text-holicraft-brown ring-1 ring-holicraft-terracotta/30 placeholder:text-holicraft-brown/40 focus:outline-none focus:ring-2 focus:ring-holicraft-terracotta'
            />

            <button
              type='submit'
              disabled={status === 'loading' || status === 'success'}
              className='inline-flex items-center justify-center px-6 py-3 text-base font-semibold transition-colors rounded-full bg-holicraft-terracotta text-holicraft-cream hover:bg-holicraft-hover focus:outline-none focus:ring-2 focus:ring-holicraft-terracotta focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {status === 'loading' ? 'Signing up...' : status === 'success' ? 'Subscribed!' : data.ctaLabel}
            </button>
          </div>

          {status === 'error' && <p className='mt-2 text-sm text-red-600'>Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  );
}
