import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import { EMAIL_USER, EMAIL_PASSWORD } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const { name, email, message } = await request.json();
    
    // Validate inputs
    if (!name || !email || !message) {
      return json({ success: false, message: 'All fields are required' }, { status: 400 });
    }
    
    if (!isValidEmail(email)) {
      return json({ success: false, message: 'Invalid email address' }, { status: 400 });
    }
    
    // Create transporter for Porkbun hosted email
    const transporter = nodemailer.createTransport({
      host: 'smtp.porkbun.com', // Porkbun SMTP server
      port: 587, // Standard SMTP port
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
      }
    });
    
    // Email content for site owner
    const ownerMailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER, // Send to yourself
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    // Confirmation email content for sender
    const senderMailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: `Thank you for your message, ${name}!`,
      text: `
        Hi ${name},
        
        Thank you for reaching out! I've received your message and will get back to you as soon as possible.
        
        For your records, here's a copy of your message:
        
        "${message}"
        
        Best regards,
        Dlovan
        AI-Augmented Web Developer
        Stockholm, Sweden
      `,
      html: getConfirmationEmailTemplate(name, message)
    };
    
    // Send emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(senderMailOptions);
    
    return json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    return json(
      { success: false, message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// HTML template for confirmation email
function getConfirmationEmailTemplate(name, message) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Your Message</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .email-header {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          padding: 30px 20px;
          text-align: center;
        }
        
        .email-header h1 {
          color: white;
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        
        .email-body {
          padding: 30px 20px;
          background-color: #ffffff;
        }
        
        .email-footer {
          background-color: #f3f4f6;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }
        
        .message-box {
          background-color: #f9fafb;
          border-left: 4px solid #6366f1;
          padding: 15px;
          margin: 20px 0;
          border-radius: 0 4px 4px 0;
        }
        
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 500;
          margin-top: 20px;
        }
        
        .social-links {
          margin-top: 20px;
        }
        
        .social-link {
          display: inline-block;
          margin: 0 10px;
          color: #6b7280;
          text-decoration: none;
        }
        
        .signature {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Thank You for Reaching Out!</h1>
        </div>
        
        <div class="email-body">
          <p>Hello ${name},</p>
          
          <p>Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
          
          <p>For your records, here's a copy of your message:</p>
          
          <div class="message-box">
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>I typically respond within 1-2 business days. If your matter is urgent, please feel free to connect with me on LinkedIn.</p>
          
          <div class="signature">
            <p>
              <strong>Dlovan</strong><br>
              AI-Augmented Web Developer<br>
              Stockholm, Sweden
            </p>
          </div>
        </div>
        
        <div class="email-footer">
          <p>© ${new Date().getFullYear()} Dlovan. All rights reserved.</p>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/dlovan-sharif-11ab57270/" class="social-link">LinkedIn</a> | 
            <a href="https://github.com/dlovans" class="social-link">GitHub</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
} 