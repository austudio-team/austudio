import { AddChannelAction, ChannelAction, UpdateVolAction, UpdatePanAction, UpdateMuteAction, UpdateRecordAction, UpdateSoloAction, UpdateNameAction, AudioSliceParam, UpdateSliceAction, CreateSliceAction, DeleteSliceAction, SplitSliceAction, DeleteChannelAction, MoveChannelAction } from "@redux/types/channel";

export function addChannel(index?: number): AddChannelAction {
  return {
    type: ChannelAction.ADD_CHANNEL,
    payload: {
      index,
    }
  };
}

export function moveChannel(index: number, newIndex: number): MoveChannelAction {
  return {
    type: ChannelAction.MOVE_CHANNEL,
    payload: {
      index,
      newIndex,
    }
  };
}

export function updateVol(id: string, vol: number): UpdateVolAction {
  return {
    type: ChannelAction.UPDATE_VOL,
    payload: {
      id,
      value: vol,
    },
  };
}

export function updatePan(id: string, pan: number): UpdatePanAction {
  return {
    type: ChannelAction.UPDATE_PAN,
    payload: {
      id,
      value: pan,
    },
  };
}

export function updateMute(id: string, mute: boolean): UpdateMuteAction {
  return {
    type: ChannelAction.UPDATE_MUTE,
    payload: {
      id,
      value: mute,
    },
  };
}

export function updateSolo(id: string, solo: boolean): UpdateSoloAction {
  return {
    type: ChannelAction.UPDATE_SOLO,
    payload: {
      id,
      value: solo,
    },
  };
}

export function updateRecord(id: string, record: boolean): UpdateRecordAction {
  return {
    type: ChannelAction.UPDATE_RECORD,
    payload: {
      id,
      value: record,
    },
  };
}

export function updateName(id: string, name: string): UpdateNameAction {
  return {
    type: ChannelAction.UPDATE_NAME,
    payload: {
      id,
      value: name,
    },
  };
}

export function createSlice(channelId: string, slice: AudioSliceParam): CreateSliceAction {
  return {
    type: ChannelAction.CREATE_SLICE,
    payload: {
      channelId,
      slice,
    },
  };
}

export function updateSlice(channelId: string, sliceId: string, slice: Partial<AudioSliceParam>, newChannelId: string | null): UpdateSliceAction {
  return {
    type: ChannelAction.UPDATE_SLICE,
    payload: {
      channelId,
      sliceId,
      slice,
      newChannelId,
    },
  };
}

export function deleteSlice(channelId: string, sliceId: string): DeleteSliceAction {
  return {
    type: ChannelAction.DELETE_SLICE,
    payload: {
      channelId,
      sliceId,
    },
  };
}

export function splitSlice(channelId: string, sliceId: string, offset: number): SplitSliceAction {
  return {
    type: ChannelAction.SPLIT_SLICE,
    payload: {
      channelId,
      sliceId,
      offset,
    },
  };
}

export function deleteChannel(channelId: string): DeleteChannelAction {
  return {
    type: ChannelAction.DELETE_CHANNEL,
    payload: {
      channelId,
    },
  };
}
