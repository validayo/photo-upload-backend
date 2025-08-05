import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail(data: any) {
  const content = `
    New Contact Form Submission

    Name: ${data.firstName} ${data.lastName}
    Email: ${data.email}
    Service: ${data.service}
    Occasion: ${data.occasion}
    Date: ${data.date}

    Add-ons Selected:
    ${data.add_ons.join('\n')}

    Pinterest Inspiration: ${data.pinterestInspo || 'None provided'}
  `;

  await transport.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.NOTIFICATION_EMAIL,
    subject: 'New Photography Booking Request',
    text: content,
  });
}

export async function sendNewsletterEmail(email: string) {
  const content = `
    New Newsletter Subscription

    Email: ${email}
    Date: ${new Date().toLocaleString()}
  `;

  await transport.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.NOTIFICATION_EMAIL,
    subject: 'New Newsletter Subscriber',
    text: content,
  });
}