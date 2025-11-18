
'use server';
/**
 * @fileOverview An AI flow for a portfolio chatbot.
 *
 * - internalChatbotFlow - The primary Genkit flow for handling conversations.
 */

import {ai} from '@/ai/genkit';
import type { ChatbotInput } from '@/lib/data';
import { z } from 'genkit';


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


export async function internalChatbotFlow(input: ChatbotInput) {
  return await chatbotExecutionFlow(input);
}


const chatbotExecutionFlow = ai.defineFlow(
  {
    name: 'chatbotExecutionFlow',
    inputSchema: z.object({ history: z.array(z.object({ role: z.enum(['user', 'model']), content: z.string() })) }),
    outputSchema: z.string(),
  },
  async (input) => {
    try {
      // Manually construct the history to include the system prompt, which is more robust.
      const historyForAI = [
        { role: 'user' as const, content: systemPrompt },
        { role: 'model' as const, content: 'Understood. I will act as a friendly and helpful AI assistant for Kunal\'s portfolio.' },
        ...input.history,
      ];

      const result = await ai.generate({
        history: historyForAI,
      });

      const responseText = result.output?.text;

      if (!responseText) {
          return "I'm sorry, I couldn't generate a response. Please try again.";
      }
      
      return responseText;

    } catch (error) {
        console.error('[chatbotExecutionFlow] An error occurred during AI generation:', error);
        return "I'm sorry, I encountered an error. Please try again later.";
    }
  }
);
