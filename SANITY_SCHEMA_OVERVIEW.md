# Sanity Schema Overview - HoliCraft Storefront

## Singleton Pattern Implementation

### Overview
The project now uses a **singleton pattern** for global content that should only have one instance:
- **Header** (`header`) - Global site header configuration (styling, logo, search settings)
- **Homepage** (`homePage`) - Main homepage content and sections
- **Global Footer** (`globalFooter`) - Site-wide footer configuration

### How Singletons Work
1. **Single Instance**: Only one document of each type should exist
2. **Latest First**: Queries use `order(_createdAt desc)[0]` to get the most recent document
3. **Studio Integration**: Sanity Studio shows these as document lists (should only contain one item)
4. **Automatic Creation**: Initialization script creates default documents if none exist

### Singleton Documents

| Document | Type | Purpose | Location in Studio |
|----------|------|---------|-------------------|
| `header` | `header` | Header styling, logo, search settings | Global Components > Header |
| `homePage` | `homePage` | Homepage content and sections | Homepage |
| `globalFooter` | `globalFooter` | Site-wide footer | Global Components > Footer |

### Navigation Architecture

The navigation system is properly separated:

- **Header Configuration** (`header` singleton): Contains styling, logo, search settings, language selector, user account settings
- **Menu Categories** (`menuCategory` documents): Contains the actual navigation menu items and structure
- **Integration**: The navbar component fetches both separately and combines them

### Benefits
- **Consistency**: Ensures only one configuration exists per type
- **Simplicity**: No need to manage multiple instances
- **Performance**: Direct queries are fast
- **User Experience**: Clear editing interface
- **Separation of Concerns**: Header styling vs. menu content are managed separately

### Initialization
Run the initialization script to create singleton documents:
```bash
npm run sanity:init-singletons
```

This creates default configurations for all singletons if they don't exist.

### Best Practices
- **Only create one document** of each singleton type
- **Use the initialization script** to set up defaults
- **Delete extra documents** if multiple are accidentally created
- **Backup before changes** to important singleton documents
- **Keep header configuration separate** from menu categories

## Current Schema Structure

### Document Types (Main Schemas)
Located in `sanity/schemas/`

| Schema | File | Purpose | Status |
|--------|------|---------|--------|
| `author` | `author.ts` | Blog author information | ✅ Active |
| `category` | `category.ts` | Product/blog categories | ✅ Active |
| `footer` | `footer.ts` | Site footer configuration | ✅ Active |
| `heroSection` | `hero-section.ts` | Hero section content | ✅ Active |
| `menuCategory` | `menu-category.ts` | Navigation menu categories | ✅ Active |
| `page` | `page.ts` | Generic page with sections | ✅ Active |
| `post` | `post.ts` | Blog posts | ✅ Active |
| `product` | `product.ts` | Product information | ⚠️ Deprecated (migrating to Shopify) |

### Section Types
Located in `sanity/schemas/sections/`

| Schema | File | Purpose | Status |
|--------|------|---------|--------|
| `featuredCategoriesSection` | `featured-categories-section.ts` | Featured product categories | ✅ Active |
| `imageTextBannerSection` | `image-text-banner-section.ts` | Image + text banner | ✅ Active |
| `shopifySection` | `shopify-section.ts` | Shopify integration section | ✅ Active |
| `testimonialsSection` | `testimonials-section.ts` | Customer testimonials | ✅ Active |

### Object Types
Located in `sanity/schemas/objects/`

| Schema | File | Purpose | Status |
|--------|------|---------|--------|
| `section` | `section.ts` | Generic section wrapper | ✅ Active |
| `slug` | `slug.ts` | URL slug field | ✅ Active |
| `subSubcategory` | `sub-subcategory.ts` | Nested category structure | ✅ Active |

### Utility Schemas
| Schema | File | Purpose | Status |
|--------|------|---------|--------|
| `blockContent` | `block-content.ts` | Rich text content | ✅ Active |

## Current Architecture Analysis

### Strengths
1. **Modular Section System**: Already has a flexible section-based approach
2. **Content Separation**: Clear separation between content types
3. **Reusable Components**: Section schemas are designed for reusability
4. **Preview Support**: Most schemas include preview configurations

### Areas for Improvement
1. **Missing Homepage Document**: No dedicated `homePage` document type
2. **Section Organization**: Sections could be better organized under `objects/`
3. **Consistency**: Some schemas use different naming conventions
4. **Documentation**: Limited inline documentation

## Proposed Modular Homepage Structure

### New Document Type: `homePage`
```
homePage (document)
├── title: string
├── slug: slug (fixed: "home")
├── sections: array
│   └── section (object)
│       ├── type: string (section type selector)
│       └── [sectionType]: reference (conditional based on type)
├── seo: object
│   ├── title: string
│   ├── description: text
│   └── ogImage: image
└── preview: object
```

### Section Object Types (to be created)
All section schemas should be moved to `sanity/schemas/objects/` for better organization:

1. **Hero Section** (`heroSection`)
2. **Featured Products** (`featuredProductsSection`)
3. **Category Showcase** (`categoryShowcaseSection`)
4. **Testimonials** (`testimonialsSection`)
5. **Newsletter Signup** (`newsletterSection`)
6. **Image Gallery** (`imageGallerySection`)
7. **Text Content** (`textContentSection`)
8. **Product Grid** (`productGridSection`)
9. **Video Section** (`videoSection`)
10. **FAQ Section** (`faqSection`)

## Implementation Plan

### Phase 1: Schema Reorganization
1. Move existing section schemas to `objects/`
2. Create new `homePage` document type
3. Update section object to include new section types
4. Update schema registration

### Phase 2: New Section Schemas
1. Create each section schema as a separate object type
2. Ensure all schemas follow consistent patterns
3. Add proper preview configurations
4. Include validation rules

### Phase 3: Integration
1. Update Sanity Studio structure
2. Create homepage document in Studio
3. Test section composition
4. Update frontend integration

## File Structure After Implementation

```
sanity/schemas/
├── index.ts (updated registration)
├── homePage.ts (new homepage document)
├── page.ts (existing generic page)
├── post.ts (blog posts)
├── author.ts (authors)
├── category.ts (categories)
├── footer.ts (footer)
├── menuCategory.ts (menu)
├── product.ts (deprecated)
├── blockContent.ts (rich text)
└── objects/
    ├── section.ts (updated section wrapper)
    ├── slug.ts (existing)
    ├── subSubcategory.ts (existing)
    ├── heroSection.ts (moved from sections/)
    ├── featuredProductsSection.ts (new)
    ├── categoryShowcaseSection.ts (new)
    ├── testimonialsSection.ts (moved from sections/)
    ├── newsletterSection.ts (new)
    ├── imageGallerySection.ts (new)
    ├── textContentSection.ts (new)
    ├── productGridSection.ts (new)
    ├── videoSection.ts (new)
    └── faqSection.ts (new)
```

## Next Steps

1. **Review and approve** this schema structure
2. **Define specific requirements** for each section type
3. **Start with Phase 1** (reorganization)
4. **Create section schemas** one by one
5. **Test and validate** the modular system

## Notes

- All section schemas should be **composable and portable**
- Each schema should include **clear field types**
- **Preview configurations** are essential for content editors
- **Validation rules** should be comprehensive
- **No frontend styling** should be hardcoded in schemas
- **Reusability** across different page types should be considered 