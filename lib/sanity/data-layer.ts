import { unstable_cache } from 'next/cache';
import { optimizedImageUrl, sanityClient } from './client';

// Cache duration constants
const CACHE_REVALIDATE_SECONDS = 60 * 60; // 1 hour
const CACHE_TAG = 'sanity-data';

// Sanity Image Type
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

// Content Management Types
export interface SanityPage {
  _id: string;
  _type: 'page';
  title: string;
  slug: { current: string };
  content: any[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  _updatedAt: string;
}

export interface SanityBlogPost {
  _id: string;
  _type: 'blogPost';
  title: string;
  slug: { current: string };
  excerpt?: string;
  content: any[];
  featuredImage?: SanityImage;
  author?: {
    name: string;
    bio?: string;
    image?: SanityImage;
  };
  publishedAt: string;
  categories?: Array<{ title: string; slug: { current: string } }>;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  _updatedAt: string;
}

export interface SanityMarketingContent {
  _id: string;
  _type: 'marketingContent';
  title: string;
  slug: { current: string };
  contentType: 'hero' | 'banner' | 'featured' | 'promotion';
  content: any[];
  image?: SanityImage;
  cta?: {
    text: string;
    url: string;
  };
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  _updatedAt: string;
}

// Cached Content Management Queries
export const getPage = unstable_cache(
  async (slug: string): Promise<SanityPage | null> => {
    const query = `
      *[_type == "page" && slug.current == $slug][0] {
        _id,
        _type,
        title,
        slug,
        content,
        seo,
        _updatedAt
      }
    `;
    
    try {
      const page = await sanityClient.fetch(query, { slug });
      return page;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  },
  ['sanity-page'],
  {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [CACHE_TAG]
  }
);

export const getAllPages = unstable_cache(
  async (): Promise<SanityPage[]> => {
    const query = `
      *[_type == "page"] {
        _id,
        _type,
        title,
        slug,
        seo,
        _updatedAt
      } | order(_updatedAt desc)
    `;
    
    try {
      const pages = await sanityClient.fetch(query);
      return pages;
    } catch (error) {
      console.error('Error fetching pages:', error);
      return [];
    }
  },
  ['sanity-all-pages'],
  {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [CACHE_TAG]
  }
);

export const getBlogPost = unstable_cache(
  async (slug: string): Promise<SanityBlogPost | null> => {
    const query = `
      *[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        author,
        publishedAt,
        categories[]->{ title, slug },
        seo,
        _updatedAt
      }
    `;
    
    try {
      const post = await sanityClient.fetch(query, { slug });
      return post;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  },
  ['sanity-blog-post'],
  {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [CACHE_TAG]
  }
);

export const getAllBlogPosts = unstable_cache(
  async (limit: number = 10): Promise<SanityBlogPost[]> => {
    const query = `
      *[_type == "blogPost"] | order(publishedAt desc) [0...$limit] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        featuredImage,
        author,
        publishedAt,
        categories[]->{ title, slug },
        _updatedAt
      }
    `;
    
    try {
      const posts = await sanityClient.fetch(query, { limit });
      return posts;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },
  ['sanity-all-blog-posts'],
  {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [CACHE_TAG]
  }
);

export const getBlogPostsByCategory = unstable_cache(
  async (categorySlug: string, limit: number = 10): Promise<SanityBlogPost[]> => {
    const query = `
      *[_type == "blogPost" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) [0...$limit] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        featuredImage,
        author,
        publishedAt,
        categories[]->{ title, slug },
        _updatedAt
      }
    `;
    
    try {
      const posts = await sanityClient.fetch(query, { categorySlug, limit });
      return posts;
    } catch (error) {
      console.error('Error fetching blog posts by category:', error);
      return [];
    }
  },
  ['sanity-blog-posts-by-category'],
  {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [CACHE_TAG]
  }
);

export const getMarketingContent = unstable_cache(
  async (contentType?: string): Promise<SanityMarketingContent[]> => {
    const query = `
      *[_type == "marketingContent" && isActive == true ${contentType ? '&& contentType == $contentType' : ''}] | order(_updatedAt desc) {
        _id,
        _type,
        title,
        slug,
        contentType,
        content,
        image,
        cta,
        isActive,
        startDate,
        endDate,
        _updatedAt
      }
    `;
    
    try {
      const content = await sanityClient.fetch(query, contentType ? { contentType } : {});
      return content;
    } catch (error) {
      console.error('Error fetching marketing content:', error);
      return [];
    }
  },
  ['sanity-marketing-content'],
  {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [CACHE_TAG]
  }
);

// Utility functions for content management
export function getOptimizedImageUrl(image: SanityImage, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'avif';
} = {}) {
  return optimizedImageUrl(image, options);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
} 