import { SelectBlockAction, EditorAction, UpdateZoomAction, UpdateMaxLengthAction, AudioDropAction } from '@redux/types/editor';

export function selectBlock(sliceId: string | null): SelectBlockAction {
  return {
    type: EditorAction.SELECT_BLOCK,
    payload: {
      id: sliceId,
    },
  };
}

export function updateZoom(zoom: number): UpdateZoomAction {
  return {
    type: EditorAction.UPDATE_ZOOM,
    payload: {
      zoom,
    },
  };
}

export function updateMaxLength(maxLength: number): UpdateMaxLengthAction {
  return {
    type: EditorAction.UPDATE_MAXLENGTH,
    payload: {
      maxLength,
    },
  };
}

export function audioDrop(channelId: string, offset: number): AudioDropAction {
  return {
    type: EditorAction.AUDIO_DROP,
    payload: {
      offset,
      channelId,
    },
  };
}
