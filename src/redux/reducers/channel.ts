import { ChannelState, ChannelActionType, ChannelAction } from "@redux/types/channel";
import { genenrateDefaultChannel, generateNewChannel } from "@redux/utils/channel";

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
