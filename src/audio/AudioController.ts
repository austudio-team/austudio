import eventEmitter from '@utils/event';
import { MenuEvent } from '@events/menu';
import store from '@redux';
import { addAudio, markAudioReady } from '@redux/actions/library';
import { v4 as uuidv4 } from 'uuid';
import audioMap from './AudioMap';
import { ChannelEvent } from '@events/channel';
import { AudioSlice, Channel } from '@redux/types/channel';
import audioNodeMap from './AudioNodeMap';
import { EditorEvent } from '@events';
import { computeStartParams, getMaxLength } from './utils';
import { Compressor, Reverb, Filter, Delay, Equalizer, Tremolo } from '@shyrii/web-audio-effects';
import { Effects } from '@constants';
import { AudioEffectEvent } from '@events/audioEffects';
import { Effect } from '@redux/types/audioEffect';
import { LibraryEvent } from '@events/library';
import { currentTime } from '@utils/time';
import { recordChannelSelector } from '@redux/selectors/channel';
import { createSlice } from '@redux/actions/channel';
import { AudioControllerEvent } from '@events/audioController';
import audioEncoder from 'audio-encoder';
import fileSaver from 'file-saver';

const EffectMap = {
  [Effects.COMPRESSOR]: Compressor,
  [Effects.DELAY]: Delay,
  [Effects.EQUALIZER]: Equalizer,
  [Effects.FILTER]: Filter,
  [Effects.REVERB]: Reverb,
  [Effects.TREMOLO]: Tremolo,
}

export class AudioController {
  public audioContext: AudioContext;
  public playing = false;
  constructor() {
    this.initEvent();
    this.audioContext = new AudioContext();
  }

  private initEvent = () => {
    eventEmitter.on(MenuEvent.MENU_IMPORT, this.selectFile);
    eventEmitter.on(MenuEvent.MENU_EXPORT, this.export);
    eventEmitter.on(ChannelEvent.CHANNEL_ADD_SLICE, this.addSlice);
    eventEmitter.on(ChannelEvent.CHANNEL_DELETE_SLICE, this.deleteSlice);
    eventEmitter.on(ChannelEvent.CHANNEL_UPDATE_SLICE, this.updateSlice);
    eventEmitter.on(ChannelEvent.CHANNEL_DELETE_CHANNEL, this.removeChannel);
    eventEmitter.on(ChannelEvent.CHANNEL_UPDATE_CHANNEL, this.restartPlay);
    eventEmitter.on(ChannelEvent.CHANNEL_UPDATE_CHANNEL_VOL, this.updateVol);
    eventEmitter.on(ChannelEvent.CHANNEL_UPDATE_CHANNEL_PAN, this.updatePan);
    eventEmitter.on(AudioEffectEvent.EFFECT_ADD_EFFECT, this.addEffect);
    eventEmitter.on(AudioEffectEvent.EFFECT_UPDATE_EFFECT, this.updateEffect);
    eventEmitter.on(AudioEffectEvent.EFFECT_DELETE_EFFECT, this.removeEffect);
    eventEmitter.on(EditorEvent.requestPlay, this.play);
    eventEmitter.on(EditorEvent.requestPause, this.pause);
    eventEmitter.on(LibraryEvent.DELETE_AUDIO, this.deleteAudio);
  }

  private mesureByAudio = (url: string) => {
    return new Promise<number>((resolve, reject) => {
      const audio = document.createElement('audio');
      audio.onloadeddata = () => {
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

  public handleFile = async (files: FileList | File[]) => {
    const filesWithId: { f: File, id: string }[] = [];
    for (const f of files) {
      const id = uuidv4();
      store.dispatch(addAudio(f.name, 0, id, false));
      filesWithId.push({
        id,
        f,
      });
    }
    for (const { id, f } of filesWithId) {
      // const blob = URL.createObjectURL(f);
      const arrayBuffer = await this.fileAsArrayBuffer(f);
      const decoded = await this.decodeAudio(arrayBuffer);
      store.dispatch(markAudioReady(id, Math.floor(decoded.duration * 1000)));
      audioMap[id] = {
        file: f,
        audioBuffer: decoded,
      };
      // URL.revokeObjectURL(blob);
    }
    return filesWithId.map(v => v.id);
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

  private deleteAudio = (id: string) => {
    delete audioMap[id];
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
      const gainNode = this.audioContext.createGain();
      const panNode = this.audioContext.createStereoPanner();
      gainNode.connect(panNode);
      panNode.connect(this.audioContext.destination);
      audioNodeMap[channelId] = {
        gainNode,
        panNode,
        effects: [],
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
      if (channel.solo) {
        soloChannel.push(channel);
      } else if (!channel.mute) {
        normalChannel.push(channel);
      }
    }
    const time = this.audioContext.currentTime;
    const targetChannel = soloChannel.length > 0 ? soloChannel.filter(v => v.mute === false) : normalChannel;
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
    if (!audioNodeMap[channelId]) {
      this.addChannel(channelId);
    }
    dataSource.connect(audioNodeMap[channelId].gainNode);
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

  public restartPlay = () => {
    if (this.playing) {
      this.pause();
      this.play();
    }
  }

  private stopChannel = (channelId: string) => {
    if (this.playing) {
      const channel = audioNodeMap[channelId];
      channel.gainNode.disconnect();
      channel.panNode.disconnect();
      for (const slice of Object.values(channel.slices)) {
        slice.node.stop();
        slice.node.disconnect();
      }
    }
  }

  private removeChannel = (channelId: string) => {
    this.stopChannel(channelId)
    delete audioNodeMap[channelId];
  }

  private updateVol = ({ channelId, vol }: { channelId: string, vol: number }) => {
    this.addChannel(channelId);
    if (audioNodeMap[channelId]) {
      audioNodeMap[channelId].gainNode.gain.value = vol;
    }
  }

  private updatePan = ({ channelId, pan }: { channelId: string, pan: number }) => {
    this.addChannel(channelId);
    if (audioNodeMap[channelId]) {
      audioNodeMap[channelId].panNode.pan.value = pan;
    }
  }

  private addEffect = ({ channelId, effect }: { channelId: string, effect: Effect }) => {
    this.addChannel(channelId);
    const effectNode = new EffectMap[effect.type](this.audioContext, effect.params);
    const targetChannelNode = audioNodeMap[channelId];
    if (targetChannelNode.effects.length === 0) {
      targetChannelNode.panNode.disconnect();
      targetChannelNode.panNode.connect(effectNode.input);
    } else {
      const lastEffect = targetChannelNode.effects[targetChannelNode.effects.length - 1];
      lastEffect.node.disconnect();
      lastEffect.node.connect(effectNode.input);
    }
    effectNode.connect(this.audioContext.destination);
    targetChannelNode.effects.push({
      effectId: effect.id,
      node: effectNode,
    });
  }

  private updateEffect = ({ channelId, effectParams, index }: { channelId: string, effectParams: any, index: number}) => {
    const targetChannelNode = audioNodeMap[channelId];
    const targetNode = targetChannelNode.effects[index];
    targetNode.node.updateParams(effectParams);
  }

  private removeEffect = ({ channelId, effectId }: { channelId: string, effectId: string }) => {
    this.addChannel(channelId);
    const targetChannelNode = audioNodeMap[channelId];
    const index = targetChannelNode.effects.findIndex(v => v.effectId === effectId);
    const targetEffectNode = targetChannelNode.effects[index];
    targetEffectNode.node.disconnect();
    if (targetChannelNode.effects.length === 1) {
      targetChannelNode.panNode.disconnect();
      targetChannelNode.panNode.connect(this.audioContext.destination);
    } else if (index > 0) {
      const lastEffect = targetChannelNode.effects[index - 1];
      const nextEffect = index < targetChannelNode.effects.length - 1 ? targetChannelNode.effects[index + 1].node.input : this.audioContext.destination;
      lastEffect.node.disconnect();
      lastEffect.node.connect(nextEffect);
    } else {
      targetChannelNode.panNode.disconnect();
      targetChannelNode.panNode.connect(targetChannelNode.effects[1].node.input);
    }
    targetChannelNode.effects.splice(index, 1);
  }

  // private tempOriginDatas: Float32Array[] = [];
  // private recordStream: MediaStream | null = null;
  // private tempGainNode: GainNode | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private recordShouldStop = false;
  private recordStoped = true;
  public recordStartOffset = 0;

  public startRecord = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      // const input = this.audioContext.createMediaStreamSource(stream);
      // this.recordStream = stream;
      // const tracks = stream.getAudioTracks();
      // const processor = this.audioContext.createScriptProcessor(1024, tracks.length, tracks.length);
      // input.connect(processor);
      // const gain = this.audioContext.createGain();
      // gain.gain.value = 0;
      // processor.connect(gain);
      // this.tempGainNode = gain;
      // gain.connect(this.audioContext.destination);
      // this.tempOriginDatas = Array(tracks.length).fill(0).map(() => new Float32Array());
      // let offset = 0;
      // processor.onaudioprocess = ev => {
      //   for (let i = 0; i < ev.inputBuffer.numberOfChannels; i++) {
      //     const data = ev.inputBuffer.getChannelData(i);
      //     console.log(data);
      //     this.tempOriginDatas[i].set(data, offset);
      //     if (i === ev.inputBuffer.numberOfChannels - 1) offset += data.length;
      //   }
      // };
      this.recordStartOffset = currentTime.time;
      this.recordedChunks = [];
      this.recordShouldStop = false;
      this.recordStoped = false;
      const mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder = mediaRecorder;
      this.mediaRecorder.ondataavailable = (e) => {
        this.recordedChunks.push(e.data);
        if(this.recordShouldStop === true && this.recordStoped === false) {
          mediaRecorder.stop();
          this.recordStoped = true;
        }
      }
      this.mediaRecorder.onstop = async e => {
        stream.getTracks().forEach(track => track.stop());
        const file = new File(this.recordedChunks, `record_${uuidv4().slice(9, 13)}.wav`);
        const ids = await this.handleFile([file]);
        const audio = ids[0];
        const recordChannel = recordChannelSelector(store.getState().channel);
        if (recordChannel) {
          store.dispatch(createSlice(recordChannel.id, {
            offset: this.recordStartOffset,
            start: -1,
            end: -1,
            stretch: 1,
            audioId: audio,
          }));
        }
      }
      mediaRecorder.start(100);
      eventEmitter.emit(AudioControllerEvent.AUDIO_CONTROLLER_RECORD_STARTED);
    }).catch();
  }

  public stopRecord = () => {
    // console.log(this.tempOriginDatas);
    // if (this.recordStream) {
    //   this.recordStream.getTracks().forEach(track => track.stop());
    //   delete this.recordStream;
    // }
    // if (this.tempGainNode) {
    //   this.tempGainNode.disconnect();
    //   delete this.tempGainNode;
    // }
    if (this.mediaRecorder) {
      this.recordShouldStop = true;
      delete this.mediaRecorder;
    }
  }

  public tryRecord = () => {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        stream.getTracks().forEach(track => track.stop());
        resolve();
      }).catch(e => reject());
    })
  }

  public export = (params: { format: string, sampleRate: number, bitRate: number }) => {
    return new Promise((resolve, reject) => {
      const { audioEffect, channel, library } = store.getState();
      const length = getMaxLength(channel.channel, library.audioInfo);
      if (length === 0) reject('Empty project can\'t be exported.');
      const offlineAudioContext = new OfflineAudioContext(2, params.sampleRate * length / 1000, params.sampleRate);
      const soloChannel: Channel[] = [];
      const normalChannel: Channel[] = [];
      for (const c of Object.values(channel.channel)) {
        if (c.solo) {
          soloChannel.push(c);
        } else if (!c.mute) {
          normalChannel.push(c);
        }
      }
      const targetChannel = soloChannel.length > 0 ? soloChannel.filter(v => v.mute === false) : normalChannel;
      const time = offlineAudioContext.currentTime;
      for (const c of targetChannel) {
        const gainNode = offlineAudioContext.createGain();
        gainNode.gain.value = c.vol / 100;
        const panNode = offlineAudioContext.createStereoPanner();
        panNode.pan.value = c.pan / 100;
        gainNode.connect(panNode);
        panNode.connect(offlineAudioContext.destination);
        const effects = audioEffect.channelEffects[c.id];
        let lastNode: any = null;
        if (effects && effects.length > 0) {
          panNode.disconnect();
          for (const [i, effect] of effects.entries()) {
            const effectNode = new EffectMap[effect.type](this.audioContext, effect.params);
            if (i === 0) {
              panNode.connect(effectNode.input);
            } else {
              lastNode.connect(effectNode.input);
            }
            if (i === effects.length - 1) {
              effectNode.connect(offlineAudioContext.destination);
            }
            lastNode = effectNode;
          }
        }
        for (const slice of c.slices) {
          const dataSource = offlineAudioContext.createBufferSource();
          dataSource.buffer = audioMap[slice.audioId].audioBuffer;
          dataSource.connect(gainNode);
          dataSource.playbackRate.value = 1 / slice.stretch;
          const [when, offset, duration] = computeStartParams(slice, library.audioInfo[slice.audioId], true);
          dataSource.start(time + when, offset, duration);
        }
      }
      offlineAudioContext.startRendering().then(res => {
        audioEncoder(res, params.format === 'wav' ? 0 : params.bitRate, (res) => {
          eventEmitter.emit(AudioControllerEvent.AUDIO_CONTROLLER_EXPORT_PROGRESS, res);
        }, (res) => {
          fileSaver.saveAs(res, `export.${params.format}`);
          resolve();
        })
      }).catch(e => reject(e));
    });
  }
}

let audioController: AudioController | null = null;

export const getAudioController = (options?: any) : AudioController => {
  if (audioController) return audioController;
  audioController = new AudioController();
  return audioController;
}
