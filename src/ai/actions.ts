
'use server';
/**
 * @fileOverview Server Actions for AI-related functionality.
 */
import { internalChatbotFlow } from './flows/chatbot';
import { ChatbotInputSchema, type ChatbotInput } from '@/lib/data';

export type { ChatbotInput };

export async function askChatbot(input: ChatbotInput) {
  // Validate the input using Zod.
  const validatedInput = ChatbotInputSchema.parse(input);
  
  const responseText = await internalChatbotFlow(validatedInput);

  return { content: responseText };
}
