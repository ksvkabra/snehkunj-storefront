import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Header Title',
      type: 'string',
      description: 'Internal title for this header configuration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Logo Text',
          type: 'string',
          description: 'Text logo (e.g., "HOLICRAFT")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Logo Image',
          type: 'image',
          description: 'Optional logo image (if not using text)',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'link',
          title: 'Logo Link',
          type: 'url',
          description: 'Where the logo should link to (defaults to homepage)',
          initialValue: '/',
        }),
      ],
    }),
    defineField({
      name: 'search',
      title: 'Search Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Search',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'placeholder',
          title: 'Search Placeholder',
          type: 'string',
          initialValue: 'Search brands, products, or categories',
        }),
      ],
    }),
    defineField({
      name: 'languageSelector',
      title: 'Language Selector',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Language Selector',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'defaultLanguage',
          title: 'Default Language',
          type: 'string',
          initialValue: 'EN-US',
        }),
        defineField({
          name: 'availableLanguages',
          title: 'Available Languages',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['EN-US', 'FR-FR', 'DE-DE'],
        }),
      ],
    }),
    defineField({
      name: 'userAccount',
      title: 'User Account',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable User Account',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showWishlist',
          title: 'Show Wishlist Icon',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'styling',
      title: 'Header Styling',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'White', value: '#FFFFFF' },
              { title: 'Cream', value: '#F8F0E6' },
              { title: 'Light Gray', value: '#F5F5F5' },
            ],
          },
          initialValue: '#FFFFFF',
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Dark Gray', value: '#333333' },
            ],
          },
          initialValue: '#000000',
        }),
        defineField({
          name: 'hoverColor',
          title: 'Hover Color',
          type: 'string',
          options: {
            list: [
              { title: 'Golden', value: '#D29922' },
              { title: 'Terracotta', value: '#A04A2A' },
            ],
          },
          initialValue: '#D29922',
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active Configuration',
      type: 'boolean',
      description: 'Only one header configuration should be active at a time',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      logoText: 'logo.text',
      isActive: 'isActive',
    },
    prepare({ title, logoText, isActive }) {
      return {
        title: title || 'Header Configuration',
        subtitle: `${logoText || 'No logo'} ${isActive ? '(Active)' : '(Inactive)'}`,
      };
    },
  },
}); 