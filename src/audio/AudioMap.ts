interface AudioMap {
  [id: string]: {
    file: File | Blob,
    audioBuffer: AudioBuffer,
  };
}

const audioMap: AudioMap = {};
(window as any)['audioMap'] = audioMap;

export default audioMap;
