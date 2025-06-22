import { z } from 'zod';
import { Suspense } from 'react';
import ChatInput from '@/components/chat-input';
import ChatMessages from '@/components/chat-messages';
import CodeEditor from '@/components/code-editor';
import CodePreview from '@/components/code-preview';
import { google } from '@ai-sdk/google';

// Use the Google Gemini Pro model from @ai-sdk/google
const GEMINI_MODEL = google('gemini-pro');

async function generateRecipe() {
  const { generateObject } = await import('ai');
  try {
    const { object } = await generateObject({
      model: GEMINI_MODEL,
      schema: z.object({
        recipe: z.object({
          name: z.string(),
          ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),
          steps: z.array(z.string()),
        }),
      }),
      prompt: 'Generate a lasagna recipe.',
    });
    return object ? <pre>{JSON.stringify(object, null, 2)}</pre> : null;
  } catch (error: any) {
    return <p>Error generating recipe.</p>;
  }
}

async function streamHeroDescriptions() {
  const { streamObject } = await import('ai');
  try {
    const { elementStream } = await streamObject({
      model: GEMINI_MODEL,
      output: 'array',
      schema: z.object({
        name: z.string(),
        class: z.string().describe('Character class, e.g. warrior, mage, or thief.'),
        description: z.string(),
      }),
      prompt: 'Generate 3 hero descriptions for a fantasy role playing game.',
    });
    const heroes: any[] = [];
    for await (const hero of elementStream as AsyncIterable<any>) {
      heroes.push(hero);
    }
    return heroes.length > 0 ? (
      <ul>
        {heroes.map((hero, idx) => (
          <li key={idx}>
            <strong>{hero.name}</strong> ({hero.class}): {hero.description}
          </li>
        ))}
      </ul>
    ) : null;
  } catch (error) {
    return <p>Error streaming hero descriptions.</p>;
  }
}

function RecipeFallback() {
  return <div>Loading recipe...</div>;
}

function HeroDescriptionsFallback() {
  return <div>Loading hero descriptions...</div>;
}

async function generatePerson() {
  const { generateText } = await import('ai');
  try {
    const { text } = await generateText({
      model: GEMINI_MODEL,
      prompt: 'Generate a short description of a person named Alice who is a software engineer.',
    });
    return <div>{text}</div>;
  } catch (error) {
    return <p>Error generating person.</p>;
  }
}

async function streamPerson() {
  const { streamText } = await import('ai');
  try {
    const { textStream } = await streamText({
      model: GEMINI_MODEL,
      prompt: 'Stream a short description of a person named Bob who is a designer.',
    });
    let result = '';
    for await (const chunk of textStream as AsyncIterable<string>) {
      result += chunk;
    }
    return <div>{result}</div>;
  } catch (error) {
    return <p>Error streaming person.</p>;
  }
}

function PersonFallback() {
  return <div>Loading person...</div>;
}

function StreamedPersonFallback() {
  return <div>Streaming person...</div>;
}

export default async function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Sheikh Chat – AI-Powered Code Assistant</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Chat</h2>
        <div className="mb-4">
          <ChatMessages />
        </div>
        <ChatInput />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Code Editor</h2>
        <CodeEditor />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Code Preview</h2>
        <CodePreview />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">AI Demos</h2>
        <div className="mb-4">
          <Suspense fallback={<RecipeFallback />}>
            {await generateRecipe()}
          </Suspense>
        </div>
        <div className="mb-4">
          <Suspense fallback={<HeroDescriptionsFallback />}>
            {await streamHeroDescriptions()}
          </Suspense>
        </div>
        <div className="mb-4">
          <Suspense fallback={<PersonFallback />}>
            {await generatePerson()}
          </Suspense>
        </div>
        <div className="mb-4">
          <Suspense fallback={<StreamedPersonFallback />}>
            {await streamPerson()}
          </Suspense>
        </div>
      </section>
    </main>
  );
}