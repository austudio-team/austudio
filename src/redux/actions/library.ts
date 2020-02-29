import { AddAudioAction, LibraryAction, LibraryDragStartAction, LibraryDragEndAction } from "@redux/types/library";

export function addAudio(fileName: string, length: number): AddAudioAction {
  return {
    type: LibraryAction.ADD_AUDIO,
    payload: {
      fileName, length,
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
