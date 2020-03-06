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
  'editorIndicatorChanged' = 'editorIndicatorChanged',
  'editorIndicatorShouldChange' = 'editorIndicatorShouldChange',
  'editorTrackMouseEnter' = 'editorTrackMouseEnter',
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

export interface EditorRequestAutoScrollEvent {
  delta: number;
}

export interface EditorTrackMouseEnterEvent {
  channelId: string;
  channelIndex: number;
}

export interface EditorIndicatorChangeEvent {
  offset: number;
}
