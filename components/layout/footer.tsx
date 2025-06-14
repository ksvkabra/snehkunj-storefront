'use client';

import { Instagram } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getFooter } from 'sanity/lib/services/footer';
import type { SanityFooter } from 'sanity/lib/types/footer';

const socialIcons = {
  instagram: Instagram,
};

export default function Footer() {
  const [footer, setFooter] = useState<SanityFooter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFooter() {
      try {
        const data = await getFooter();
        setFooter(data);
      } catch (error) {
        console.error('Error loading footer:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadFooter();
  }, []);

  if (isLoading || !footer) {
    return null;
  }

  return (
    <footer className='bg-holicraft-cream text-gray-700'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        {/* Navigation Grid */}
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {footer?.navigation?.map((section) => (
            <div key={section.title}>
              <h3 className='text-sm font-bold uppercase tracking-wider'>{section.title}</h3>
              <ul className='mt-4 space-y-2'>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className='text-sm hover:underline'>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className='mt-12 flex justify-center space-x-6'>
          {footer.social?.map((item) => {
            const Icon = socialIcons[item.name.toLowerCase() as keyof typeof socialIcons];
            if (!Icon) return null;

            return (
              <a key={item.name} href={item.url} target='_blank' rel='noopener noreferrer' className='text-gray-700 hover:text-gray-900'>
                <span className='sr-only'>{item.name}</span>
                <Icon className='h-6 w-6' />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className='mt-8 border-t border-gray-200 pt-8 text-center text-sm'>
          <p>{footer.bottomText}</p>
        </div>
      </div>
    </footer>
  );
}
