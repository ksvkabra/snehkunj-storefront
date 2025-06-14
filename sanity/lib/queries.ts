import { SanityMenuCategory } from 'lib/types/sanity-menu-category';
import { sanityClient } from './client';

export async function getMenuCategories(): Promise<SanityMenuCategory[]> {
  return await sanityClient.fetch(`
    *[_type == "menuCategory"] | order(order asc) {
      _id,
      _type,
      name,
      slug,
      children,
      order
    }
  `);
}

export async function getMenuCategoryBySlug(slug: string): Promise<SanityMenuCategory | null> {
  return await sanityClient.fetch(
    `
    *[_type == "menuCategory" && slug.current == $slug][0] {
      _id,
      _type,
      name,
      slug,
      children,
      order
    }
  `,
    { slug }
  );
}
