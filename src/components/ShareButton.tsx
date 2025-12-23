'use client'

import React from 'react' 
import { FiShare2 } from 'react-icons/fi'

interface ShareButtonProps {
  title: string
  text: string
  url: string
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title,
        text,
        url,
      })
    } else {
      navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-2 px-4 py-2 bg-[#1a2236] text-gray-300 rounded-lg hover:bg-[#2B7BE4]/10 hover:text-[#2B7BE4] transition-colors"
    >
      <FiShare2 className="w-4 h-4" />
      <span>Share</span>
    </button>
  )
}