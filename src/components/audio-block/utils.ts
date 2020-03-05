import { AudioSlice } from '@redux/types/channel';
import { Audio } from '@redux/types/library';
import { StretchingType } from './types';

export const getLength = (slice: AudioSlice, audio: Audio) => {
  const start = slice.start === -1 ? 0 : slice.start;
  const end = slice.end === -1 ? audio.length : slice.end;
  return end - start;
}

export const computeDraggingX = (editorScrollLeft: number, editorDraggingScrollLeft: number, offset: number, mouseMovement: number) => {
  const editorScrollDelta = editorScrollLeft - editorDraggingScrollLeft;
  const tempDraggingX = Math.max(0, offset + mouseMovement + editorScrollDelta);
  return tempDraggingX;
}

export const computeWidth = (
  editorScrollLeft: number,
  editorDraggingScrollLeft: number,
  mouseMovement: number,
  stretchingType: StretchingType,
  slice: AudioSlice,
  audio: Audio,
  zoom: number,
): {
  width: number,
  offset: number,
  start: number,
  end: number,
} => {
  const editorScrollDelta = editorScrollLeft - editorDraggingScrollLeft;
  const delta = (mouseMovement + editorScrollDelta) * zoom;
  const start = slice.start === -1 ? 0 : slice.start;
  const end = slice.end === -1 ? audio.length : slice.end;
  console.log(delta, end, Math.max(start + 10, Math.min(audio.length, end + delta)));
  if (stretchingType === StretchingType.right) {
    return {
      width: Math.ceil(Math.min(Math.max(end - start + delta, 10), audio.length - start) / zoom),
      offset: slice.offset,
      start: slice.start,
      end: Math.max(start + 10, Math.min(audio.length, end + delta)),
    };
  } else {
    const start = slice.start === -1 ? 0 : slice.start;
    const end = slice.end === -1 ? audio.length : slice.end;
    const targetDelta = Math.max(-start, Math.min(end - start - 10, delta));
    return {
      width: Math.ceil((end - start - targetDelta) / zoom),
      offset: slice.offset + targetDelta,
      start: slice.start + targetDelta,
      end: slice.end,
    };
  }
}
