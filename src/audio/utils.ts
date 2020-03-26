import { AudioSlice } from "@redux/types/channel";
import { currentTime } from "@utils/time";
import { Audio } from "@redux/types/library";

export const computeStartParams = (slice: AudioSlice, audio: Audio): [number, number, number] => {
  const when = currentTime.time > slice.offset ? 0 : slice.offset - currentTime.time;
  let offset: number;
  let duration: number;
  const sliceStart = slice.start === -1 ? 0 : slice.start;
  const sliceEnd = slice.end === -1 ? audio.length : slice.end;
  const length = sliceEnd - sliceStart;
  if (currentTime.time > slice.offset + length) {
    offset = 0;
    duration = 0;
  } else if (currentTime.time < slice.offset) {
    offset = sliceStart;
    duration = length;
  } else {
    const passedTime = currentTime.time - slice.offset;
    offset = sliceStart + passedTime;
    duration = length - passedTime;
  }
  return [when / 1000, offset / 1000, duration / 1000];
}
