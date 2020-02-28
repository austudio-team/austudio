export enum EditorAction {
  'SELECT_BLOCK' = 'SELECT_BLOCK',
  'UPDATE_ZOOM' = 'UPDATE_ZOOM',
  'UPDATE_MAXLENGTH' = 'UPDATE_MAXLENGTH',
  'AUDIO_DROP' = 'AUDIO_DROP',
}

export interface EditorState {
  selectedBlock: string | null;
  // zoom: 1px 代表多少 ms
  zoom: number;
  maxLength: number;
}

export interface SelectBlockAction {
  type: typeof EditorAction.SELECT_BLOCK;
  payload: {
    id: string | null;
  }
}

export interface UpdateZoomAction {
  type: typeof EditorAction.UPDATE_ZOOM;
  payload: {
    zoom: number;
  };
}

export interface UpdateMaxLengthAction {
  type: typeof EditorAction.UPDATE_MAXLENGTH;
  payload: {
    maxLength: number;
  };
}

export interface AudioDropAction {
  type: typeof EditorAction.AUDIO_DROP;
  payload: {
    offset: number;
    channelId: string;
  };
}

export type EditorActionType = SelectBlockAction | UpdateZoomAction | UpdateMaxLengthAction | AudioDropAction;
