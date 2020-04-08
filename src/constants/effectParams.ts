import { Effects } from "@constants/effects"

interface compressorParams {
  attack: number,
  release: number,
  ratio: number,
  threshold: number,
  gain: number
}

export const defaultCompressorParams: compressorParams = {
  attack: 0.3,
  release: 0.15,
  ratio: 10,
  threshold: -50,
  gain: 0.3
}
interface delayParams {
  type: number,
  delayLeft: number,
  delayRight: number,
  feedback: number,
  dry: number
}

export const defaultDelayParams: delayParams = {
  type: 0,
  delayLeft: 0.2,
  delayRight: 0.2,
  feedback: 0.5,
  dry: 1
}

interface equlizerParams {
  low: number,
  mid: number,
  high:number
}

export const defaultEqulizerParams: equlizerParams = {
  low: 0.5,
  mid: 0.5,
  high: 0.5
}

interface filterParams {
  type: number,
  frequency: number,
  quality: number,
  gain: number,
  wet: number,
  dry: number
}

export const defaultFilterParams: filterParams = {
  type: 0,
  frequency: 8000,
  quality: 1,
  gain: 0,
  wet: 0.8,
  dry: 0.2
}

interface reverbParams {
  seconds: number,
  decay: number,
  wet: number,
  dry: number
}

export const defaultReverbParams: reverbParams = {
  seconds: 0.01,
  decay: 0.01,
  wet: 1,
  dry: 1
}

interface tremoloParams {
  speed: number,
  depth: number
}

export const defaultTremoloParams: tremoloParams = {
  speed: 4,
  depth: 1
}

export const defaultParams = {
  [Effects.COMPRESSOR]: defaultCompressorParams,
  [Effects.DELAY]: defaultDelayParams,
  [Effects.EQUALIZER]: defaultEqulizerParams,
  [Effects.REVERB]: defaultReverbParams,
  [Effects.TREMOLO]: defaultTremoloParams,
  [Effects.FILTER]: defaultFilterParams
}
