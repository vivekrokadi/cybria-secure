import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  type?: 'website' | 'article' | 'product'
  schema?: Record<string, any>
}

export default function SEO({ 
  title = 'Cybria Secure - Cybersecurity Services in Kolhapur',
  description = 'Professional cybersecurity services in Kolhapur, Maharashtra. Expert penetration testing, risk assessment, incident response, and security training.',
  keywords = [],
  ogImage = '/og-image.jpg',
  canonical,
  publishedTime,
  modifiedTime,
  author = 'Cybria Secure',
  type = 'website',
  schema
}: SEOProps) {
  const router = useRouter()
  const baseUrl = 'https://www.cybriasecure.com'
  const currentUrl = canonical || `${baseUrl}${router.asPath}`
  
  const allKeywords = [
    ...keywords,
    'cybersecurity services Kolhapur',
    'cyber security company Maharashtra',
    'penetration testing',
    'risk assessment',
    'incident response'
  ]

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="author" content={author} />

      <link rel="canonical" href={currentUrl} />
            
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:site_name" content="Cybria Secure" />
      <meta property="og:locale" content="en_IN" />
      
      
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${baseUrl}${ogImage}`} />
      
      
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      
      
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  )
}