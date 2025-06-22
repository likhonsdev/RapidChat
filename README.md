# Sheikh Chat - AI-Powered Code Assistant

An advanced AI code assistant powered by Google Gemini Pro, featuring real-time code editing capabilities with CodeMirror/Monaco Editor integration and Sandpack for live code previews.

🚀 Features
- Real-time AI chat powered by Google Gemini Pro
- Live collaborative code editing with CodeMirror/Monaco Editor
- Instant, interactive code previews using Sandpack (no page reloads)
- Server-side streaming with Vercel AI SDK for fast, responsive AI
- Modern UI with Tailwind CSS and shadcn/ui components
- Fully responsive, accessible design
- TypeScript-first codebase
- Real-time code validation and syntax highlighting
- Extensible architecture for custom AI workflows

🏆 Why Sheikh Chat is Better than v0.dev
- Live Editing & Preview: Instantly edit and preview code in real time—no waiting for builds or reloads.
- Modern, Customizable UI: Built with Tailwind CSS and shadcn/ui for a beautiful, accessible experience.
- Open & Extensible: Easily add new AI models, workflows, or UI components.
- Streaming AI Responses: Get code suggestions as you type, powered by Google Gemini Pro and Vercel AI SDK.
- Full Sandpack Integration: Preview React, TypeScript, and more with full support for Sandpack environments.
- Transparent & Open Source: MIT licensed, with clear, well-documented code.

🛠️ Tech Stack
- Frontend: Next.js 14, React 18
- AI: Google Gemini Pro, Vercel AI SDK
- Code Editing: CodeMirror 6, Monaco Editor
- Code Preview: Sandpack
- Styling: Tailwind CSS, shadcn/ui
- Language: TypeScript

## Getting Started

```bash
npm install
# or
pnpm install
```

Set up environment variables:

```bash
cp .env.example .env.local
```

Add your Google Gemini API key to .env.local:

```
GOOGLE_API_KEY=your_api_key_here
```

Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open http://localhost:3000 in your browser.

🔧 Configuration
- Edit `tailwind.config.js` for theme customization
- Modify `route.ts` for AI response handling
- Adjust components for UI components
- Configure CodeMirror/Monaco settings in their respective components

📝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

📄 License
MIT License - feel free to use this project for any purpose.

🙏 Acknowledgments
- Google Gemini for AI capabilities
- Vercel for the AI SDK and hosting platform
- CodeSandbox for Sandpack
- All other open-source contributors

## For Users
- Intuitive AI chat interface
- Beautiful glassmorphism design
- Responsive cross-device compatibility
- Professional workspace management
- Seamless navigation experience

🌟 Technical Excellence
The enhanced application demonstrates:
- Modern React development with cutting-edge tools
- Scalable architecture ready for enterprise use
- Professional UI/UX with attention to detail
- Comprehensive error handling and edge cases
- Production-ready deployment and optimization