import { create } from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AppState {
  // Chat state
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  
  // Preview state
  previewContent: string;
  setPreviewContent: (content: string) => void;
  
  // UI state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Project state
  projectName: string;
  setProjectName: (name: string) => void;
}

const useAppStore = create<AppState>((set) => ({
  // Chat state
  messages: [],
  addMessage: (message) => 
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          timestamp: new Date(),
          ...message,
        },
      ],
    })),
  clearMessages: () => set({ messages: [] }),
  
  // Preview state
  previewContent: '',
  setPreviewContent: (content) => set({ previewContent: content }),
  
  // UI state
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  // Project state
  projectName: 'New Project',
  setProjectName: (name) => set({ projectName: name }),
}));

export default useAppStore;