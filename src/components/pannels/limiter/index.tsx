import React, { useRef, useEffect, useCallback } from 'react';
import { StyledSlider } from '@components/styled/slider';
import { Limiter } from '@shyrii/web-audio-effects';
import MP3 from '@assets/music.mp3';

const LimiterPannel: React.FC = props => {
  const frequence = useRef<number>(0);
  const quality = useRef<number>(0);
  const audioCtx = useRef<AudioContext>(new AudioContext());
  const limiter = useRef(new Limiter(audioCtx.current, { 
    frequence: frequence.current,
    quality: quality.current
  }));

  const frequenceHandler = useCallback((f: number) => {
    frequence.current = f;
    limiter.current.updateParams({ 
      frequence: frequence.current,
      quality: quality.current,
    });
  }, []);

  return (
    <div>
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={frequenceHandler}
        min={20}
        max={20000}
        step={10}
      />
      <audio src={MP3}></audio>
      <button data-playing="false" role="switch" aria-checked="false">
				<span>Play/Pause</span>
			</button>
    </div>
  );
};

export default LimiterPannel;
