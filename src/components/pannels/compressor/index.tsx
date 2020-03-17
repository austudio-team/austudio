import React, { useRef, useEffect, useCallback, useState } from 'react';
import { StyledSlider } from '@components/styled/slider';
import { Compressor } from '@shyrii/web-audio-effects';
import MP3 from '@assets/music.mp3';

const CompressorPannel: React.FC = props => {
  const attack = useRef<number>(0);
  const release = useRef<number>(1);
  const ratio = useRef<number>(10);
  const threshold = useRef<number>(0);
  const gain = useRef<number>(1);
  const audioCtx = useRef<AudioContext>(new AudioContext());
  const track = useRef<MediaElementAudioSourceNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean | null>(null);
  const compressor = useRef<any>(null);

  const attackHandler = useCallback((a: number) => {
    attack.current = a;
    compressor.current.updateParams({ 
      attack: attack.current,
      release: release.current,
      ratio: ratio.current,
      threshold: threshold.current,
      gain: gain.current
    });
  }, []);

  const releaseHandler = useCallback((r: number) => {
    release.current = r;
    compressor.current.updateParams({ 
      attack: attack.current,
      release: release.current,
      ratio: ratio.current,
      threshold: threshold.current,
      gain: gain.current
    });
  }, []);

  const ratioHandler = useCallback((g: number) => {
    ratio.current = g;
    compressor.current.updateParams({ 
      attack: attack.current,
      release: release.current,
      ratio: ratio.current,
      threshold: threshold.current,
      gain: gain.current
    });
  }, []);

  const thresholdHandler = useCallback((w: number) => {
    threshold.current = w;
    compressor.current.updateParams({ 
      attack: attack.current,
      release: release.current,
      ratio: ratio.current,
      threshold: threshold.current,
      gain: gain.current
    });
  }, []);

  const gainHandler = useCallback((d: number) => {
    gain.current = d;
    compressor.current.updateParams({ 
      attack: attack.current,
      release: release.current,
      ratio: ratio.current,
      threshold: threshold.current,
      gain: gain.current
    });
  }, []);

  useEffect(() => {
    if (audioElementRef.current) {
      track.current = audioCtx.current.createMediaElementSource(audioElementRef.current);
      compressor.current = new Compressor(audioCtx.current, {
        attack: attack.current,
        release: release.current,
        ratio: ratio.current,
        threshold: threshold.current,
        gain: gain.current
      })
      track.current.connect(compressor.current.input)
      compressor.current.connect(audioCtx.current.destination);
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
        onChange={attackHandler}
        min={0}
        max={1}
        defaultValue={0.3}
        step={0.01}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={releaseHandler}
        min={0}
        max={1}
        defaultValue={0.5}
        step={0.01}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={ratioHandler}
        min={1}
        max={20}
        defaultValue={10}
        step={0.1}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={thresholdHandler}
        min={-100}
        max={0}
        defaultValue={-50}
        step={1}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={gainHandler}
        min={0}
        max={1}
        defaultValue={0.3}
        step={0.01}
      />
      <audio src={MP3} ref={audioElementRef}></audio>
      <button onClick={playButtonClick} role="switch" aria-checked="false">
				<span>{playing ? 'Pause' : 'Play'}</span>
			</button>
    </div>
  );
};

export default CompressorPannel;
