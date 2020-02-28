export enum EditorAction {
  'SELECT_BLOCK' = 'SELECT_BLOCK',
}

export interface EditorState {
  selectedBlock: string | null;
}

export interface SelectBlockAction {
  type: typeof EditorAction.SELECT_BLOCK,
  payload: {
    id: string | null;
  }
}

export type EditorActionType = SelectBlockAction;
