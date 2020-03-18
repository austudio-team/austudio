export enum KeyEvent {
  'DelBlock' = 'EDITOR_KEY_DEL',
  'Select' = 'EDITOR_KEY_SELECT',
  'Cut' = 'EDITOR_KEY_CUT',
  'Stretch' = 'EDITOR_KEY_STRETCH',
  'ToggleLibrary' = 'EDITOR_KEY_TOGGLE_LIBRARY',
  'TogglePlay' = 'EDITOR_KEY_TOGGLE_PLAY',
  'ToggleRecord' = 'EDITOR_KEY_TOGGLE_RECORD'
}

// Declare all the key in Windows keyboard layout
interface ShortCutType {
  type: KeyEvent;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  code: string;
}

export const ShortCut: ShortCutType[] = [
  {
    type: KeyEvent.DelBlock,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    code: 'Delete',
  },
  {
    type: KeyEvent.Select,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    code: 'KeyZ',
  },
  {
    type: KeyEvent.Cut,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    code: 'KeyX',
  },
  {
    type: KeyEvent.Stretch,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    code: 'KeyC',
  },
  {
    type: KeyEvent.ToggleLibrary,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    code: 'KeyL',
  },
  {
    type: KeyEvent.TogglePlay,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    code: 'Space',
  },
  {
    type: KeyEvent.ToggleRecord,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    code: 'KeyR',
  },
]
