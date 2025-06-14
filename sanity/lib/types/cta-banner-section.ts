export type BackgroundColor = 'terracotta' | 'mustard' | 'cream' | 'blush';

export interface SanityCTABannerSection {
  _id: string;
  _type: 'ctaBannerSection';
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaLink: string;
  backgroundColor: BackgroundColor;
} 