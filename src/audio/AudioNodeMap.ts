interface AudioNodeMap {
  [channelId: string]: {
    node: AudioNode;
    slices: {
      [sliceId: string]: {
        node: AudioBufferSourceNode;
      }
    }
  };
}

const audioNodeMap: AudioNodeMap = {};
(window as any)['audioNodeMap'] = audioNodeMap;

export default audioNodeMap;
