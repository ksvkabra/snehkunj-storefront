import { urlFor } from '@sanity/lib/image';
import { SanityTrustBadgesSection } from '@sanity/lib/types/trust-badges-section';
import Image from 'next/image';

interface TrustBadgesSectionProps {
  data: SanityTrustBadgesSection;
}

export default function TrustBadgesSection({ data }: TrustBadgesSectionProps) {
  return (
    <section className='w-full py-16 bg-holicraft-cream md:py-24' aria-labelledby='trust-badges-heading'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <h2 id='trust-badges-heading' className='mb-12 text-3xl font-bold tracking-tight text-center text-holicraft-brown sm:text-4xl'>
          {data.title}
        </h2>

        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {data.badges?.map((badge, index) => (
            <div key={index} className='flex flex-col items-center text-center'>
              <div className='relative w-16 h-16 mb-4'>
                <Image src={urlFor(badge.icon).url()} alt={badge.label} fill className='object-contain' />
              </div>
              <p className='text-lg font-medium text-holicraft-brown'>{badge.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
