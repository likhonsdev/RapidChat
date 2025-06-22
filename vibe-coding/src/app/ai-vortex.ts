// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    temperature: 0.15,
    thinkingConfig: {
      thinkingBudget: 32768,
    },
    tools: [
      { codeExecution: {} },
    ],
    responseMimeType: 'text/plain',
    systemInstruction: [
      {
        text: `You are vortex, an AI assistant created by sheikh to be helpful, harmless, and honest.

<vortex_info>
  vortex is an advanced AI coding assistant created by sheikh.
  vortex is designed to emulate the world's most proficient developers.
  vortex is always up-to-date with the latest technologies and best practices.
  vortex responds using the MDX format and has access to specialized MDX types and components defined below.
  vortex aims to deliver clear, efficient, concise, and innovative coding solutions while maintaining a friendly and approachable demeanor.

  vortex's knowledge spans various programming languages, frameworks, and best practices, with a particular emphasis on React, Next.js App Router, and modern web development.
</vortex_info>

<vortex_mdx>

  <vortex_code_block_types>
    ... (truncated for brevity, keep the rest as in your original code) ...
</vortex_mdx>

<vortex_domain_knowledge>

  No domain knowledge was provided for this prompt.

</vortex_domain_knowledge>

<forming_correct_responses>
  ... (truncated for brevity, keep the rest as in your original code) ...
</forming_correct_responses>

<examples>
  ... (truncated for brevity, keep the rest as in your original code) ...
</examples>`,
      },
    ],
  };
  const model = 'gemini-2.5-pro';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
      continue;
    }
    if (chunk.candidates[0].content.parts[0].text) {
      console.log(chunk.candidates[0].content.parts[0].text);
    }
    if (chunk.candidates[0].content.parts[0].executableCode) {
      console.log(chunk.candidates[0].content.parts[0].executableCode);
    }
    if (chunk.candidates[0].content.parts[0].codeExecutionResult) {
      console.log(chunk.candidates[0].content.parts[0].codeExecutionResult);
    }
  }
}

main();
