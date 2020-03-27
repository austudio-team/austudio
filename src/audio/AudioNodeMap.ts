interface AudioNodeMap {
  [channelId: string]: {
    gainNode: GainNode;
    panNode: StereoPannerNode;
    effects: {
      effectId: string,
      node: any,
    }[];
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
