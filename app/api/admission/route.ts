import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import dbConnect from '@/lib/mongodb';
import AdmissionLead from '@/models/AdmissionLead';
import { validateFullName, validateEmailAddress, validateMobileNumber } from '@/lib/securityValidation';

// ─── Schema ─────────────────────────────────────────────────────────────────
const AdmissionSchema = z.object({
  fullName: z.string().refine((val) => validateFullName(val).isValid, {
    message: 'Please enter a valid full name',
  }),
  mobile: z.string().refine((val) => validateMobileNumber(val).isValid, {
    message: 'Please enter a genuine 10-digit Indian mobile number',
  }),
  email: z.string().refine((val) => validateEmailAddress(val).isValid, {
    message: 'Please enter a valid email address (disposable domains not allowed)',
  }),
  currentStatus: z.string().min(1, 'Please select your current status'),
  courseInterested: z.string().min(1, 'Please select your program interest'),
  demoSession: z.string().nullable().optional(),
  recaptchaToken: z.string().nullable().optional(),
  // Metadata
  utmSource: z.string().nullable().optional(),
  utmMedium: z.string().nullable().optional(),
  utmCampaign: z.string().nullable().optional(),
  referralUrl: z.string().nullable().optional(),
  browser: z.string().nullable().optional(),
  device: z.string().nullable().optional(),
});

// ─── Rate Limiting (simple in-memory) ────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

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
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const firstErrorMessage = Object.values(fieldErrors).flat()[0] || 'Validation failed. Please check your form inputs.';
      console.log('Admission API Validation Failed:', fieldErrors);
      return NextResponse.json(
        { error: firstErrorMessage, details: fieldErrors },
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

        if (!verifyData.success || verifyData.score < 0.3) {
          return NextResponse.json(
            { error: 'Security verification failed. Please try again or contact us directly.' },
            { status: 403 }
          );
        }
      } catch (recaptchaErr) {
        console.warn('reCAPTCHA verification warning (non-fatal):', recaptchaErr);
      }
    }

    const applicationId = generateApplicationId();
    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const cleanData = {
      applicationId,
      fullName: sanitize(data.fullName),
      mobile: sanitize(data.mobile),
      email: sanitize(data.email),
      currentStatus: sanitize(data.currentStatus),
      courseInterested: sanitize(data.courseInterested),
      demoSession: sanitize(data.demoSession || data.courseInterested),
      submissionTime,
      ip,
    };

    console.log('New Admission Form Lead Received:', cleanData);

    // ── Save Lead in MongoDB Database ─────────────────────────────────────────
    try {
      await dbConnect();
      await AdmissionLead.create(cleanData);
      console.log('✅ Lead saved to MongoDB database:', cleanData.applicationId);
    } catch (dbErr) {
      console.warn('MongoDB save warning (continuing to email & sheet):', dbErr);
    }

    // ── Email Notification via Nodemailer ─────────────────────────────────────
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465');
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER || '';
    const rawSmtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || '';
    const cleanSmtpPass = rawSmtpPass.replace(/\s+/g, '');
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@tarkaiedtech.com, sahil.b.rafaliya@gmail.com';

    if (smtpUser && cleanSmtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: { user: smtpUser, pass: cleanSmtpPass },
        });

        // Email to Admin (info@tarkaiedtech.com + sahil.b.rafaliya@gmail.com)
        await transporter.sendMail({
          from: `"TarkAI Admission Portal" <${smtpUser}>`,
          to: notificationEmail,
          subject: `🔥 New Free Demo Lead: ${cleanData.fullName} [${cleanData.applicationId}]`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #00737a; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #00737a; padding: 20px; text-align: center; color: white;">
                <h2 style="margin: 0; font-size: 22px;">New Admission Application</h2>
                <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">TarkAI EdTech Surat Portal</p>
              </div>
              <div style="padding: 24px; background-color: #ffffff;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">App ID:</td><td style="padding: 8px 0; color: #00737a; font-weight: bold;">${cleanData.applicationId}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Full Name:</td><td style="padding: 8px 0; color: #111;">${cleanData.fullName}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Mobile (WhatsApp):</td><td style="padding: 8px 0; color: #111;"><a href="tel:${cleanData.mobile}">${cleanData.mobile}</a></td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0; color: #111;">${cleanData.email}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Current Status:</td><td style="padding: 8px 0; color: #111;">${cleanData.currentStatus}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Program Interest:</td><td style="padding: 8px 0; color: #00737a; font-weight: bold;">${cleanData.courseInterested}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Submitted At:</td><td style="padding: 8px 0; color: #777;">${cleanData.submissionTime}</td></tr>
                </table>
              </div>
            </div>
          `,
        });
        console.log('✅ Admin Lead Notification Email sent successfully to:', notificationEmail);

        // Confirmation Email to Applicant
        await transporter.sendMail({
          from: `"TarkAI EdTech Admissions" <${smtpUser}>`,
          to: cleanData.email,
          subject: `Your Free 3-Day Demo Seat Confirmation - ${cleanData.applicationId}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #00737a; padding: 24px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 24px;">Welcome to TarkAI EdTech!</h1>
                <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9;">Your 3-Day Free Demo Seat is Reserved</p>
              </div>
              <div style="padding: 24px; background-color: #ffffff; color: #334155; line-height: 1.6;">
                <p>Hi <strong>${cleanData.fullName}</strong>,</p>
                <p>Thank you for registering for the <strong>Free 3-Day Demo</strong> at TarkAI EdTech, Surat's premier AI &amp; Data Science institute.</p>
                <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #00737a; margin: 20px 0;">
                  <p style="margin: 0; font-weight: bold; color: #0f172a;">Application ID: ${cleanData.applicationId}</p>
                  <p style="margin: 4px 0 0; font-size: 14px; color: #475569;">Program: ${cleanData.courseInterested}</p>
                </div>
                <p>Our admissions team will connect with you via WhatsApp / Call within 24 hours to confirm your demo batch schedule.</p>
                <p style="margin-top: 24px;">Best regards,<br><strong>TarkAI Admissions Team</strong><br>Kyros Business Center, Sarthana Jakat Naka, Surat</p>
              </div>
            </div>
          `,
        });
        console.log('✅ Student Confirmation Email sent successfully to:', cleanData.email);
      } catch (mailErr) {
        console.error('Nodemailer error (lead saved successfully):', mailErr);
      }
    }

    // ── Forward Lead to Google Apps Script / Sheet ─────────────────────────────
    const googleScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (googleScriptUrl) {
      try {
        const gsRes = await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            fullName: cleanData.fullName,
            mobile: cleanData.mobile,
            email: cleanData.email,
            currentStatus: cleanData.currentStatus,
            courseInterested: cleanData.courseInterested,
            demoSession: cleanData.demoSession,
            applicationId: cleanData.applicationId,
          }),
          redirect: 'follow',
        });
        const gsText = await gsRes.text();
        console.log('✅ Google Sheet Apps Script Sync Response:', gsText);
      } catch (gsErr) {
        console.warn('Google Apps Script submission warning:', gsErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        applicationId: cleanData.applicationId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admission API unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
