import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'categorySection',
  title: 'Category Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Featured Categories Grid', value: 'featured-grid' },
          { title: 'Category Navigation', value: 'navigation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionName',
      title: 'Section Name (for reference)',
      type: 'string',
      description: 'Optional name to identify this section in the studio',
    }),

    // Common Category Section Fields
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    // Category Selection
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Category Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Category Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Category Link',
              type: 'string',
              description: 'URL or path to category page',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Category Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'productCount',
              title: 'Product Count',
              type: 'number',
              description: 'Number of products in this category (optional)',
            },
            {
              name: 'featured',
              title: 'Featured Category',
              type: 'boolean',
              description: 'Highlight this category',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              media: 'image',
              title: 'label',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),

    // Featured Grid Specific Fields
    defineField({
      name: 'gridColumns',
      title: 'Number of Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
          { title: '6 Columns', value: 6 },
        ],
      },
      initialValue: 3,
      hidden: ({ parent }) => parent?.sectionType !== 'featured-grid',
    }),
    defineField({
      name: 'gridGap',
      title: 'Grid Gap',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'gap-2' },
          { title: 'Medium', value: 'gap-4' },
          { title: 'Large', value: 'gap-6' },
          { title: 'Extra Large', value: 'gap-8' },
        ],
      },
      initialValue: 'gap-4',
      hidden: ({ parent }) => parent?.sectionType !== 'featured-grid',
    }),
    defineField({
      name: 'showCategoryCounts',
      title: 'Show Product Counts',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.sectionType !== 'featured-grid',
    }),
    defineField({
      name: 'showCategoryDescriptions',
      title: 'Show Category Descriptions',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.sectionType !== 'featured-grid',
    }),
    defineField({
      name: 'imageAspectRatio',
      title: 'Image Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Square (1:1)', value: 'square' },
          { title: 'Landscape (16:9)', value: 'landscape' },
          { title: 'Portrait (3:4)', value: 'portrait' },
        ],
      },
      initialValue: 'square',
      hidden: ({ parent }) => parent?.sectionType !== 'featured-grid',
    }),

    // Navigation Specific Fields
    defineField({
      name: 'navigationStyle',
      title: 'Navigation Style',
      type: 'string',
      options: {
        list: [
          { title: 'Horizontal List', value: 'horizontal' },
          { title: 'Vertical List', value: 'vertical' },
          { title: 'Grid', value: 'grid' },
        ],
      },
      initialValue: 'horizontal',
      hidden: ({ parent }) => parent?.sectionType !== 'navigation',
    }),
    defineField({
      name: 'showImages',
      title: 'Show Category Images',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.sectionType !== 'navigation',
    }),
    defineField({
      name: 'showCounts',
      title: 'Show Product Counts',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.sectionType !== 'navigation',
    }),

    // Call to Action
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
        { 
          name: 'style', 
          title: 'Button Style', 
          type: 'string',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Outline', value: 'outline' },
            ],
          },
          initialValue: 'primary',
        },
      ],
    }),

    // Styling Fields
    defineField({
      name: 'headingStyle',
      title: 'Heading Style',
      type: 'string',
      options: {
        list: [
          { title: 'H1', value: 'h1' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'Display', value: 'display' },
          { title: 'Eyebrow', value: 'eyebrow' },
        ],
      },
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Tailwind color class (e.g., text-gray-900)',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Tailwind color class (e.g., bg-white)',
    }),
    defineField({
      name: 'paddingTop',
      title: 'Padding Top',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'pt-0' },
          { title: 'Small', value: 'pt-4' },
          { title: 'Medium', value: 'pt-8' },
          { title: 'Large', value: 'pt-12' },
          { title: 'Extra Large', value: 'pt-16' },
        ],
      },
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Padding Bottom',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'pb-0' },
          { title: 'Small', value: 'pb-4' },
          { title: 'Medium', value: 'pb-8' },
          { title: 'Large', value: 'pb-12' },
          { title: 'Extra Large', value: 'pb-16' },
        ],
      },
    }),
    defineField({
      name: 'hideOnMobile',
      title: 'Hide on Mobile',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'customClassName',
      title: 'Custom CSS Classes',
      type: 'string',
      description: 'Additional Tailwind classes for custom styling',
    }),
  ],
  preview: {
    select: {
      sectionType: 'sectionType',
      sectionName: 'sectionName',
      title: 'title',
      categoryCount: 'categories.length',
    },
    prepare({ sectionType, sectionName, title, categoryCount }) {
      const displayTitle = sectionName || title || `Category Section (${sectionType})`;
      const subtitle = `${sectionType} • ${categoryCount || 0} categories`;
      
      return {
        title: displayTitle,
        subtitle,
      };
    },
  },
}); 