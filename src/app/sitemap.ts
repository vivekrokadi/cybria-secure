import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/markdown'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cybriasecure.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts()

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/services/cyber-security',
    '/services/governance-risk-assessment',
    '/services/training-awareness',
    '/services/banking-security',
    '/services/incident-response',
    '/blog',
    '/contact',
    '/kolhapur',
    '/ichalkaranji',
    '/miraj',
    '/sangli',
    '/solapur',
  ]

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === ''
        ? 'daily'
        : route.startsWith('/blog')
        ? 'weekly'
        : 'monthly',
    priority:
      route === ''
        ? 1
        : route.startsWith('/blog')
        ? 0.8
        : 0.7,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...routes, ...blogRoutes]
}
