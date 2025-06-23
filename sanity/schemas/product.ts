import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Product Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price',
      type: 'number',
      description: 'Original price for showing discounts',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'USD', value: 'USD' },
          { title: 'EUR', value: 'EUR' },
          { title: 'GBP', value: 'GBP' },
          { title: 'CAD', value: 'CAD' },
        ],
      },
      initialValue: 'USD',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Stock Keeping Unit',
    }),
    defineField({
      name: 'barcode',
      title: 'Barcode',
      type: 'string',
      description: 'Product barcode (UPC, EAN, etc.)',
    }),
    defineField({
      name: 'weight',
      title: 'Weight (grams)',
      type: 'number',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      fields: [
        defineField({
          name: 'length',
          title: 'Length (cm)',
          type: 'number',
          validation: (Rule) => Rule.positive(),
        }),
        defineField({
          name: 'width',
          title: 'Width (cm)',
          type: 'number',
          validation: (Rule) => Rule.positive(),
        }),
        defineField({
          name: 'height',
          title: 'Height (cm)',
          type: 'number',
          validation: (Rule) => Rule.positive(),
        }),
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Variant Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Variant Price',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
            }),
            defineField({
              name: 'compareAtPrice',
              title: 'Variant Compare at Price',
              type: 'number',
              validation: (Rule) => Rule.positive(),
            }),
            defineField({
              name: 'sku',
              title: 'Variant SKU',
              type: 'string',
            }),
            defineField({
              name: 'barcode',
              title: 'Variant Barcode',
              type: 'string',
            }),
            defineField({
              name: 'weight',
              title: 'Variant Weight (grams)',
              type: 'number',
              validation: (Rule) => Rule.positive(),
            }),
            defineField({
              name: 'dimensions',
              title: 'Variant Dimensions',
              type: 'object',
              fields: [
                defineField({
                  name: 'length',
                  title: 'Length (cm)',
                  type: 'number',
                  validation: (Rule) => Rule.positive(),
                }),
                defineField({
                  name: 'width',
                  title: 'Width (cm)',
                  type: 'number',
                  validation: (Rule) => Rule.positive(),
                }),
                defineField({
                  name: 'height',
                  title: 'Height (cm)',
                  type: 'number',
                  validation: (Rule) => Rule.positive(),
                }),
              ],
            }),
            defineField({
              name: 'images',
              title: 'Variant Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    defineField({
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: 'options',
              title: 'Variant Options',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Option Name',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'value',
                      title: 'Option Value',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'options',
      title: 'Product Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Option Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'values',
              title: 'Option Values',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.min(1),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'inventory',
      title: 'Inventory',
      type: 'object',
      fields: [
        defineField({
          name: 'quantity',
          title: 'Available Quantity',
          type: 'number',
          initialValue: 0,
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'lowStockThreshold',
          title: 'Low Stock Threshold',
          type: 'number',
          initialValue: 5,
          validation: (Rule) => Rule.min(0),
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          description: 'Title for search engines (leave empty to use product title)',
        }),
        defineField({
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          rows: 3,
          description: 'Description for search engines (leave empty to use product description)',
        }),
        defineField({
          name: 'keywords',
          title: 'SEO Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image for social media sharing',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      currency: 'currency',
      media: 'featuredImage',
      category: 'categories.0.title',
    },
    prepare({ title, price, currency, media, category }) {
      return {
        title,
        subtitle: `${currency} ${price}${category ? ` • ${category}` : ''}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Price: Low to High',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Price: High to Low',
      name: 'priceDesc',
      by: [{ field: 'price', direction: 'desc' }],
    },
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
}); 