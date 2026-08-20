import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import personal from '@/data/personal.json';

// Simple regex for basic email format validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, msg } = body;

    // Validate fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide a valid name (at least 2 characters).' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!msg || typeof msg !== 'string' || msg.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please provide a message with at least 5 characters.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'Server email configuration is missing. Please set RESEND_API_KEY in your environment variables.',
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const fromAddress =
      process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
    const toAddress = process.env.CONTACT_TO_EMAIL || personal.email;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMsg = msg.trim();

    // HTML Email Template styled with Catppuccin accents
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Message from ${trimmedName}</title>
        </head>
        <body style="margin: 0; padding: 24px; background-color: #11111b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #cdd6f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #181825; border: 1px solid #313244; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <div style="background: linear-gradient(135deg, #cba6f7 0%, #89b4fa 100%); padding: 20px 24px;">
              <h2 style="margin: 0; color: #11111b; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">
                New Portfolio Message
              </h2>
            </div>
            <div style="padding: 24px;">
              <div style="margin-bottom: 20px; padding: 14px 16px; background-color: #1e1e2e; border: 1px solid #313244; border-radius: 8px;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #a6adc8;">
                  <strong style="color: #cba6f7;">Sender:</strong> ${trimmedName}
                </p>
                <p style="margin: 0; font-size: 14px; color: #a6adc8;">
                  <strong style="color: #89b4fa;">Email:</strong> 
                  <a href="mailto:${trimmedEmail}" style="color: #94e2d5; text-decoration: none;">${trimmedEmail}</a>
                </p>
              </div>

              <div style="margin-bottom: 12px;">
                <h3 style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; color: #f9e2af;">
                  Message Content
                </h3>
                <div style="padding: 16px; background-color: #1e1e2e; border-left: 3px solid #cba6f7; border-radius: 4px 8px 8px 4px; font-size: 15px; line-height: 1.6; color: #cdd6f4; white-space: pre-wrap;">
${trimmedMsg}
                </div>
              </div>
            </div>
            <div style="padding: 14px 24px; background-color: #11111b; border-top: 1px solid #313244; font-size: 12px; color: #6c7086; text-align: center;">
              Sent from Souhaieb Askri's Portfolio Website
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `New Portfolio Message\n\nFrom: ${trimmedName} (${trimmedEmail})\n\nMessage:\n${trimmedMsg}`;

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: trimmedEmail,
      subject: `New Portfolio Message from ${trimmedName}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('[Resend Error]:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to send message via Resend.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (err: unknown) {
    console.error('[Contact API Error]:', err);
    const errorMessage = err instanceof Error ? err.message : 'Internal server error.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
