import { AudioSlice } from '@redux/types/channel';
import { Audio } from '@redux/types/library';
import { StretchingType } from './types';
import { throttle } from 'lodash';
import { getCanvas } from '@audio/VisualEffect';

export const getLength = (slice: AudioSlice, audio: Audio) => {
  const start = slice.start === -1 ? 0 : slice.start;
  const end = slice.end === -1 ? audio.length : slice.end;
  return (end - start) * slice.stretch;
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
  const delta = (mouseMovement + editorScrollDelta) * zoom / slice.stretch;
  const start = slice.start === -1 ? 0 : slice.start;
  const end = slice.end === -1 ? audio.length : slice.end;
  if (stretchingType === StretchingType.right) {
    return {
      width: Math.ceil(Math.min(Math.max(end - start + delta, 10), audio.length - start) / zoom * slice.stretch),
      offset: slice.offset,
      start: slice.start,
      end: Math.max(start + 10, Math.min(audio.length, end + delta)),
    };
  } else {
    const targetDelta = Math.max(-slice.offset, Math.max(-start, Math.min(end - start - 10, delta)));
    return {
      width: Math.ceil((end - start - targetDelta) / zoom * slice.stretch),
      offset: slice.offset + targetDelta * slice.stretch,
      start: slice.start + targetDelta,
      end: slice.end,
    };
  }
}

export const computeStretch = (
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
  stretch: number,
} => {
  const editorScrollDelta = editorScrollLeft - editorDraggingScrollLeft;
  const delta = (mouseMovement + editorScrollDelta) * zoom / slice.stretch;
  const start = slice.start === -1 ? 0 : slice.start;
  const end = slice.end === -1 ? audio.length : slice.end;
  if (stretchingType === StretchingType.right) {
    const newWidth = Math.ceil((end + delta - start) / zoom * slice.stretch);
    return {
      width: newWidth,
      offset: slice.offset,
      stretch: slice.stretch * (end + delta - start) / (end - start),
    };
  } else {
    const targetDelta = Math.max(-slice.offset / slice.stretch, Math.min(end - start - 10, delta));
    return {
      width: Math.ceil((end - start - targetDelta) / zoom * slice.stretch),
      offset: Math.ceil(slice.offset + targetDelta * slice.stretch),
      stretch: slice.stretch * (end - targetDelta - start) / (end - start),
    };
  }
}

export const trottledGetCanvas = throttle(getCanvas, 200, { leading: false, trailing: true });
