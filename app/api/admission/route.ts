import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// ─── Schema ─────────────────────────────────────────────────────────────────
const AdmissionSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address'),
  currentStatus: z.enum(['School Student', 'College Student', 'Graduate', 'Working Professional']),
  courseInterested: z.enum(['AI/ML Architect Program', 'Data Science & Analytics']),
  demoSession: z.enum(['AI/ML Architect Program', 'Data Science & Analytics']),
  recaptchaToken: z.string().optional(),
  // Metadata
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referralUrl: z.string().optional(),
  browser: z.string().optional(),
  device: z.string().optional(),
});

// ─── Rate Limiting (simple in-memory) ────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) return false;
  entry.count++;
  return true;
}

// ─── Generate Application ID ──────────────────────────────────────────────────
function generateApplicationId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TRK-${timestamp}-${random}`;
}

// ─── Sanitize Input ───────────────────────────────────────────────────────────
function sanitize(str: string): string {
  return str.replace(/[<>\"'&]/g, '').trim();
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Server-side Zod validation
    const parseResult = AdmissionSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // ── reCAPTCHA v3 Verification ──────────────────────────────────────────────
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (secretKey && data.recaptchaToken) {
      try {
        const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            secret: secretKey,
            response: data.recaptchaToken,
            remoteip: ip,
          }),
        });
        const verifyData = await verifyRes.json();
        console.log('reCAPTCHA verification result:', verifyData);
        // Only block if explicit low bot score (< 0.15)
        if (verifyData.score !== undefined && verifyData.score < 0.15) {
          return NextResponse.json(
            { error: 'Security verification failed. Please try again.' },
            { status: 400 }
          );
        }
      } catch (recaptchaErr) {
        console.error('reCAPTCHA verification error:', recaptchaErr);
      }
    }

    const applicationId = generateApplicationId();
    const timestamp = new Date().toISOString();

    // Sanitize all string fields
    const cleanName = sanitize(data.fullName);
    const cleanEmail = sanitize(data.email);
    const cleanMobile = sanitize(data.mobile);

    // ── Google Apps Script Integration ──────────────────────────────────────
    const scriptUrl =
      process.env.GOOGLE_APPS_SCRIPT_URL ||
      'https://script.google.com/macros/s/AKfycbzlwDJuUJURJIZxzwZGteutxKL2fzKeXDxgITx5Nc4S1SzoXCAQwbTkj3VSxFL8AEI9/exec';

    if (scriptUrl) {
      try {
        const sheetPayload = {
          applicationId,
          timestamp,
          fullName: cleanName,
          mobile: cleanMobile,
          email: cleanEmail,
          currentStatus: data.currentStatus,
          courseInterested: data.courseInterested,
          demoSession: data.demoSession,
          browser: data.browser || 'Unknown',
          device: data.device || 'Unknown',
          utmSource: data.utmSource || '',
          utmMedium: data.utmMedium || '',
          utmCampaign: data.utmCampaign || '',
          referralUrl: data.referralUrl || '',
          ip: ip,
        };

        const sheetRes = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(sheetPayload),
          redirect: 'follow',
        });
        const sheetText = await sheetRes.text();
        console.log('Google Apps Script response:', sheetText);
      } catch (scriptError) {
        console.error('Google Apps Script error:', scriptError);
      }
    }

    // ── Email Notifications ──────────────────────────────────────────────────
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (emailUser && emailPass) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: { user: emailUser, pass: emailPass },
      });

      // Email to Admission Team
      const adminMail = {
        from: emailUser,
        to: 'info@tarkaiedtech.com',
        replyTo: cleanEmail,
        subject: `🎓 New Admission Application – ${cleanName} [${applicationId}]`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 0;">
            <div style="background: linear-gradient(135deg, #0F1C1E 0%, #186474 100%); padding: 32px; text-align: center;">
              <h1 style="color: #2DA5A3; margin: 0; font-size: 28px; letter-spacing: -0.5px;">TARK AI EdTech</h1>
              <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">New Admission Application Received</p>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px;">
              <div style="background: #f0fdf9; border-left: 4px solid #2DA5A3; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <p style="margin: 0; color: #186474; font-weight: 600; font-size: 14px;">Application ID: <span style="font-family: monospace; font-size: 16px;">${applicationId}</span></p>
                <p style="margin: 4px 0 0; color: #6b7280; font-size: 13px;">${new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #6b7280; font-size: 14px; width: 160px;">Full Name</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0F1C1E;">${cleanName}</td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #6b7280; font-size: 14px;">Mobile</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0F1C1E;">${cleanMobile}</td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #6b7280; font-size: 14px;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0F1C1E;">${cleanEmail}</td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #6b7280; font-size: 14px;">Current Status</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0F1C1E;">${data.currentStatus}</td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #6b7280; font-size: 14px;">Course Interested</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #2DA5A3;">${data.courseInterested}</td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #6b7280; font-size: 14px;">Demo Session</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #2DA5A3;">${data.demoSession}</td></tr>
                <tr><td style="padding: 12px 0; color: #6b7280; font-size: 14px;">UTM Source</td><td style="padding: 12px 0; color: #0F1C1E;">${data.utmSource || '—'} / ${data.utmMedium || '—'} / ${data.utmCampaign || '—'}</td></tr>
              </table>
              <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-radius: 8px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">⚡ Action Required: Contact applicant within 24 hours</p>
                <p style="margin: 4px 0 0; color: #92400e; font-size: 13px;">WhatsApp: <a href="https://wa.me/91${cleanMobile}" style="color: #059669;">${cleanMobile}</a> | Email: <a href="mailto:${cleanEmail}" style="color: #059669;">${cleanEmail}</a></p>
              </div>
            </div>
          </div>
        `,
      };

      // Confirmation Email to Applicant
      const applicantMail = {
        from: `"TARK AI EdTech" <${emailUser}>`,
        to: cleanEmail,
        subject: `✅ Application Received – TARK AI EdTech [${applicationId}]`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 0;">
            <div style="background: linear-gradient(135deg, #0F1C1E 0%, #186474 100%); padding: 32px; text-align: center;">
              <h1 style="color: #2DA5A3; margin: 0; font-size: 28px; letter-spacing: -0.5px;">TARK AI EdTech</h1>
              <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">Application Confirmation</p>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px;">
              <h2 style="color: #0F1C1E; margin: 0 0 16px; font-size: 22px;">Hello, ${cleanName}! 👋</h2>
              <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px;">We've received your application for the <strong style="color: #2DA5A3;">${data.courseInterested}</strong> program at TARK AI EdTech. Our admission team will contact you within <strong>24 hours</strong> to schedule your counselling call.</p>
              <div style="background: #f0fdf9; border: 1px solid #a7f3d0; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; color: #065f46; font-weight: 600; font-size: 14px;">Your Application Details</p>
                <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Application ID:</strong> <span style="font-family: monospace; color: #2DA5A3;">${applicationId}</span></p>
                <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Demo Session:</strong> ${data.demoSession}</p>
                <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
              </div>
              <div style="background: #0F1C1E; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <p style="color: rgba(255,255,255,0.7); margin: 0 0 12px; font-size: 14px;">Need help? Reach us instantly</p>
                <a href="https://wa.me/919712358689?text=Hi%20TARK%20AI!%20My%20application%20ID%20is%20${applicationId}" style="display: inline-block; background: #25D366; color: white; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">Chat on WhatsApp</a>
              </div>
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">TARK AI EdTech Pvt Ltd | Kyros Business Center, 404 & 405, Sarthana Jakat Naka, Surat 395013</p>
            </div>
          </div>
        `,
      };

      // Send both emails concurrently
      await Promise.allSettled([
        transporter.sendMail(adminMail),
        transporter.sendMail(applicantMail),
      ]);
    }

    return NextResponse.json({
      success: true,
      applicationId,
      message: 'Application submitted successfully! Check your email for confirmation.',
    }, { status: 200 });

  } catch (error) {
    console.error('Admission API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or contact us on WhatsApp.' },
      { status: 500 }
    );
  }
}
