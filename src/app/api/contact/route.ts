
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting: 5 requests per IP per hour.
// Note: this in-memory limit resets when the server restarts and is
// not shared between serverless instances.
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const ipRequestCounts = new Map<
  string,
  { count: number; resetTime: number }
>();

function checkRateLimit(
  ip: string
): { allowed: boolean; message?: string } {
  const now = Date.now();
  const userData = ipRequestCounts.get(ip);

  if (!userData || now > userData.resetTime) {
    ipRequestCounts.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });

    return { allowed: true };
  }

  if (userData.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      message: "Too many requests. Please try again later.",
    };
  }

  userData.count++;
  return { allowed: true };
}

// Escape user-provided values before inserting them into HTML email.
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

export async function POST(request: NextRequest) {
  try {
    // Identify the client IP. If behind a trusted proxy, ensure the
    // forwarded headers are configured safely by your hosting platform.
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message:
            rateLimit.message || "Rate limit exceeded.",
        },
        { status: 429 }
      );
    }

    // Parse request body.
    const body = await request.json();

    const {
      name,
      email,
      phone,
      message,
      _honeypot,
    } = body ?? {};

    // Silently accept honeypot submissions to discourage bots.
    if (
      typeof _honeypot === "string" &&
      _honeypot.trim() !== ""
    ) {
      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully!",
        },
        { status: 200 }
      );
    }

    // Validate field types.
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and phone are required.",
        },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanMessage =
      typeof message === "string"
        ? message.trim()
        : "";

    // Validate required fields and reasonable length limits.
    if (
      !cleanName ||
      !cleanEmail ||
      !cleanPhone
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and phone are required.",
        },
        { status: 400 }
      );
    }

    if (
      cleanName.length < 2 ||
      cleanName.length > 50
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Name must be between 2 and 50 characters.",
        },
        { status: 400 }
      );
    }

    if (
      cleanEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    // Allow international phone numbers.
    const cleanedPhone = cleanPhone.replace(/[\s\-()]/g, "");

    if (!/^\+?[1-9]\d{8,14}$/.test(cleanedPhone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid phone number.",
        },
        { status: 400 }
      );
    }

    if (cleanMessage.length > 500) {
      return NextResponse.json(
        {
          success: false,
          message: "Message cannot exceed 500 characters.",
        },
        { status: 400 }
      );
    }

    // Read SMTP configuration from environment variables.
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactTo =
      process.env.CONTACT_TO || smtpUser;

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPass ||
      !contactTo ||
      !Number.isInteger(smtpPort) ||
      smtpPort <= 0
    ) {
      console.error(
        "Contact form email configuration is incomplete. Check SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and CONTACT_TO."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is temporarily unavailable. Please try again later.",
        },
        { status: 500 }
      );
    }

    // GoDaddy SMTP: use the host configured in the environment.
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    // Escape values included in the HTML email.
    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safePhone = escapeHtml(cleanPhone);
    const safeMessage = escapeHtml(
      cleanMessage || "No message provided"
    ).replace(/\r?\n/g, "<br />");
    const safeIp = escapeHtml(ip);

    const submissionTime = new Date().toLocaleString(
      "en-IN",
      { timeZone: "Asia/Kolkata" }
    );

    const mailOptions = {
      from: `"Cybria Secure Contact Form" <${smtpUser}>`,
      to: contactTo,
      replyTo: cleanEmail,
      subject: `New Contact Form Submission from ${cleanName}`,
      text: `
New Contact Form Submission - Cybria Secure

Name: ${cleanName}
Email: ${cleanEmail}
Phone: ${cleanPhone}
Message: ${cleanMessage || "No message provided"}

Submission Time: ${submissionTime} (IST)
IP Address: ${ip}

This email was sent from the contact form on Cybria Secure website.
      `.trim(),
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:20px;font-family:Arial,sans-serif;line-height:1.6;color:#333;">
  <div style="max-width:600px;margin:0 auto;">
    <div style="background:linear-gradient(135deg,#2B7BE4 0%,#7C3AED 100%);color:white;padding:20px;border-radius:10px 10px 0 0;">
      <h1 style="margin:0;">New Contact Form Submission</h1>
      <p style="margin:5px 0 0;">Cybria Secure Website</p>
    </div>

    <div style="background:#f9f9f9;padding:30px;border:1px solid #ddd;border-radius:0 0 10px 10px;">
      <p><strong>Name:</strong><br />${safeName}</p>
      <p><strong>Email:</strong><br /><a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <p><strong>Phone:</strong><br /><a href="tel:${safePhone}">${safePhone}</a></p>
      <p><strong>Message:</strong></p>
      <div style="background:white;padding:12px;border-radius:5px;border:1px solid #eee;overflow-wrap:anywhere;">${safeMessage}</div>
      <p><strong>Submission Time:</strong><br />${submissionTime} (IST)</p>

      <div style="margin-top:30px;padding-top:20px;border-top:1px solid #ddd;color:#777;font-size:12px;">
        <p>This email was sent from the contact form on the Cybria Secure website.</p>
        <p>IP Address: ${safeIp}</p>
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Contact form email sent successfully:", {
      messageId: info.messageId,
      to: contactTo,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Message sent successfully! We'll get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);

    // Log the actual server-side error for debugging.
    // Never log SMTP passwords or other credentials.
    console.error("Error sending contact form email:", {
      message: errorMessage,
      code:
        typeof error === "object" &&
        error !== null &&
        "code" in error
          ? error.code
          : undefined,
      responseCode:
        typeof error === "object" &&
        error !== null &&
        "responseCode" in error
          ? error.responseCode
          : undefined,
    });

    if (
      typeof error === "object" &&
      error !== null &&
      "responseCode" in error &&
      error.responseCode === 535
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email authentication failed. Please check the mailbox credentials and SMTP settings.",
        },
        { status: 500 }
      );
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "EAUTH"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email authentication failed. Please check the mailbox credentials and SMTP settings.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to send your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
