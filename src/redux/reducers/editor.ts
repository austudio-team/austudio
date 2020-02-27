import { EditorState, EditorAction, EditorActionType } from "@redux/types/editor";

const initialState: EditorState = {
  selectedBlock: null,
}

export function editorReducer(state: EditorState = initialState, action: EditorActionType): EditorState {
  switch (action.type) {
    case EditorAction.SELECT_BLOCK:
      return {
        ...state,
        selectedBlock: action.payload.id,
      }
    default:
      return state;
  }
}
