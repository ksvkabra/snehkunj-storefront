export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanitySubSubcategory {
  _key: string;
  name: string;
  slug: SanitySlug;
}

export interface SanitySubcategory {
  _key: string;
  name: string;
  slug: SanitySlug;
  children: SanitySubSubcategory[] | null;
}

export interface SanityMenuCategory {
  _id: string;
  _type: 'menuCategory';
  name: string;
  slug: SanitySlug;
  order: number;
  children: SanitySubcategory[];
}

export interface SanityMenuCategoryResponse {
  categories: SanityMenuCategory[];
} 