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
          { title: 'About Section', value: 'aboutSection' },
          { title: 'Testimonials Section', value: 'testimonialsSection' },
          { title: 'Featured Categories Section', value: 'featuredCategoriesSection' },
          { title: 'Image Text Banner Section', value: 'imageTextBannerSection' },
          { title: 'Newsletter Signup Section', value: 'newsletterSignupSection' },
          { title: 'Trust Badges Section', value: 'trustBadgesSection' },
          { title: 'CTA Banner Section', value: 'ctaBannerSection' },
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
      name: 'aboutSection',
      title: 'About Section',
      type: 'reference',
      to: [{ type: 'aboutSection' }],
      hidden: ({ parent }) => parent?.type !== 'aboutSection',
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
      name: 'newsletterSignupSection',
      title: 'Newsletter Signup Section',
      type: 'reference',
      to: [{ type: 'newsletterSignupSection' }],
      hidden: ({ parent }) => parent?.type !== 'newsletterSignupSection',
    }),
    defineField({
      name: 'trustBadgesSection',
      title: 'Trust Badges Section',
      type: 'reference',
      to: [{ type: 'trustBadgesSection' }],
      hidden: ({ parent }) => parent?.type !== 'trustBadgesSection',
    }),
    defineField({
      name: 'ctaBannerSection',
      title: 'CTA Banner Section',
      type: 'reference',
      to: [{ type: 'ctaBannerSection' }],
      hidden: ({ parent }) => parent?.type !== 'ctaBannerSection',
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
      aboutTitle: 'aboutSection.heading',
      testimonialsTitle: 'testimonialsSection.title',
      categoriesTitle: 'featuredCategoriesSection.title',
      bannerTitle: 'imageTextBannerSection.headline',
      newsletterTitle: 'newsletterSignupSection.headline',
      trustBadgesTitle: 'trustBadgesSection.title',
      ctaTitle: 'ctaBannerSection.headline',
      shopifyTitle: 'shopifySection.sectionName',
    },
    prepare({ type, heroTitle, aboutTitle, testimonialsTitle, categoriesTitle, bannerTitle, newsletterTitle, trustBadgesTitle, ctaTitle, shopifyTitle }) {
      return {
        title: type === 'heroSection' ? heroTitle : 
               type === 'aboutSection' ? aboutTitle :
               type === 'testimonialsSection' ? testimonialsTitle :
               type === 'featuredCategoriesSection' ? categoriesTitle :
               type === 'imageTextBannerSection' ? bannerTitle :
               type === 'newsletterSignupSection' ? newsletterTitle :
               type === 'trustBadgesSection' ? trustBadgesTitle :
               type === 'ctaBannerSection' ? ctaTitle :
               type === 'shopifySection' ? `Shopify: ${shopifyTitle}` : type,
        subtitle: `Section Type: ${type}`,
      };
    },
  },
}); 