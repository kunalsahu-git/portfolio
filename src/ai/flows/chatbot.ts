'use server';
/**
 * @fileOverview An AI flow for a portfolio chatbot, using the OpenRouter API directly.
 */

import type { ChatbotInput } from '@/lib/data';

const systemPrompt = `You are a friendly and helpful AI assistant for Kunal's developer portfolio.
Your goal is to answer questions about Kunal's skills, experience, and projects in a conversational manner.
Keep your answers concise and engaging. Format your responses with markdown where appropriate (e.g., list).

Here's some information about Kunal:
- Skills: React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, ShadCN UI, Git, GitHub, Figma, Adobe XD, Firebase, Node.js, Genkit.
- Experience: Frontend Developer Intern at Google, Software Engineer Intern at Microsoft. He has worked on Google Search and the Microsoft Azure portal.
- Projects: A portfolio with an AI JD analyzer, a Spotify clone, an E-commerce platform, a Task Management App, and an AI Chatbot (that's you!).
- Education: Bachelor of Technology in Computer Science from IIT Bombay.
- Contact: Users can get in touch via the contact form on the website.

If you don't know the answer to something, say so politely.

Analyze the conversation history and provide a relevant and helpful response.
`;

export async function internalChatbotFlow(input: ChatbotInput): Promise<string> {
  try {
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterApiKey) {
      throw new Error('OPENROUTER_API_KEY is not set.');
    }

    // OpenRouter API expects messages in a specific format, similar to OpenAI.
    // The system prompt goes as the first message with role 'system'.
    const messagesForOpenRouter = [
      { role: 'system', content: systemPrompt },
      ...input.history, // input.history already contains alternating user/model messages
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        // Optional: For OpenRouter dashboard analytics
        'HTTP-Referer': 'http://localhost:9002', // Replace with your actual domain in production
        'X-Title': 'Kunal\'s Portfolio Chatbot',
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-nano-12b-v2-vl:free',
        messages: messagesForOpenRouter,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const assistantResponse = data.choices[0]?.message?.content;

    if (!assistantResponse) {
      throw new Error('No content received from OpenRouter API.');
    }
    
    return assistantResponse;

  } catch (error: any) {
    console.error('[OpenRouter SDK Flow] An error occurred during AI generation:', error);
    const message = error?.message || 'An unknown error occurred.';
    return `I'm sorry, I encountered an error. Please try again later. (Details: ${message})`;
  }
}
