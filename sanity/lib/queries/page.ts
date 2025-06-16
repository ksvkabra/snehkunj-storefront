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
      newsletterSignupSection-> {
        _id,
        _type,
        headline,
        subtext,
        ctaLabel
      },
      trustBadgesSection-> {
        _id,
        _type,
        title,
        badges[] {
          _type,
          label,
          icon {
            asset-> {
              _id,
              url
            },
            alt
          }
        }
      },
      ctaBannerSection-> {
        _id,
        _type,
        headline,
        subheadline,
        ctaLabel,
        ctaLink,
        backgroundColor
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
