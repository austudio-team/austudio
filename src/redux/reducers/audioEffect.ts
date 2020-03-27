import {AudioEffectState, AudioEffectActionType, AudioEffectAction} from '../types/audioEffect'
import { v4 as uuidv4 } from 'uuid';
import { defaultParams } from '@constants/effectParams';

const initialState: AudioEffectState = {
  channelEffects: {},
  openedEffects: [],
}

export function AudioEffectReducer(state: AudioEffectState = initialState, action: AudioEffectActionType): AudioEffectState {
  switch (action.type) {
    case AudioEffectAction.ADD_EFFECT:
      let newEffect = {
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
        },
      };
    case AudioEffectAction.MODIFY_EFFECT:
      let originEffects = [...state.channelEffects[action.payload.channelId]];
      for(const [i, v] of originEffects.entries()) {
        if (v.id === action.payload.effectId) {
          originEffects[i] = {...originEffects[i], params: {...originEffects[i].params, ...action.payload.effectParams}};
          break;
        }
      }
      return {
        ...state,
        channelEffects: {
          ...state.channelEffects,
          [action.payload.channelId]: originEffects,
        }
      };
    case AudioEffectAction.OPEN_PANEL: {
      const { channelId, effectId } = action.payload;
      const currentPanel = state.openedEffects.filter(v => v.effectId === effectId);
      if (currentPanel.length > 0) {
        return {
          ...state,
        }
      } else {
        return {
          ...state,
          openedEffects: [...state.openedEffects, {
              channelId,
              effectId,
            }],
        };
      }
    }
    case AudioEffectAction.CLOSE_PANEL: {
      const newOpenedEffects = [...state.openedEffects];
      const { channelId, effectId } = action.payload;
      for (const [i, v] of newOpenedEffects.entries()) {
        if (v.channelId === channelId && effectId === v.effectId) {
          newOpenedEffects.splice(i, 1);
        }
      }
      return {
        ...state,
        openedEffects: newOpenedEffects,
      };
    }
    default:
      return state;
  }
}
