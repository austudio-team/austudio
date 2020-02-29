import eventEmitter from '@utils/event';

export enum EditorEvent {
  'editorHeightChange' = 'editorHeightChange',
  'editorScrollYChanged' = 'editorScrollYChanged',
  'editorScrollYShouldChange' = 'editorScrollYShouldChange',
  'editorScrollXChanged' = 'editorScrollXChanged',
}

export interface EditorHeightChangeEvent {
  clientHeight: number;
  scrollHeight: number;
}

export interface EditorScrollYChangeEvent {
  scrollTop: number;
}

export interface EditorScrollYShouldChangeEvent {
  scrollTop: number;
}

eventEmitter.on(EditorEvent.editorHeightChange, ({ clientHeight, scrollHeight }: EditorHeightChangeEvent) => {

});
