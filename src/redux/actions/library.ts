import { AddAudioAction, LibraryAction, LibraryDragStartAction, LibraryDragEndAction } from "@redux/types/library";

export function addAudio(fileName: string, length: number, id: string): AddAudioAction {
  return {
    type: LibraryAction.ADD_AUDIO,
    payload: {
      fileName, length, id,
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
