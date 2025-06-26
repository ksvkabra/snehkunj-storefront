'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
  image?: {
    asset: any;
    alt?: string;
  };
  shippingBadge?: string;
  imagePosition?: 'left' | 'right';
}

export default function HeroSection({ title, subtitle, description, primaryCta, secondaryCta, image }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className='relative bg-holicraft-cream'>
      {/* Hero Background Image - Full Bleed */}
      {image && (
        <motion.div
          className='relative w-full h-[500px] md:h-[600px] lg:h-[80vh] xl:h-[85vh]'
          variants={imageVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          <Image src={urlFor(image.asset).url()} alt={image.alt || title} fill className='object-cover' priority />

          {/* Dark overlay for text readability */}
          <div className='absolute inset-0 bg-black/20'></div>
        </motion.div>
      )}

      {/* Text Content - Centered Overlay */}
      <motion.div
        className='absolute inset-0 flex items-center justify-center z-10'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className='text-center max-w-4xl mx-auto px-6 lg:px-8 space-y-6 lg:space-y-8'>
          {/* Subtitle/Tagline */}
          {subtitle && (
            <motion.p className='text-sm lg:text-base font-medium text-white uppercase tracking-wider' variants={itemVariants}>
              {subtitle}
            </motion.p>
          )}

          {/* Main Title */}
          <motion.h1
            className='text-3xl lg:text-4xl xl:text-5xl font-playfair font-semibold text-white leading-tight'
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p className='text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed' variants={itemVariants}>
              {description}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div className='flex flex-col sm:flex-row gap-4 justify-center' variants={itemVariants}>
            {primaryCta && (
              <Link href={primaryCta.link} className='btn-primary text-center hover:scale-105 transition-transform duration-200'>
                {primaryCta.text}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.link}
                className='btn-secondary text-center hover:scale-105 transition-transform duration-200'
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'white',
                  color: 'white',
                }}
              >
                {secondaryCta.text}
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Fallback for when no image is provided */}
      {!image && (
        <div className='h-[500px] md:h-[600px] lg:h-[80vh] xl:h-[85vh] flex items-center justify-center'>
          <motion.div
            className='text-center max-w-4xl mx-auto px-6 lg:px-8 space-y-6 lg:space-y-8'
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
          >
            {subtitle && (
              <motion.p
                className='text-sm lg:text-base font-medium text-holicraft-terracotta uppercase tracking-wider'
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>
            )}

            <motion.h1
              className='text-3xl lg:text-4xl xl:text-5xl font-playfair font-semibold text-holicraft-black leading-tight'
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p className='text-base lg:text-lg text-holicraft-gray-dark max-w-2xl mx-auto leading-relaxed' variants={itemVariants}>
                {description}
              </motion.p>
            )}

            <motion.div className='flex flex-col sm:flex-row gap-4 justify-center' variants={itemVariants}>
              {primaryCta && (
                <Link href={primaryCta.link} className='btn-primary text-center hover:scale-105 transition-transform duration-200'>
                  {primaryCta.text}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.link} className='btn-secondary text-center hover:scale-105 transition-transform duration-200'>
                  {secondaryCta.text}
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
