import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';
import { validateEmailAddress } from '@/lib/securityValidation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source = 'diwali_offer_popup' } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const emailVal = validateEmailAddress(email);
    if (!emailVal.isValid) {
      return NextResponse.json(
        { error: emailVal.error || 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Persist subscriber in MongoDB (asynchronously so DB latency doesn't block email delivery)
    const dbPromise = (async () => {
      try {
        await dbConnect();
        await NewsletterSubscriber.findOneAndUpdate(
          { email: cleanEmail },
          { 
            email: cleanEmail,
            source,
            promoCode: '10%_DIWALI_OFFER',
            updatedAt: new Date()
          },
          { upsert: true, new: true }
        );
      } catch (dbErr) {
        console.warn('Database note: Failed to persist subscriber:', dbErr);
      }
    })();

    // 2. Configure Nodemailer Transporter with explicit timeouts
    const smtpPort = parseInt((process.env.SMTP_PORT || '587').trim(), 10);
    const smtpUser = (process.env.EMAIL_USER || process.env.SMTP_USER || '').trim();
    const smtpPass = (process.env.EMAIL_PASS || process.env.SMTP_PASS || '').trim();

    const transporter = nodemailer.createTransport({
      host: (process.env.SMTP_HOST || 'smtp.gmail.com').trim(),
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });

    // 3. User email options (optimized to avoid spam filters and land in Primary Inbox)
    const userMailOptions = {
      from: `"TarkAI EdTech" <${smtpUser}>`,
      to: cleanEmail,
      replyTo: 'info@tarkaiedtech.com',
      subject: '🪔 Happy Diwali! Your 10% Festive Discount at TarkAI EdTech',
      text: `Hi there,

Happy Diwali from all of us at TarkAI EdTech!

Your flat 10% Festive Discount has been activated for your registered email: ${cleanEmail}.

Whether you're starting your journey in Artificial Intelligence or mastering advanced Machine Learning, you're entitled to flat 10% OFF across all our cohorts.

How to claim your 10% Diwali discount:
1. Browse our upcoming AI & ML programs: https://tarkaiedtech.com/programs
2. Book your Free 1:1 Demo Class or submit your enrollment.
3. Your 10% discount is automatically applied to your registered email (${cleanEmail}).

Have questions? Connect with our admissions counselors:
WhatsApp / Call: +91 97123 58689
Email: info@tarkaiedtech.com

Warm festive regards,
TarkAI EdTech Team
Kyros Business Center, 404 & 405, Sarthana Jakat Naka, Surat, Gujarat 395013
https://tarkaiedtech.com
`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 26px 20px; background: #FFFDF9; border: 1px solid #D4AF37; border-radius: 16px; color: #1e293b;">
          <!-- Header -->
          <div style="text-align: center; padding-bottom: 18px; border-bottom: 1px solid #f1e6d0;">
            <h1 style="color: #073D44; margin: 0; font-size: 26px; font-weight: 800;">🪔 Happy Diwali!</h1>
            <p style="color: #C59B27; font-weight: 700; font-size: 14.5px; margin: 6px 0 0 0; letter-spacing: 0.5px;">Upgrade Your Future with AI & Machine Learning</p>
          </div>

          <!-- Hero Offer Card (Clean, Simple, No Discount Code) -->
          <div style="background: linear-gradient(135deg, #FFFDF9 0%, #FAF5EB 100%); border: 1px solid #D4AF37; border-radius: 12px; padding: 22px 18px; text-align: center; margin: 22px 0;">
            <span style="font-size: 11px; font-weight: 800; color: #006D77; text-transform: uppercase; letter-spacing: 1.5px; background: rgba(0, 109, 119, 0.08); padding: 4px 14px; border-radius: 20px; display: inline-block; border: 1px solid rgba(0, 109, 119, 0.2);">Diwali Festive Offer</span>
            <h2 style="font-size: 32px; font-weight: 900; color: #073D44; margin: 12px 0 4px 0; letter-spacing: -0.5px;">Flat 10% OFF</h2>
            <p style="margin: 0; color: #0A3D45; font-weight: 700; font-size: 15px;">Across ALL Courses at TarkAI EdTech</p>
            <p style="margin: 8px 0 0 0; color: #64748B; font-size: 12.5px;">Linked to registered email: <strong style="color: #073D44;">${cleanEmail}</strong></p>
          </div>

          <!-- Body text -->
          <p style="color: #334155; line-height: 1.65; font-size: 14.5px; margin: 18px 0;">
            Thank you for connecting with TarkAI EdTech! We are delighted to celebrate this festive season with you. Whether you're starting your journey in Artificial Intelligence or mastering advanced Machine Learning, your <strong>flat 10% festive discount</strong> is now officially active.
          </p>

          <div style="background: #ffffff; border-radius: 10px; padding: 16px 18px; margin: 18px 0; border: 1px solid #e2e8f0;">
            <h3 style="margin: 0 0 8px 0; font-size: 13.5px; color: #073D44; font-weight: 700;">How to claim your 10% discount:</h3>
            <ol style="margin: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 1.7;">
              <li>Browse our upcoming AI & ML programs at TarkAI EdTech.</li>
              <li>Book your <strong>Free 1:1 Demo Class</strong> or submit your admission application.</li>
              <li>Your <strong>10% Diwali discount</strong> will be automatically applied to your registered email: <strong style="color: #006D77;">${cleanEmail}</strong></li>
            </ol>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 26px 0 18px 0;">
            <a href="https://tarkaiedtech.com/programs" style="background: #006D77; color: #ffffff; text-decoration: none; padding: 13px 32px; border-radius: 50px; font-weight: 800; font-size: 14.5px; display: inline-block; box-shadow: 0 4px 14px rgba(0, 109, 119, 0.3);">
              Explore Programs & Claim Offer &rarr;
            </a>
          </div>

          <!-- Footer -->
          <hr style="border: 0; border-top: 1px solid #f1e6d0; margin: 22px 0 16px 0;" />
          <p style="font-size: 12px; color: #64748b; text-align: center; line-height: 1.6; margin: 0;">
            <strong>TarkAI EdTech Private Limited</strong> &bull; Surat's Premier AI & ML Institute<br/>
            Kyros Business Center, 404 & 405, Sarthana Jakat Naka, Surat, Gujarat 395013<br/>
            WhatsApp / Call: <a href="https://wa.me/919712358689" style="color: #006D77; font-weight: 700; text-decoration: none;">+91 97123 58689</a> &bull; <a href="https://tarkaiedtech.com" style="color: #006D77; font-weight: 700; text-decoration: none;">tarkaiedtech.com</a>
          </p>
        </div>
      `,
    };

    // 4. Admin notification options
    const adminEmails = (process.env.NOTIFICATION_EMAIL || 'info@tarkaiedtech.com')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);

    const adminMailOptions = {
      from: `"TarkAI System" <${smtpUser}>`,
      to: adminEmails,
      subject: `New Diwali 10% Offer Subscriber: ${cleanEmail}`,
      text: `A new visitor claimed the Diwali 10% discount:\n\nEmail: ${cleanEmail}\nSource: ${source}\nDate: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    };

    // 5. Send emails in parallel
    const [userMailResult, adminMailResult] = await Promise.allSettled([
      transporter.sendMail(userMailOptions),
      adminEmails.length > 0 ? transporter.sendMail(adminMailOptions) : Promise.resolve(),
      dbPromise
    ]);

    let userMailSuccess = userMailResult.status === 'fulfilled';
    let userMailError = userMailResult.status === 'rejected' ? String(userMailResult.reason) : null;

    if (!userMailSuccess) {
      console.error('Failed to send email to student:', userMailError);
    }

    return NextResponse.json({
      success: true,
      email: cleanEmail,
      delivered: userMailSuccess,
      message: userMailSuccess
        ? 'Your 10% Diwali offer details have been sent to your email inbox!'
        : 'Registered successfully. Please check your email shortly.'
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
