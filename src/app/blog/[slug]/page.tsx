import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug, getAllBlogPosts, isValidSlug } from '../../../../lib/markdown'
import { FiCalendar, FiUser, FiClock, FiArrowLeft } from 'react-icons/fi'
import ShareButton from '../../../components/ShareButton'
import React from 'react' // Add this import

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  
  if (!slug || !isValidSlug(slug)) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }
  
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} | Cybria Secure Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [post.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  
  // Validate slug before processing
  if (!slug || typeof slug !== 'string') {
    console.error('Invalid slug parameter:', slug)
    notFound()
  }

  const post = getBlogPostBySlug(slug)

  if (!post) {
    console.warn(`Blog post not found for slug: ${slug}`)
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://www.cybriasecure.com${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cybria Secure',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.cybriasecure.com/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.cybriasecure.com/blog/${post.slug}`,
    },
  }

  // Function to render markdown content
  const renderMarkdown = (content: string) => {
    const lines = content.split('\n')
    const elements: React.ReactNode[] = [] // Use React.ReactNode instead
    let inList = false
    let listItems: string[] = []

    lines.forEach((line, index) => {
      // Handle headings
      if (line.startsWith('# ')) {
        if (inList && listItems.length > 0) {
          // Close previous list
          elements.push(
            <ul key={`ul-${index}`} className="list-disc pl-6 mb-4">
              {listItems.map((item, i) => (
                <li key={i} className="text-gray-300 mb-1">{item}</li>
              ))}
            </ul>
          )
          listItems = []
          inList = false
        }
        elements.push(
          <h1 key={index} className="text-4xl font-bold text-white mb-6 mt-8">
            {line.substring(2)}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        if (inList && listItems.length > 0) {
          elements.push(
            <ul key={`ul-${index}`} className="list-disc pl-6 mb-4">
              {listItems.map((item, i) => (
                <li key={i} className="text-gray-300 mb-1">{item}</li>
              ))}
            </ul>
          )
          listItems = []
          inList = false
        }
        elements.push(
          <h2 key={index} className="text-3xl font-bold text-white mb-4 mt-6">
            {line.substring(3)}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        if (inList && listItems.length > 0) {
          elements.push(
            <ul key={`ul-${index}`} className="list-disc pl-6 mb-4">
              {listItems.map((item, i) => (
                <li key={i} className="text-gray-300 mb-1">{item}</li>
              ))}
            </ul>
          )
          listItems = []
          inList = false
        }
        elements.push(
          <h3 key={index} className="text-2xl font-bold text-white mb-3 mt-4">
            {line.substring(4)}
          </h3>
        )
      } 
      // Handle unordered list
      else if (line.startsWith('- ')) {
        if (!inList) {
          inList = true
        }
        listItems.push(line.substring(2))
      }
      // Handle numbered list
      else if (/^\d+\.\s/.test(line)) {
        if (!inList) {
          inList = true
        }
        listItems.push(line.replace(/^\d+\.\s/, ''))
      }
      // Handle empty lines
      else if (line.trim() === '') {
        if (inList && listItems.length > 0) {
          elements.push(
            <ul key={`ul-${index}`} className="list-disc pl-6 mb-4">
              {listItems.map((item, i) => (
                <li key={i} className="text-gray-300 mb-1">{item}</li>
              ))}
            </ul>
          )
          listItems = []
          inList = false
        }
        elements.push(<div key={index} className="mb-4" />)
      }
      // Handle regular paragraphs
      else {
        if (inList && listItems.length > 0) {
          elements.push(
            <ul key={`ul-${index}`} className="list-disc pl-6 mb-4">
              {listItems.map((item, i) => (
                <li key={i} className="text-gray-300 mb-1">{item}</li>
              ))}
            </ul>
          )
          listItems = []
          inList = false
        }
        
        // Simple bold text handling
        const renderLineWithBold = (text: string) => {
          const parts = text.split('**')
          return parts.map((part, partIndex) => {
            if (partIndex % 2 === 1) {
              // Bold text
              return <strong key={partIndex} className="text-white font-semibold">{part}</strong>
            }
            return part
          })
        }
        
        elements.push(
          <p key={index} className="mb-4 text-gray-300">
            {renderLineWithBold(line)}
          </p>
        )
      }
    })

    // Handle any remaining list items
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key="final-list" className="list-disc pl-6 mb-4">
          {listItems.map((item, i) => (
            <li key={i} className="text-gray-300 mb-1">{item}</li>
          ))}
        </ul>
      )
    }

    return elements
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen py-20 bg-[#0b1220] px-5">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
            >
              <FiArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center space-x-2">
                <FiCalendar className="w-5 h-5" />
                <span>{new Date(post.date).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiUser className="w-5 h-5" />
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiClock className="w-5 h-5" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Share Button */}
            <div className="flex items-center space-x-4">
              <ShareButton 
                title={post.title}
                text={post.excerpt}
                url={`https://www.cybriasecure.com/blog/${post.slug}`}
              />
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-[#2B7BE4]/20 to-[#7C3AED]/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#2B7BE4] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-3xl">CS</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Cybria Secure</h2>
                <p className="text-gray-300 mt-2">Cybersecurity Experts</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none mb-16">
            <div className="text-gray-300 leading-relaxed">
              {renderMarkdown(post.content)}
            </div>
          </div>

          {/* Author Box */}
          <div className="bg-[#1a2236] rounded-2xl p-8 mb-12 border border-gray-800">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2B7BE4] to-[#7C3AED] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">CS</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">About Cybria Secure</h3>
                <p className="text-gray-400">
                  Leading cybersecurity services provider in Kolhapur, serving businesses across Maharashtra. 
                  Our team of certified professionals is dedicated to protecting your digital assets and ensuring 
                  your business stays secure in today's threat landscape.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#2B7BE4]/10 via-[#FF5CA8]/10 to-[#7C3AED]/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Professional Cybersecurity Help?
            </h3>
            <p className="text-gray-300 mb-6">
              Contact our experts for a free security consultation tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300"
              >
                Contact Us Now
              </Link>
              <a
                href="tel:+918080424274"
                className="px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
              >
                Call +91 80804 24274
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}