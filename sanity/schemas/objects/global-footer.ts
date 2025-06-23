import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'globalFooter',
  title: 'Global Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Footer Title',
      type: 'string',
      description: 'Name for this footer configuration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active Footer',
      type: 'boolean',
      description: 'Set this as the active footer for the site',
      initialValue: false,
    }),

    // Footer Columns
    defineField({
      name: 'columns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Column Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'links',
              title: 'Column Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Link Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'url',
                      title: 'Link URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'external',
                      title: 'External Link',
                      type: 'boolean',
                      description: 'Check if this link opens in a new tab',
                      initialValue: false,
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'url',
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: 'heading',
              linkCount: 'links.length',
            },
            prepare({ title, linkCount }) {
              return {
                title,
                subtitle: `${linkCount || 0} links`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),

    // Social Links
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Custom', value: 'custom' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'customPlatform',
              title: 'Custom Platform Name',
              type: 'string',
              hidden: ({ parent }) => parent?.platform !== 'custom',
            },
            {
              name: 'url',
              title: 'Profile URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Custom Icon',
              type: 'image',
              description: 'Optional custom icon (if not using default platform icon)',
            },
          ],
          preview: {
            select: {
              platform: 'platform',
              customPlatform: 'customPlatform',
              url: 'url',
            },
            prepare({ platform, customPlatform, url }) {
              const displayPlatform = platform === 'custom' ? customPlatform : platform;
              return {
                title: displayPlatform || platform,
                subtitle: url,
              };
            },
          },
        },
      ],
    }),

    // Company Information
    defineField({
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        {
          name: 'logo',
          title: 'Footer Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'tagline',
          title: 'Company Tagline',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Company Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'address',
          title: 'Company Address',
          type: 'text',
          rows: 3,
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
        },
      ],
    }),

    // Newsletter Signup
    defineField({
      name: 'newsletter',
      title: 'Newsletter Signup',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Newsletter Signup',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Newsletter Title',
          type: 'string',
          initialValue: 'Stay Updated',
        },
        {
          name: 'description',
          title: 'Newsletter Description',
          type: 'text',
          rows: 2,
          initialValue: 'Subscribe to our newsletter for the latest updates and exclusive offers.',
        },
        {
          name: 'placeholder',
          title: 'Email Input Placeholder',
          type: 'string',
          initialValue: 'Enter your email address',
        },
        {
          name: 'buttonText',
          title: 'Subscribe Button Text',
          type: 'string',
          initialValue: 'Subscribe',
        },
      ],
    }),

    // Legal Information
    defineField({
      name: 'legalInfo',
      title: 'Legal Information',
      type: 'object',
      fields: [
        {
          name: 'copyright',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© 2024 HoliCraft. All rights reserved.',
        },
        {
          name: 'legalLinks',
          title: 'Legal Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Link Label', type: 'string' },
                { name: 'url', title: 'Link URL', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'additionalText',
          title: 'Additional Legal Text',
          type: 'text',
          rows: 3,
        },
      ],
    }),

    // Styling Options
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Tailwind color class (e.g., bg-gray-900)',
      initialValue: 'bg-gray-900',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Tailwind color class (e.g., text-white)',
      initialValue: 'text-white',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Tailwind color class for links and highlights (e.g., text-blue-400)',
      initialValue: 'text-blue-400',
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
      title: 'title',
      isActive: 'isActive',
      columnCount: 'columns.length',
    },
    prepare({ title, isActive, columnCount }) {
      return {
        title: title || 'Global Footer',
        subtitle: `${isActive ? 'ACTIVE • ' : ''}${columnCount || 0} columns`,
      };
    },
  },
}); 