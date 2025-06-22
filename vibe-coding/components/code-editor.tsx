"use client";

import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

const CodeEditor = () => {
  const [code, setCode] = useState('');

  const onChange = (value: string) => {
    setCode(value);
  };

  return (
    <div>
      <CodeMirror
        value={code}
        height="200px"
        theme={dracula}
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
    </div>
  );
};

export default CodeEditor;