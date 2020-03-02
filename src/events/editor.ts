export enum EditorEvent {
  'editorHeightChange' = 'editorHeightChange',
  'editorWidthChange' = 'editorWidthChange',
  'editorScrollYChanged' = 'editorScrollYChanged',
  'editorScrollYShouldChange' = 'editorScrollYShouldChange',
  'editorScrollXChanged' = 'editorScrollXChanged',
  'editorScrollXShouldChange' = 'editorScrollXShouldChange',
  'editorRequestAutoScrollX' = 'editorRequestAutoScrollX',
  'editorRequestAutoScrollY' = 'editorRequestAutoScrollY',
  'editorCancelAutoScrollX' = 'editorCancelAutoScrollX',
  'editorCancelAutoScrollY' = 'editorCancelAutoScrollY',
}

export interface EditorHeightChangeEvent {
  clientHeight: number;
  scrollHeight: number;
}

export interface EditorWidthChangeEvent {
  clientWidth: number;
}

export interface EditorScrollYChangeEvent {
  scrollTop: number;
}

export interface EditorScrollYShouldChangeEvent {
  scrollTop: number;
}

export interface EditorScrollXChangeEvent {
  scrollLeft: number;
}

export interface EditorScrollXShouldChangeEvent {
  scrollLeft: number;
}

export interface editorRequestAutoScrollEvent {
  delta: number;
}
