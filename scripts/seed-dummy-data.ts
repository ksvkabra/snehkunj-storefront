#!/usr/bin/env tsx

/**
 * Script to seed Sanity with dummy data according to schemas
 * Run this script to populate your Sanity project with realistic test data
 */

import dotenv from "dotenv";
import { sanityAdminClient } from "../sanity/lib/admin-client";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// Dummy data for different content types
const dummyData = {
  // Header configurations
  headers: [
    {
      _type: "header",
      title: "Main Header",
      logo: {
        text: "HOLICRAFT",
        link: "/",
      },
      search: {
        enabled: true,
        placeholder: "Search handcrafted products...",
      },
      languageSelector: {
        enabled: true,
        defaultLanguage: "EN-US",
        availableLanguages: ["EN-US", "FR-FR", "DE-DE"],
      },
      userAccount: {
        enabled: true,
        showWishlist: true,
      },
      styling: {
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
        hoverColor: "#D29922",
      },
      isActive: true,
    },
  ],

  // Menu categories
  menuCategories: [
    {
      _type: "menuCategory",
      name: "Home & Living",
      slug: { current: "home-living" },
      order: 1,
      children: [
        {
          _key: "furniture",
          name: "Furniture",
          slug: { current: "furniture" },
        },
        {
          _key: "decor",
          name: "Decor",
          slug: { current: "decor" },
        },
        {
          _key: "kitchen",
          name: "Kitchen & Dining",
          slug: { current: "kitchen-dining" },
        },
      ],
    },
    {
      _type: "menuCategory",
      name: "Fashion & Accessories",
      slug: { current: "fashion-accessories" },
      order: 2,
      children: [
        {
          _key: "jewelry",
          name: "Jewelry",
          slug: { current: "jewelry" },
        },
        {
          _key: "bags",
          name: "Bags & Wallets",
          slug: { current: "bags-wallets" },
        },
        {
          _key: "clothing",
          name: "Clothing",
          slug: { current: "clothing" },
        },
      ],
    },
    {
      _type: "menuCategory",
      name: "Art & Collectibles",
      slug: { current: "art-collectibles" },
      order: 3,
      children: [
        {
          _key: "paintings",
          name: "Paintings",
          slug: { current: "paintings" },
        },
        {
          _key: "sculptures",
          name: "Sculptures",
          slug: { current: "sculptures" },
        },
        {
          _key: "pottery",
          name: "Pottery & Ceramics",
          slug: { current: "pottery-ceramics" },
        },
      ],
    },
  ],

  // Content sections for homepage
  contentSections: [
    {
      _type: "contentSection",
      _key: "hero-section",
      sectionType: "hero",
      sectionName: "Welcome Hero",
      heroTitle: "Handcrafted with Love",
      subheading: "Discover unique pieces made by skilled artisans",
      description:
        "Each product tells a story of tradition, craftsmanship, and passion. From wooden furniture to handwoven textiles, every item is created with care and attention to detail.",
      image: null,
      imagePosition: "right",
      primaryCta: {
        text: "Shop Now",
        link: "/collections/all",
      },
      secondaryCta: {
        text: "Learn Our Story",
        link: "/about",
      },
      shippingBadge: "Free Shipping Worldwide",
    },
    {
      _type: "contentSection",
      _key: "craftsmanship-story",
      sectionType: "craftsmanship",
      sectionName: "Our Craftsmanship",
      craftsmanshipTitle: "The Art of Traditional Craftsmanship",
      craftsmanshipBody: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "For generations, our artisans have been perfecting their craft, passing down techniques that have stood the test of time. Every piece we create is a testament to their skill and dedication.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "From the careful selection of materials to the final finishing touches, we believe that true beauty lies in the details. Our products are not just items to own, but pieces to cherish and pass on.",
            },
          ],
        },
      ],
      craftsmanshipImagePosition: "left",
      craftsmanshipCTA: {
        text: "Meet Our Artisans",
        link: "/artisans",
      },
    },
    {
      _type: "contentSection",
      _key: "testimonials-section",
      sectionType: "testimonials",
      sectionName: "Customer Stories",
      testimonialsTitle: "What Our Customers Say",
      testimonials: [
        {
          _key: "testimonial-1",
          type: "text",
          quote:
            "The quality of craftsmanship is absolutely incredible. I can feel the love and care that went into making this piece.",
          name: "Sarah Johnson",
          source: "Verified Customer",
          image: null,
        },
        {
          _key: "testimonial-2",
          type: "text",
          quote:
            "Every piece tells a story. I love knowing that my purchase supports traditional artisans and their families.",
          name: "Michael Chen",
          source: "Verified Customer",
          image: null,
        },
        {
          _key: "testimonial-3",
          type: "press",
          pressQuote:
            "HoliCraft represents the perfect blend of traditional craftsmanship and modern design.",
          publication: "Artisan Magazine",
        },
      ],
    },
  ],

  // Product sections
  productSections: [
    {
      _type: "productSection",
      _key: "featured-products",
      sectionType: "carousel",
      sectionName: "Featured Products",
      sectionTitle: "Handpicked for You",
      description: "Discover our most popular handcrafted pieces.",
      productSourceType: "collection",
      shopifyCollection: "featured-products",
      productLimit: 8,
      showProductImages: true,
      showProductPrices: true,
      showProductTitles: true,
      showAddToCart: true,
      carouselAutoplay: true,
      carouselSpeed: 4,
      carouselShowArrows: true,
      carouselShowDots: true,
    },
    {
      _type: "productSection",
      _key: "new-arrivals",
      sectionType: "carousel",
      sectionName: "New Arrivals",
      sectionTitle: "Fresh from Our Artisans",
      description: "Be the first to discover our latest handcrafted creations.",
      productSourceType: "recent",
      productLimit: 6,
      showProductImages: true,
      showProductPrices: true,
      showProductTitles: true,
      showAddToCart: true,
      carouselAutoplay: true,
      carouselSpeed: 4,
      carouselShowArrows: true,
      carouselShowDots: true,
    },
  ],

  // Category sections
  categorySections: [
    {
      _type: "categorySection",
      _key: "featured-categories",
      sectionType: "featured-grid",
      sectionName: "Shop by Category",
      title: "Explore Our Collections",
      description:
        "Find the perfect handcrafted piece for your home and lifestyle.",
      categories: [
        {
          _key: "furniture",
          label: "Furniture",
          link: "/collections/furniture",
          description: "Handcrafted wooden furniture",
          productCount: 45,
          featured: true,
          image: null,
        },
        {
          _key: "jewelry",
          label: "Jewelry",
          link: "/collections/jewelry",
          description: "Artisan jewelry pieces",
          productCount: 32,
          featured: false,
          image: null,
        },
        {
          _key: "home-decor",
          label: "Home Decor",
          link: "/collections/home-decor",
          description: "Beautiful home accessories",
          productCount: 28,
          featured: false,
          image: null,
        },
        {
          _key: "kitchen",
          label: "Kitchen & Dining",
          link: "/collections/kitchen-dining",
          description: "Handcrafted kitchen items",
          productCount: 19,
          featured: false,
          image: null,
        },
        {
          _key: "textiles",
          label: "Textiles",
          link: "/collections/textiles",
          description: "Handwoven fabrics",
          productCount: 23,
          featured: false,
          image: null,
        },
        {
          _key: "art",
          label: "Art & Collectibles",
          link: "/collections/art-collectibles",
          description: "Unique artistic pieces",
          productCount: 15,
          featured: false,
          image: null,
        },
      ],
      gridColumns: 3,
      gridGap: "gap-6",
      showCategoryCounts: true,
      showCategoryDescriptions: true,
      imageAspectRatio: "square",
    },
  ],

  // Image sections
  imageSections: [
    {
      _type: "imageSection",
      _key: "craftsmanship-image",
      sectionName: "Craftsmanship Showcase",
      title: "The Art of Woodworking",
      description:
        "Watch our master craftsmen at work, creating beautiful pieces that will last for generations.",
      imagePosition: "left",
      alignment: "left",
      backgroundColor: "#F8F0E6",
      textColor: "#333333",
      showCaption: true,
      caption: "Master artisan working on a handcrafted wooden bowl",
      craftsmanshipImage: null,
    },
  ],

  // Layout sections
  layoutSections: [
    {
      _type: "layoutSection",
      _key: "two-column-layout",
      sectionName: "Two Column Layout",
      title: "Discover Our Story",
      description:
        "Learn about our journey and the artisans behind our products.",
      columns: 2,
      gap: "gap-8",
      alignment: "center",
      backgroundColor: "#FFFFFF",
      textColor: "#333333",
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Our story began with a simple mission: to preserve traditional craftsmanship while making it accessible to modern homes.",
            },
          ],
        },
      ],
    },
  ],

  // Shopify sections
  shopifySections: [
    {
      _type: "shopifySection",
      _key: "product-showcase",
      sectionName: "Product Showcase",
      shopifyType: "product",
      sectionTitle: "Featured Product",
      description: "Handcrafted wooden serving bowl",
      productHandle: "handcrafted-wooden-bowl",
      showProductImages: true,
      showProductPrices: true,
      showProductTitles: true,
      showAddToCart: true,
      showQuantitySelector: true,
      showVariantSelector: true,
      layout: "standard",
      alignment: "center",
      backgroundColor: "#F8F0E6",
      textColor: "#333333",
    },
  ],

  // Global footer
  globalFooters: [
    {
      _type: "globalFooter",
      title: "Main Footer",
      isActive: true,
      columns: [
        {
          heading: "Shop",
          links: [
            { label: "All Products", url: "/collections/all", external: false },
            {
              label: "New Arrivals",
              url: "/collections/new-arrivals",
              external: false,
            },
            {
              label: "Best Sellers",
              url: "/collections/best-sellers",
              external: false,
            },
            { label: "Sale", url: "/collections/sale", external: false },
          ],
        },
        {
          heading: "About",
          links: [
            { label: "Our Story", url: "/about", external: false },
            { label: "Artisans", url: "/artisans", external: false },
            { label: "Craftsmanship", url: "/craftsmanship", external: false },
            {
              label: "Sustainability",
              url: "/sustainability",
              external: false,
            },
          ],
        },
        {
          heading: "Support",
          links: [
            { label: "Contact Us", url: "/contact", external: false },
            { label: "Shipping Info", url: "/shipping", external: false },
            { label: "Returns", url: "/returns", external: false },
            { label: "FAQ", url: "/faq", external: false },
          ],
        },
      ],
      socialLinks: [
        { platform: "instagram", url: "https://instagram.com/holicraft" },
        { platform: "facebook", url: "https://facebook.com/holicraft" },
        { platform: "pinterest", url: "https://pinterest.com/holicraft" },
      ],
      companyInfo: {
        tagline: "Handcrafted with Love",
        description: "Bringing traditional craftsmanship to modern homes.",
        address: "123 Artisan Street\nCraft Village, CV 12345",
        phone: "+1 (555) 123-4567",
        email: "hello@holicraft.com",
      },
    },
  ],

  // Homepage
  homepages: [
    {
      _type: "homePage",
      title: "HoliCraft Homepage",
      slug: { current: "home" },
      sections: [
        {
          _type: "contentSection",
          _key: "hero-section",
          sectionType: "hero",
          sectionName: "Welcome Hero",
          heroTitle: "Handcrafted with Love",
          subheading: "Discover unique pieces made by skilled artisans",
          description:
            "Each product tells a story of tradition, craftsmanship, and passion.",
          image: null,
          imagePosition: "right",
          primaryCta: {
            text: "Shop Now",
            link: "/collections/all",
          },
          secondaryCta: {
            text: "Learn Our Story",
            link: "/about",
          },
          shippingBadge: "Free Shipping Worldwide",
        },
        {
          _type: "categorySection",
          _key: "featured-categories",
          sectionType: "featured-grid",
          sectionName: "Shop by Category",
          title: "Explore Our Collections",
          description:
            "Find the perfect handcrafted piece for your home and lifestyle.",
          categories: [
            {
              _key: "furniture",
              label: "Furniture",
              link: "/collections/furniture",
              description: "Handcrafted wooden furniture",
              productCount: 45,
              featured: true,
              image: null,
            },
            {
              _key: "jewelry",
              label: "Jewelry",
              link: "/collections/jewelry",
              description: "Artisan jewelry pieces",
              productCount: 32,
              featured: false,
              image: null,
            },
            {
              _key: "home-decor",
              label: "Home Decor",
              link: "/collections/home-decor",
              description: "Beautiful home accessories",
              productCount: 28,
              featured: false,
              image: null,
            },
            {
              _key: "kitchen",
              label: "Kitchen & Dining",
              link: "/collections/kitchen-dining",
              description: "Handcrafted kitchen items",
              productCount: 19,
              featured: false,
              image: null,
            },
            {
              _key: "textiles",
              label: "Textiles",
              link: "/collections/textiles",
              description: "Handwoven fabrics",
              productCount: 23,
              featured: false,
              image: null,
            },
            {
              _key: "art",
              label: "Art & Collectibles",
              link: "/collections/art-collectibles",
              description: "Unique artistic pieces",
              productCount: 15,
              featured: false,
              image: null,
            },
          ],
          gridColumns: 3,
          gridGap: "gap-6",
          showCategoryCounts: true,
          showCategoryDescriptions: true,
          imageAspectRatio: "square",
        },
        {
          _type: "productSection",
          _key: "most-loved-products",
          sectionType: "carousel",
          sectionName: "Most Loved Products",
          sectionTitle: "Most Loved",
          description: "Our customers' favorite handcrafted pieces.",
          productSourceType: "collection",
          shopifyCollection: "featured-products",
          productLimit: 6,
          showProductImages: true,
          showProductPrices: true,
          showProductTitles: true,
          showAddToCart: true,
          carouselAutoplay: true,
          carouselSpeed: 5,
          carouselShowArrows: true,
          carouselShowDots: true,
        },
        {
          _type: "productSection",
          _key: "seasonal-edit",
          sectionType: "carousel",
          sectionName: "Seasonal Edit",
          sectionTitle: "Seasonal Edit",
          description: "Fresh arrivals perfect for this season.",
          productSourceType: "collection",
          shopifyCollection: "featured-products",
          productLimit: 6,
          showProductImages: true,
          showProductPrices: true,
          showProductTitles: true,
          showAddToCart: true,
          carouselAutoplay: true,
          carouselSpeed: 4,
          carouselShowArrows: true,
          carouselShowDots: true,
        },
        {
          _type: "contentSection",
          _key: "craftsmanship-story",
          sectionType: "craftsmanship",
          sectionName: "Our Craftsmanship",
          craftsmanshipTitle: "The Art of Traditional Craftsmanship",
          craftsmanshipBody: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "For generations, our artisans have been perfecting their craft, passing down techniques that have stood the test of time. Every piece we create is a testament to their skill and dedication.",
                },
              ],
            },
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "From the careful selection of materials to the final finishing touches, we believe that true beauty lies in the details. Our products are not just items to own, but pieces to cherish and pass on.",
                },
              ],
            },
          ],
          craftsmanshipImage: null,
          craftsmanshipImagePosition: "left",
          craftsmanshipCTA: {
            text: "Meet Our Artisans",
            link: "/artisans",
          },
        },
        {
          _type: "contentSection",
          _key: "testimonials-section",
          sectionType: "testimonials",
          sectionName: "Customer Stories",
          testimonialsTitle: "What Our Customers Say",
          testimonials: [
            {
              _key: "testimonial-1",
              type: "text",
              quote:
                "The quality of craftsmanship is absolutely incredible. I can feel the love and care that went into making this piece.",
              name: "Sarah Johnson",
              source: "Verified Customer",
              image: null,
            },
            {
              _key: "testimonial-2",
              type: "text",
              quote:
                "Every piece tells a story. I love knowing that my purchase supports traditional artisans and their families.",
              name: "Michael Chen",
              source: "Verified Customer",
              image: null,
            },
            {
              _key: "testimonial-3",
              type: "press",
              pressQuote:
                "HoliCraft represents the perfect blend of traditional craftsmanship and modern design.",
              publication: "Artisan Magazine",
            },
          ],
        },
        {
          _type: "contentSection",
          _key: "chat-prompt-section",
          sectionType: "chat",
          sectionName: "Get Personalized Recommendations",
          chatTextBlock: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "Need Help Finding the Perfect Piece?",
                },
              ],
            },
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "Our AI assistant can help you discover products that match your style and needs.",
                },
              ],
            },
          ],
          highlightedInstruction: "Tell us about your style preferences...",
        },
        {
          _type: "imageSection",
          _key: "social-proof-section",
          sectionType: "social-proof",
          sectionName: "Social Proof",
          socialProofTitle: "Trusted by Thousands",
          socialProofImages: [
            {
              _key: "social-proof-1",
              image: null,
              title: "Real customers, real stories",
              description:
                "Join our community of satisfied customers who love handcrafted quality.",
              link: "/testimonials",
            },
            {
              _key: "social-proof-2",
              image: null,
              title: "Verified Reviews",
              description:
                "Thousands of 5-star reviews from happy customers worldwide.",
              link: "/reviews",
            },
          ],
        },
      ],
      seo: {
        title: "HoliCraft - Handcrafted Products Made with Love",
        description:
          "Discover unique handcrafted products made by skilled artisans. From furniture to jewelry, each piece tells a story of tradition and craftsmanship.",
        ogImage: null,
      },
    },
  ],
};

async function seedData() {
  console.log("🌱 Starting to seed Sanity with dummy data...\n");

  try {
    // Seed headers
    console.log("📋 Creating headers...");
    for (const header of dummyData.headers) {
      const existingHeader = await sanityAdminClient.fetch(
        `*[_type == "header" && title == $title][0]`,
        { title: header.title }
      );

      if (!existingHeader) {
        await sanityAdminClient.create(header);
        console.log(`  ✅ Created header: ${header.title}`);
      } else {
        console.log(`  ⏭️  Header already exists: ${header.title}`);
      }
    }

    // Seed menu categories
    console.log("\n📂 Creating menu categories...");
    for (const category of dummyData.menuCategories) {
      const existingCategory = await sanityAdminClient.fetch(
        `*[_type == "menuCategory" && slug.current == $slug][0]`,
        { slug: category.slug.current }
      );

      if (!existingCategory) {
        await sanityAdminClient.create(category);
        console.log(`  ✅ Created category: ${category.name}`);
      } else {
        console.log(`  ⏭️  Category already exists: ${category.name}`);
      }
    }

    // Seed global footer
    console.log("\n🦶 Creating global footer...");
    for (const footer of dummyData.globalFooters) {
      const existingFooter = await sanityAdminClient.fetch(
        `*[_type == "globalFooter" && title == $title][0]`,
        { title: footer.title }
      );

      if (!existingFooter) {
        await sanityAdminClient.create(footer);
        console.log(`  ✅ Created footer: ${footer.title}`);
      } else {
        console.log(`  ⏭️  Footer already exists: ${footer.title}`);
      }
    }

    // Seed homepage
    console.log("\n🏠 Creating homepage...");
    for (const homepage of dummyData.homepages) {
      const existingHomepage = await sanityAdminClient.fetch(
        `*[_type == "homePage" && slug.current == $slug][0]`,
        { slug: homepage.slug.current }
      );

      if (!existingHomepage) {
        await sanityAdminClient.create(homepage);
        console.log(`  ✅ Created homepage: ${homepage.title}`);
      } else {
        console.log(`  ⏭️  Homepage already exists: ${homepage.title}`);
      }
    }

    console.log("\n🎉 Dummy data seeding completed successfully!");
    console.log("\n📝 Summary of created content:");
    console.log("  • Headers: Navigation and branding configuration");
    console.log("  • Menu Categories: Product navigation structure");
    console.log("  • Global Footer: Site footer with links and company info");
    console.log("  • Homepage: Complete homepage with various sections");
    console.log(
      "\n🔗 You can now view and edit this content in your Sanity Studio at /cms"
    );
    console.log(
      "\n💡 Note: Some sections may require images to be uploaded manually in the Sanity Studio"
    );
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

// Run the seeding function
seedData();
