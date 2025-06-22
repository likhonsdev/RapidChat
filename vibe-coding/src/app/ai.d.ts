import "ai/rsc";
import { AIActions, OnGetUIState, OnSetAIState } from "ai/rsc";

declare module "ai/rsc" {
  export function createAI<AIState = any, UIState = any, Actions extends AIActions = {}>({
    actions,
    initialAIState,
    initialUIState,
    onSetAIState,
    onGetUIState,
    artifactDefinitions,
  }: {
    actions: Actions;
    initialAIState?: AIState;
    initialUIState?: UIState;
    onSetAIState?: OnSetAIState<AIState>;
    onGetUIState?: OnGetUIState<UIState>;
    artifactDefinitions?: any[];
  }): any;

  export { createAI };
}