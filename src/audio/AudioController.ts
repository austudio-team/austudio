import eventEmitter from '@utils/event';
import { MenuEvent } from '@events/menu';
import store from '@redux';
import { addAudio } from '@redux/actions/library';
import { v4 as uuidv4 } from 'uuid';
import audioMap from './AudioMap';

export class AudioController {
  constructor() {
    this.initEvent();
  }

  initEvent = () => {
    eventEmitter.on(MenuEvent.MENU_IMPORT, this.selectFile);
  }

  mesureByAudio = (url: string) => {
    return new Promise<number>((resolve, reject) => {
      const audio = document.createElement('audio');
      audio.oncanplay = () => {
        resolve(audio.duration);
      };
      audio.src = url;
      audio.load();
    })
  }

  handleFile = async (files: FileList) => {
    for (const f of files) {
      const blob = URL.createObjectURL(f);
      const duration = await this.mesureByAudio(blob);
      const id = uuidv4();
      store.dispatch(addAudio(f.name, Math.floor(duration * 1000), id));
      audioMap[id] = f;
      URL.revokeObjectURL(blob);
    }
  }
  
  selectFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.mp3, .wav';
    input.multiple = true;
    input.style.display = 'none';
    document.body.appendChild(input);
    const handleBlur = () => {
      window.removeEventListener('focus', handleBlur);
      input.remove();
    }
    input.onchange = (e: Event) => {
      const files = (e.currentTarget as HTMLInputElement).files;
      if (files) {
        this.handleFile(files);
        handleBlur();
      }
    }
    window.addEventListener('focus', handleBlur);
    input.click();
  }
}

let audioController: AudioController | null = null;

export const getAudioController = (options?: any) : AudioController => {
  if (audioController) return audioController;
  audioController = new AudioController();
  return audioController;
}
