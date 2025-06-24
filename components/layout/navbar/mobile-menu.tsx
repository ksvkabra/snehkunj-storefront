'use client';

import { Dialog, Transition } from '@headlessui/react';
import type { SanityMenuCategory, SanitySubcategory } from 'lib/types/sanity-menu-category';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  menu: SanityMenuCategory[];
}

export default function MobileMenu({ open, setOpen, menu }: MobileMenuProps) {
  const closeMenu = () => setOpen(false);
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  const [activeCategory, setActiveCategory] = useState<SanityMenuCategory | null>(null);
  const [activeSub, setActiveSub] = useState<SanitySubcategory | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMenu();
    }
    if (open) {
      window.addEventListener('keydown', onKeyDown);
    } else {
      window.removeEventListener('keydown', onKeyDown);
      setActiveCategory(null);
      setActiveSub(null);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const getCategoryPath = (slug?: { current: string }) => {
    return slug?.current ? `/category/${slug.current}` : '#';
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50"
        onClose={closeMenu}
        initialFocus={initialFocusRef}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="-translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="-translate-x-full opacity-0"
        >
          <Dialog.Panel className="fixed left-0 top-0 h-full min-w-[350px] max-w-[600px] w-[70vw] bg-holicraft-white shadow-xl flex flex-col focus:outline-none transform will-change-transform">
            <div className="flex items-center justify-between p-5 border-b border-holicraft-gray-medium">
              <Link href="/" className="text-xl font-playfair font-semibold tracking-wide text-holicraft-black">
                HOLICRAFT
              </Link>
              <button
                ref={initialFocusRef}
                onClick={closeMenu}
                aria-label="Close menu"
                className="rounded-md p-2 hover:bg-holicraft-gray-light focus:outline-none focus-visible:ring-2 focus-visible:ring-holicraft-golden"
              >
                <X className="icon-24 text-holicraft-black" />
              </button>
            </div>
            <Link href="/login" className="block px-6 py-4 text-base font-dm-sans font-semibold text-holicraft-black hover:bg-holicraft-gray-light border-b border-holicraft-gray-light">
              Sign In
            </Link>
            <div className="flex-1 overflow-y-auto">
              {!activeCategory ? (
                <nav>
                  <div className="px-6 pt-6 pb-2 text-xs font-dm-sans font-bold uppercase tracking-wider text-holicraft-gray-dark">Categories</div>
                  <ul className="flex flex-col gap-1 px-2 pb-4">
                    {menu?.map((cat) => (
                      <li key={cat._id}>
                        <button
                          className="w-full flex justify-between items-center rounded-lg px-4 py-3 text-base font-dm-sans font-medium text-holicraft-black hover:bg-holicraft-gray-light transition-all"
                          onClick={() => setActiveCategory(cat)}
                        >
                          <span>{cat.name}</span>
                          <ChevronRight className="icon-24 text-holicraft-gray-dark" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : !activeSub ? (
                <nav>
                  <button
                    className="flex items-center gap-2 px-6 py-4 text-base font-dm-sans font-semibold text-holicraft-black hover:bg-holicraft-gray-light w-full border-b border-holicraft-gray-light"
                    onClick={() => setActiveCategory(null)}
                  >
                    <ChevronLeft className="icon-24" />
                    Back to Categories
                  </button>
                  <div className="px-6 pt-6 pb-2 text-xs font-dm-sans font-bold uppercase tracking-wider text-holicraft-gray-dark">{activeCategory.name}</div>
                  <ul className="flex flex-col gap-1 px-2 pb-4">
                    {activeCategory.children?.map((child) => (
                      <li key={child._key}>
                        {child.children && child.children.length > 0 ? (
                          <button
                            className="w-full flex justify-between items-center rounded-lg px-4 py-3 text-base font-dm-sans font-medium text-holicraft-black hover:bg-holicraft-gray-light transition-all"
                            onClick={() => setActiveSub(child)}
                          >
                            <span>{child.name}</span>
                            <ChevronRight className="icon-24 text-holicraft-gray-dark" />
                          </button>
                        ) : (
                          <Link
                            href={getCategoryPath(child.slug)}
                            className="block rounded-lg px-4 py-3 text-base font-dm-sans font-medium text-holicraft-black hover:bg-holicraft-gray-light transition-all"
                          >
                            {child.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : (
                <nav>
                  <button
                    className="flex items-center gap-2 px-6 py-4 text-base font-dm-sans font-semibold text-holicraft-black hover:bg-holicraft-gray-light w-full border-b border-holicraft-gray-light"
                    onClick={() => setActiveSub(null)}
                  >
                    <ChevronLeft className="icon-24" />
                    Back to {activeCategory.name}
                  </button>
                  <div className="px-6 pt-6 pb-2 text-xs font-dm-sans font-bold uppercase tracking-wider text-holicraft-gray-dark">{activeSub.name}</div>
                  <ul className="flex flex-col gap-1 px-2 pb-4">
                    {activeSub.children?.map((subChild) => (
                      <li key={subChild._key}>
                        <Link
                          href={getCategoryPath(subChild.slug)}
                          className="block rounded-lg px-4 py-3 text-base font-dm-sans font-medium text-holicraft-black hover:bg-holicraft-gray-light transition-all"
                        >
                          {subChild.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
