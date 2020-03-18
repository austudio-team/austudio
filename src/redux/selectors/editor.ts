import { EditorState } from "@redux/types/editor";

export const isBlockSelectedSelector = (state: EditorState, sliceId: string) => {
  return state.selectedBlock === sliceId;
}

export const selectedBlockSelector = (state: EditorState) => {
  return state.selectedBlock;
}

export const zoomSelector = (state: EditorState) => {
  return state.zoom;
}

export const maxLengthSelector = (state: EditorState) => {
  return state.maxLength;
}
