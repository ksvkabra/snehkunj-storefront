import { defineField, defineType } from 'sanity';

interface TestimonialCard {
  type?: 'text' | 'video' | 'product' | 'press';
}

export const testimonialCard = defineType({
  name: 'testimonialCard',
  title: 'Testimonial Card',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Card Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text Quote', value: 'text' },
          { title: 'Video Highlight', value: 'video' },
          { title: 'Product Feature', value: 'product' },
          { title: 'Press Mention', value: 'press' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      hidden: ({ parent }: { parent: TestimonialCard }) => !['text', 'press'].includes(parent?.type || ''),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = (context.parent as TestimonialCard)?.type;
          if (['text', 'press'].includes(type || '') && !value) {
            return 'Quote is required for text and press testimonials';
          }
          return true;
        }),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      hidden: ({ parent }: { parent: TestimonialCard }) => parent?.type !== 'text',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = (context.parent as TestimonialCard)?.type;
          if (type === 'text' && !value) {
            return 'Name is required for text testimonials';
          }
          return true;
        }),
    }),
    defineField({
      name: 'title',
      title: 'Title/Role',
      type: 'string',
      description: 'Author title or role (e.g., "Happy Customer", "Quilt Enthusiast")',
      hidden: ({ parent }: { parent: TestimonialCard }) => parent?.type !== 'text',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        },
      ],
      hidden: ({ parent }: { parent: TestimonialCard }) => parent?.type !== 'video',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = (context.parent as TestimonialCard)?.type;
          if (type === 'video' && !value) {
            return 'Media is required for video testimonials';
          }
          return true;
        }),
    }),

    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Publication or media source name',
      hidden: ({ parent }: { parent: TestimonialCard }) => parent?.type !== 'press',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = (context.parent as TestimonialCard)?.type;
          if (type === 'press' && !value) {
            return 'Source is required for press testimonials';
          }
          return true;
        }),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      hidden: ({ parent }: { parent: TestimonialCard }) => parent?.type !== 'product',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      hidden: ({ parent }: { parent: TestimonialCard }) => parent?.type !== 'product',
    }),
  ],
  preview: {
    select: {
      type: 'type',
      quote: 'quote',
      name: 'name',
      source: 'source',
      media: 'media',
    },
    prepare({ type, quote, name, source, media }) {
      const title = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Testimonial';
      let subtitle = '';

      if (type === 'text' && name) {
        subtitle = `${name}: ${quote?.slice(0, 50)}...`;
      } else if (type === 'press' && source) {
        subtitle = `${source}: ${quote?.slice(0, 50)}...`;
      } else if (type === 'video') {
        subtitle = 'Video testimonial';
      } else if (type === 'product') {
        subtitle = 'Product feature';
      }

      return {
        title,
        subtitle,
        media: media || undefined,
      };
    },
  },
});

const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: testimonialCard.name }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      testimonials: 'testimonials',
    },
    prepare({ title, testimonials }) {
      return {
        title,
        subtitle: `${testimonials?.length || 0} testimonials`,
      };
    },
  },
});

export default testimonialsSection;
