import { MenuCategory } from 'lib/types/menu-category';

export const menuCategories: MenuCategory[] = [
  {
    name: 'Home Decor',
    children: ['Vases', 'Wall Art', 'Candles'],
  },
  {
    name: 'Jewelry',
    children: ['Necklaces', 'Earrings', 'Bracelets'],
  },
  {
    name: 'Beauty',
    children: ['Skincare', 'Makeup', 'Fragrance'],
  },
  {
    name: 'Gifts',
    children: ['For Her', 'For Him', 'For Kids'],
  },
];
