import React, { useRef, useEffect, useCallback, useState } from 'react';
import { StyledSlider } from '@components/styled/slider';
import { Equalizer } from '@shyrii/web-audio-effects';
import MP3 from '@assets/music.mp3';

const EqualizerPannel: React.FC = props => {
  const low = useRef<number>(0.5);
  const mid = useRef<number>(0.5);
  const high = useRef<number>(0.5);
  const audioCtx = useRef<AudioContext>(new AudioContext());
  const track = useRef<MediaElementAudioSourceNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean | null>(null);
  const equalizer = useRef<any>(null);

  const lowHandler = useCallback((l: number) => {
    low.current = l;
    equalizer.current.updateParams({ 
      low: low.current,
      mid: mid.current,
      high: high.current
    });
  }, []);

  const midHandler = useCallback((m: number) => {
    mid.current = m;
    equalizer.current.updateParams({ 
      low: low.current,
      mid: mid.current,
      high: high.current
    });
  }, []);

  const highHandler = useCallback((h: number) => {
    high.current = h;
    equalizer.current.updateParams({ 
      low: low.current,
      mid: mid.current,
      high: high.current
    });
  }, []);

  useEffect(() => {
    if (audioElementRef.current) {
      track.current = audioCtx.current.createMediaElementSource(audioElementRef.current);
      equalizer.current = new Equalizer(audioCtx.current, {
        low: low.current,
        mid: mid.current,
        high: high.current
      })
      track.current.connect(equalizer.current.input)
      equalizer.current.connect(audioCtx.current.destination);
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
        onChange={lowHandler}
        min={0}
        max={1}
        defaultValue={0.5}
        step={0.01}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={midHandler}
        min={0}
        max={1}
        defaultValue={0.5}
        step={0.01}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={highHandler}
        min={0}
        max={1}
        defaultValue={0.5}
        step={0.01}
      />
      <audio src={MP3} ref={audioElementRef}></audio>
      <button onClick={playButtonClick} role="switch" aria-checked="false">
				<span>{playing ? 'Pause' : 'Play'}</span>
			</button>
    </div>
  );
};

export default EqualizerPannel;
