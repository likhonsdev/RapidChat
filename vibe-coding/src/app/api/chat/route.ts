import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';

const model = google('gemini-2.5-flash-preview-04-17');

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await streamText({
      model,
      tools: {
        weather: tool({
          description: 'Get the weather in a location',
          parameters: z.object({
            location: z.string().describe('The location to get the weather for'),
          }),
          execute: async ({ location }) => ({
            location,
            temperature: 72 + Math.floor(Math.random() * 21) - 10,
          }),
        }),
      },
      maxSteps: 5,
      prompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}