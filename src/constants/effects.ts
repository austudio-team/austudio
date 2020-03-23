export enum Effects {
  'COMPRESSOR' = 'COMPRESSOR',
  'DELAY' = 'DELAY',
  'EQUALIZER' = 'EQUALIZER',
  'FILTER' = 'FILTER',
  'REVERB' = 'REVERB',
  'TREMOLO' = 'TREMOLO',
}

export const effectName = {
  [Effects.DELAY]: 'Delay',
  [Effects.EQUALIZER]: 'Equalizer',
  [Effects.FILTER]: 'Filter',
  [Effects.REVERB]: 'Reverb',
  [Effects.TREMOLO]: 'Tremolo',
  [Effects.COMPRESSOR]: 'Compressor',
}