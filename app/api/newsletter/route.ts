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

    // 1. Persist subscriber in MongoDB
    try {
      await dbConnect();
      await NewsletterSubscriber.findOneAndUpdate(
        { email: cleanEmail },
        { 
          email: cleanEmail,
          source,
          promoCode: 'DIWALI10',
          updatedAt: new Date()
        },
        { upsert: true, new: true }
      );
    } catch (dbErr) {
      console.warn('Database note: Failed to persist newsletter subscriber:', dbErr);
    }

    // 2. Configure Nodemailer Transporter using credentials from .env.local
    const smtpPort = parseInt((process.env.SMTP_PORT || '587').trim(), 10);
    const transporter = nodemailer.createTransport({
      host: (process.env.SMTP_HOST || 'smtp.gmail.com').trim(),
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: (process.env.EMAIL_USER || process.env.SMTP_USER || '').trim(),
        pass: (process.env.EMAIL_PASS || process.env.SMTP_PASS || '').trim(),
      },
    });

    // 3. Send festive Diwali 10% coupon code to the subscriber's email
    try {
      const userMailOptions = {
        from: `"TarkAI EdTech" <${process.env.EMAIL_USER || process.env.SMTP_USER}>`,
        to: cleanEmail,
        subject: `🪔 Happy Diwali! Your Exclusive 10% OFF Voucher for TarkAI Courses`,
        text: `Hi,

Happy Diwali from all of us at TarkAI EdTech!

Here is your exclusive 10% OFF coupon code: DIWALI10

Use this voucher when enrolling in any of our industry-focused AI & ML programs to get flat 10% OFF.

Explore our courses: https://tarkaiedtech.com/programs

Need guidance? Call / WhatsApp us at +91 97123 58689.

Best regards,
TarkAI EdTech Team
Surat, Gujarat
`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px 24px; background: #FFFDF9; border: 1px solid #D4AF37; border-radius: 16px; color: #1e293b;">
            <!-- Header -->
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #f1e6d0;">
              <h1 style="color: #073D44; margin: 0; font-size: 26px; font-weight: 800;">🪔 Happy Diwali!</h1>
              <p style="color: #C59B27; font-weight: 700; font-size: 15px; margin: 6px 0 0 0; letter-spacing: 0.5px;">This Diwali, Upgrade Your Future with AI</p>
            </div>

            <!-- Hero Coupon Card -->
            <div style="background: linear-gradient(135deg, #FAF5EB 0%, #F5ECDB 100%); border: 2px dashed #006D77; border-radius: 14px; padding: 24px; text-align: center; margin: 26px 0;">
              <span style="font-size: 12px; font-weight: 800; color: #006D77; text-transform: uppercase; letter-spacing: 1.5px; background: rgba(0, 109, 119, 0.1); padding: 4px 12px; border-radius: 20px; display: inline-block;">Exclusive Festive Voucher</span>
              <h2 style="font-size: 34px; font-weight: 900; color: #073D44; margin: 14px 0 6px 0; letter-spacing: 3px; font-family: monospace;">DIWALI10</h2>
              <p style="margin: 0; color: #0A3D45; font-weight: 800; font-size: 16px;">Flat 10% OFF on ALL Courses at TarkAI EdTech</p>
            </div>

            <!-- Body text -->
            <p style="color: #334155; line-height: 1.7; font-size: 15px; margin: 20px 0;">
              Thank you for subscribing to TarkAI! We are thrilled to celebrate this festive season with you. Whether you're starting your journey in Artificial Intelligence or mastering advanced Machine Learning, this voucher entitles you to <strong>flat 10% OFF</strong> across all our cohorts.
            </p>

            <div style="background: #ffffff; border-radius: 10px; padding: 18px; margin: 20px 0; border: 1px solid #e2e8f0;">
              <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #073D44; font-weight: 700;">How to redeem your voucher:</h3>
              <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13.5px; line-height: 1.7;">
                <li>Browse our upcoming AI & ML programs at TarkAI EdTech.</li>
                <li>Book your <strong>Free 1:1 Demo Class</strong> or submit your admission application.</li>
                <li>Mention coupon code <strong style="color: #006D77;">DIWALI10</strong> to your admissions mentor to apply the instant 10% discount!</li>
              </ul>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0 22px 0;">
              <a href="https://tarkaiedtech.com/programs" style="background: linear-gradient(135deg, #006D77 0%, #084F57 100%); color: #ffffff; text-decoration: none; padding: 14px 34px; border-radius: 50px; font-weight: 800; font-size: 15px; display: inline-block; box-shadow: 0 4px 14px rgba(0, 109, 119, 0.35);">
                Explore Programs & Claim Offer &rarr;
              </a>
            </div>

            <!-- Footer -->
            <hr style="border: 0; border-top: 1px solid #f1e6d0; margin: 25px 0 16px 0;" />
            <p style="font-size: 12px; color: #64748b; text-align: center; line-height: 1.6; margin: 0;">
              <strong>TarkAI EdTech Private Limited</strong> &bull; Surat's Premier AI & ML Institute<br/>
              Kyros Business Center, 404 & 405, Sarthana Jakat Naka, Surat, Gujarat 395013<br/>
              WhatsApp / Call: <a href="https://wa.me/919712358689" style="color: #006D77; font-weight: 700;">+91 97123 58689</a> &bull; <a href="https://tarkaiedtech.com" style="color: #006D77; font-weight: 700;">tarkaiedtech.com</a>
            </p>
          </div>
        `,
      };

      await transporter.sendMail(userMailOptions);
    } catch (mailErr) {
      console.error('Failed to send Diwali coupon email to subscriber:', mailErr);
    }

    // 4. Send notification to admin
    try {
      const adminEmails = (process.env.NOTIFICATION_EMAIL || 'info@tarkaiedtech.com')
        .split(',')
        .map((e) => e.trim())
        .filter(Boolean);

      if (adminEmails.length > 0) {
        await transporter.sendMail({
          from: `"TarkAI System" <${process.env.EMAIL_USER || process.env.SMTP_USER}>`,
          to: adminEmails,
          subject: `🎉 New Diwali 10% Offer Subscriber: ${cleanEmail}`,
          text: `A new visitor claimed the Diwali 10% discount:\n\nEmail: ${cleanEmail}\nSource: ${source}\nDate: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
        });
      }
    } catch (adminErr) {
      console.warn('Admin notification error:', adminErr);
    }

    return NextResponse.json({
      success: true,
      email: cleanEmail,
      message: 'Your 10% discount coupon has been sent to your email inbox!'
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
