import { Effects } from '@constants/effects';

export enum AudioEffectAction {
  'ADD_EFFECT' = 'ADD_EFFECT',
  'REMOVE_EFFECT' = 'REMOVE_EFFECT',
  'MODIFY_EFFECT' = 'MODIFY_EFFECT',
  'OPEN_PANEL' = 'OPEN_PANEL',
  'CLOSE_PANEL' = 'CLOSE_PANEL',
}

export interface Effect {
  id: string;
  type: Effects;
  params: {
    [key: string]: any;
  }
}

export interface EffectPanelParam {
  channelId: string;
  effectId: string;
}

export interface AudioEffectState {
  channelEffects: {
    [channelId: string]: Effect[];
  };
  openedEffects: EffectPanelParam[];
}

export type addEffectParams = Omit<Effect, 'id'>

export interface AddEffectAction {
  type: typeof AudioEffectAction.ADD_EFFECT,
  payload: {
    channelId: string,
    effectType: Effects
  }
}

export interface RemoveEffectAction {
  type: typeof AudioEffectAction.REMOVE_EFFECT,
  payload: {
    channelId: string,
    effectId: string
  }
}

export interface ModifyEffectAction {
  type: typeof AudioEffectAction.MODIFY_EFFECT,
  payload: {
    channelId: string,
    effectId: string,
    effectParams: any
  }
}

export interface OpenPanelAction {
  type: typeof AudioEffectAction.OPEN_PANEL,
  payload: {
    channelId: string,
    effectId: string,
  }
}

export interface ClosePanelAction {
  type: typeof AudioEffectAction.CLOSE_PANEL,
  payload: {
    channelId: string,
    effectId: string,
  }
}

export type AudioEffectActionType = AddEffectAction | RemoveEffectAction | ModifyEffectAction | OpenPanelAction | ClosePanelAction;
