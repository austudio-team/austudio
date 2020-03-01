import { EditorState, EditorAction, EditorActionType } from "@redux/types/editor";

const initialState: EditorState = {
  selectedBlock: null,
  zoom: 100,
  // 暂时设置为 10 min
  maxLength: 1000 * 60 * 10,
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
