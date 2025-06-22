"use client";

import { useActions, useStreamableValue } from "ai/rsc";
import { SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeReact from 'rehype-react';
import { Fragment, useState } from 'react';

const remarkPlugins = [remarkGfm];
const rehypePlugins = [
  rehypeRaw,
  rehypeSanitize,
  [rehypeReact, { createElement: Fragment }],
];

export function Chat() {
  const { generateUI } = useActions();
  const [inputValue, setInputValue] = useState("");
  const [aiResponse, setAiResponse] = useState<React.ReactNode | null>(null);
  const [data, error, pending]: [React.ReactNode, Error | undefined, boolean] = useStreamableValue(aiResponse as any); // Explicitly type data

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await generateUI(inputValue);
    setAiResponse(response);
    setInputValue("");
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {aiResponse && (
        <div className="whitespace-pre-wrap">
          <div className="flex gap-2 p-4 rounded-lg bg-zinc-900">
            <div className="font-bold text-zinc-400">AI:</div>
            {pending ? <div>Loading...</div> : data}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md p-2 mb-8 flex">
        <Input
          className="w-full p-2 border border-gray-300 rounded shadow-xl"
          value={inputValue}
          placeholder="Say something..."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" className="ml-2">
          <SendHorizonal />
        </Button>
      </form>
    </div>
  );
}