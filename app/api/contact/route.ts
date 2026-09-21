import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validateFullName, validateEmailAddress, validateMobileNumber } from '@/lib/securityValidation';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { firstName, lastName, email, mobile, program, message } = data;

        // Validation
        if (!email || !mobile || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const fullName = `${firstName || ''} ${lastName || ''}`.trim();
        if (fullName) {
            const nameVal = validateFullName(fullName);
            if (!nameVal.isValid) {
                return NextResponse.json({ error: nameVal.error }, { status: 400 });
            }
        }

        const emailVal = validateEmailAddress(email);
        if (!emailVal.isValid) {
            return NextResponse.json({ error: emailVal.error }, { status: 400 });
        }

        const phoneVal = validateMobileNumber(mobile);
        if (!phoneVal.isValid) {
            return NextResponse.json({ error: phoneVal.error }, { status: 400 });
        }

        // Configure Transporter (User's Gmail)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_PORT === '465',
            auth: {
                user: process.env.EMAIL_USER || process.env.SMTP_USER,
                pass: process.env.EMAIL_PASS || process.env.SMTP_PASS,
            },
        });

        // 1. Send Email to Admin
        const adminEmail = process.env.NOTIFICATION_EMAIL || 'info@tarkaiedtech.com';
        const adminMailOptions = {
            from: process.env.EMAIL_USER || process.env.SMTP_USER,
            to: adminEmail,
            replyTo: email,
            subject: `New Contact Form Submission: ${firstName} ${lastName}`,
            text: `
Name: ${firstName} ${lastName}
Email: ${email}
Mobile: ${mobile}
Program: ${program || 'Not selected'}

Message:
${message}
            `,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #0d9488;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mobile:</strong> ${mobile}</p>
                    <p><strong>Program:</strong> ${program || 'Not selected'}</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;" />
                    <h3 style="color: #555;">Message:</h3>
                    <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
                </div>
            `,
        };

        await transporter.sendMail(adminMailOptions);

        // 2. Send Auto-Reply to User
        const userMailOptions = {
            from: `"TarkAI Team" <${process.env.EMAIL_USER || process.env.SMTP_USER}>`,
            to: email,
            subject: `Thank you for contacting TarkAI, ${firstName}!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #20A6A8; padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">Message Received!</h1>
                    </div>
                    <div style="padding: 30px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #333; line-height: 1.6;">Hi ${firstName},</p>
                        <p style="font-size: 16px; color: #555; line-height: 1.6;">
                            Thank you for reaching out to us. We have received your message and our team will get back to you within 24 hours.
                        </p>
                        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #20A6A8;">
                            <p style="margin: 0; color: #64748b; font-size: 14px;"><strong>Your Message:</strong></p>
                            <p style="margin: 10px 0 0 0; color: #334155; font-size: 15px; font-style: italic;">"${message}"</p>
                        </div>
                        <p style="font-size: 16px; color: #555; line-height: 1.6;">
                            If you need immediate assistance, feel free to reply directly to this email or call us.
                        </p>
                        <p style="font-size: 16px; color: #333; margin-top: 30px;">Best regards,<br/><strong style="color: #20A6A8;">TarkAI Team</strong></p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(userMailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Email send error:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}
