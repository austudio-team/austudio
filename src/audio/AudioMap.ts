interface AudioMap {
  [id: string]: File | Blob;
}

const audioMap: AudioMap = {};
(window as any)['audioMap'] = audioMap;

export default audioMap;
