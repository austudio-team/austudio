import { ChannelState } from "@redux/types/channel";

export const channelListSelector = (state: ChannelState) => {
  return state.channelList;
}

export const channelMapSelector = (state: ChannelState) => {
  return state.channel;
}
