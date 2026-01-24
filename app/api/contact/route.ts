import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { firstName, lastName, email, program, message } = data;

        // Validation
        if (!firstName || !lastName || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure Transporter (User's Gmail)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // sahil.b.rafaliya@gmail.com
                pass: process.env.EMAIL_PASS, // App Password
            },
        });

        // Email Content
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender
            to: 'tarkaiedtech@gmail.com', // Receiver
            replyTo: email, // Reply to the person who filled the form
            subject: `New Contact Form Submission: ${firstName} ${lastName}`,
            text: `
Name: ${firstName} ${lastName}
Email: ${email}
Program: ${program || 'Not selected'}

Message:
${message}
            `,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #0d9488;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Program:</strong> ${program || 'Not selected'}</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;" />
                    <h3 style="color: #555;">Message:</h3>
                    <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
                </div>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Email send error:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}
