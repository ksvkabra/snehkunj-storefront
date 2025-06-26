# HoliCraft Storefront Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Shopify Configuration
SHOPIFY_STORE_DOMAIN=holicrafts-jaipur.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_shopify_storefront_access_token_here

# Sanity Configuration
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-13
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PROJECT_ID=kiiaxm1k
SANITY_API_TOKEN=your_sanity_api_token_here

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## Getting API Keys

### Shopify
1. Go to your Shopify admin panel
2. Navigate to Settings > Apps and sales channels > Develop apps
3. Create a new app or use an existing one
4. Configure Storefront API access
5. Copy the Storefront access token

### Sanity
1. Go to [sanity.io](https://sanity.io) and log in
2. Navigate to your project settings
3. Go to API section
4. Create a new API token with read permissions
5. Copy the project ID and dataset name

## Troubleshooting

### Network Errors
If you see errors like:
- `getaddrinfo ENOTFOUND holicrafts-jaipur.myshopify.com`
- `getaddrinfo ENOTFOUND kiiaxm1k.api.sanity.io`

**Solutions:**
1. Check your internet connection
2. Verify the domain names are correct in your environment variables
3. Ensure your API tokens are valid
4. Check if the services are accessible from your network

### Development Mode
The application includes error handling for when APIs are unavailable:
- The app will show fallback content instead of crashing
- Check the browser console for detailed error messages
- Use the fallback components to provide user-friendly error messages

### Common Issues

1. **Cart not loading**: Check Shopify API token and domain
2. **Content not loading**: Check Sanity API token and project ID
3. **Build errors**: Ensure all environment variables are set
4. **TypeScript errors**: Run `npm run build` to check for type issues

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npx tsc --noEmit
```

## Project Structure

- `app/` - Next.js app router pages
- `components/` - React components
- `lib/` - Utility functions and API clients
- `sanity/` - Sanity CMS configuration
- `public/` - Static assets

## Support

If you continue to experience issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure your API tokens have the correct permissions
4. Test API endpoints directly using tools like Postman 