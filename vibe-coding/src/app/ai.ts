import { createAI as createAIBase, AIActions } from "ai/rsc";
import { generateUI } from "./actions";
import { artifactDefinitions } from "@/lib/artifacts";

interface CreateAIProps<AIState = any, UIState = any, Actions extends AIActions = {}> {
  actions: Actions;
  initialAIState?: AIState;
  initialUIState?: UIState;
  onSetAIState?: (({ key, state, done }: { key: string | number | symbol | undefined; state: AIState; done: boolean; }) => void | Promise<void>);
  onGetUIState?: (() => Promise<UIState | undefined>);
  artifactDefinitions?: any[];
}

export const createAI = <AIState = any, UIState = any, Actions extends AIActions = {}>({
  actions,
  initialAIState,
  initialUIState,
  onSetAIState,
  onGetUIState,
  artifactDefinitions,
}: CreateAIProps<AIState, UIState, Actions>) => {
  return createAIBase({
    actions,
    initialAIState,
    initialUIState,
    onSetAIState,
    onGetUIState,
  });
};

export const AI = createAI({
  actions: {
    generateUI,
  },
  initialAIState: [],
  initialUIState: [],
  artifactDefinitions,
});