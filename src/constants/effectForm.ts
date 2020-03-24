import { Effects } from "./effects";
import { defaultCompressorParams } from "./effectParams";

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
  ]
}
