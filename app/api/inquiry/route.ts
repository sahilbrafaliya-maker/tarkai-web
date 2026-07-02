import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, email, phone, branch, program, type } = data;

        // Validation
        if (!name || !email || !phone || !branch || !program || !type) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure Nodemailer Transporter (User's Gmail SMTP)
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // sahil.b.rafaliya@gmail.com
                pass: process.env.EMAIL_PASS, // App Password
            },
        });

        const inquiryLabel = type === 'brochure' ? 'Brochure Download Request' : 'Course Enrollment Inquiry';

        // Email Content    
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: 'info@tarkaiedtech.com', 
            replyTo: email,
            subject: `[${inquiryLabel}] ${program} - ${name}`,
            text: `
New Program Inquiry Submission:
----------------------------------------
Inquiry Type: ${inquiryLabel}
Program: ${program}
Name: ${name}
Email: ${email}
Phone Number: ${phone}
Nearest Branch Location: ${branch}
            `,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 30px; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                    <h2 style="color: #186474; border-bottom: 2px solid #186474; padding-bottom: 10px; margin-top: 0;">New Program Inquiry</h2>
                    <p style="font-size: 16px; margin: 15px 0;"><strong>Inquiry Type:</strong> <span style="background-color: #e2f2f5; color: #186474; padding: 4px 10px; border-radius: 20px; font-weight: bold; font-size: 14px;">${inquiryLabel}</span></p>
                    <p style="font-size: 15px; margin: 10px 0;"><strong>Program:</strong> ${program}</p>
                    <p style="font-size: 15px; margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="font-size: 15px; margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #186474; text-decoration: none;">${email}</a></p>
                    <p style="font-size: 15px; margin: 10px 0;"><strong>Phone Number:</strong> <a href="tel:${phone}" style="color: #186474; text-decoration: none;">${phone}</a></p>
                    <p style="font-size: 15px; margin: 10px 0;"><strong>Selected Branch:</strong> ${branch}</p>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
                    <p style="font-size: 12px; color: #64748b; text-align: center; margin-bottom: 0;">This inquiry was sent automatically from TARK AI EdTech programs page.</p>
                </div>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Inquiry processed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Inquiry send error:', error);
        return NextResponse.json(
            { error: 'Failed to submit inquiry. Please try again later.' },
            { status: 500 }
        );
    }
}
