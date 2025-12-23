import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimit.get(ip)

  if (!record) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (record.count >= MAX_REQUESTS) {
    return true
  }

  record.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1'
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, phone, message, _honeypot, _timestamp } = body // Changed from timestamp to _timestamp

    // Honeypot validation
    if (_honeypot && _honeypot.trim() !== '') {
      console.log('Honeypot triggered:', { ip, honeypot: _honeypot })
      return NextResponse.json(
        { success: false, message: 'Form submission rejected.' },
        { status: 400 }
      )
    }

    // Client-side timestamp validation (more lenient)
    const submitTime = parseInt(_timestamp || '0')
    const now = Date.now()
    
    // Validate timestamp exists and is reasonable (not too old or in future)
    if (!_timestamp || isNaN(submitTime)) {
      console.log('Invalid timestamp:', { ip, _timestamp })
      return NextResponse.json(
        { success: false, message: 'Invalid form submission.' },
        { status: 400 }
      )
    }

    // Check if timestamp is too old (more than 30 minutes) or in the future
    const timeDiff = Math.abs(now - submitTime)
    if (timeDiff > 30 * 60 * 1000) { // 30 minutes
      console.log('Timestamp too old or in future:', { ip, submitTime, now, timeDiff })
      return NextResponse.json(
        { success: false, message: 'Form session expired. Please refresh and try again.' },
        { status: 400 }
      )
    }

    // Required field validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    // Name validation
    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Name must be at least 2 characters.' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Message validation
    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters.' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitize = (str: string) => {
      if (!str) return ''
      return str
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .trim()
    }
    
    const sanitizedName = sanitize(name)
    const sanitizedEmail = sanitize(email)
    const sanitizedPhone = phone ? sanitize(phone) : 'Not provided'
    const sanitizedMessage = sanitize(message)

    // Validate sanitized values
    if (sanitizedName.length < 2 || sanitizedEmail.length < 5 || sanitizedMessage.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Invalid input detected. Please check your entries.' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Verify SMTP connection
    try {
      await transporter.verify()
    } catch (error) {
      console.error('SMTP connection error:', error)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service temporarily unavailable. Please try again later.' 
        },
        { status: 503 }
      )
    }

    // Email content
    const mailOptions = {
      from: `"Cybria Secure Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: sanitizedEmail,
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2B7BE4 0%, #FF5CA8 50%, #7C3AED 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #2B7BE4; }
              .value { padding: 8px; background: white; border-radius: 4px; border: 1px solid #ddd; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${sanitizedName}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${sanitizedEmail}</div>
                </div>
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${sanitizedPhone}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="field">
                  <div class="label">Submitted At:</div>
                  <div class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
                </div>
                <div class="field">
                  <div class="label">IP Address:</div>
                  <div class="value">${ip}</div>
                </div>
                <div class="footer">
                  <p>This email was sent from the contact form on Cybria Secure website.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Phone: ${sanitizedPhone}

Message:
${sanitizedMessage}

Submitted At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
IP Address: ${ip}
      `.trim(),
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Clean up old rate limit records
    const nowCleanup = Date.now()
    for (const [key, record] of rateLimit.entries()) {
      if (nowCleanup > record.resetTime) {
        rateLimit.delete(key)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while sending your message. Please try again later.' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  )
}