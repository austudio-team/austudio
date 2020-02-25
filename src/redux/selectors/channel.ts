import { ChannelState } from "@redux/types/channel";

export const channelListSelector = (state: ChannelState) => {
  return state.channelList;
}

export const channelMapSelector = (state: ChannelState) => {
  return state.channel;
}

export const channelItemSelector = (state: ChannelState, id: string) => {
  return state.channel[id];
}
