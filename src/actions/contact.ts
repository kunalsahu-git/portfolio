'use server';

import {z} from 'zod';
import {Resend} from 'resend';
import { generateQuote } from '@/ai/flows/generate-quote';

const formSchema = z.object({
  name: z.string().min(2, {message: 'Name must be at least 2 characters.'}),
  email: z.string().email({message: 'Please enter a valid email address.'}),
  message: z.string().min(10, {message: 'Message must be at least 10 characters.'}),
});

type FormValues = z.infer<typeof formSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = process.env.MY_EMAIL;

export async function handleFormSubmit(data: FormValues) {
  if (!process.env.RESEND_API_KEY || !myEmail) {
    console.log('RESEND_API_KEY or MY_EMAIL is not set. Skipping email sending.');
    // Simulate a successful response for UI testing without an API key.
    return {success: true, message: 'Your message has been sent successfully!'};
  }

  try {
    // Send email to myself
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Must be a verified domain on Resend
      to: myEmail,
      subject: `New Portfolio Message from ${data.name}`,
      reply_to: data.email,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Message via Portfolio Contact Form</h2>
          <p>You have received a new message. Here are the details:</p>
          <div style="border: 1px solid #ddd; padding: 15px; border-radius: 5px; background-color: #f9f9f9;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
      `,
    });

    // Generate a quote of the day for the user
    const quoteData = await generateQuote();

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'Kunal <onboarding@resend.dev>', // Must be a verified domain on Resend
      to: data.email,
      subject: `Thank you for getting in touch, ${data.name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fdfdfd;">
            <h2 style="text-align: center; color: #8a2be2;">Thanks for Reaching Out!</h2>
            <p>Hi ${data.name},</p>
            <p>I've received your message and appreciate you taking the time to contact me. I'll review your message and get back to you as soon as I can.</p>
            
            <div style="margin: 30px 0; padding: 20px; border-left: 4px solid #8a2be2; background-color: #f9f0ff;">
              <p style="font-style: italic;">"${quoteData.quote}"</p>
              <p style="text-align: right; font-weight: bold;">- ${quoteData.author}</p>
            </div>

            <p>Best regards,</p>
            <p style="font-family: 'Courier New', Courier, monospace; font-size: 18px; color: #8a2be2;">
              <strong>Kunal</strong>
            </p>
             <p style="font-size: 14px; color: #555;">
              Front-End Developer
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;" />
            <p style="text-align: center; font-size: 12px; color: #aaa;">This is an automated response. Please do not reply directly to this email.</p>
          </div>
        </div>
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
