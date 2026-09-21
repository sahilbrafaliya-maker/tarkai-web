import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validateFullName, validateEmailAddress, validateMobileNumber } from '@/lib/securityValidation';

// Simple in-memory rate limiting (max 5 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
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

function sanitize(str: string): string {
  return str.replace(/[<>\"'&]/g, '').trim();
}

export async function POST(request: Request) {
    try {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
          request.headers.get('x-real-ip') || 'unknown';

        if (!checkRateLimit(ip)) {
          return NextResponse.json(
            { error: 'Too many brochure/inquiry requests. Please wait a few minutes.' },
            { status: 429 }
          );
        }

        const data = await request.json();
        const { name, email, phone, branch, program, type } = data;

        // Basic presence validation
        if (!name || !email || !phone || !program || !type) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Security Validations against random/fake entries
        const nameVal = validateFullName(name);
        if (!nameVal.isValid) {
            return NextResponse.json({ error: nameVal.error }, { status: 400 });
        }

        const emailVal = validateEmailAddress(email);
        if (!emailVal.isValid) {
            return NextResponse.json({ error: emailVal.error }, { status: 400 });
        }

        const phoneVal = validateMobileNumber(phone);
        if (!phoneVal.isValid) {
            return NextResponse.json({ error: phoneVal.error }, { status: 400 });
        }

        const cleanName = sanitize(name);
        const cleanEmail = sanitize(email).toLowerCase();
        const cleanPhone = sanitize(phone).replace(/\D/g, '');
        const cleanProgram = sanitize(program);
        const cleanBranch = sanitize(branch || 'N/A');

        // Configure Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const inquiryLabel = type === 'brochure' ? 'Brochure Download Request' : 'Course Enrollment Inquiry';

        // Email Content    
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: process.env.EMAIL_USER, // Sending admin notification to the env email 
            replyTo: cleanEmail,
            subject: `[${inquiryLabel}] ${cleanProgram} - ${cleanName}`,
            text: `
New Program Inquiry Submission:
----------------------------------------
Inquiry Type: ${inquiryLabel}
Program: ${cleanProgram}
Name: ${cleanName}
Email: ${cleanEmail}
Phone Number: ${cleanPhone}
Branch: ${cleanBranch}
            `,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 30px; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                    <h2 style="color: #186474; border-bottom: 2px solid #186474; padding-bottom: 10px; margin-top: 0;">New Program Inquiry</h2>
                    <p style="font-size: 16px; margin: 15px 0;"><strong>Inquiry Type:</strong> <span style="background-color: #e2f2f5; color: #186474; padding: 4px 10px; border-radius: 20px; font-weight: bold; font-size: 14px;">${inquiryLabel}</span></p>
                    <p style="font-size: 15px; margin: 10px 0;"><strong>Program:</strong> ${cleanProgram}</p>
                    <p style="font-size: 15px; margin: 10px 0;"><strong>Name:</strong> ${cleanName}</p>
                    <p style="font-size: 15px; margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${cleanEmail}" style="color: #186474; text-decoration: none;">${cleanEmail}</a></p>
                    <p style="font-size: 15px; margin: 10px 0;"><strong>Phone Number:</strong> <a href="tel:${cleanPhone}" style="color: #186474; text-decoration: none;">${cleanPhone}</a></p>
                    <p style="font-size: 15px; margin: 10px 0;"><strong>Selected Branch:</strong> ${cleanBranch}</p>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
                    <p style="font-size: 12px; color: #64748b; text-align: center; margin-bottom: 0;">This inquiry was sent automatically from TarkAI EdTech programs page.</p>
                </div>
            `,
        };

        // Send Admin Notification Email
        await transporter.sendMail(mailOptions);

        // If it's a brochure request, send the brochure to the user
        if (type === 'brochure') {
            const userMailOptions = {
                from: `"TarkAI EdTech" <${process.env.EMAIL_USER}>`,
                to: cleanEmail,
                subject: `Your TarkAI EdTech Brochure - ${cleanProgram}`,
                text: `
Hi ${cleanName},

Thank you for your interest in TarkAI EdTech!

You can download the brochure for ${cleanProgram} using the link below:
https://tarkaiedtech.com/TarkAI%20Edtech%20Brochure.pdf

If you have any questions, feel free to reply to this email or contact us at +91 97123 58689.

Best regards,
TarkAI EdTech Team
                `,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 30px; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; text-align: center;">
                        <h2 style="color: #186474; margin-top: 0;">Hi ${cleanName},</h2>
                        <p style="font-size: 16px; margin: 15px 0;">Thank you for your interest in the <strong>${cleanProgram}</strong> program at TarkAI EdTech!</p>
                        <p style="font-size: 15px; margin: 20px 0;">Click the button below to download your comprehensive program brochure:</p>
                        <a href="https://tarkaiedtech.com/TarkAI%20Edtech%20Brochure.pdf" style="display: inline-block; padding: 12px 25px; background-color: #20A6A8; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 10px 0;">Download Brochure PDF</a>
                        <p style="font-size: 14px; color: #666; margin-top: 25px;">If you have any questions, feel free to reply to this email or contact our admission team at <strong>+91 97123 58689</strong>.</p>
                        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">Best regards,<br>TarkAI EdTech Team</p>
                    </div>
                `,
            };
            await transporter.sendMail(userMailOptions);
        } else if (type === 'enroll') {
            const enrollMailOptions = {
                from: `"TarkAI EdTech" <${process.env.EMAIL_USER}>`,
                to: cleanEmail,
                subject: `Application Received - ${cleanProgram} at TarkAI EdTech`,
                text: `
Hi ${cleanName},

Thank you for applying to the ${cleanProgram} program at TarkAI EdTech!

We have successfully received your enrollment request. Our admissions team will review your details and contact you shortly to guide you through the next steps.

If you have any immediate questions, feel free to reply to this email or call us at +91 97123 58689.

Best regards,
TarkAI EdTech Team
                `,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 30px; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; text-align: center;">
                        <h2 style="color: #186474; margin-top: 0;">Hi ${cleanName},</h2>
                        <p style="font-size: 16px; margin: 15px 0;">Thank you for applying to the <strong>${cleanProgram}</strong> program at TarkAI EdTech!</p>
                        <p style="font-size: 15px; margin: 20px 0;">We have successfully received your enrollment request. Our admissions team will review your application and contact you shortly to guide you through the next steps.</p>
                        <p style="font-size: 14px; color: #666; margin-top: 25px;">If you have any immediate questions, feel free to reply to this email or call us at <strong>+91 97123 58689</strong>.</p>
                        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">Best regards,<br>TarkAI EdTech Team</p>
                    </div>
                `,
            };
            await transporter.sendMail(enrollMailOptions);
        }

        return NextResponse.json({ message: 'Inquiry processed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Inquiry send error:', error);
        return NextResponse.json(
            { error: 'Failed to submit inquiry. Please try again later.' },
            { status: 500 }
        );
    }
}
