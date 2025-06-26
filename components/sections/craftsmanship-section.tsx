'use client';

import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';
import type { SanityCraftsmanshipSection } from '../../sanity/lib/types/content-section';

interface CraftsmanshipSectionProps {
  data: SanityCraftsmanshipSection;
}

export default function CraftsmanshipSection({ data }: CraftsmanshipSectionProps) {
  const {
    craftsmanshipTitle,
    craftsmanshipBody,
    craftsmanshipImage,
    craftsmanshipImagePosition = 'right',
    craftsmanshipCTA,
    headingStyle = 'h2',
    textAlign = 'left',
    textColor,
    backgroundColor = 'bg-white',
    paddingTop = 'pt-16',
    paddingBottom = 'pb-16',
    hideOnMobile = false,
    customClassName
  } = data;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8 }
    }
  };

  // Get heading class based on style
  const getHeadingClass = () => {
    switch (headingStyle) {
      case 'h1': return 'text-4xl md:text-5xl lg:text-6xl font-bold';
      case 'h2': return 'text-3xl md:text-4xl lg:text-5xl font-bold';
      case 'h3': return 'text-2xl md:text-3xl lg:text-4xl font-semibold';
      case 'display': return 'text-5xl md:text-6xl lg:text-7xl font-bold';
      case 'eyebrow': return 'text-lg md:text-xl font-medium uppercase tracking-wider';
      default: return 'text-3xl md:text-4xl lg:text-5xl font-bold';
    }
  };

  // Text content component
  const textContent = (
    <motion.div 
      className="flex flex-col justify-center space-y-6 lg:space-y-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2 
        className={`${getHeadingClass()} ${textColor || 'text-holicraft-brown'} ${
          textAlign === 'center' ? 'text-center' : ''
        }`}
        variants={itemVariants}
      >
        {craftsmanshipTitle}
      </motion.h2>
      
      {craftsmanshipBody && (
        <motion.div 
          className={`prose prose-lg max-w-none ${textColor || 'text-holicraft-gray-dark'} ${
            textAlign === 'center' ? 'text-center' : ''
          }`}
          variants={itemVariants}
        >
          <PortableText value={craftsmanshipBody} />
        </motion.div>
      )}
      
      {craftsmanshipCTA && (
        <motion.div 
          className={`flex ${textAlign === 'center' ? 'justify-center' : 'justify-start'}`}
          variants={itemVariants}
        >
          <Link 
            href={craftsmanshipCTA.link} 
            className="btn-primary group"
          >
            {craftsmanshipCTA.text}
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );

  // Image content component
  const imageContent = craftsmanshipImage && (
    <motion.div 
      className="relative aspect-[4/5] lg:aspect-square"
      variants={imageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <Image
        src={urlFor(craftsmanshipImage).url()}
        alt={craftsmanshipTitle || 'Craftsmanship'}
        fill
        className="object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        priority
      />
    </motion.div>
  );

  return (
    <section className={`${backgroundColor} ${paddingTop} ${paddingBottom} ${customClassName || ''} ${
      hideOnMobile ? 'hidden md:block' : ''
    }`}>
      <div className="container-holicraft">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
          craftsmanshipImagePosition === 'left' ? 'lg:grid-flow-col-dense' : ''
        }`}>
          {craftsmanshipImagePosition === 'left' ? (
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