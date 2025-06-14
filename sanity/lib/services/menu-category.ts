import type { SanityMenuCategory } from '../../../lib/types/sanity-menu-category';
import { sanityClient } from '../client';
import { debugAllDocumentsQuery, menuCategoriesQuery } from '../queries/menu-category';

export async function debugAllDocuments() {
  try {
    const allDocs = await sanityClient.fetch(debugAllDocumentsQuery);
    console.log('All documents in dataset:', allDocs);
    return allDocs;
  } catch (error) {
    console.error('Error fetching all documents:', error);
    throw error;
  }
}

export async function getMenuCategories(): Promise<SanityMenuCategory[]> {
  try {
    console.log('Fetching menu categories with query:', menuCategoriesQuery);
    const categories = await sanityClient.fetch<SanityMenuCategory[]>(menuCategoriesQuery);
    console.log('Raw categories response:', categories);
    
    if (!Array.isArray(categories)) {
      console.error('Expected array of categories but got:', typeof categories);
      return [];
    }
    
    return categories;
  } catch (error) {
    console.error('Error fetching menu categories:', error);
    throw error;
  }
}
