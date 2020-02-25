import { ChannelState, Channel } from "@redux/types/channel";
import { v4 as uuidv4 } from 'uuid';
import store from "@redux";
import { channelListSelector } from "@redux/selectors/channel";

const prefix = 'Audio Channel ';
const defaultCount = 6;

export function genenrateDefaultChannel(): ChannelState {
  const channels = Array(defaultCount).fill(0).map((v, i) => ({
    name: `${prefix}${i + 1}`,
    id: uuidv4(),
  }));
  const channelMap: any = {};
  channels.forEach(v => {
    channelMap[v.id] = v;
  });
  return {
    channelList: channels.map(v => v.id),
    channel: channelMap,
  };
}

export function generateNewChannel(): Channel {
  const list = channelListSelector(store.getState().channel);
  return {
    name: `${prefix}${list.length + 1}`,
    id: uuidv4(),
  };
}
