'use server';
/**
 * @fileOverview An AI flow for a portfolio chatbot, using the OpenRouter API directly.
 */

import type { ChatbotInput } from '@/lib/data';

const systemPrompt = `You are a friendly and helpful AI assistant for Kunal's developer portfolio.
Your goal is to answer questions about Kunal's skills, experience, and projects in a conversational manner.
Keep your answers concise and engaging. Format your responses with markdown where appropriate (e.g., list).

Here's some information about Kunal:
- Skills: Drupal Development, Drupal Migration, React Integration, Database Management, Performance Optimization, API Development, AWS Cloud Services, Frontend Development, Problem-Solving, Team Collaboration, Time Management, Moodle & Wordpress Development, React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, ShadCN UI, Git, GitHub, Firebase, Node.js, Genkit.
- Experience: 
  - Software Developer at One Origin (Feb 2024 - Present): Architected custom migrations, custom Drupal modules and seamlessly integrated modern React components to establish a high-performance decoupled architecture.
  - Software Development Engineer at Valuebound (Mar 2022 - Feb 2024): Built and maintained Drupal-based web solutions, enhancing functionality and user experience.
  - UI/UX Designer & Developer at IFIM College (Oct 2021 - Feb 2022): Designed and developed intuitive, responsive interfaces using modern web technologies.
  - Chief Technology Officer - Kanyathon at IFIM B-School (Jan 2021 - Mar 2021): Led cross-functional teams to deliver tech-driven solutions for a large-scale event.
- Projects: 
  - DevPortfolio: A modern, interactive, and AI-powered portfolio.
  - OU Online: A university website for online courses and programs, built with WordPress.
  - Sun Devils: The official athletics website for Arizona State University, built with Drupal.
  - Spotify Clone: A web app for visualizing personalized Spotify data.
  - E-commerce Platform: A full-stack e-commerce solution.
  - Task Management App: A Kanban-style task management application.
  - AI Chatbot: An intelligent chatbot built with Genkit and React (that's you!).
- Education: 
  - Master of Business Administration (MBA) from DDCE Utkal University (Present).
  - Bachelor of Computer Application from IFIM College (2019 - 2022).
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
