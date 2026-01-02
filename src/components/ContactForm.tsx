"use client";

import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _honeypot: "",
    _timestamp: Date.now().toString(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneRegex = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;
      const cleanedPhone = formData.phone.replace(/[\s-]/g, "");
      if (!phoneRegex.test(cleanedPhone)) {
        newErrors.phone = "Please enter a valid 10-digit Indian phone number";
      }
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < 2000) {
      newErrors._form = "Please wait a moment before submitting again";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      if (errors._form) {
        toast.error(errors._form);
      } else {
        const firstError = Object.values(errors)[0];
        if (firstError) {
          toast.error(firstError);
        }
      }
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(Date.now());

    // Prepare data for submission
    const submissionData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim() || "No message provided",
      _honeypot: formData._honeypot,
      _timestamp: Date.now().toString(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      
      const responseText = await response.text();

      if (!response.ok) {
        
        let errorMessage = `Submission failed: ${response.status}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!data || data.success === false) {
        throw new Error(data?.message || "Failed to send message");
      }

      toast.success(data.message || "Message sent successfully!");

      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        _honeypot: "",
        _timestamp: Date.now().toString(),
      });
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);

      if (error instanceof Error) {
        const errorMsg = error.message.toLowerCase();

       
        if (errorMsg.includes("400") || errorMsg.includes("bad request")) {
          
          if (
            errorMsg.includes("name") ||
            errorMsg.includes("email") ||
            errorMsg.includes("phone")
          ) {
            toast.error(
              "Please check all required fields are filled correctly"
            );
          } else if (
            errorMsg.includes("invalid login") ||
            errorMsg.includes("email configuration")
          ) {
            toast.error("Email configuration error. Please contact support.");
          } else {
            toast.error("Invalid form data. Please check all fields.");
          }
        } else if (
          errorMsg.includes("429") ||
          errorMsg.includes("too many") ||
          errorMsg.includes("rate limit")
        ) {
          toast.error("Too many submissions. Please try again later.");
        } else if (
          errorMsg.includes("network") ||
          errorMsg.includes("failed to fetch") ||
          errorMsg.includes("enotfound")
        ) {
          toast.error("Network error. Please check your internet connection.");
        } else if (
          errorMsg.includes("500") ||
          errorMsg.includes("server error") ||
          errorMsg.includes("econnrefused")
        ) {
          toast.error(
            "Server error. Please try again later or contact support."
          );
        } else if (
          errorMsg.includes("message") &&
          errorMsg.includes("required")
        ) {
          toast.error("Message field is required");
        } else {
          toast.error("Failed to send message. Please try again.");
        }
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

   
    if ((name === "_honeypot" || name === "_timestamp") && value) {
      console.warn("Hidden field modified - possible bot activity");
      return;
    }

    
    let processedValue = value;
    if (name === "phone") {
      
      processedValue = value.replace(/[^\d+]/g, "");

     
      if (processedValue.startsWith("+91") && processedValue.length > 3) {
        const digits = processedValue.slice(3).replace(/\D/g, "");
        if (digits.length <= 5) {
          processedValue = `+91 ${digits}`;
        } else if (digits.length <= 10) {
          processedValue = `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
        } else {
          processedValue = `+91 ${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
        }
      } else if (processedValue.length > 10) {
        
        const digits = processedValue.replace(/\D/g, "");
        if (digits.length === 10) {
          processedValue = `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot Fields */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_honeypot" className="sr-only">
          Leave this field empty
        </label>
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

      {/* Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300"
        >
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
            className={`w-full pl-10 pr-3 py-3 bg-[#1a2236] border ${
              errors.name ? "border-red-500" : "border-gray-700"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7BE4] focus:border-transparent transition-colors`}
            placeholder="Enter your full name"
            required
            disabled={isSubmitting}
            minLength={2}
            maxLength={50}
          />
        </div>
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300"
        >
          Email Address *
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-3 bg-[#1a2236] border ${
              errors.email ? "border-red-500" : "border-gray-700"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7BE4] focus:border-transparent transition-colors`}
            placeholder="Enter your email address"
            required
            disabled={isSubmitting}
          />
        </div>
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-300"
        >
          Mobile Number *
        </label>
        <div className="relative">
          <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-3 bg-[#1a2236] border ${
              errors.phone ? "border-red-500" : "border-gray-700"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7BE4] focus:border-transparent transition-colors`}
            placeholder="Enter your mobile number"
            required
            disabled={isSubmitting}
            maxLength={15}
          />
        </div>
        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
      </div>

      {/* Message Field - Optional */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300"
        >
          Message (Optional)
        </label>
        <div className="relative">
          <FiMessageSquare className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full pl-10 pr-3 py-3 bg-[#1a2236] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7BE4] focus:border-transparent transition-colors resize-none"
            placeholder="Briefly describe your cybersecurity needs..."
            disabled={isSubmitting}
            maxLength={500}
          />
        </div>
        <div className="flex justify-between text-xs">
          
          <span
            className={`${
              formData.message.length > 500 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {formData.message.length}/500
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-[#2B7BE4]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending Message...
            </span>
          ) : (
            "Send Message"
          )}
        </button>
        <div className="mt-3 text-center text-sm text-gray-400">
          <p>* Required fields | We'll respond within 24 hours</p>
          <p className="mt-1 text-xs">
            By submitting, you agree to our privacy policy
          </p>
        </div>
      </div>
    </form>
  );
}
