import { EditorState, EditorAction, EditorActionType } from "@redux/types/editor";

const initialState: EditorState = {
  selectedBlock: null,
  zoom: 10,
  maxLength: 0,
}

export function editorReducer(state: EditorState = initialState, action: EditorActionType): EditorState {
  switch (action.type) {
    case EditorAction.SELECT_BLOCK:
      return {
        ...state,
        selectedBlock: action.payload.id,
      }
    case EditorAction.UPDATE_ZOOM: {
      return {
        ...state,
        zoom: action.payload.zoom,
      }
    }
    default:
      return state;
  }
}
