import React, { useRef, useEffect, useCallback, useState } from 'react';
import { StyledSlider } from '@components/styled/slider';
import { Filter } from '@shyrii/web-audio-effects';
import MP3 from '@assets/music.mp3';

const FilterPannel: React.FC = props => {
  const frequency = useRef<number>(0);
  const quality = useRef<number>(0);
  const audioCtx = useRef<AudioContext>(new AudioContext());
  const track = useRef<MediaElementAudioSourceNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean | null>(null);
  const filter = useRef<any>(null);

  const frequencyHandler = useCallback((f: number) => {
    frequency.current = f;
    filter.current.updateParams({ 
      frequency: frequency.current,
      quality: quality.current,
    });
  }, []);

  const qualityHandler = useCallback((q: number) => {
    quality.current = q;
    filter.current.updateParams({ 
      frequency: frequency.current,
      quality: quality.current,
    });
  }, []);

  useEffect(() => {
    if (audioElementRef.current) {
      track.current = audioCtx.current.createMediaElementSource(audioElementRef.current);
      filter.current = new Filter(audioCtx.current, {
        frequency: frequency.current,
        quality: quality.current
      })
      const a = track.current.connect(filter.current);
      a.connect(audioCtx.current.destination);
    }
  }, []);

  const playButtonClick = useCallback(() => {
    setPlaying(!playing);
  }, [playing, setPlaying]);

  useEffect(() => {
    if (audioElementRef.current) {
      if (playing === true) {
        audioCtx.current.resume();
        audioElementRef.current.pause();
      } else if (playing === false) {
        audioElementRef.current.play();
      }
    }
  }, [playing]);

  return (
    <div>
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={frequencyHandler}
        min={20}
        max={20000}
        step={1}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={qualityHandler}
        min={0}
        max={1}
      />
      <audio src={MP3} ref={audioElementRef}></audio>
      <button onClick={playButtonClick} role="switch" aria-checked="false">
				<span>{playing ? 'Pause' : 'Play'}</span>
			</button>
    </div>
  );
};

export default FilterPannel;
