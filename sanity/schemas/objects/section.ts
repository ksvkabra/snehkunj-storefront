import { defineField, defineType } from 'sanity';

export const sectionSchema = defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Section', value: 'heroSection' },
          { title: 'Testimonials Section', value: 'testimonialsSection' },
          { title: 'Featured Categories Section', value: 'featuredCategoriesSection' },
          { title: 'Image Text Banner Section', value: 'imageTextBannerSection' },
          { title: 'Shopify Section', value: 'shopifySection' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'reference',
      to: [{ type: 'heroSection' }],
      hidden: ({ parent }) => parent?.type !== 'heroSection',
    }),
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'reference',
      to: [{ type: 'testimonialsSection' }],
      hidden: ({ parent }) => parent?.type !== 'testimonialsSection',
    }),
    defineField({
      name: 'featuredCategoriesSection',
      title: 'Featured Categories Section',
      type: 'reference',
      to: [{ type: 'featuredCategoriesSection' }],
      hidden: ({ parent }) => parent?.type !== 'featuredCategoriesSection',
    }),
    defineField({
      name: 'imageTextBannerSection',
      title: 'Image Text Banner Section',
      type: 'reference',
      to: [{ type: 'imageTextBannerSection' }],
      hidden: ({ parent }) => parent?.type !== 'imageTextBannerSection',
    }),
    defineField({
      name: 'shopifySection',
      title: 'Shopify Section',
      type: 'reference',
      to: [{ type: 'shopifySection' }],
      hidden: ({ parent }) => parent?.type !== 'shopifySection',
    }),
  ],
  preview: {
    select: {
      type: 'type',
      heroTitle: 'heroSection.headline',
      testimonialsTitle: 'testimonialsSection.title',
      categoriesTitle: 'featuredCategoriesSection.title',
      bannerTitle: 'imageTextBannerSection.headline',
      shopifyTitle: 'shopifySection.sectionName',
    },
    prepare({ type, heroTitle, testimonialsTitle, categoriesTitle, bannerTitle, shopifyTitle }) {
      return {
        title: type === 'heroSection' ? heroTitle : 
               type === 'testimonialsSection' ? testimonialsTitle :
               type === 'featuredCategoriesSection' ? categoriesTitle :
               type === 'imageTextBannerSection' ? bannerTitle :
               type === 'shopifySection' ? `Shopify: ${shopifyTitle}` : type,
        subtitle: `Section Type: ${type}`,
      };
    },
  },
}); 