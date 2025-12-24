import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts } from '../../../lib/markdown'
import BlogCard from '../../components/BlogCard'

export const metadata: Metadata = {
  title: 'Cybersecurity Blog | Cybria Secure - Expert Insights',
  description: 'Latest cybersecurity insights, tips, and industry updates from Cybria Secure experts. Serving Kolhapur, Sangli, Solapur, and across Maharashtra.',
  keywords: 'cybersecurity blog, security tips, threat intelligence, Maharashtra security updates',
}

export default function BlogPage() {
  const blogPosts = getAllBlogPosts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Cybria Secure Cybersecurity Blog',
    description: 'Expert insights and updates on cybersecurity for businesses in Maharashtra',
    url: 'https://www.cybriasecure.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Cybria Secure',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.cybriasecure.com/logo.svg',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen py-20 bg-[#0b1220]">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Cybersecurity </span>
              <span className="text-gradient">Insights</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Expert articles, security tips, and industry updates from Cybria Secure professionals. 
              Stay informed about the latest threats and protection strategies for businesses across the Globe.
            </p>
          </div>

          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-[#2B7BE4] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">CS</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Coming Soon</h3>
                <p className="text-gray-400 mb-8">
                  Our cybersecurity experts are preparing valuable insights and tips for businesses across the Globe 
                  Check back soon for our first blog posts!
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300"
                >
                  Subscribe for Updates
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Categories */}
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                <button className="px-6 py-2 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-medium rounded-full">
                  All Posts
                </button>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {blogPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-[#2B7BE4]/10 via-[#FF5CA8]/10 to-[#7C3AED]/10 rounded-2xl p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Need Professional Cybersecurity Advice?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Our experts are ready to help secure your business. Contact us for a free security consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300"
                  >
                    Schedule Consultation
                  </Link>
                  <a
                    href="tel:+918080424274"
                    className="px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
                  >
                    Call +91 80804 24274
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}