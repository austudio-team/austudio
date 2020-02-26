export enum ChannelAction {
  'ADD_CHANNEL' = 'ADD_CHANNEL',
}

interface ChannelMap {
  [id: string]: Channel;
}

export interface Channel {
  name: string;
  id: string;
}

export interface ChannelState {
  channelList: string[];
  channel: ChannelMap;
}

export interface AddChannelAction {
  type: typeof ChannelAction.ADD_CHANNEL,
}

export type ChannelActionType = AddChannelAction;
