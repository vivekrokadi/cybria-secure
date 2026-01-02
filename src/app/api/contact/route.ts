import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

// Simple rate limiting function
function checkRateLimit(ip: string): { allowed: boolean; message?: string } {
  const now = Date.now();
  const userData = ipRequestCounts.get(ip);

  if (!userData) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  // Reset if window has passed
  if (now > userData.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  // Check if user has exceeded limit
  if (userData.count >= MAX_REQUESTS_PER_WINDOW) {
    return { 
      allowed: false, 
      message: 'Too many requests. Please try again later.' 
    };
  }

  // Increment count
  userData.count++;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          message: rateLimit.message || 'Rate limit exceeded' 
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, message, _honeypot, _timestamp } = body;

    // Check honeypot field (should be empty for humans)
    if (_honeypot && _honeypot.trim() !== '') {
      console.warn(`Bot detected: honeypot field was filled from IP: ${ip}`);
      return NextResponse.json(
        { success: true, message: 'Message sent successfully!' },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and phone are required fields.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Validate phone format (basic check)
    const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{8,}$/;
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid phone number.' },
        { status: 400 }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Cybria Secure Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2B7BE4 0%, #7C3AED 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #ddd; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #2B7BE4; display: block; margin-bottom: 5px; }
              .value { color: #555; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #777; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">New Contact Form Submission</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Cybria Secure Website</p>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Name:</span>
                  <span class="value">${name}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value"><a href="mailto:${email}">${email}</a></span>
                </div>
                <div class="field">
                  <span class="label">Phone:</span>
                  <span class="value"><a href="tel:${phone.replace(/\s/g, '')}">${phone}</a></span>
                </div>
                <div class="field">
                  <span class="label">Message:</span>
                  <div class="value" style="background: white; padding: 10px; border-radius: 5px; border: 1px solid #eee; margin-top: 5px;">
                    ${message || 'No message provided'}
                  </div>
                </div>
                <div class="field">
                  <span class="label">Submission Time:</span>
                  <span class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</span>
                </div>
                <div class="footer">
                  <p>This email was sent from the contact form on Cybria Secure website.</p>
                  <p>IP Address: ${ip}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission - Cybria Secure

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message || 'No message provided'}

Submission Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)
IP Address: ${ip}

This email was sent from the contact form on Cybria Secure website.
      `.trim(),
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
        messageId: info.messageId 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Specific error handling
    let errorMessage = 'Failed to send message. Please try again later.';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Email configuration error. Please contact support.';
      } else if (error.message.includes('ENOTFOUND')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Email server connection failed.';
      }
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: statusCode }
    );
  }
}

// Also handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}