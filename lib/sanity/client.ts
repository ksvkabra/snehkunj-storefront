import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../../sanity/env';

// Create a cached client for better performance
const clientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Enable CDN for better performance
  perspective: 'published' as const, // Only fetch published content
  stega: false, // Disable stega for production
  // Enable request deduplication
  requestId: undefined,
  // Enable response caching
  cache: 'force-cache',
};

export const sanityClient = createClient(clientConfig);

// Create a preview client for draft content
export const previewClient = createClient({
  ...clientConfig,
  useCdn: false, // Disable CDN for preview to get latest content
  perspective: 'previewDrafts' as const,
});

// Create a write client for mutations
export const writeClient = createClient({
  ...clientConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder with optimizations
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Optimized image URL builder with e-commerce specific settings
export function optimizedImageUrl(source: any, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg';
  fit?: 'crop' | 'clip' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
} = {}) {
  const {
    width = 800,
    height,
    quality = 80,
    format = 'webp',
    fit = 'crop'
  } = options;

  let imageBuilder = builder
    .image(source)
    .width(width)
    .quality(quality)
    .format(format as any)
    .fit(fit)
    .auto('format');

  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  return imageBuilder.url();
}

// Cache key generator for better caching
export function generateCacheKey(query: string, params?: Record<string, any>): string {
  const paramsString = params ? JSON.stringify(params) : '';
  return `sanity:${query}:${paramsString}`;
}

// Revalidation helper
export async function revalidateSanityData(paths: string[] = ['/']) {
  const { revalidatePath } = await import('next/cache');
  paths.forEach(path => revalidatePath(path));
} 