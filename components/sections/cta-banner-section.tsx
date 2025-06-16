import type { SanityCTABannerSection } from '@sanity/lib/types/cta-banner-section';
import Link from 'next/link';

interface CTABannerSectionProps {
  data: SanityCTABannerSection;
}

const backgroundColorMap = {
  terracotta: 'bg-holicraft-terracotta',
  mustard: 'bg-holicraft-mustard',
  cream: 'bg-holicraft-cream',
  blush: 'bg-holicraft-blush',
};

const textColorMap = {
  terracotta: 'text-holicraft-cream',
  mustard: 'text-holicraft-brown',
  cream: 'text-holicraft-brown',
  blush: 'text-holicraft-brown',
};

export default function CTABannerSection({ data }: CTABannerSectionProps) {
  const bgColor = backgroundColorMap[data.backgroundColor];
  const textColor = textColorMap[data.backgroundColor];

  return (
    <section className={`w-full py-16 ${bgColor} md:py-24`} aria-labelledby="cta-heading">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
          <div className="max-w-2xl">
            <h2 id="cta-heading" className={`text-3xl font-bold tracking-tight sm:text-4xl ${textColor}`}>
              {data.headline}
            </h2>
            <p className={`mt-4 text-lg ${textColor}/90`}>
              {data.subheadline}
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:ml-8">
            <Link
              href={data.ctaLink}
              className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                data.backgroundColor === 'cream' || data.backgroundColor === 'blush'
                  ? 'bg-holicraft-terracotta text-holicraft-cream hover:bg-holicraft-brown focus:ring-holicraft-terracotta'
                  : 'bg-holicraft-cream text-holicraft-brown hover:bg-holicraft-cream/90 focus:ring-holicraft-cream'
              }`}
            >
              {data.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 