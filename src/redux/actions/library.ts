import { AddAudioAction, LibraryAction, LibraryDragStartAction, LibraryDragEndAction, DeleteAudioAction, RequestDeleteAudioAction } from "@redux/types/library";

export function addAudio(fileName: string, length: number, id: string): AddAudioAction {
  return {
    type: LibraryAction.ADD_AUDIO,
    payload: {
      fileName, length, id,
    },
  };
}

export function deleteAudio(id: string): DeleteAudioAction {
  return {
    type: LibraryAction.DELETE_AUDIO,
    payload: {
      id,
    },
  };
}

export function requestDeleteAudio(id: string): RequestDeleteAudioAction {
  return {
    type: LibraryAction.REQUEST_DELETE_AUDIO,
    payload: {
      id,
    },
  };
}

export function libraryDragStart(audioId: string): LibraryDragStartAction {
  return {
    type: LibraryAction.DRAG_START,
    payload: {
      audioId,
    },
  };
}

export function libraryDragEnd(): LibraryDragEndAction {
  return {
    type: LibraryAction.DRAG_END,
  };
}
