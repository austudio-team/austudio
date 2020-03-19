import {AudioEffectState, AudioEffectActionType, AudioEffectAction} from '../types/audioEffect'
import { v4 as uuidv4 } from 'uuid';
import { defaultParams } from '@constants/effectParams';

const initialState: AudioEffectState = {
  channelEffects: {}
}

export function AudioEffectReducer(state: AudioEffectState = initialState, action: AudioEffectActionType): AudioEffectState {
  let newEffect;
  switch (action.type) {
    case AudioEffectAction.ADD_EFFECT:
      newEffect = {
        id: uuidv4(),
        type: action.payload.effectType,
        params: defaultParams[action.payload.effectType]
      }
      return {
        ...state,
        channelEffects: {
          ...state.channelEffects,
          [action.payload.channelId]: [...(state.channelEffects[action.payload.channelId] || []), newEffect],
        }
      };
    case AudioEffectAction.REMOVE_EFFECT:
      let effects = [...state.channelEffects[action.payload.channelId]];
      for(const [i, v] of effects.entries()) {
        if (v.id === action.payload.effectId) {
          effects.splice(i, 1);
          break;
        }
      }
      return {
        ...state,
        channelEffects: {
          ...state.channelEffects,
          [action.payload.channelId]: effects,
        }
      };
    case AudioEffectAction.MODIFY_EFFECT:
      return {
        ...state,
      };
    default:
      return state;
  }
}