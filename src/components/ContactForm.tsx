'use client'

import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    _honeypot: '',
    _timestamp: Date.now().toString(),
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

  const services = [
    'Cyber Security',
    'Governance Risk Assessment',
    'Training and Awareness',
    'Banking Security',
    'Incident Response',
    'Red Teaming',
    'Other Service'
  ]

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

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\+]?[1-9][\d\s\-\(\)]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
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
          service: '',
          message: '',
          _honeypot: '',
          _timestamp: Date.now().toString(),
        })
        setErrors({})
      } else {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot Fields */}
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

      {/* Compact Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Field */}
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Full Name *
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 bg-[#1a2236] border ${
                errors.name ? 'border-red-500' : 'border-gray-700'
              } rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2B7BE4] focus:border-transparent transition-colors text-sm`}
              placeholder="John Doe"
              required
              disabled={isSubmitting}
              minLength={2}
              maxLength={50}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email *
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 bg-[#1a2236] border ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              } rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2B7BE4] focus:border-transparent transition-colors text-sm`}
              placeholder="john@example.com"
              required
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone Field - Now Required */}
        <div className="space-y-1">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
            Phone Number *
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 bg-[#1a2236] border ${
                errors.phone ? 'border-red-500' : 'border-gray-700'
              } rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2B7BE4] focus:border-transparent transition-colors text-sm`}
              placeholder="+91 98765 43210"
              required
              disabled={isSubmitting}
              pattern="^[\+]?[1-9][\d\s\-\(\)]{8,}$"
              maxLength={15}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Include country code</p>
        </div>

        {/* Service Selection */}
        <div className="space-y-1">
          <label htmlFor="service" className="block text-sm font-medium text-gray-300">
            Interested Service (Optional)
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#1a2236] border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2B7BE4] focus:border-transparent transition-colors text-sm"
            disabled={isSubmitting}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message Field - More Compact */}
      <div className="space-y-1">
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
          Message *
        </label>
        <div className="relative">
          <FiMessageSquare className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full pl-10 pr-3 py-2 bg-[#1a2236] border ${
              errors.message ? 'border-red-500' : 'border-gray-700'
            } rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2B7BE4] focus:border-transparent transition-colors text-sm resize-none`}
            placeholder="Briefly describe your security needs..."
            required
            disabled={isSubmitting}
            minLength={10}
            maxLength={500}
          />
        </div>
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message}</p>
        )}
        <div className="flex justify-between text-xs mt-1">
          <span className="text-gray-500">Min. 10 characters</span>
          <span className={`${formData.message.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
            {formData.message.length}/500
          </span>
        </div>
      </div>

      {/* Compact Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-[#2B7BE4]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
        <div className="mt-2 text-xs text-gray-400 text-center">
          <p>* Required fields | Response within 24 hours</p>
          <p className="mt-1">By submitting, you agree to our privacy policy</p>
        </div>
      </div>
    </form>
  )
}