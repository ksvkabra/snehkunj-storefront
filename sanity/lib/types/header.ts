import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface SanityHeaderLogo {
  text: string;
  image?: SanityImageObject;
  link?: string;
}

export interface SanityHeaderSearch {
  enabled: boolean;
  placeholder: string;
}

export interface SanityHeaderLanguageSelector {
  enabled: boolean;
  defaultLanguage: string;
  availableLanguages: string[];
}

export interface SanityHeaderUserAccount {
  enabled: boolean;
  showWishlist: boolean;
}

export interface SanityHeaderStyling {
  backgroundColor: string;
  textColor: string;
  hoverColor: string;
}

export interface SanityHeader {
  _id: string;
  _type: 'header';
  title: string;
  logo: SanityHeaderLogo;
  search: SanityHeaderSearch;
  languageSelector: SanityHeaderLanguageSelector;
  userAccount: SanityHeaderUserAccount;
  styling: SanityHeaderStyling;
  isActive: boolean;
} 