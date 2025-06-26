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

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  image,
  shippingBadge = "Free Shipping Worldwide",
  imagePosition = 'right'
}: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const textContent = (
    <motion.div 
      className="flex flex-col justify-center space-y-6 lg:space-y-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {subtitle && (
        <motion.p 
          className="body-md text-holicraft-terracotta font-semibold uppercase tracking-wider"
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.h1 
        className="heading-xl"
        variants={itemVariants}
      >
        {title}
      </motion.h1>
      
      {description && (
        <motion.p 
          className="body-lg text-holicraft-gray-dark max-w-lg"
          variants={itemVariants}
        >
          {description}
        </motion.p>
      )}
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        variants={itemVariants}
      >
        {primaryCta && (
          <Link href={primaryCta.link} className="btn-primary">
            {primaryCta.text}
          </Link>
        )}
        {secondaryCta && (
          <Link href={secondaryCta.link} className="btn-secondary">
            {secondaryCta.text}
          </Link>
        )}
      </motion.div>
      
      {shippingBadge && (
        <motion.div 
          className="flex items-center gap-2 pt-4"
          variants={itemVariants}
        >
          <div className="w-2 h-2 bg-holicraft-terracotta rounded-full"></div>
          <span className="body-sm text-holicraft-gray-dark">{shippingBadge}</span>
        </motion.div>
      )}
    </motion.div>
  );

  const imageContent = image && image.asset && (
    <motion.div 
      className="relative aspect-[4/5] lg:aspect-square"
      variants={imageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <Image
        src={urlFor(image.asset).url()}
        alt={image.alt || title}
        fill
        className="image-cover hover-scale rounded-2xl"
        priority
      />
    </motion.div>
  );

  return (
    <section className="section-padding bg-holicraft-cream">
      <div className="container-holicraft">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
          imagePosition === 'left' ? 'lg:grid-flow-col-dense' : ''
        }`}>
          {imagePosition === 'left' ? (
            <>
              {imageContent}
              {textContent}
            </>
          ) : (
            <>
              {textContent}
              {imageContent}
            </>
          )}
        </div>
      </div>
    </section>
  );
} 