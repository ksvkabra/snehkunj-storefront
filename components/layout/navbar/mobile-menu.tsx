'use client';

import { Dialog, Transition } from '@headlessui/react';
import type { MenuCategory } from 'lib/types/menu-category';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  menu: MenuCategory[];
}

export default function MobileMenu({ open, setOpen, menu }: MobileMenuProps) {
  const closeMenu = () => setOpen(false);
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);

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

  // Find active subcategory children if needed (for sub-submenu)
  // For now, assume only two levels: category -> children (string[])

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50"
        onClose={closeMenu}
        initialFocus={initialFocusRef}
      >
        {/* Overlay with fade transition */}
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
        {/* Sidebar panel with slide-in transition */}
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="-translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="-translate-x-full opacity-0"
        >
          <Dialog.Panel className="fixed left-0 top-0 h-full min-w-[350px] max-w-[600px] w-[70vw] bg-white shadow-xl flex flex-col focus:outline-none transform will-change-transform">
            {/* Top Row: Logo, Close */}
            <div className="flex items-center justify-between p-5 border-b">
              <Link href="/" className="text-xl font-bold tracking-wide text-gray-900">
                FAIRE
              </Link>
              <button
                ref={initialFocusRef}
                onClick={closeMenu}
                aria-label="Close menu"
                className="rounded-md p-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {/* Sign In */}
            <Link href="/login" className="block px-6 py-4 text-base font-semibold text-gray-900 hover:bg-gray-50 border-b">
              Sign In
            </Link>
            {/* Main Menu or Submenu */}
            <div className="flex-1 overflow-y-auto">
              {/* Main menu: categories */}
              {!activeCategory ? (
                <nav>
                  <div className="px-6 pt-6 pb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Categories</div>
                  <ul className="flex flex-col gap-1 px-2 pb-4">
                    {menu.map((cat) => (
                      <li key={cat.name}>
                        <button
                          className="w-full flex justify-between items-center rounded-lg px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 transition-all"
                          onClick={() => setActiveCategory(cat)}
                        >
                          <span>{cat.name}</span>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : (
                <nav>
                  <button
                    className="flex items-center gap-2 px-6 py-4 text-base font-semibold text-gray-900 hover:bg-gray-50 w-full border-b"
                    onClick={() => setActiveCategory(null)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                    Back to Categories
                  </button>
                  <div className="px-6 pt-6 pb-2 text-xs font-bold uppercase tracking-wider text-gray-500">{activeCategory.name}</div>
                  <ul className="flex flex-col gap-1 px-2 pb-4">
                    {activeCategory.children.map((child) => (
                      <li key={child}>
                        <Link
                          href={`#${child.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block rounded-lg px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 transition-all"
                        >
                          {child}
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
