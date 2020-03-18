import { ShortCut } from './keyevent_declare';
import EventEmitter from 'eventemitter3';
import { isMac } from './browser';
import { get } from 'lodash';

export const KeyEventEmitter = new EventEmitter();

const shortCutMap: {
  [ctrlKey: string]: {
    [Metakey: string]: {
      [AltKey: string]: {
        [code: string]: string;
      }
    }
  }
} = {};

// ctrlKey -> MetaKey -> AltKey -> code
const buildShortCutMap = () => {
  ShortCut.forEach(v => {
    const meta = shortCutMap[v.ctrlKey.toString()] = shortCutMap[v.ctrlKey.toString()] || {};
    const alt = meta[v.metaKey.toString()] = meta[v.metaKey.toString()] || {};
    const code = alt[v.altKey.toString()] = alt[v.altKey.toString()] || {};
    code[v.code] = v.type;
  });
}

buildShortCutMap();

const handler = (e: KeyboardEvent) => {
  const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
  const metaKey = isMac ? e.ctrlKey : e.metaKey;

  const type = get(shortCutMap, [ctrlKey.toString(), metaKey.toString(), e.altKey.toString(), e.code], null);

  console.log(type, e);
  
  if (type) {
    KeyEventEmitter.emit(type);
  }
}

export const initKeyEvent = () => {
  window.addEventListener('keydown', handler);
}
