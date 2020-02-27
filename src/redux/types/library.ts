export enum LibraryAction {
  'ADD_AUDIO' = 'ADD_AUDIO',
}

export interface Audio {
  fileName: string;
  length: number;
  id: string;
}

export interface LibraryState {
  audioInfo: {
    [id: string]: Audio;
  };
  audioList: string[];
}

export interface AddAudioAction {
  type: typeof LibraryAction.ADD_AUDIO,
  payload: {
    fileName: string,
    length: number,
  }
}

export type LibraryActionType = AddAudioAction;
