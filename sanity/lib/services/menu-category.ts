import { sanityClient } from '../client';
import { debugAllDocumentsQuery, menuCategoriesQuery } from '../queries/menu-category';
import type { SanityMenuCategory } from '../types/menu-category';

export async function debugAllDocuments() {
  try {
    const allDocs = await sanityClient.fetch(debugAllDocumentsQuery);
    return allDocs;
  } catch (error) {
    console.error('Error fetching all documents:', error);
    throw error;
  }
}

export async function getMenuCategories(): Promise<SanityMenuCategory[]> {
  try {
    const categories = await sanityClient.fetch<SanityMenuCategory[]>(menuCategoriesQuery);
    
    if (!Array.isArray(categories)) {
      console.error('Expected array of categories but got:', categories);
      return [];
    }
    
    return categories;
  } catch (error) {
    console.error('Error fetching menu categories:', error);
    throw error;
  }
}
