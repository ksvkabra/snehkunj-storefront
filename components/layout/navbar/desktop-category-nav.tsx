import type { SanityMenuCategory } from 'lib/types/sanity-menu-category';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import MegaMenu from './mega-menu';

interface DesktopCategoryNavProps {
  categories: SanityMenuCategory[];
}

const DesktopCategoryNav = ({ categories }: DesktopCategoryNavProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getCategoryPath = (slug?: { current: string }) => {
    return slug?.current ? `/category/${slug.current}` : '#';
  };

  const handleMouseEnter = (idx: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenIndex(idx);
    setSelectedSubIndex(0); // default to first subcategory
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenIndex(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className='hidden md:block relative z-40 bg-white'
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }}
    >
      <nav className='flex justify-center border-t border-b'>
        <ul className='flex gap-6 text-sm px-6 py-2 mx-auto'>
          {categories.map((cat, idx) => (
            <li
              key={cat._id}
              className='relative'
              onMouseEnter={() => handleMouseEnter(idx)}
              onFocus={() => handleMouseEnter(idx)}
              tabIndex={0}
            >
              <Link
                href={getCategoryPath(cat.slug)}
                className='px-1 py-1 hover:border-b-2 hover:border-gray-900 transition-colors whitespace-nowrap'
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* MegaMenu should render inside this block to stay hovered */}
      <MegaMenu
        isOpen={openIndex !== null}
        categories={categories}
        activeIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onCategoryHover={handleMouseEnter}
      />
    </div>
  );
};

export default DesktopCategoryNav;
