import { ChannelState, Channel } from "@redux/types/channel";
import { v4 as uuidv4 } from 'uuid';

const prefix = 'Audio Channel ';
const defaultCount = 6;

const defaultChannel = {
  mute: false,
  record: false,
  solo: false,
  pan: 0,
  vol: 100,
}

export function genenrateDefaultChannel(): ChannelState {
  const channels = Array(defaultCount).fill(0).map((v, i) => ({
    ...defaultChannel,
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

export function generateNewChannel(list: string[]): Channel {
  return {
    ...defaultChannel,
    name: `${prefix}${list.length + 1}`,
    id: uuidv4(),
  };
}
