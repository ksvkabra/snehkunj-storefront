# Sanity Scripts

This directory contains utility scripts for managing your Sanity CMS content.

## Prerequisites

Before running any scripts, you need to set up your environment variables:

### 1. Environment Setup (`setup-env.ts`)

This script helps you configure the required environment variables:

**Usage:**
```bash
npm run sanity:setup-env
# or
pnpm sanity:setup-env
```

This will:
- Check if required environment variables are set
- Create a `.env.local` template if it doesn't exist
- Provide instructions for getting your Sanity API token

### Required Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

**Important:** The `SANITY_API_TOKEN` needs **Editor** permissions to create content. To get this:

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to API tab
4. Create a new token with "Editor" permissions
5. Copy the token and add it to your `.env.local` file

## Available Scripts

### 2. Initialize Singletons (`init-singletons.ts`)

Creates the basic singleton documents needed for your site to function:
- Header configuration
- Homepage
- Global footer

**Usage:**
```bash
npm run sanity:init-singletons
# or
pnpm sanity:init-singletons
```

### 3. Seed Dummy Data (`seed-dummy-data.ts`)

Populates your Sanity project with realistic dummy data for testing and development:
- Header configurations with branding
- Menu categories with subcategories
- Global footer with links and company info
- Complete homepage with various sections (hero, categories, products, testimonials)

**Usage:**
```bash
npm run sanity:seed-dummy-data
# or
pnpm sanity:seed-dummy-data
```

## What Gets Created

### Headers
- Main header with HOLICRAFT branding
- Search functionality enabled
- Language selector (EN-US, FR-FR, DE-DE)
- User account features
- Styling configuration

### Menu Categories
- **Home & Living**: Furniture, Decor, Kitchen & Dining
- **Fashion & Accessories**: Jewelry, Bags & Wallets, Clothing
- **Art & Collectibles**: Paintings, Sculptures, Pottery & Ceramics

### Homepage Sections
- **Hero Section**: Welcome message with call-to-action buttons
- **Category Grid**: Featured product categories
- **Product Section**: Featured products showcase
- **Craftsmanship Story**: About our artisans and process
- **Testimonials**: Customer reviews and press quotes

### Global Footer
- Three columns: Shop, About, Support
- Social media links (Instagram, Facebook, Pinterest)
- Company information and contact details

## Troubleshooting

### "Insufficient permissions" Error

If you get a permissions error when running the scripts:

1. **Check your API token permissions**: Make sure your `SANITY_API_TOKEN` has "Editor" permissions
2. **Verify environment variables**: Run `npm run sanity:setup-env` to check your configuration
3. **Restart your terminal**: Sometimes environment variables need a fresh terminal session

### "tsx: command not found" Error

Install tsx globally:
```bash
npm install -g tsx
# or
pnpm add -g tsx
```

## Notes

- The script checks for existing content before creating new items to avoid duplicates
- Some sections may require images to be uploaded manually in the Sanity Studio
- All content is designed to be realistic and suitable for a handcrafted products store
- You can edit all created content in the Sanity Studio at `/cms` 