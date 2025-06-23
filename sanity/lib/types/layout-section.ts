
// Common styling fields
export interface SanitySectionStyling {
  backgroundColor?: string;
  paddingTop?: 'pt-0' | 'pt-4' | 'pt-8' | 'pt-12' | 'pt-16';
  paddingBottom?: 'pb-0' | 'pb-4' | 'pb-8' | 'pb-12' | 'pb-16';
  hideOnMobile?: boolean;
  customClassName?: string;
}

// Spacer Configuration
export interface SanitySpacerConfig {
  spacerHeight?: 'h-4' | 'h-8' | 'h-12' | 'h-16' | 'h-24' | 'h-32' | 'h-40' | 'h-48';
  spacerResponsive?: {
    mobile?: 'h-2' | 'h-4' | 'h-8' | 'h-12';
    tablet?: 'h-4' | 'h-8' | 'h-12' | 'h-16';
    desktop?: 'h-8' | 'h-12' | 'h-16' | 'h-24';
  };
}

// Divider Configuration
export interface SanityDividerConfig {
  dividerStyle?: 'solid' | 'dashed' | 'dotted' | 'double';
  dividerColor?: 'border-gray-200' | 'border-gray-300' | 'border-gray-100' | 'border-primary' | 'border-secondary';
  dividerWidth?: 'border-t' | 'border-t-2' | 'border-t-4';
  dividerAlignment?: 'full' | 'center' | 'left' | 'right';
  dividerText?: string;
}

// Container Configuration
export interface SanityContainerConfig {
  containerMaxWidth?: 'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl' | 'max-w-5xl' | 'max-w-6xl' | 'max-w-7xl' | 'max-w-full';
  containerPadding?: 'p-0' | 'p-4' | 'p-6' | 'p-8' | 'p-12';
  containerCentered?: boolean;
}

// Spacer Section
export interface SanitySpacerSection extends SanitySpacerConfig {
  _type: 'layoutSection';
  sectionType: 'spacer';
  sectionName?: string;
}

// Divider Section
export interface SanityDividerSection extends SanitySectionStyling, SanityDividerConfig {
  _type: 'layoutSection';
  sectionType: 'divider';
  sectionName?: string;
}

// Container Section
export interface SanityContainerSection extends SanitySectionStyling, SanityContainerConfig {
  _type: 'layoutSection';
  sectionType: 'container';
  sectionName?: string;
  containerContent?: any[]; // Can contain blocks, images, or other sections
}

// Union type for all layout sections
export type SanityLayoutSection = 
  | SanitySpacerSection
  | SanityDividerSection
  | SanityContainerSection; 