import eventEmitter from '@utils/event';

export enum EditorEvent {
  'editorHeightChange' = 'editorHeightChange',
  'editorWidthChange' = 'editorWidthChange',
  'editorScrollYChanged' = 'editorScrollYChanged',
  'editorScrollYShouldChange' = 'editorScrollYShouldChange',
  'editorScrollXChanged' = 'editorScrollXChanged',
  'editorScrollXShouldChange' = 'editorScrollXShouldChange',
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

eventEmitter.on(EditorEvent.editorHeightChange, ({ clientHeight, scrollHeight }: EditorHeightChangeEvent) => {

});
