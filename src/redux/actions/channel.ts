import { AddChannelAction, ChannelAction } from "@redux/types/channel";

export function addChannel(): AddChannelAction {
  return {
    type: ChannelAction.ADD_CHANNEL,
  };
}
