'use client';

import { motion } from 'framer-motion';
import type { SanityMenuCategory } from 'lib/types/sanity-menu-category';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface MegaMenuProps {
  isOpen: boolean;
  categories: SanityMenuCategory[];
  activeIndex: number | null;
  onClose: () => void;
  onCategoryHover: (idx: number) => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, categories, activeIndex, onClose, onCategoryHover }) => {
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [internalIndex, setInternalIndex] = useState<number | null>(null);

  useEffect(() => {
    setInternalIndex(activeIndex);
    setActiveSubIndex(0); // Reset subcategory when switching main category
  }, [activeIndex]);

  if (!isOpen || internalIndex === null || !categories[internalIndex]) return null;

  const category = categories[internalIndex];
  const subCategory = category.children?.[activeSubIndex];

  return (
    <motion.div
      className='absolute top-full left-0 w-screen z-50 bg-holicraft-white border-b border-holicraft-gray-medium shadow-lg'
      onMouseLeave={onClose}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className='max-w-[1440px] mx-auto px-16 py-8 min-h-[420px] flex gap-10'>
        {/* Left: Subcategory list */}
        <div className='w-1/4 pr-6 border-r border-holicraft-gray-light'>
          <ul className='space-y-1'>
            {category.children?.map((sub, subIdx) => (
              <li key={sub._key}>
                <Link
                  href={sub.slug?.current ? `/category/${sub.slug.current}` : '#'}
                  className={`w-full block text-left cursor-pointer px-4 py-2 text-sm rounded-md transition-colors font-dm-sans ${
                    activeSubIndex === subIdx 
                      ? 'bg-holicraft-golden text-white font-semibold' 
                      : 'hover:bg-holicraft-gray-light text-holicraft-black hover:text-holicraft-golden'
                  }`}
                  onMouseEnter={() => setActiveSubIndex(subIdx)}
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Center: Sub-subcategories grid (3-4 columns at 220-250px each) */}
        <div className='flex-1'>
          {subCategory?.children?.length && subCategory.children.length > 0 ? (
            <div className='grid grid-cols-3 gap-4'>
              {subCategory.children?.map((item) => (
                <div key={item._key} className='w-[220px]'>
                  <Link
                    href={item.slug?.current ? `/category/${item.slug.current}` : '#'}
                    className='block px-4 py-2 rounded hover:bg-holicraft-gray-light hover:text-holicraft-golden text-sm text-holicraft-black transition-colors cursor-pointer font-dm-sans'
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-holicraft-gray-dark text-sm px-4 py-2 font-dm-sans'>No subcategories available</div>
          )}
        </div>

        {/* Right: Global image block (500-540px) with CTA */}
        <div className='w-[520px] flex flex-col'>
          <div className='relative aspect-[4/3] mb-4 rounded-lg overflow-hidden'>
            <Image
              src='/placeholder-mega-menu.jpg' // Replace with actual image from Sanity
              alt={category.name}
              fill
              className='object-cover'
            />
          </div>
          <div className='text-center'>
            <h3 className='font-playfair font-semibold text-lg text-holicraft-black mb-2'>
              {category.name}
            </h3>
            <p className='text-sm text-holicraft-gray-dark mb-4 font-dm-sans'>
              Discover our curated collection of handcrafted {category.name.toLowerCase()}
            </p>
            <Link
              href={category.slug?.current ? `/category/${category.slug.current}` : '#'}
              className='btn-primary inline-block'
            >
              Shop {category.name}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
