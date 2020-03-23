import { AudioEffectState } from "@redux/types/audioEffect";

export const channelEffectSelector = (state: AudioEffectState, channelId: string) => {
  return state.channelEffects[channelId];
}

export const openedEffectSelector = (state: AudioEffectState) => {
  return state.openedEffects;
}
