import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { question, mobile } = body;

        // Basic Validation
        if (!question || !mobile) {
            return NextResponse.json({ error: 'Question and Mobile number are required.' }, { status: 400 });
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

        // Setup Email Data
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New FAQ Question Submitted`,
            text: `Mobile: ${mobile}\nQuestion:\n${question}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #1B9FA1; color: white; padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">New FAQ Question</h2>
                    </div>
                    <div style="padding: 20px;">
                        <p><strong>Mobile Number:</strong> ${mobile}</p>
                        <p><strong>Question:</strong></p>
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; font-size: 16px;">
                            ${question.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                </div>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Question sent successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Email send error:', error);
        return NextResponse.json(
            { error: 'Failed to send question. Please try again later.' },
            { status: 500 }
        );
    }
}
