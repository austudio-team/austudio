import { takeEvery, select } from 'redux-saga/effects'
import { RootState } from '@redux/reducers';
import eventEmitter from '@utils/event';
import { AudioEffectAction, RemoveEffectAction, AddEffectAction, ModifyEffectAction } from '@redux/types/audioEffect';
import { AudioEffectEvent } from '@events/audioEffects';

function* addEffectSaga(action: AddEffectAction) {
  const { audioEffect }: RootState = yield select();
  const effects = audioEffect.channelEffects[action.payload.channelId];
  const effect = effects[effects.length - 1];
  eventEmitter.emit(AudioEffectEvent.EFFECT_ADD_EFFECT, {channelId: action.payload.channelId, effect });
}

function* updateEffectSaga(action: ModifyEffectAction) {
  const { audioEffect }: RootState = yield select();
  const { effectId, channelId } = action.payload;
  const effect = audioEffect.channelEffects[channelId].find(v => v.id === effectId);
  const index = audioEffect.channelEffects[channelId].indexOf(effect!);
  eventEmitter.emit(AudioEffectEvent.EFFECT_UPDATE_EFFECT, { channelId, index, effectParams: effect!.params });
}

function removeEffectSaga(action: RemoveEffectAction) {
  const { channelId, effectId } = action.payload;
  eventEmitter.emit(AudioEffectEvent.EFFECT_DELETE_EFFECT, { channelId, effectId });
}

export default function* watchChannelSagas() {
  yield takeEvery(AudioEffectAction.ADD_EFFECT, addEffectSaga);
  yield takeEvery(AudioEffectAction.MODIFY_EFFECT, updateEffectSaga);
  yield takeEvery(AudioEffectAction.REMOVE_EFFECT, removeEffectSaga);
}
