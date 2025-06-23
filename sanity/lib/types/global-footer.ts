import type { SanityImageObject } from '@sanity/image-url/lib/types/types';

// Footer Link Item
export interface SanityFooterLinkItem {
  text: string;
  link: string;
  external?: boolean;
}

// Footer Column
export interface SanityFooterColumn {
  title: string;
  links: SanityFooterLinkItem[];
}

// Social Media Link
export interface SanitySocialMediaLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'pinterest' | 'tiktok' | 'linkedin';
  url: string;
  icon?: string;
}

// Newsletter Configuration
export interface SanityNewsletterConfig {
  newsletterTitle?: string;
  newsletterDescription?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  showNewsletter?: boolean;
}

// Payment Methods
export interface SanityPaymentMethod {
  method: 'visa' | 'mastercard' | 'amex' | 'paypal' | 'apple-pay' | 'google-pay' | 'shop-pay';
  enabled: boolean;
}

// Footer Configuration
export interface SanityFooterConfig {
  footerStyle?: 'simple' | 'detailed' | 'minimal';
  showLogo?: boolean;
  showSocialMedia?: boolean;
  showPaymentMethods?: boolean;
  showNewsletter?: boolean;
  columns?: 1 | 2 | 3 | 4;
}

// Global Footer
export interface SanityGlobalFooter {
  _id: string;
  _type: 'globalFooter';
  title: string;
  logo?: SanityImageObject;
  tagline?: string;
  columns: SanityFooterColumn[];
  socialMedia?: SanitySocialMediaLink[];
  paymentMethods?: SanityPaymentMethod[];
  copyrightText?: string;
  legalLinks?: SanityFooterLinkItem[];
  newsletter?: SanityNewsletterConfig;
  footerConfig?: SanityFooterConfig;
} 