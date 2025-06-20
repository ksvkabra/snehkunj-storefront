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
      testimonialsSection-> {
        _id,
        _type,
        title,
        testimonials[] {
          _type,
          type,
          quote,
          name,
          title,
          media {
            asset-> {
              _id,
              url
            },
            alt
          },
          product-> {
            _id,
            _type,
            title,
            image {
              asset-> {
                _id,
                url
              },
              alt
            }
          },
          source,
          ctaLabel,
          ctaLink
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
          description,
          image {
            asset-> {
              _id,
              url
            },
            alt
          }
        }
      },
      imageTextBannerSection-> {
        _id,
        _type,
        headline,
        text,
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        imagePosition,
        ctaLabel,
        ctaLink
      },
      shopifySection-> {
        _id,
        _type,
        sectionName,
        sectionId
      }
    },
    seo
  }
`;
