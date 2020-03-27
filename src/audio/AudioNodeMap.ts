interface AudioNodeMap {
  [channelId: string]: {
    gainNode: GainNode;
    panNode: StereoPannerNode;
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
