import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';
console.log('🚀 ~ apiVersion, dataset, projectId:', apiVersion, dataset, projectId);

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
