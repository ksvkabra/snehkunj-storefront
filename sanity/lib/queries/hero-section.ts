import { groq } from 'next-sanity';

export const heroSectionQuery = groq`
  *[_type == "heroSection"][0] {
    _id,
    _type,
    headline,
    subheadline,
    ctaLabel,
    ctaLink,
    backgroundImage
  }
`; 