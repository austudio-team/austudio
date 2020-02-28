import { EditorState } from "@redux/types/editor";

export const isBlockSelectedSelector = (state: EditorState, sliceId: string) => {
  return state.selectedBlock === sliceId;
}
