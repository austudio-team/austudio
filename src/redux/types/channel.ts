export enum ChannelAction {
  'ADD_CHANNEL' = 'ADD_CHANNEL',
  'UPDATE_VOL' = 'UPDATE_VOL',
  'UPDATE_PAN' = 'UPDATE_PAN',
  'UPDATE_SOLO' = 'UPDATE_SOLO',
  'UPDATE_NAME' = 'UPDATE_NAME',
  'UPDATE_MUTE' = 'UPDATE_MUTE',
  'UPDATE_RECORD' = 'UPDATE_RECORD',
}

interface ChannelMap {
  [id: string]: Channel;
}

export interface Channel {
  name: string;
  id: string;
  solo: boolean;
  mute: boolean;
  record: boolean;
  vol: number;
  pan: number;
}

export interface ChannelState {
  channelList: string[];
  channel: ChannelMap;
}

export interface AddChannelAction {
  type: typeof ChannelAction.ADD_CHANNEL;
}

export interface UpdateVolAction {
  type: typeof ChannelAction.UPDATE_VOL;
  payload: {
    id: string,
    value: number;
  };
}

export interface UpdateMuteAction {
  type: typeof ChannelAction.UPDATE_MUTE;
  payload: {
    id: string,
    value: boolean;
  };
}

export interface UpdatePanAction {
  type: typeof ChannelAction.UPDATE_PAN;
  payload: {
    id: string,
    value: number;
  };
}

export interface UpdateRecordAction {
  type: typeof ChannelAction.UPDATE_RECORD;
  payload: {
    id: string,
    value: boolean;
  };
}

export interface UpdateSoloAction {
  type: typeof ChannelAction.UPDATE_SOLO;
  payload: {
    id: string,
    value: boolean;
  };
}

export interface UpdateNameAction {
  type: typeof ChannelAction.UPDATE_NAME;
  payload: {
    id: string,
    value: string;
  };
}

export type ChannelActionType =
  AddChannelAction
  | UpdateMuteAction
  | UpdatePanAction
  | UpdateRecordAction
  | UpdateSoloAction
  | UpdateVolAction
  | UpdateNameAction;
