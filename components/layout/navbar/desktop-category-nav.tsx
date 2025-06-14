import { MenuCategory } from 'lib/types/menu-category';
import Link from 'next/link';
import { useState } from 'react';

interface DesktopCategoryNavProps {
  categories: MenuCategory[];
}

const DesktopCategoryNav = ({ categories }: DesktopCategoryNavProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <nav className='hidden md:flex justify-center relative z-40 bg-white border-t border-b'>
      <ul className='flex gap-6 text-sm px-6 py-2 mx-auto'>
        {categories.map((cat, idx) => (
          <li
            key={cat.name}
            className='relative'
            onMouseEnter={() => setOpenIndex(idx)}
            onMouseLeave={() => setOpenIndex(null)}
            onFocus={() => setOpenIndex(idx)}
            onBlur={() => setOpenIndex(null)}
            tabIndex={0}
          >
            <Link href='#' className='px-1 py-1 hover:border-b-2 hover:border-gray-900 transition-colors whitespace-nowrap'>
              {cat.name}
            </Link>
            {/* Megamenu */}
            {openIndex === idx && (
              <div className='absolute left-1/2 top-full mt-2 -translate-x-1/2 w-72 bg-white shadow-xl rounded-lg p-4 border z-50'>
                <div className='font-semibold text-xs uppercase mb-2 text-gray-500'>{cat.name} Subcategories</div>
                <ul className='grid gap-2'>
                  {cat.children.map((child) => (
                    <li key={child}>
                      <Link href='#' className='block px-2 py-1 rounded hover:bg-gray-100 text-gray-900'>
                        {child}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopCategoryNav;
