export enum LibraryAction {
  'ADD_AUDIO' = 'ADD_AUDIO',
  'DRAG_START' = 'LIB_DRAG_START',
  'DRAG_END' = 'LIB_DRAG_END',
  'DELETE_AUDIO' = 'DELETE_AUDIO',
  'REQUEST_DELETE_AUDIO' = 'REQUEST_DELETE_AUDIO',
  'MARK_AUDIO_READY' = 'MARK_AUDIO_READY',
}

export interface Audio {
  fileName: string;
  length: number;
  id: string;
  ready: boolean;
}

export interface LibraryState {
  audioInfo: {
    [id: string]: Audio;
  };
  audioList: string[];
  draggingAudioId: string | null;
}

export interface AddAudioAction {
  type: typeof LibraryAction.ADD_AUDIO,
  payload: {
    fileName: string,
    length: number,
    id: string,
    ready: boolean,
  }
}

export interface MarkAudioReadyAction {
  type: typeof LibraryAction.MARK_AUDIO_READY,
  payload: {
    id: string,
    length?: number,
  }
}

export interface DeleteAudioAction {
  type: typeof LibraryAction.DELETE_AUDIO,
  payload: {
    id: string,
  }
}

export interface RequestDeleteAudioAction {
  type: typeof LibraryAction.REQUEST_DELETE_AUDIO,
  payload: {
    id: string,
  }
}

export interface LibraryDragStartAction {
  type: typeof LibraryAction.DRAG_START,
  payload: {
    audioId: string,
  }
}

export interface LibraryDragEndAction {
  type: typeof LibraryAction.DRAG_END,
}

export type LibraryActionType = AddAudioAction | LibraryDragStartAction | LibraryDragEndAction | DeleteAudioAction | MarkAudioReadyAction;
