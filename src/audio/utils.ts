import { AudioSlice, ChannelMap } from "@redux/types/channel";
import { currentTime } from "@utils/time";
import { Audio, LibraryState } from "@redux/types/library";

export const computeStartParams = (slice: AudioSlice, audio: Audio, exporting = false): [number, number, number] => {
  let cTime = currentTime.time;
  if (exporting) {
    cTime = 0;
  }
  const when = cTime > slice.offset ? 0 : slice.offset - cTime;
  let offset: number;
  let duration: number;
  const sliceStart = slice.start === -1 ? 0 : slice.start;
  const sliceEnd = slice.end === -1 ? audio.length : slice.end;
  const length = sliceEnd - sliceStart;
  if (cTime > slice.offset + length) {
    offset = 0;
    duration = 0;
  } else if (cTime < slice.offset) {
    offset = sliceStart;
    duration = length;
  } else {
    const passedTime = cTime - slice.offset;
    offset = sliceStart + passedTime;
    duration = length - passedTime;
  }
  return [when / 1000, offset / 1000, duration / 1000];
}

export const getPeaks = (buffer: AudioBuffer, channel: number, width: number) => {
  const { length } = buffer;
  // 每一份的点数=48000 / 10 = 2400
  // const sampleSize = ~~(sampleRate / perSecPx);
  const first = 0;
  const last = width;
  const sampleSize = Math.floor(length / last);
  // const last = ~~(length / sampleSize);
  const peaks: number[] = [];

  const chan = buffer.getChannelData(channel);
  for (let i = first; i <= last; i++) {
    const start = i * sampleSize;
    const end = start + sampleSize;
    let min = 0;
    let max = 0;
    for (let j = start; j < end; j++) {
      const value = chan[j];
      if (value > max) {
        max = value;
      }
      if (value < min) {
        min = value;
      }
    }
    // 波峰
    peaks[2 * i] = max;
    // 波谷
    peaks[2 * i + 1] = min;
  }

  return peaks;
};

export const getMaxLength = (channel: ChannelMap, audioMap: LibraryState['audioInfo']) => {
  let maxLength = 0;
  for (const v of Object.values(channel)) {
    for (const slice of v.slices) {
      const sliceStart = slice.start === -1 ? 0 : slice.start;
      const sliceEnd = slice.end === -1 ? audioMap[slice.audioId].length : slice.end;
      const length = (sliceEnd - sliceStart) * slice.stretch;
      if (length + slice.offset > maxLength) {
        maxLength = length + slice.offset;
      }
    }
  }
  return maxLength;
}
