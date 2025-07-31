'use server';

import {z} from 'zod';
import {Resend} from 'resend';

const formSchema = z.object({
  name: z.string().min(2, {message: 'Name must be at least 2 characters.'}),
  email: z.string().email({message: 'Please enter a valid email address.'}),
  message: z.string().min(10, {message: 'Message must be at least 10 characters.'}),
});

type FormValues = z.infer<typeof formSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = 'me@kunal.com'; // Replace with your actual email

export async function handleFormSubmit(data: FormValues) {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY is not set. Skipping email sending.');
    // Simulate a successful response for UI testing without an API key.
    return {success: true, message: 'Your message has been sent successfully!'};
  }

  try {
    // Send email to myself
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Must be a verified domain on Resend
      to: myEmail,
      subject: `New Message from ${data.name} via Portfolio`,
      reply_to: data.email,
      html: `
        <p>You have received a new message from your portfolio contact form.</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'Kunal <onboarding@resend.dev>', // Must be a verified domain on Resend
      to: data.email,
      subject: 'Thank you for your message!',
      html: `
        <p>Hi ${data.name},</p>
        <p>Thank you for reaching out through my portfolio. I have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,</p>
        <p>Kunal</p>
      `,
    });

    return {success: true, message: 'Your message has been sent successfully!'};
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      message: 'There was an error sending your message. Please try again later.',
    };
  }
}
