import eventEmitter from '@utils/event';
import { MenuEvent } from '@events/menu';
import store from '@redux';
import { addAudio } from '@redux/actions/library';
import { v4 as uuidv4 } from 'uuid';
import audioMap from './AudioMap';
import { ChannelEvent } from '@events/channel';
import { AudioSlice, Channel } from '@redux/types/channel';
import audioNodeMap from './AudioNodeMap';
import { EditorEvent } from '@events';
import { computeStartParams } from './utils';

export class AudioController {
  public audioContext: AudioContext;
  public playing = false;
  constructor() {
    this.initEvent();
    this.audioContext = new AudioContext();
  }

  private initEvent = () => {
    eventEmitter.on(MenuEvent.MENU_IMPORT, this.selectFile);
    eventEmitter.on(ChannelEvent.CHANNEL_ADD_SLICE, this.addSlice);
    eventEmitter.on(ChannelEvent.CHANNEL_DELETE_SLICE, this.deleteSlice);
    eventEmitter.on(ChannelEvent.CHANNEL_UPDATE_SLICE, this.updateSlice);
    eventEmitter.on(EditorEvent.requestPlay, this.play);
    eventEmitter.on(EditorEvent.requestPause, this.pause);
  }

  private mesureByAudio = (url: string) => {
    return new Promise<number>((resolve, reject) => {
      const audio = document.createElement('audio');
      audio.oncanplay = () => {
        resolve(audio.duration);
      };
      audio.src = url;
      audio.load();
    });
  }

  private fileAsArrayBuffer = (file: File) => {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = e => {
        resolve((e.target?.result) as ArrayBuffer);
      }
    });
  }

  private decodeAudio = (array: ArrayBuffer) => {
    return this.audioContext.decodeAudioData(array);
  }

  public handleFile = async (files: FileList) => {
    for (const f of files) {
      const blob = URL.createObjectURL(f);
      const duration = await this.mesureByAudio(blob);
      const arrayBuffer = await this.fileAsArrayBuffer(f);
      const decoded = await this.decodeAudio(arrayBuffer);
      const id = uuidv4();
      store.dispatch(addAudio(f.name, Math.floor(duration * 1000), id));
      audioMap[id] = {
        file: f,
        audioBuffer: decoded,
      };
      URL.revokeObjectURL(blob);
    }
  }
  
  public selectFile = () => {
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

  private addSlice = ({ channelId, slice } : { channelId: string, slice: AudioSlice } ) => {
    this.addChannel(channelId);
    if (this.playing) {
      const { library } = store.getState();
      const dataSource = this.generateSourceNode(slice, channelId);
      const [when, offset, duration] = computeStartParams(slice, library.audioInfo[slice.audioId]);
      dataSource.playbackRate.value = 1 / slice.stretch;
      dataSource.start(this.audioContext.currentTime + when, offset, duration);
    }
  }

  private addChannel = (channelId: string) => {
    if (!audioNodeMap[channelId]) {
      const node = this.audioContext.createGain();
      node.connect(this.audioContext.destination);
      audioNodeMap[channelId] = {
        node,
        slices: {},
      }
    }
  }

  private play = () => {
    this.playing = true;
    const { channel: stateChannel, library } = store.getState();
    const soloChannel: Channel[] = [];
    const normalChannel: Channel[] = [];
    for (const channel of Object.values(stateChannel.channel)) {
    if (channel.solo && !channel.mute) {
        soloChannel.push(channel);
      } else if (!channel.mute) {
        normalChannel.push(channel);
      }
    }
    const time = this.audioContext.currentTime;
    const targetChannel = soloChannel.length > 0 ? soloChannel : normalChannel;
    for (const channel of targetChannel) {
      for (const slice of channel.slices) {
        const dataSource = this.generateSourceNode(slice, channel.id);
        const [when, offset, duration] = computeStartParams(slice, library.audioInfo[slice.audioId]);
        dataSource.playbackRate.value = 1 / slice.stretch;
        dataSource.start(time + when, offset, duration);
      }
    }
  }

  private generateSourceNode = (slice: AudioSlice, channelId: string) => {
    const dataSource = this.audioContext.createBufferSource();
    dataSource.buffer = audioMap[slice.audioId].audioBuffer;
    dataSource.connect(audioNodeMap[channelId].node);
    audioNodeMap[channelId].slices[slice.id] = { node: dataSource };
    return dataSource;
  }

  private pause = () => {
    this.playing = false;
    const { channel: stateChannel } = store.getState();
    for (const channel of Object.values(stateChannel.channel)) {
      for (const slice of channel.slices) {
        this.stopSlice(channel.id, slice.id);
      }
    }
  }

  private stopSlice = (channelId: string, sliceId: string) => {
    const sliceNode = audioNodeMap[channelId].slices[sliceId];
    if (sliceNode && sliceNode.node) {
      sliceNode.node.stop();
      sliceNode.node.disconnect();
      delete audioNodeMap[channelId].slices[sliceId].node;
    }
  }

  private deleteSlice = ({ sliceId, channelId }: { sliceId: string, channelId: string }) => {
    this.stopSlice(channelId, sliceId);
  }

  private updateSlice = ({ sliceId, oldChannelId, newChannelId }) => {
    if (this.playing) {
      this.stopSlice(oldChannelId, sliceId);
      const { library, channel } = store.getState();
      this.addChannel(newChannelId);
      const slice = channel.channel[newChannelId].slices.filter(v => v.id === sliceId)[0];
      const dataSource = this.generateSourceNode(
        slice,
        newChannelId,
      );
      const [when, offset, duration] = computeStartParams(slice, library.audioInfo[slice.audioId]);
      dataSource.playbackRate.value = 1 / slice.stretch;
      dataSource.start(this.audioContext.currentTime + when, offset, duration);
    }
  }

  public updatePos = () => {
    if (this.playing) {
      this.pause();
      this.play();
    }
  }
}

let audioController: AudioController | null = null;

export const getAudioController = (options?: any) : AudioController => {
  if (audioController) return audioController;
  audioController = new AudioController();
  return audioController;
}
