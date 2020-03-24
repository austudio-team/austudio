import { AudioEffectState } from "@redux/types/audioEffect";

export const channelEffectSelector = (state: AudioEffectState, channelId: string) => {
  return state.channelEffects[channelId];
}

export const openedEffectSelector = (state: AudioEffectState) => {
  return state.openedEffects;
}

export const effectByIdSelector = (state: AudioEffectState, channelId: string, effectId: string) => {
  const effects = channelEffectSelector(state, channelId);
  const effect = effects.filter(v => v.id === effectId);
  return effect[0] || null;
}
