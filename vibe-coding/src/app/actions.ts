"use server";

import { createStreamableUI } from "ai/rsc";
import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";
import { ReactNode } from "react";

const model = google("gemini-2.5-flash-preview-04-17");

export async function generateUI(prompt: string): Promise<ReactNode> {
  const uiStream = createStreamableUI();

  (async () => {
    const result = await streamText({
      model,
      tools: {
        weather: tool({
          description: "Get the weather in a location",
          parameters: z.object({
            location: z.string().describe("The location to get the weather for"),
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

    for await (const part of result.textStream) {
      uiStream.update(part);
    }

    uiStream.done();
  })();

  return uiStream.value;
}