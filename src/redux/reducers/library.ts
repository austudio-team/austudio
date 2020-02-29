import { LibraryAction, LibraryActionType, LibraryState, Audio } from "@redux/types/library";
import { v4 as uuidv4 } from 'uuid';

const initialState: LibraryState = {
  audioInfo: {
    'test': {
      fileName: 'Audio音频.mp3',
      id: 'test',
      length: 6000,
    }
  },
  audioList: ['test'],
  draggingAudioId: null,
}

export function libraryReducer(state: LibraryState = initialState, action: LibraryActionType): LibraryState {
  switch (action.type) {
    case LibraryAction.ADD_AUDIO: {
      const { fileName, length } = action.payload;
      const newAudio: Audio = {
        fileName,
        length,
        id: uuidv4(),
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
