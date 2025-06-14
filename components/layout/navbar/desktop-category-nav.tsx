import type { SanityMenuCategory } from 'lib/types/sanity-menu-category';
import Link from 'next/link';
import { useState } from 'react';

interface DesktopCategoryNavProps {
  categories: SanityMenuCategory[];
}

const DesktopCategoryNav = ({ categories }: DesktopCategoryNavProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const getCategoryPath = (slug?: { current: string }) => {
    return slug?.current ? `/category/${slug.current}` : '#';
  };

  return (
    <nav className='hidden md:flex justify-center relative z-40 bg-white border-t border-b'>
      <ul className='flex gap-6 text-sm px-6 py-2 mx-auto'>
        {categories.map((cat, idx) => (
          <li
            key={cat._id}
            className='relative'
            onMouseEnter={() => setOpenIndex(idx)}
            onMouseLeave={() => setOpenIndex(null)}
            onFocus={() => setOpenIndex(idx)}
            onBlur={() => setOpenIndex(null)}
            tabIndex={0}
          >
            <Link href={getCategoryPath(cat.slug)} className='px-1 py-1 hover:border-b-2 hover:border-gray-900 transition-colors whitespace-nowrap'>
              {cat.name}
            </Link>
            {/* Megamenu */}
            {openIndex === idx && (
              <div className='absolute left-1/2 top-full mt-2 -translate-x-1/2 w-72 bg-white shadow-xl rounded-lg p-4 border z-50'>
                <div className='font-semibold text-xs uppercase mb-2 text-gray-500'>{cat.name} Subcategories</div>
                <ul className='grid gap-2'>
                  {cat.children.map((child) => (
                    <li key={child._key} className="group relative">
                      {child.children && child.children.length > 0 ? (
                        <>
                          <div className="block px-2 py-1 rounded hover:bg-gray-100 text-gray-900 font-medium">
                            {child.name}
                          </div>
                          <div className="absolute left-full top-0 ml-2 w-48 bg-white shadow-xl rounded-lg p-4 border hidden group-hover:block">
                            <div className='font-semibold text-xs uppercase mb-2 text-gray-500'>{child.name}</div>
                            <ul className='grid gap-2'>
                              {child.children.map((subChild) => (
                                <li key={subChild._key}>
                                  <Link
                                    href={getCategoryPath(subChild.slug)}
                                    className='block px-2 py-1 rounded hover:bg-gray-100 text-gray-900'
                                  >
                                    {subChild.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <Link
                          href={getCategoryPath(child.slug)}
                          className='block px-2 py-1 rounded hover:bg-gray-100 text-gray-900'
                        >
                          {child.name}
                        </Link>
                      )}
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
