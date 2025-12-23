'use client'

import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    _honeypot: '', 
    _timestamp: Date.now().toString(), 
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

   
    const now = Date.now()
    if (now - lastSubmitTime < 2000) {
      newErrors._form = 'Please wait a moment before submitting again'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      if (errors._form) {
        toast.error(errors._form)
      } else {
        toast.error('Please fix the errors in the form')
      }
      return
    }

    setIsSubmitting(true)
    setLastSubmitTime(Date.now())

    // Update timestamp for this submission
    const updatedFormData = {
      ...formData,
      _timestamp: Date.now().toString(),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `Submission failed (${response.status})`)
      }

      if (data.success) {
        toast.success(data.message || 'Message sent successfully!')
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          _honeypot: '',
          _timestamp: Date.now().toString(),
        })
        setErrors({})
      } else {
        // Handle specific errors from API
        if (data.message?.toLowerCase().includes('too fast')) {
          toast.error('Please wait a moment before submitting again')
        } else if (data.message?.toLowerCase().includes('rate limit') || data.message?.toLowerCase().includes('too many')) {
          toast.error('Too many submissions. Please try again later.')
        } else if (data.message?.toLowerCase().includes('bot') || data.message?.toLowerCase().includes('spam')) {
          toast.error('Submission flagged as potential spam. Please try again.')
        } else if (data.message?.toLowerCase().includes('expired')) {
          toast.error('Form session expired. Please refresh the page and try again.')
        } else {
          toast.error(data.message || 'Failed to send message')
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      if (error instanceof Error) {
        const errorMsg = error.message.toLowerCase()
        if (errorMsg.includes('too fast') || errorMsg.includes('rate limit')) {
          toast.error('Please wait a moment before submitting again')
        } else if (errorMsg.includes('network') || errorMsg.includes('failed to fetch')) {
          toast.error('Network error. Please check your connection and try again.')
        } else {
          toast.error(error.message || 'Failed to send message. Please try again.')
        }
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    
    
    if ((name === '_honeypot' || name === '_timestamp') && value) {
      
      console.warn('Hidden field modified - possible bot activity')
      return
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_honeypot" className="sr-only">Leave this field empty</label>
        <input
          type="text"
          id="_honeypot"
          name="_honeypot"
          value={formData._honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="absolute opacity-0 w-0 h-0"
        />
        <input
          type="hidden"
          id="_timestamp"
          name="_timestamp"
          value={formData._timestamp}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-[#1a2236] border ${
              errors.name ? 'border-red-500' : 'border-gray-700'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7BE4] focus:border-transparent transition-colors`}
            placeholder="Enter your full name"
            required
            disabled={isSubmitting}
            minLength={2}
            maxLength={100}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-[#1a2236] border ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7BE4] focus:border-transparent transition-colors`}
            placeholder="Enter your email address"
            required
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#1a2236] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7BE4] focus:border-transparent transition-colors"
          placeholder="+91 00000 00000"
          disabled={isSubmitting}
          pattern="^[+]?[\d\s\-()]+$"
          maxLength={20}
        />
        <p className="mt-1 text-xs text-gray-500">Include country code if outside India</p>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 bg-[#1a2236] border ${
            errors.message ? 'border-red-500' : 'border-gray-700'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7BE4] focus:border-transparent transition-colors resize-none`}
          placeholder="Tell us about your security needs..."
          required
          disabled={isSubmitting}
          minLength={10}
          maxLength={1000}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
        <div className="mt-1 flex justify-between text-xs">
          <span className="text-gray-500">Minimum 10 characters</span>
          <span className={`${formData.message.length > 1000 ? 'text-red-500' : 'text-gray-500'}`}>
            {formData.message.length}/1000
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending Message...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
        <div className="mt-2 text-sm text-gray-400">
          <p>* Required fields</p>
          <p className="text-xs mt-1">By submitting, you agree to our privacy policy and consent to be contacted.</p>
        </div>
      </div>
    </form>
  )
}