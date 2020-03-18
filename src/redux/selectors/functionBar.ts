import { FunctionBarState } from "@redux/types/functionBar";

export const librarySelector = (state: FunctionBarState) => {
  return state.library;
}

export const cursorTypeSelector = (state: FunctionBarState) => {
  return state.cursorType;
}

export const playingSelector = (state: FunctionBarState) => {
  return state.playing;
}

export const recordingSelector = (state: FunctionBarState) => {
  return state.recording;
}
