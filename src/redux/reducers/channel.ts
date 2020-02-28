import { ChannelState, ChannelActionType, ChannelAction } from "@redux/types/channel";
import { genenrateDefaultChannel, generateNewChannel } from "@redux/utils/channel";
import { v4 as uuidv4 } from 'uuid';

const initialState: ChannelState = genenrateDefaultChannel();

export function channelReducer(state: ChannelState = initialState, action: ChannelActionType): ChannelState {
  let targetId;
  let newChannel;
  switch (action.type) {
    case ChannelAction.ADD_CHANNEL: {
      newChannel = generateNewChannel(state.channelList);
      return {
        ...state,
        channel: {
          ...state.channel,
          [newChannel.id]: newChannel,
        },
        channelList: [...state.channelList, newChannel.id],
      }
    }
    case ChannelAction.UPDATE_MUTE: {
      const { id, value } = action.payload;
      targetId = id;
      newChannel = { ...state.channel[id], mute: value };
      break;
    }
    case ChannelAction.UPDATE_NAME: {
      const { id, value } = action.payload;
      targetId = id;
      newChannel = { ...state.channel[id], name: value };
      break;
    }
    case ChannelAction.UPDATE_PAN: {
      const { id, value } = action.payload;
      targetId = id;
      newChannel = { ...state.channel[id], pan: value };
      break;
    }
    case ChannelAction.UPDATE_RECORD: {
      const { id, value } = action.payload;
      targetId = id;
      newChannel = { ...state.channel[id], record: value };
      let lastRecordChannel: any = {};
      // 只允许同时存在一个录音轨道
      // eslint-disable-next-line
      for (const [k, v] of Object.entries(state.channel)) {
        if (v.record) {
          lastRecordChannel = {
            ...v,
            record: false,
          };
        }
      }
      if (lastRecordChannel.id) {
        return {
          ...state,
          channel: {
            ...state.channel,
            [targetId]: newChannel,
            [lastRecordChannel.id]: lastRecordChannel,
          },
        };
      }
      break;
    }
    case ChannelAction.UPDATE_SOLO: {
      const { id, value } = action.payload;
      targetId = id;
      newChannel = { ...state.channel[id], solo: value };
      break;
    }
    case ChannelAction.UPDATE_VOL: {
      const { id, value } = action.payload;
      targetId = id;
      newChannel = { ...state.channel[id], vol: value };
      break;
    }
    case ChannelAction.CREATE_SLICE: {
      const { channelId, slice } = action.payload;
      return {
        ...state,
        channel: {
          ...state.channel,
          [channelId]: {
            ...state.channel[channelId],
            slices: [...state.channel[channelId].slices, {
              ...slice,
              id: uuidv4(),
            }]
          }
        }
      }
    }
    default:
      return state;
  }
  return {
    ...state,
    channel: {
      ...state.channel,
      [targetId]: newChannel,
    },
  };
}
