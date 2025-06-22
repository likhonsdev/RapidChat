import React from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";

const CodePreview = () => {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Sandpack
        template="react"
        files={{
          "/App.js": {
            code: `
              import React from "react";

              const App = () => {
                return (
                  <h1>Hello Sandpack</h1>
                );
              };

              export default App;
            `,
          },
        }}
      />
    </div>
  );
};

export default CodePreview;