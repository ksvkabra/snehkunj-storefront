'use client';

import type { SanityMenuCategory } from 'lib/types/sanity-menu-category';
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
    <div
      className='absolute top-full left-0 w-screen z-50 bg-white border-b shadow-lg transition-all duration-200 ease-in-out'
      onMouseLeave={onClose}
    >
      <div className='max-w-[600px] mx-auto px-6 py-8 min-h-[420px] flex gap-10'>
        {/* Left: Subcategory list */}
        <div className='w-1/3 pr-6 border-r border-gray-100'>
          <ul className='space-y-1'>
            {category.children?.map((sub, subIdx) => (
              <li key={sub._key}>
                <Link
                  href={sub.slug?.current ? `/category/${sub.slug.current}` : '#'}
                  className={`w-full block text-left cursor-pointer px-4 py-2 text-sm rounded-md transition-colors ${
                    activeSubIndex === subIdx ? 'bg-gray-100 font-semibold text-gray-900' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  onMouseEnter={() => setActiveSubIndex(subIdx)}
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Sub-subcategories grid */}
        <div className='flex-1'>
          {subCategory?.children?.length && subCategory.children.length > 0 ? (
            <ul className='grid gap-3'>
              {subCategory.children.map((item) => (
                <li key={item._key}>
                  <Link
                    href={item.slug?.current ? `/category/${item.slug.current}` : '#'}
                    className='block px-4 py-2 rounded hover:bg-gray-100 hover:text-holicraft-terracotta text-sm text-gray-800 transition-colors cursor-pointer'
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className='text-gray-400 text-sm px-4 py-2'>No subcategories available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
