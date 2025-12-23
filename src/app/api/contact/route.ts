// app/api/contact/route.js
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import rateLimit from '@/lib/rateLimit'

// Initialize rate limiter
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  limit: 5 // 5 requests per minute
})

export async function POST(request) {
  try {
    // Get IP address from request
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ip = forwardedFor?.split(',')[0] || realIp || 'unknown'

    // Check rate limit
    const isAllowed = await limiter.check(ip)
    if (!isAllowed) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      )
    }

    // Parse request body
    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid request body.' 
        },
        { status: 400 }
      )
    }
    
    // Validate required fields
    const { name, email, message, timestamp, phone = '' } = body
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please fill all required fields.' 
        },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email address.' 
        },
        { status: 400 }
      )
    }

    // Timestamp validation (prevent old submissions)
    if (timestamp) {
      try {
        const submissionTime = new Date(timestamp)
        const currentTime = new Date()
        const timeDiff = (currentTime - submissionTime) / 1000 / 60 // in minutes
        
        if (timeDiff > 15) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'Submission timeout. Please try again.' 
            },
            { status: 400 }
          )
        }
      } catch (error) {
        // If timestamp is invalid, continue without validation
        console.log('Timestamp validation error:', error)
      }
    }

    // Validate environment variables
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO']
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName])
    
    if (missingEnvVars.length > 0) {
      console.error('Missing environment variables:', missingEnvVars)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Server configuration error. Please contact administrator.' 
        },
        { status: 500 }
      )
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465' || process.env.SMTP_PORT === '587',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
    } catch (error) {
      console.error('SMTP configuration error:', error)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service configuration error. Please try again later.' 
        },
        { status: 500 }
      )
    }

    // Email content
    const mailOptions = {
      from: `"Cybria Secure Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #2B7BE4; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
            <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px; border: 1px solid #ddd;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; text-align: center;">
            This email was sent from the Cybria Secure website contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission
---------------------------
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}
Submitted At: ${new Date().toLocaleString()}
Message: ${message}
      `.trim(),
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Send auto-reply to customer (optional)
    try {
      const autoReplyOptions = {
        from: `"Cybria Secure" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Thank you for contacting Cybria Secure',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333;">Thank You for Contacting Cybria Secure</h2>
            <p>Dear ${name},</p>
            <p>We have received your message and our team will get back to you within 24 hours.</p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Your Message:</strong></p>
              <p>${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
            </div>
            <p><strong>Our Contact Information:</strong></p>
            <p>📞 +91 80804 24274 | +91 75591 35608</p>
            <p>📍 Sidharth nagar, near church, Kolhapur, Nej Gaon, Maharashtra 416110</p>
            <p>📧 sales@cybriasecure.com</p>
            <p style="margin-top: 30px;">Best regards,<br>The Cybria Secure Team</p>
          </div>
        `,
      }

      await transporter.sendMail(autoReplyOptions)
    } catch (autoReplyError) {
      console.warn('Auto-reply failed, but main email sent:', autoReplyError)
      // Don't fail the main request if auto-reply fails
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We will contact you soon.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message. Please try again later or contact us directly.',
      },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { 
      success: false, 
      message: 'Method not allowed' 
    },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { 
      success: false, 
      message: 'Method not allowed' 
    },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { 
      success: false, 
      message: 'Method not allowed' 
    },
    { status: 405 }
  )
}