import { takeEvery, select } from 'redux-saga/effects'
import { RootState } from '@redux/reducers';
import { ChannelAction, CreateSliceAction } from '@redux/types/channel';
import { channelItemSelector } from '@redux/selectors/channel';
import { ChannelEvent } from '@events/channel';
import eventEmitter from '@utils/event';

function* addSliceSaga(action: CreateSliceAction) {
  const state: RootState = yield select();
  const targetChannel = channelItemSelector(state.channel, action.payload.channelId);
  const targetSlice = targetChannel.slices[targetChannel.slices.length - 1];
  eventEmitter.emit(ChannelEvent.CHANNEL_ADD_SLICE, { slice: targetSlice, channelId: action.payload.channelId });
}

export default function* watchChannelSagas() {
  yield takeEvery(ChannelAction.CREATE_SLICE, addSliceSaga);
}
