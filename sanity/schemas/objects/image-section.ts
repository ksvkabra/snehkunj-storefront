import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'imageSection',
  title: 'Image Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Background Image', value: 'background' },
          { title: 'Image Gallery', value: 'gallery' },
          { title: 'Social Proof', value: 'social-proof' },
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

    // Background Image Fields
    defineField({
      name: 'backgroundTitle',
      title: 'Title',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'background',
    }),
    defineField({
      name: 'backgroundSubtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      hidden: ({ parent }) => parent?.sectionType !== 'background',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context?.parent as any)?.sectionType === 'background' && !value) {
            return 'Background image is required for Background section';
          }
          return true;
        }),
      hidden: ({ parent }) => parent?.sectionType !== 'background',
    }),
    defineField({
      name: 'backgroundOverlay',
      title: 'Overlay Color',
      type: 'string',
      description: 'Tailwind color class for overlay (e.g., bg-black/50)',
      hidden: ({ parent }) => parent?.sectionType !== 'background',
    }),
    defineField({
      name: 'backgroundCTA',
      title: 'Call to Action',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'background',
    }),

    // Image Gallery Fields
    defineField({
      name: 'galleryTitle',
      title: 'Gallery Title',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'gallery',
    }),
    defineField({
      name: 'galleryDescription',
      title: 'Gallery Description',
      type: 'text',
      rows: 3,
      hidden: ({ parent }) => parent?.sectionType !== 'gallery',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) =>
                Rule.custom((value) => {
                  if (!value) return 'Image is required';
                  return true;
                }),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link (optional)',
              type: 'string',
            },
          ],
          preview: {
            select: {
              media: 'image',
              title: 'alt',
              subtitle: 'caption',
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context?.parent as any)?.sectionType === 'gallery') {
            if (!value || value.length < 1) {
              return 'At least one image is required for gallery';
            }
          }
          return true;
        }),
      hidden: ({ parent }) => parent?.sectionType !== 'gallery',
    }),
    defineField({
      name: 'galleryLayout',
      title: 'Gallery Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Carousel', value: 'carousel' },
        ],
      },
      initialValue: 'grid',
      hidden: ({ parent }) => parent?.sectionType !== 'gallery',
    }),
    defineField({
      name: 'galleryColumns',
      title: 'Number of Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
      },
      initialValue: 3,
      hidden: ({ parent }) => parent?.sectionType !== 'gallery',
    }),

    // Social Proof Fields
    defineField({
      name: 'socialProofTitle',
      title: 'Section Title',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'social-proof',
    }),
    defineField({
      name: 'socialProofImages',
      title: 'Social Proof Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Important for accessibility',
                },
              ],
              validation: (Rule) =>
                Rule.custom((value) => {
                  if (!value) return 'Image is required';
                  return true;
                }),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'link',
              title: 'Link (optional)',
              type: 'string',
            },
          ],
          preview: {
            select: {
              media: 'image',
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context?.parent as any)?.sectionType === 'social-proof') {
            if (!value || value.length < 1) {
              return 'At least one image is required for Social Proof section';
            }
          }
          return true;
        }),
      hidden: ({ parent }) => parent?.sectionType !== 'social-proof',
    }),
    defineField({
      name: 'socialProofLayout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'List', value: 'list' },
          { title: 'Carousel', value: 'carousel' },
        ],
      },
      initialValue: 'grid',
      hidden: ({ parent }) => parent?.sectionType !== 'social-proof',
    }),

    // Common Styling Fields
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
      backgroundTitle: 'backgroundTitle',
      galleryTitle: 'galleryTitle',
      socialProofTitle: 'socialProofTitle',
    },
    prepare({ sectionType, sectionName, backgroundTitle, galleryTitle, socialProofTitle }) {
      const displayTitle =
        sectionName ||
        (sectionType === 'background'
          ? backgroundTitle
          : sectionType === 'gallery'
            ? galleryTitle
            : sectionType === 'social-proof'
              ? socialProofTitle
              : sectionType);

      return {
        title: displayTitle || `Image Section (${sectionType})`,
        subtitle: `Type: ${sectionType}`,
      };
    },
  },
});
