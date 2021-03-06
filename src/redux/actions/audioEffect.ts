import { AddEffectAction, RemoveEffectAction, ModifyEffectAction,  AudioEffectAction, OpenEffectPanelAction, CloseEffectPanelAction} from "../types/audioEffect";
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

export function closeEffectPanel(channelId: string, effectId: string): CloseEffectPanelAction {
  return {
    type: AudioEffectAction.CLOSE_PANEL,
    payload: {
      channelId,
      effectId,
    },
  };
}

export function openEffectPanel(channelId: string, effectId: string): OpenEffectPanelAction {
  return {
    type: AudioEffectAction.OPEN_PANEL,
    payload: {
      channelId,
      effectId,
    },
  };
}
