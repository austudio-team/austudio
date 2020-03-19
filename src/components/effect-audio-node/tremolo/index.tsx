import React, { useRef, useEffect, useCallback, useState } from 'react';
import { StyledSlider } from '@components/styled/slider';
import { Tremolo } from '@shyrii/web-audio-effects';
// import MP3 from '@assets/music.mp3';

const TremoloPannel: React.FC = props => {
  const speed = useRef<number>(0.7);
  const depth = useRef<number>(0.5);
  const audioCtx = useRef<AudioContext>(new AudioContext());
  const track = useRef<MediaElementAudioSourceNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean | null>(null);
  const tremolo = useRef<any>(null);

  const speedHandler = useCallback((s: number) => {
    speed.current = s;
    tremolo.current.updateParams({ 
      depth: depth.current,
      speed: speed.current,
    });
  }, []);

  const depthHandler = useCallback((m: number) => {
    depth.current = m;
    tremolo.current.updateParams({ 
      depth: depth.current,
      speed: speed.current,
    });
  }, []);

  useEffect(() => {
    if (audioElementRef.current) {
      track.current = audioCtx.current.createMediaElementSource(audioElementRef.current);
      tremolo.current = new Tremolo(audioCtx.current, {
        depth: depth.current,
        speed: speed.current,
      })
      track.current.connect(tremolo.current.input)
      tremolo.current.connect(audioCtx.current.destination);
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
        onChange={speedHandler}
        min={0}
        max={20}
        defaultValue={0.7}
        step={0.1}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={depthHandler}
        min={0}
        max={10}
        defaultValue={0.5}
        step={0.1}
      />
      <audio ref={audioElementRef}></audio>
      <button onClick={playButtonClick} role="switch" aria-checked="false">
				<span>{playing ? 'Pause' : 'Play'}</span>
			</button>
    </div>
  );
};

export default TremoloPannel;
