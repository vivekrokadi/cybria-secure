import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '../../lib/markdown'
import { FiCalendar, FiUser, FiClock, FiArrowRight } from 'react-icons/fi'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata'
  })

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image || `https://www.cybriasecure.com/api/og?title=${encodeURIComponent(post.title)}`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cybria Secure',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.cybriasecure.com/logo.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.cybriasecure.com/blog/${post.slug}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article 
        itemScope
        itemType="https://schema.org/BlogPosting"
        className="group relative bg-[#1a2236] rounded-2xl overflow-hidden border border-gray-800 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-[#2B7BE4]/10 focus-within:ring-2 focus-within:ring-[#2B7BE4] focus-within:outline-none"
      >
        <div className="relative h-48 bg-gradient-to-br from-[#2B7BE4]/20 to-[#7C3AED]/20 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2B7BE4] to-[#7C3AED] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg" aria-label="Cybria Secure Logo">CS</span>
            </div>
          </div>
          
          {post.image && (
            <Image
              src={post.image}
              alt={`Featured image for ${post.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
              loading="lazy"
              quality={75}
            />
          )}
        </div>

        <div className="p-6">
          <span className="inline-block px-3 py-1 bg-[#2B7BE4]/10 text-[#2B7BE4] text-xs font-semibold rounded-full mb-4">
            {post.category}
          </span>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#2B7BE4] transition-colors">
            <Link 
              href={`/blog/${post.slug}`}
              className="focus:outline-none focus:ring-2 focus:ring-[#2B7BE4] focus:ring-offset-2 focus:ring-offset-[#1a2236] rounded"
              itemProp="url"
              aria-label={`Read article: ${post.title}`}
            >
              <span itemProp="headline">{post.title}</span>
            </Link>
          </h3>

          <p 
            className="text-gray-400 text-sm mb-6 line-clamp-3"
            itemProp="description"
          >
            {post.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-500 mb-6 gap-3">
            <div className="flex flex-wrap items-center gap-4">
              <div 
                className="flex items-center space-x-1"
                itemProp="datePublished"
                content={new Date(post.date).toISOString()}
              >
                <FiCalendar className="w-4 h-4" aria-hidden="true" />
                <time dateTime={new Date(post.date).toISOString()}>
                  {formattedDate}
                </time>
              </div>
              <div className="flex items-center space-x-1">
                <FiUser className="w-4 h-4" aria-hidden="true" />
                <span itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{post.author}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <FiClock className="w-4 h-4" aria-hidden="true" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center px-4 py-2 text-[#2B7BE4] font-medium hover:text-[#FF5CA8] transition-colors group/link focus:outline-none focus:ring-2 focus:ring-[#2B7BE4] focus:ring-offset-2 focus:ring-offset-[#1a2236] rounded"
            aria-label={`Read full article: ${post.title}`}
            prefetch={false}
          >
            <span>Read Article</span>
            <FiArrowRight 
              className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" 
              aria-hidden="true" 
            />
          </Link>
        </div>

        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#1a2236] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
          aria-hidden="true"
        />
        
        <meta itemProp="publisher" content="Cybria Secure" />
        <meta itemProp="inLanguage" content="en-IN" />
        
        
        {post.keywords && (
          <meta 
            itemProp="keywords" 
            content={
              Array.isArray(post.keywords) 
                ? post.keywords.join(', ') 
                : post.keywords
            } 
          />
        )}
      </article>
    </>
  )
}