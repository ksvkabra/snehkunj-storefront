import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'layoutSection',
  title: 'Layout Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Spacer', value: 'spacer' },
          { title: 'Divider', value: 'divider' },
          { title: 'Container', value: 'container' },
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

    // Spacer Fields
    defineField({
      name: 'spacerHeight',
      title: 'Spacer Height',
      type: 'string',
      options: {
        list: [
          { title: 'Extra Small', value: 'h-4' },
          { title: 'Small', value: 'h-8' },
          { title: 'Medium', value: 'h-12' },
          { title: 'Large', value: 'h-16' },
          { title: 'Extra Large', value: 'h-24' },
          { title: '2XL', value: 'h-32' },
          { title: '3XL', value: 'h-40' },
          { title: '4XL', value: 'h-48' },
        ],
      },
      initialValue: 'h-12',
      hidden: ({ parent }) => parent?.sectionType !== 'spacer',
    }),
    defineField({
      name: 'spacerResponsive',
      title: 'Responsive Heights',
      type: 'object',
      fields: [
        {
          name: 'mobile',
          title: 'Mobile Height',
          type: 'string',
          options: {
            list: [
              { title: 'Extra Small', value: 'h-2' },
              { title: 'Small', value: 'h-4' },
              { title: 'Medium', value: 'h-8' },
              { title: 'Large', value: 'h-12' },
            ],
          },
        },
        {
          name: 'tablet',
          title: 'Tablet Height',
          type: 'string',
          options: {
            list: [
              { title: 'Extra Small', value: 'h-4' },
              { title: 'Small', value: 'h-8' },
              { title: 'Medium', value: 'h-12' },
              { title: 'Large', value: 'h-16' },
            ],
          },
        },
        {
          name: 'desktop',
          title: 'Desktop Height',
          type: 'string',
          options: {
            list: [
              { title: 'Small', value: 'h-8' },
              { title: 'Medium', value: 'h-12' },
              { title: 'Large', value: 'h-16' },
              { title: 'Extra Large', value: 'h-24' },
            ],
          },
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'spacer',
    }),

    // Divider Fields
    defineField({
      name: 'dividerStyle',
      title: 'Divider Style',
      type: 'string',
      options: {
        list: [
          { title: 'Solid Line', value: 'solid' },
          { title: 'Dashed Line', value: 'dashed' },
          { title: 'Dotted Line', value: 'dotted' },
          { title: 'Double Line', value: 'double' },
        ],
      },
      initialValue: 'solid',
      hidden: ({ parent }) => parent?.sectionType !== 'divider',
    }),
    defineField({
      name: 'dividerColor',
      title: 'Divider Color',
      type: 'string',
      options: {
        list: [
          { title: 'Gray', value: 'border-gray-200' },
          { title: 'Dark Gray', value: 'border-gray-300' },
          { title: 'Light Gray', value: 'border-gray-100' },
          { title: 'Primary', value: 'border-primary' },
          { title: 'Secondary', value: 'border-secondary' },
        ],
      },
      initialValue: 'border-gray-200',
      hidden: ({ parent }) => parent?.sectionType !== 'divider',
    }),
    defineField({
      name: 'dividerWidth',
      title: 'Divider Width',
      type: 'string',
      options: {
        list: [
          { title: 'Thin', value: 'border-t' },
          { title: 'Medium', value: 'border-t-2' },
          { title: 'Thick', value: 'border-t-4' },
        ],
      },
      initialValue: 'border-t',
      hidden: ({ parent }) => parent?.sectionType !== 'divider',
    }),
    defineField({
      name: 'dividerAlignment',
      title: 'Divider Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Centered', value: 'center' },
          { title: 'Left Aligned', value: 'left' },
          { title: 'Right Aligned', value: 'right' },
        ],
      },
      initialValue: 'full',
      hidden: ({ parent }) => parent?.sectionType !== 'divider',
    }),
    defineField({
      name: 'dividerText',
      title: 'Divider Text (optional)',
      type: 'string',
      description: 'Text to display in the center of the divider',
      hidden: ({ parent }) => parent?.sectionType !== 'divider',
    }),

    // Container Fields
    defineField({
      name: 'containerContent',
      title: 'Container Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        { type: 'contentSection' },
        { type: 'imageSection' },
        { type: 'productSection' },
        { type: 'categorySection' },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'container',
    }),
    defineField({
      name: 'containerMaxWidth',
      title: 'Container Max Width',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'max-w-sm' },
          { title: 'Medium', value: 'max-w-md' },
          { title: 'Large', value: 'max-w-lg' },
          { title: 'Extra Large', value: 'max-w-xl' },
          { title: '2XL', value: 'max-w-2xl' },
          { title: '3XL', value: 'max-w-3xl' },
          { title: '4XL', value: 'max-w-4xl' },
          { title: '5XL', value: 'max-w-5xl' },
          { title: '6XL', value: 'max-w-6xl' },
          { title: '7XL', value: 'max-w-7xl' },
          { title: 'Full', value: 'max-w-full' },
        ],
      },
      initialValue: 'max-w-7xl',
      hidden: ({ parent }) => parent?.sectionType !== 'container',
    }),
    defineField({
      name: 'containerPadding',
      title: 'Container Padding',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'p-0' },
          { title: 'Small', value: 'p-4' },
          { title: 'Medium', value: 'p-6' },
          { title: 'Large', value: 'p-8' },
          { title: 'Extra Large', value: 'p-12' },
        ],
      },
      initialValue: 'p-6',
      hidden: ({ parent }) => parent?.sectionType !== 'container',
    }),
    defineField({
      name: 'containerCentered',
      title: 'Center Container',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.sectionType !== 'container',
    }),

    // Common Styling Fields (for container and divider)
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Tailwind color class (e.g., bg-white)',
      hidden: ({ parent }) => parent?.sectionType === 'spacer',
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
      hidden: ({ parent }) => parent?.sectionType === 'spacer',
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
      hidden: ({ parent }) => parent?.sectionType === 'spacer',
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
      spacerHeight: 'spacerHeight',
      dividerStyle: 'dividerStyle',
      dividerText: 'dividerText',
    },
    prepare({ sectionType, sectionName, spacerHeight, dividerStyle, dividerText }) {
      let displayTitle = sectionName;
      
      if (!displayTitle) {
        switch (sectionType) {
          case 'spacer':
            displayTitle = `Spacer (${spacerHeight || 'Medium'})`;
            break;
          case 'divider':
            displayTitle = dividerText ? `Divider: ${dividerText}` : `Divider (${dividerStyle || 'Solid'})`;
            break;
          case 'container':
            displayTitle = 'Container';
            break;
          default:
            displayTitle = `Layout Section (${sectionType})`;
        }
      }
      
      return {
        title: displayTitle,
        subtitle: `Type: ${sectionType}`,
      };
    },
  },
}); 