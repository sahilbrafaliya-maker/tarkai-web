import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Basic Validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        // Configure Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 1. Send Email to Admin
        const adminEmail = process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER || 'info@tarkaiedtech.com';
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: adminEmail,
            replyTo: email,
            subject: `New Home Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #20A6A8; color: white; padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">New Contact Request (Home Page)</h2>
                    </div>
                    <div style="padding: 20px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(adminMailOptions);

        // 2. Send Auto-Reply to User
        const userMailOptions = {
            from: `"TarkAI Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Thank you for contacting TarkAI, ${name}!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #20A6A8; padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">Message Received!</h1>
                    </div>
                    <div style="padding: 30px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #333; line-height: 1.6;">Hi ${name},</p>
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

        return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Email send error:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}
