import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/markdown'
import { services } from '../../lib/servicesData'
import { industries } from '../../lib/industriesData'
import { complianceFrameworks } from '../../lib/complianceData'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cybriasecure.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts()

  // ── Static routes ─────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`,               lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0  },
    { url: `${baseUrl}/about`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${baseUrl}/services`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${baseUrl}/industries`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/compliance`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/resources`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7  },
    { url: `${baseUrl}/contact`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${baseUrl}/privacy-policy`,lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3  },
  ]

  // ── Service detail pages ───────────────────────────────────────────────────
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  // ── Industry pages ─────────────────────────────────────────────────────────
  const industryRoutes: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // ── Compliance pages ───────────────────────────────────────────────────────
  const complianceRoutes: MetadataRoute.Sitemap = complianceFrameworks.map((f) => ({
    url: `${baseUrl}/compliance/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // ── Blog posts ─────────────────────────────────────────────────────────────
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...complianceRoutes,
    ...blogRoutes,
  ]
}