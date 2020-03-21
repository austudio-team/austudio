import React, { useRef, useEffect, useCallback, useState } from 'react';
import { StyledSlider } from '@components/styled/slider';
import { Filter } from '@shyrii/web-audio-effects';
// import MP3 from '@assets/music.mp3';

const FilterPannel: React.FC = props => {
  const frequency = useRef<number>(12000);
  const quality = useRef<number>(1);
  const gain = useRef<number>(1);
  const wet = useRef<number>(1);
  const dry = useRef<number>(1);
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
      gain: gain.current,
      wet: wet.current,
      dry: dry.current
    });
  }, []);

  const qualityHandler = useCallback((q: number) => {
    quality.current = q;
    filter.current.updateParams({ 
      frequency: frequency.current,
      quality: quality.current,
      gain: gain.current,
      wet: wet.current,
      dry: dry.current
    });
  }, []);

  const gainHandler = useCallback((g: number) => {
    gain.current = g;
    filter.current.updateParams({ 
      frequency: frequency.current,
      quality: quality.current,
      gain: gain.current,
      wet: wet.current,
      dry: dry.current
    });
  }, []);

  const wetHandler = useCallback((w: number) => {
    wet.current = w;
    filter.current.updateParams({ 
      frequency: frequency.current,
      quality: quality.current,
      gain: gain.current,
      wet: wet.current,
      dry: dry.current
    });
  }, []);

  const dryHandler = useCallback((d: number) => {
    dry.current = d;
    filter.current.updateParams({ 
      frequency: frequency.current,
      quality: quality.current,
      gain: gain.current,
      wet: wet.current,
      dry: dry.current
    });
  }, []);

  useEffect(() => {
    if (audioElementRef.current) {
      track.current = audioCtx.current.createMediaElementSource(audioElementRef.current);
      filter.current = new Filter(audioCtx.current, {
        frequency: frequency.current,
        quality: quality.current
      })
      track.current.connect(filter.current.input)
      filter.current.connect(audioCtx.current.destination);
    }
  }, []);

  const playButtonClick = useCallback(() => {
    setPlaying(!playing);
  }, [playing, setPlaying]);

  useEffect(() => {
    if (audioElementRef.current) {
      if (audioCtx.current.state === 'suspended') {
        audioCtx.current.resume();
      }
      if (playing === true) {
        audioElementRef.current.play();
      } else if (playing === false) {
        audioElementRef.current.pause();
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
        defaultValue={12000}
        step={1}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={qualityHandler}
        min={0}
        max={1}
        defaultValue={0.5}
        step={0.01}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={gainHandler}
        min={-40}
        max={40}
        defaultValue={1}
        step={0.01}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={wetHandler}
        min={0}
        max={1}
        defaultValue={1}
        step={0.01}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={dryHandler}
        min={0}
        max={1}
        defaultValue={0}
        step={0.01}
      />
      <audio ref={audioElementRef}></audio>
      <button onClick={playButtonClick} role="switch" aria-checked="false">
				<span>{playing ? 'Pause' : 'Play'}</span>
			</button>
    </div>
  );
};

export default FilterPannel;
