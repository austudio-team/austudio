import { AddEffectAction, RemoveEffectAction, ModifyEffectAction,  AudioEffectAction} from "../types/audioEffect";
import { Effects } from '@constants/effects';

export function addEffect(channelId: string, effectType: Effects): AddEffectAction {
  return {
    type: AudioEffectAction.ADD_EFFECT,
    payload: {
      channelId,
      effectType,
    }
  };
}

export function removeEffect(channelId: string, effectId: string): RemoveEffectAction {
  return {
    type: AudioEffectAction.REMOVE_EFFECT,
    payload: {
      channelId,
      effectId,
    }
  };
}

export function modifyEffect(channelId: string, effectId: string, effectParams: any): ModifyEffectAction {
  return {
    type: AudioEffectAction.MODIFY_EFFECT,
    payload: {
      channelId,
      effectId,
      effectParams
    }
  };
}