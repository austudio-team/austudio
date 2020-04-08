import { Effects } from "./effects";
import { defaultCompressorParams, defaultDelayParams, defaultFilterParams, defaultEqulizerParams, defaultReverbParams, defaultTremoloParams } from "./effectParams";

export const EffectForm = {
  [Effects.COMPRESSOR]: [
    {
      key: 'attack',
      name: 'Attack',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultCompressorParams.attack,
    },
    {
      key: 'release',
      name: 'Release',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultCompressorParams.release,
    },
    {
      key: 'ratio',
      name: 'Ratio',
      range: [1, 20],
      step: 0.1,
      defaultValue: defaultCompressorParams.ratio,
    },
    {
      key: 'threshold',
      name: 'Threshold',
      range: [-100, 0],
      step: 1,
      defaultValue: defaultCompressorParams.threshold,
    },
    {
      key: 'gain',
      name: 'Gain',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultCompressorParams.gain,
    },
  ],
  [Effects.DELAY]: [
    {
      key: 'type',
      name: 'Type',
      range: [0, 2],
      step: 1,
      defaultValue: defaultDelayParams.type,
    },
    {
      key: 'delayLeft',
      name: 'DelayLeft',
      range: [0, 0.5],
      step: 0.01,
      defaultValue: defaultDelayParams.delayLeft,
    },
    {
      key: 'delayRight',
      name: 'DelayRight',
      range: [0, 0.5],
      step: 0.01,
      defaultValue: defaultDelayParams.delayRight,
    },
    {
      key: 'feedback',
      name: 'Feedback',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultDelayParams.feedback,
    },
    {
      key: 'dry',
      name: 'Dry',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultDelayParams.dry,
    },
  ],
  [Effects.FILTER]: [
    {
      key: 'type',
      name: 'Type',
      range: [0, 1],
      step: 1,
      defaultValue: defaultFilterParams.type,
    },
    {
      key: 'frequency',
      name: 'Frequency',
      range: [20, 20050],
      step: 1,
      defaultValue: defaultFilterParams.frequency,
    },
    {
      key: 'quality',
      name: 'Quality',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultFilterParams.quality,
    },
    {
      key: 'gain',
      name: 'Gain',
      range: [-40, 40],
      step: 0.01,
      defaultValue: defaultFilterParams.gain,
    },
    {
      key: 'wet',
      name: 'Wet',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultFilterParams.wet,
    },
    {
      key: 'dry',
      name: 'Dry',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultFilterParams.dry,
    },
  ],
  [Effects.EQUALIZER]: [
    {
      key: 'low',
      name: 'Low',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultEqulizerParams.low,
    },
    {
      key: 'mid',
      name: 'Mid',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultEqulizerParams.mid,
    },
    {
      key: 'high',
      name: 'High',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultEqulizerParams.high,
    },
  ],
  [Effects.REVERB]: [
    {
      key: 'seconds',
      name: 'Seconds',
      range: [0.001, 10],
      step: 0.001,
      defaultValue: defaultReverbParams.seconds,
    },
    {
      key: 'decay',
      name: 'Decay',
      range: [0.001, 10],
      step: 0.001,
      defaultValue: defaultReverbParams.decay,
    },
    {
      key: 'wet',
      name: 'Wet',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultReverbParams.wet,
    },
    {
      key: 'dry',
      name: 'Dry',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultReverbParams.dry,
    },
  ],
  [Effects.TREMOLO]: [
    {
      key: 'speed',
      name: 'Speed',
      range: [0, 20],
      step: 0.1,
      defaultValue: defaultTremoloParams.speed,
    },
    {
      key: 'depth',
      name: 'Depth',
      range: [0, 1],
      step: 0.01,
      defaultValue: defaultTremoloParams.depth,
    },
  ]
}

export const EffectTemplate = {
  [Effects.COMPRESSOR]: {
    Default: {
      attack: 0.3,
      release: 0.15,
      ratio: 10,
      threshold: -50,
      gain: 0.3
    },
    Vocals: {
      attack: 0.9,
      release: 0.13,
      ratio: 14,
      threshold: -31,
      gain: 0.51
    },
    HeavyRockDrums: {
      attack: 0,
      release: 0.08,
      ratio: 8.6,
      threshold: -35,
      gain: 0.66
    },
    AcousticGuitar: {
      attack: 0.08,
      release: 0.2,
      ratio: 10,
      threshold: -40,
      gain: 0.45
    },
    BaseRunningHot: {
      attack: 0.09,
      release: 0.23,
      ratio: 14.4,
      threshold: -26,
      gain: 0.55
    }
  },
  [Effects.DELAY]: {
    Default: {
      type: 0,
      delayLeft: 0.2,
      delayRight: 0.2,
      feedback: 0.5,
      dry: 1
    },
    FunkyGuitar: {
      type: 0,
      delayLeft: 0.4,
      delayRight: 0.39,
      feedback: 0.23,
      dry: 0.8
    },
    LongVocals: {
      type: 0,
      delayLeft: 0.75,
      delayRight: 0.72,
      feedback: 0.13,
      dry: 0.8
    },
    ShortVocals: {
      type: 0,
      DelayLeft: 0.41,
      delayRight: 0.42,
      feedback: 0.21,
      dry: 0.8
    },
    SlapBack: {
      type: 0,
      DelayLeft: 0.35,
      delayRight: 0.35,
      feedback: 0.15,
      dry: 0.8
    }
  },
  [Effects.EQUALIZER]: {
    Default: {
      low: 0.5,
      mid: 0.5,
      high: 0.5
    }
  },
  [Effects.FILTER]: {
    Default: {
      type: 'lowpass',
      frequency: 8000,
      quality: 1,
      gain: 0,
      wet: 0.8,
      dry: 0.2
    }
  },
  [Effects.REVERB]: {
    Default: {
      seconds: 0.01,
      decay: 0.01,
      wet: 1,
      dry: 1
    },
    Brass: {
      seconds: 4.3,
      decay: 7.9,
      wet: 0.29,
      dry: 1,
    },
    ColdCave: {
      seconds: 8.9,
      decay: 6.7,
      wet: 0.09,
      dry: 1
    },
    Drums: {
      seconds: 3.1,
      decay: 6.7,
      wet: 0.09,
      dry: 1,
    },
    Vocals: {
      seconds: 3.1,
      decay: 8.6,
      wet: 0.5,
      dry: 1
    }
  },
  [Effects.TREMOLO]: {
    Default: {
      speed: 4,
      depth: 1
    },
    FakeLFO: {
      speed: 11,
      depth: 1
    },
    Siren: {
      speed: 7,
      depth: 0.77
    },
    Spinning: {
      speed: 7.4,
      depth: 0.63
    }
  }
}