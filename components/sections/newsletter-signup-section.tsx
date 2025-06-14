'use client';

import { useState } from 'react';
import type { SanityNewsletterSignupSection } from 'sanity/lib/types/newsletter-signup-section';

interface NewsletterSignupSectionProps {
  data: SanityNewsletterSignupSection;
}

export default function NewsletterSignupSection({ data }: NewsletterSignupSectionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // TODO: Implement newsletter signup functionality
    // For now, just simulate a successful signup
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="w-full py-16 bg-holicraft-blush md:py-24" aria-labelledby="newsletter-heading">
      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 id="newsletter-heading" className="mb-4 text-3xl font-bold tracking-tight text-holicraft-brown sm:text-4xl">
            {data.headline}
          </h2>
          
          <p className="max-w-2xl mx-auto mb-8 text-lg text-holicraft-brown/90">
            {data.subtext}
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 border-0 rounded-full shadow-sm text-holicraft-brown ring-1 ring-inset ring-holicraft-terracotta/20 placeholder:text-holicraft-brown/40 focus:ring-2 focus:ring-inset focus:ring-holicraft-terracotta sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold transition-colors rounded-full shadow-sm bg-holicraft-terracotta text-holicraft-cream hover:bg-holicraft-brown focus:outline-none focus:ring-2 focus:ring-holicraft-terracotta focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Signing up...' : status === 'success' ? 'Subscribed!' : data.ctaLabel}
              </button>
            </div>

            {status === 'error' && (
              <p className="mt-2 text-sm text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
} 