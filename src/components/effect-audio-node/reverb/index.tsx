import React, { useRef, useEffect, useCallback, useState } from 'react';
import { StyledSlider } from '@components/styled/slider';
import { Reverb } from '@shyrii/web-audio-effects';
// import MP3 from '@assets/music.mp3';

const ReverbPannel: React.FC = props => {
  const seconds = useRef<number>(3);
  const decay = useRef<number>(2);
  const delay = useRef<number>(2);
  const [reverse, setReverse] = useState<boolean>(true);
  const audioCtx = useRef<AudioContext>(new AudioContext());
  const track = useRef<MediaElementAudioSourceNode  | null>(null);
  // const osc  = useRef<OscillatorNode  | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean | null>(null);
  const reverb = useRef<any>(null);

  const secondsHandler = useCallback((f: number) => {
    seconds.current = f;
    reverb.current.updateParams({ 
      seconds: seconds.current,
      decay: decay.current,
      delay: delay.current,
      reverse: reverse,
    });
  }, [reverse]);

  const decayHandler = useCallback((q: number) => {
    decay.current = q;
    reverb.current.updateParams({ 
      seconds: seconds.current,
      decay: decay.current,
      delay: delay.current,
      reverse: reverse
    });
  }, [reverse]);

  const delayHandler = useCallback((q: number) => {
    delay.current = q;
    reverb.current.updateParams({ 
      seconds: seconds.current,
      decay: decay.current,
      delay: delay.current,
      reverse: reverse
    });
  }, [reverse]);

  const reverseHandler = useCallback(() => {
    reverb.current.updateParams({ 
      seconds: seconds.current,
      decay: decay.current,
      delay: delay.current,
      reverse: !reverse,
    });
    setReverse(!reverse)
  }, [reverse]);


  useEffect(() => {
    if (audioElementRef.current) {
      track.current = audioCtx.current.createMediaElementSource(audioElementRef.current);
      reverb.current = new Reverb(audioCtx.current, {
        seconds: seconds.current,
        decay: decay.current,
        delay: delay.current,
        reverse: reverse
      });
      // osc.current = audioCtx.current.createOscillator();
      // track.current.connect(osc.current);
      // osc.current.connect(reverb.current.input);
      // bufferNode.current = audioCtx.current.createBufferSource();
      // track.current.connect(osc.current.input);
      track.current.connect(reverb.current.input);
      reverb.current.connect(audioCtx.current.destination);
    }
  }, [reverse]);

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
        onChange={secondsHandler}
        min={1}
        max={10}
        defaultValue={1}
        step={1}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={decayHandler}
        min={0}
        max={100}
        defaultValue={2}
        step={1}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={delayHandler}
        min={0}
        max={100}
        defaultValue={2}
        step={1}
      />
      <input type="checkbox" onChange={reverseHandler} checked={reverse}></input>

      {/* <input id="audio_file" type="file" accept="audio/*" /> */}
      <audio ref={audioElementRef}></audio>
      <button onClick={playButtonClick} role="switch" aria-checked="false">
				<span>{playing ? 'Pause' : 'Play'}</span>
			</button>
    </div>
  );
};

export default ReverbPannel;

