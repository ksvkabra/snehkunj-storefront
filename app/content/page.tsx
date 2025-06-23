import { getAllBlogPosts, getAllPages, getMarketingContent } from 'lib/sanity/data-layer';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function ContentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Content Management
        </h1>
        <p className="text-xl text-gray-600">
          This page demonstrates the proper architecture: Shopify for e-commerce, Sanity for content
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Blog Posts Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Blog Posts</h2>
          <Suspense fallback={<div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>}>
            <BlogPostsList />
          </Suspense>
        </div>

        {/* Pages Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pages</h2>
          <Suspense fallback={<div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>}>
            <PagesList />
          </Suspense>
        </div>
      </div>

      {/* Marketing Content Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Marketing Content</h2>
        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>}>
          <MarketingContentList />
        </Suspense>
      </div>

      {/* Architecture Explanation */}
      <div className="mt-16 p-8 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Architecture Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Shopify (E-commerce)</h4>
            <ul className="text-blue-700 space-y-1">
              <li>• Products and variants</li>
              <li>• Inventory management</li>
              <li>• Orders and fulfillment</li>
              <li>• Cart and checkout</li>
              <li>• Customer accounts</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Sanity (Content Management)</h4>
            <ul className="text-blue-700 space-y-1">
              <li>• Blog posts and articles</li>
              <li>• Static pages</li>
              <li>• Marketing content</li>
              <li>• SEO content</li>
              <li>• Media management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

async function BlogPostsList() {
  const posts = await getAllBlogPosts(5);

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No blog posts found</p>
        <p className="text-sm text-gray-400 mt-2">Add blog posts in your Sanity Studio</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-4">
            {post.featuredImage && (
              <div className="flex-shrink-0">
                <Image
                  src={post.featuredImage.asset.url}
                  alt={post.featuredImage.alt || post.title}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                {post.author && <span>{post.author.name}</span>}
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function PagesList() {
  const pages = await getAllPages();

  if (pages.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No pages found</p>
        <p className="text-sm text-gray-400 mt-2">Add pages in your Sanity Studio</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {pages.map((page) => (
        <div key={page._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium text-gray-900">
            {page.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            /{page.slug.current}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Last updated: {new Date(page._updatedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

async function MarketingContentList() {
  const content = await getMarketingContent();

  if (content.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No marketing content found</p>
        <p className="text-sm text-gray-400 mt-2">Add marketing content in your Sanity Studio</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {content.map((item) => (
        <div key={item._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {item.contentType}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {item.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {item.title}
          </h3>
          {item.image && (
            <div className="mb-3">
              <Image
                src={item.image.asset.url}
                alt={item.image.alt || item.title}
                width={200}
                height={120}
                className="rounded object-cover w-full"
              />
            </div>
          )}
          {item.cta && (
            <div className="mt-3">
              <span className="text-sm text-gray-600">CTA: </span>
              <span className="text-sm font-medium text-blue-600">{item.cta.text}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 