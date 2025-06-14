import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface SanityTrustBadge {
  _type: 'object';
  label: string;
  icon: SanityImageObject;
}

export interface SanityTrustBadgesSection {
  _id: string;
  _type: 'trustBadgesSection';
  title: string;
  badges: SanityTrustBadge[];
}
