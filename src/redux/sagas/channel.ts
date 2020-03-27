import { takeEvery, select } from 'redux-saga/effects'
import { RootState } from '@redux/reducers';
import { ChannelAction, CreateSliceAction, UpdateSliceAction, DeleteSliceAction, SplitSliceAction, DeleteChannelAction, UpdateSoloAction, UpdateMuteAction, UpdateVolAction, UpdatePanAction } from '@redux/types/channel';
import { channelItemSelector } from '@redux/selectors/channel';
import { ChannelEvent } from '@events/channel';
import eventEmitter from '@utils/event';

function* addSliceSaga(action: CreateSliceAction) {
  const state: RootState = yield select();
  const targetChannel = channelItemSelector(state.channel, action.payload.channelId);
  const targetSlice = targetChannel.slices[targetChannel.slices.length - 1];
  eventEmitter.emit(ChannelEvent.CHANNEL_ADD_SLICE, { slice: targetSlice, channelId: action.payload.channelId });
}

function updateSliceSaga(action: UpdateSliceAction) {
  const { channelId, newChannelId, sliceId } = action.payload;
  eventEmitter.emit(ChannelEvent.CHANNEL_UPDATE_SLICE, {
    oldChannelId: channelId, newChannelId: newChannelId || channelId, sliceId,
  });
}

function deleteSliceSaga(action: DeleteSliceAction) {
  eventEmitter.emit(ChannelEvent.CHANNEL_DELETE_SLICE, { ...action.payload} );
}

function* splitSliceSaga(action: SplitSliceAction) {
  const { sliceId, channelId } = action.payload;
  const { channel: { channel } }: RootState = yield select();
  const index = channel[channelId].slices.findIndex((v => v.id === sliceId));
  const newSlice = channel[channelId].slices[index + 1];
  eventEmitter.emit(ChannelEvent.CHANNEL_UPDATE_SLICE, {
    oldChannelId: channelId, newChannelId: channelId, sliceId,
  });
  eventEmitter.emit(ChannelEvent.CHANNEL_ADD_SLICE, { slice: newSlice, channelId });
}

function deleteChannelSaga(action: DeleteChannelAction) {
  eventEmitter.emit(ChannelEvent.CHANNEL_DELETE_CHANNEL, action.payload.channelId);
}

function updateChannelSaga(action: UpdateMuteAction | UpdateSoloAction) {
  eventEmitter.emit(ChannelEvent.CHANNEL_UPDATE_CHANNEL, action.payload.id);
}

function updateVolSaga(action: UpdateVolAction) {
  eventEmitter.emit(ChannelEvent.CHANNEL_UPDATE_CHANNEL_VOL, {
    channelId: action.payload.id,
    vol: action.payload.value / 100,
  });
}

function updatePanSaga(action: UpdatePanAction) {
  eventEmitter.emit(ChannelEvent.CHANNEL_UPDATE_CHANNEL_PAN, {
    channelId: action.payload.id,
    pan: action.payload.value / 100,
  });
}

export default function* watchChannelSagas() {
  yield takeEvery(ChannelAction.CREATE_SLICE, addSliceSaga);
  yield takeEvery(ChannelAction.UPDATE_SLICE, updateSliceSaga);
  yield takeEvery(ChannelAction.DELETE_SLICE, deleteSliceSaga);
  yield takeEvery(ChannelAction.SPLIT_SLICE, splitSliceSaga);
  yield takeEvery(ChannelAction.DELETE_CHANNEL, deleteChannelSaga);
  yield takeEvery([ChannelAction.UPDATE_SOLO, ChannelAction.UPDATE_MUTE], updateChannelSaga);
  yield takeEvery(ChannelAction.UPDATE_VOL, updateVolSaga);
  yield takeEvery(ChannelAction.UPDATE_PAN, updatePanSaga);
}
