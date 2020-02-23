import { FunctionBarState } from "@redux/types/functionBar";

export const librarySelector = (state: FunctionBarState) => {
  return state.library;
}
