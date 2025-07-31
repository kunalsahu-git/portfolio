
'use server';
/**
 * @fileOverview Server Actions for AI-related functionality.
 */

import { internalChatbotFlow, ChatbotInputSchema, type ChatbotInput } from './flows/chatbot';

export type { ChatbotInput };

export async function askChatbot(input: ChatbotInput) {
  // Validate the input using Zod.
  const validatedInput = ChatbotInputSchema.parse(input);
  
  const responseText = await internalChatbotFlow(validatedInput);

  return { content: responseText };
}
