import { ChannelState, ChannelActionType, ChannelAction, AudioSlice } from "@redux/types/channel";
import { genenrateDefaultChannel, generateNewChannel } from "@redux/utils/channel";
import { v4 as uuidv4 } from 'uuid';
import { channel } from "redux-saga";

const initialState: ChannelState = genenrateDefaultChannel();

const getSlice = (slices: AudioSlice[], sliceId: string): [number, AudioSlice | null] => {
  let index = -1;
  let tempSlice: AudioSlice | null = null;
  for (const [i, v] of slices.entries()) {
    if (v.id === sliceId) {
      index = i;
      tempSlice = v;
      break;
    }
  }
  return [index, tempSlice];
}

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
      };
    }
    case ChannelAction.DELETE_SLICE: {
      const { channelId, sliceId } = action.payload;
      const newSlices = [...state.channel[channelId].slices];
      for (const [i, v] of newSlices.entries()) {
        if (v.id === sliceId) {
          newSlices.splice(i, 1);
          break;
        }
      }
      return {
        ...state,
        channel: {
          ...state.channel,
          [channelId]: {
            ...state.channel[channelId],
            slices: newSlices,
          }
        }
      }
    }
    case ChannelAction.UPDATE_SLICE: {
      const { slice, sliceId, channelId, newChannelId } = action.payload;
      const channel = state.channel[channelId];
      const slices = [...channel.slices];
      const [index, targetSlice] = getSlice(slices, sliceId);
      if (targetSlice) {
        const tempSlice = {
          ...targetSlice,
          ...slice,
        }
        if (newChannelId) {
          slices.splice(index, 1);
          const targetChannel = state.channel[newChannelId];
          return {
            ...state,
            channel: {
              ...state.channel,
              [channelId]: {
                ...channel,
                slices,
              },
              [newChannelId]: {
                ...targetChannel,
                slices: [...targetChannel.slices, tempSlice],
              }
            }
          }
        } else {
          slices.splice(index, 1, tempSlice);
          return {
            ...state,
            channel: {
              ...state.channel,
              [channelId]: {
                ...channel,
                slices,
              }
            }
          }
        }
      } else {
        return state;
      }
    }
    case ChannelAction.SPLIT_SLICE: {
      const { channelId, sliceId, offset } = action.payload;
      const channel = state.channel[channelId];
      const slices = [...channel.slices];
      const [index, targetSlice] = getSlice(slices, sliceId);
      if (targetSlice) {
        const splitOffset = (targetSlice.start === -1 ? 0 : targetSlice.start) + offset;
        const firstSlice: AudioSlice = {
          ...targetSlice,
          end: splitOffset,
        }
        const secondSlice: AudioSlice = {
          ...targetSlice,
          id: uuidv4(),
          offset: targetSlice.offset + offset * firstSlice.stretch,
          start: splitOffset,
        }
        slices.splice(index, 1, firstSlice, secondSlice);
        return {
          ...state,
          channel: {
            ...state.channel,
            [channelId]: {
              ...channel,
              slices,
            }
          }
        }
      } else {
        return state;
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
