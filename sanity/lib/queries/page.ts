import { groq } from 'next-sanity';

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    sections[] {
      _type,
      type,
      heroSection-> {
        _id,
        _type,
        headline,
        subheadline,
        ctaLabel,
        ctaLink,
        backgroundImage
      },
      aboutSection-> {
        _id,
        _type,
        heading,
        content,
        ctaLabel,
        ctaLink,
        image
      },
      testimonialsSection-> {
        _id,
        _type,
        title,
        testimonials[] {
          _type,
          name,
          quote,
          avatar,
          title,
          rating
        }
      },
      featuredCategoriesSection-> {
        _id,
        _type,
        title,
        categories[] {
          _type,
          title,
          slug,
          image
        }
      }
    },
    seo
  }
`;
