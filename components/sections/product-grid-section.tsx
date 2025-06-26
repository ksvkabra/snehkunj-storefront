'use client';

import { motion, useInView } from 'framer-motion';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';
import { useRef } from 'react';
import ProductCard from '../grid/product-card';
import Section from '../section';

interface ProductGridSectionProps {
  data: {
    sectionTitle?: string;
    description?: string;
    backgroundColor?: string;
    textColor?: string;
    paddingTop?: string;
    paddingBottom?: string;
    textAlign?: 'left' | 'center' | 'right';
    cta?: {
      text: string;
      link: string;
      style?: 'primary' | 'secondary' | 'outline';
    };
  };
  featuredProducts: Product[];
}

export default function ProductGridSection({ data, featuredProducts }: ProductGridSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Show empty state
  if (!featuredProducts?.length) {
    return null;
  }

  return (
    <div ref={ref}>
      <Section 
        className={`${data.backgroundColor || 'bg-transparent'} ${data.paddingTop || 'pt-16'} ${data.paddingBottom || 'pb-16'}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          {/* Section Header */}
          <div className={`flex items-center justify-between mb-12 ${data.textAlign === 'center' ? 'flex-col space-y-4' : ''}`}>
            <div className={`${data.textAlign === 'center' ? 'text-center' : ''}`}>
              <h2 
                className={`font-playfair text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${
                  data.textColor || 'text-holicraft-brown'
                } ${data.textAlign === 'center' ? 'text-center' : ''}`}
              >
                {data.sectionTitle || 'Featured Products'}
              </h2>
              {data.description && (
                <p className={`mt-4 text-base font-dm-sans text-gray-600 max-w-2xl ${
                  data.textAlign === 'center' ? 'mx-auto' : ''
                }`}>
                  {data.description}
                </p>
              )}
            </div>
            
            {data.cta && (
              <Link 
                href={data.cta.link} 
                className={`inline-flex items-center px-6 py-3 text-sm font-semibold transition-colors rounded-full ${
                  data.cta.style === 'primary' 
                    ? 'bg-holicraft-mustard text-holicraft-brown hover:bg-holicraft-hover' 
                    : data.cta.style === 'secondary'
                    ? 'bg-holicraft-brown text-white hover:bg-holicraft-dark'
                    : 'border-2 border-holicraft-mustard text-holicraft-brown hover:bg-holicraft-mustard hover:text-white'
                }`}
              >
                {data.cta.text}
              </Link>
            )}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard 
                  title={product.title}
                  imageSrc={product.featuredImage?.url || '/placeholder-product.jpg'}
                  imageAlt={product.featuredImage?.altText || product.title}
                  price={product.priceRange?.minVariantPrice?.amount 
                    ? `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`
                    : 'Price not available'
                  }
                  href={`/product/${product.handle}`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>
    </div>
  );
} 