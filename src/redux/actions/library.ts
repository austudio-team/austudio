import { AddAudioAction, LibraryAction, LibraryDragStartAction, LibraryDragEndAction, DeleteAudioAction, RequestDeleteAudioAction, MarkAudioReadyAction } from "@redux/types/library";

export function addAudio(fileName: string, length: number, id: string, ready: false): AddAudioAction {
  return {
    type: LibraryAction.ADD_AUDIO,
    payload: {
      fileName, length, id, ready,
    },
  };
}

export function markAudioReady(id: string, length?: number): MarkAudioReadyAction {
  return {
    type: LibraryAction.MARK_AUDIO_READY,
    payload: {
      id,
      length,
    }
  }
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
