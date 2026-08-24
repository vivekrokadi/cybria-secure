import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/markdown'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cybriasecure.com'

const serviceRoutes = [
  // VAPT
  'web-application-vapt',
  'network-security-audit',
  'mobile-app-security',
  'cloud-security-assessment',
  'api-security-testing',
  'ot-scada-security',
  // Advanced
  'red-teaming',
  'incident-response',
  // Compliance
  'rbi-compliance',
  'iso-27001',
  'governance-risk-assessment',
  // Managed
  'vciso',
  // Training
  'security-awareness-training',
]

const locationRoutes = [
  'kolhapur', 'pune', 'sangli', 'ichalkaranji', 'solapur', 'mumbai',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`,         lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${baseUrl}/about`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`,lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${baseUrl}/resources`,lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const serviceDetailRoutes: MetadataRoute.Sitemap = serviceRoutes.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const locationPageRoutes: MetadataRoute.Sitemap = locationRoutes.map((city) => ({
    url: `${baseUrl}/services/${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...staticRoutes, ...serviceDetailRoutes, ...locationPageRoutes, ...blogRoutes]
}