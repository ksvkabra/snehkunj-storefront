'use client';

import { urlFor } from '@sanity/lib/image';
import type { SanityImageTextBannerSection } from '@sanity/lib/types/image-text-banner-section';
import Link from 'next/link';

interface ImageTextBannerSectionProps {
  data: SanityImageTextBannerSection;
}

export default function ImageTextBannerSection({ data }: ImageTextBannerSectionProps) {
  const imageUrl = urlFor(data.image).url();
  const isImageLeft = data.imagePosition === 'left';

  return (
    <section className="w-full py-16 bg-holicraft-cream md:py-24" aria-labelledby="banner-heading">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className={`grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24 ${isImageLeft ? '' : 'md:[grid-template-areas:"content_image"]'}`}>
          {/* Image Column */}
          <div className={`relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg ${isImageLeft ? '' : 'md:[grid-area:image]'}`}>
            <img
              src={imageUrl}
              alt={data.image.alt || data.headline}
              className="object-cover w-full h-full"
            />
            {/* Subtle warm gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-holicraft-terracotta/10 to-holicraft-brown/10 mix-blend-multiply" />
          </div>

          {/* Content Column */}
          <div className={`flex flex-col justify-center ${isImageLeft ? '' : 'md:[grid-area:content]'}`}>
            <h2 id="banner-heading" className="mb-6 text-3xl font-bold tracking-tight text-holicraft-brown sm:text-4xl">
              {data.headline}
            </h2>
            
            <div className="mb-8 prose prose-lg text-holicraft-brown/90">
              <p>{data.text}</p>
            </div>

            <Link
              href={data.ctaLink}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold transition-colors rounded-full shadow-sm w-fit bg-holicraft-terracotta text-holicraft-cream hover:bg-holicraft-brown focus:outline-none focus:ring-2 focus:ring-holicraft-terracotta focus:ring-offset-2"
              aria-label={data.ctaLabel}
            >
              {data.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 