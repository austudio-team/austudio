import { AudioSlice } from '@redux/types/channel';
import { Audio } from '@redux/types/library';

export const getLength = (slice: AudioSlice, audio: Audio) => {
  const start = slice.start === -1 ? 0 : slice.start;
  const end = slice.end === -1 ? audio.length : slice.end;
  return end - start;
}
