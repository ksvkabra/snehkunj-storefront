'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';
import type { SanitySocialProofSection } from '../../sanity/lib/types/image-section';

interface SocialProofSectionProps {
  data: SanitySocialProofSection;
}

export default function SocialProofSection({ data }: SocialProofSectionProps) {
  const {
    socialProofTitle,
    socialProofImages,
    socialProofLayout = 'grid',
    textAlign = 'center',
    textColor,
    backgroundColor,
    paddingTop = 'pt-8',
    paddingBottom = 'pb-8',
    hideOnMobile,
    customClassName
  } = data;

  // Determine grid columns based on layout and screen size
  const getGridColumns = () => {
    switch (socialProofLayout) {
      case 'grid':
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 'list':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 'carousel':
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      default:
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: 'easeInOut' as const }
    }
  };

  if (!socialProofImages || socialProofImages.length === 0) {
    return null;
  }

  return (
    <section
      className={`
        ${paddingTop} ${paddingBottom}
        ${backgroundColor || ''}
        ${hideOnMobile ? 'hidden md:block' : ''}
        ${customClassName || ''}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        {socialProofTitle && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`mb-8 ${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left'}`}
          >
            <h2 
              className={`text-2xl md:text-3xl font-playfair font-bold mb-4 ${textColor || 'text-gray-900'}`}
            >
              {socialProofTitle}
            </h2>
          </motion.div>
        )}

        {/* Images Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`
            grid gap-4 md:gap-6 lg:gap-8
            ${getGridColumns()}
            ${socialProofLayout === 'carousel' ? 'overflow-x-auto scrollbar-hide' : ''}
          `}
        >
          {socialProofImages.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <motion.div
                variants={imageVariants}
                whileHover="hover"
                className="relative aspect-square overflow-hidden rounded-xl bg-gray-100"
              >
                {item.image && (
                  <Image
                    src={urlFor(item.image).width(400).height(400).fit('crop').url()}
                    alt={item.alt || item.title || 'Social proof image'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}
                
                {/* Overlay with title/description on hover */}
                {(item.title || item.description) && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.title && (
                        <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                      )}
                      {item.description && (
                        <p className="text-xs text-gray-200 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Link wrapper if provided */}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`View ${item.title || 'social proof'}`}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 