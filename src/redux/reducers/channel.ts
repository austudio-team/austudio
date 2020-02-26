import { ChannelState, ChannelActionType, ChannelAction } from "@redux/types/channel";
import { genenrateDefaultChannel, generateNewChannel } from "@redux/utils/channel";

const initialState: ChannelState = genenrateDefaultChannel();

export function channelReducer(state: ChannelState = initialState, action: ChannelActionType): ChannelState {
  switch (action.type) {
    case ChannelAction.ADD_CHANNEL:
      const newChannel = generateNewChannel();
      return {
        ...state,
        channel: {
          ...state.channel,
          [newChannel.id]: newChannel,
        },
        channelList: [...state.channelList, newChannel.id],
      }
    default:
      return state;
  }
}
