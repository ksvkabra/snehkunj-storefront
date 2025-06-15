import Link from 'next/link';
import { urlFor } from 'sanity/lib/image';
import { SanityAboutSection } from 'sanity/lib/types/about-section';

interface AboutSectionProps {
  data: SanityAboutSection;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const imageUrl = urlFor(data.image).url();

  return (
    <section className='w-full py-16 bg-holicraft-cream md:py-24' aria-labelledby='about-heading'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24'>
          {/* Image Column */}
          <div className='relative aspect-[4/3] overflow-hidden rounded-lg shadow-md'>
            <img src={imageUrl} alt={data.image.alt || 'About Holicraft'} className='object-cover w-full h-full' />
            <div className='absolute inset-0 bg-gradient-to-br from-holicraft-terracotta/20 to-holicraft-brown/20 mix-blend-multiply' />
          </div>

          {/* Content Column */}
          <div className='flex flex-col justify-center'>
            <h2 id='about-heading' className='mb-6 text-3xl font-extrabold tracking-tight text-holicraft-brown sm:text-4xl'>
              {data.heading}
            </h2>

            <div className='mb-8 text-base leading-relaxed text-holicraft-charcoal'>
              <p>{data.content}</p>
            </div>

            {data.ctaLink && data.ctaLabel && (
              <Link
                href={data.ctaLink}
                className='inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full shadow-sm bg-holicraft-terracotta text-holicraft-cream hover:bg-holicraft-hover focus:outline-none focus:ring-2 focus:ring-holicraft-terracotta focus:ring-offset-2'
                aria-label={data.ctaLabel}
              >
                {data.ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
