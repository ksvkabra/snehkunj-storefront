export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type SocialLink = {
  name: string;
  url: string;
};

export type SanityFooter = {
  navigation: FooterSection[];
  social: SocialLink[];
  bottomText: string;
}; 