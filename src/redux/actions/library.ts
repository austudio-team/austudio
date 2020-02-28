import { AddAudioAction, LibraryAction } from "@redux/types/library";

export function addAudio(fileName: string, length: number): AddAudioAction {
  return {
    type: LibraryAction.ADD_AUDIO,
    payload: {
      fileName, length,
    },
  };
}
