import { LibraryAction, LibraryActionType, LibraryState, Audio } from "@redux/types/library";

const initialState: LibraryState = {
  audioInfo: {},
  audioList: [],
  draggingAudioId: null,
}

export function libraryReducer(state: LibraryState = initialState, action: LibraryActionType): LibraryState {
  switch (action.type) {
    case LibraryAction.ADD_AUDIO: {
      const { fileName, length, id } = action.payload;
      const newAudio: Audio = {
        fileName,
        length,
        id,
      };
      return {
        ...state,
        audioInfo: {
          ...state.audioInfo,
          [newAudio.id]: newAudio,
        },
        audioList: [...state.audioList, newAudio.id],
      };
    }
    case LibraryAction.DRAG_START: {
      const { audioId } = action.payload;
      return {
        ...state,
        draggingAudioId: audioId,
      };
    }
    case LibraryAction.DRAG_END: {
      return {
        ...state,
        draggingAudioId: null,
      }
    }
    default:
      return state;
  }
}
