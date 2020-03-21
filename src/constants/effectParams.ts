import { Effects } from "@constants/effects"

interface compressorParams {
  attack: number,
  release: number,
  ration: number,
  threshold: number,
  gain: number
}

export const defaultCompressorParams: compressorParams = {
  attack: 0.3,
  release: 0.15,
  ration: 10,
  threshold: -50,
  gain: 0.3
}

interface delayParams {
  type: number,
  delay: number,
  feedback: number,
  cutoff: number,
  offset: number,
  dry: number
}

export const defaultDelayParams: delayParams = {
  type: 0,
  delay: 1,
  feedback: 0.5,
  cutoff: 8000,
  offset: 0,
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
  type: string,
  frequency: number,
  quality: number,
  gain: number,
  wet: number,
  dry: number
}

export const defaultFilterParams: filterParams = {
  type: 'lowpass',
  frequency: 8000,
  quality: 1,
  gain: 1,
  wet: 1,
  dry: 0
}

interface reverbParams {
  seconds: number,
  decay: number,
  delay: number,
  reverse: boolean
}

export const defaultReverbParams: reverbParams = {
  seconds: 3,
  decay: 2,
  delay: 2,
  reverse: false
}

interface tremoloParams {
  speed: number,
  depth: number
}

export const defaultTremoloParams: tremoloParams = {
  speed: 0.7,
  depth: 0.5
}

export const defaultParams = {
  [Effects.COMPRESSOR]: defaultCompressorParams,
  [Effects.DELAY]: defaultDelayParams,
  [Effects.EQUALIZER]: defaultEqulizerParams,
  [Effects.REVERB]: defaultReverbParams,
  [Effects.TREMOLO]: defaultTremoloParams,
  [Effects.FILTER]: defaultFilterParams
}