import React, { useRef, useEffect, useCallback, useState } from 'react';
import { StyledSlider } from '@components/styled/slider';
import { Delay } from '@shyrii/web-audio-effects';
import MP3 from '@assets/music.mp3';

const DelayPannel: React.FC = props => {
  const type = useRef<number>(0);
  const delayTime = useRef<number>(1);
  const feedback = useRef<number>(0.5);
  const cutoff = useRef<number>(8000);
  const offset = useRef<number>(0);
  const dry = useRef<number>(1);
  const audioCtx = useRef<AudioContext>(new AudioContext());
  const track = useRef<MediaElementAudioSourceNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean | null>(null);
  const delay = useRef<any>(null);

  const typeHandler = useCallback((f: number) => {
    type.current = f;
    delay.current.updateParams({ 
      type: type.current,
      delay: delayTime.current,
      feedback: feedback.current,
      cutoff: cutoff.current,
      offset: offset.current,
      dry: dry.current
    });
  }, []);

  const delayHandler = useCallback((q: number) => {
    delayTime.current = q;
    delay.current.updateParams({ 
      type: type.current,
      delay: delayTime.current,
      feedback: feedback.current,
      cutoff: cutoff.current,
      offset: offset.current,
      dry: dry.current
    });
  }, []);

  const feedbackHandler = useCallback((g: number) => {
    feedback.current = g;
    delay.current.updateParams({ 
      type: type.current,
      delay: delayTime.current,
      feedback: feedback.current,
      cutoff: cutoff.current,
      offset: offset.current,
      dry: dry.current
    });
  }, []);

  const cutoffHandler = useCallback((w: number) => {
    cutoff.current = w;
    delay.current.updateParams({ 
      type: type.current,
      delay: delayTime.current,
      feedback: feedback.current,
      cutoff: cutoff.current,
      offset: offset.current,
      dry: dry.current
    });
  }, []);

  const offsetHandler = useCallback((w: number) => {
    offset.current = w;
    delay.current.updateParams({ 
      type: type.current,
      delay: delayTime.current,
      feedback: feedback.current,
      cutoff: cutoff.current,
      offset: offset.current,
      dry: dry.current
    });
  }, []);

  const dryHandler = useCallback((d: number) => {
    dry.current = d;
    delay.current.updateParams({ 
      type: type.current,
      delay: delayTime.current,
      feedback: feedback.current,
      cutoff: cutoff.current,
      offset: offset.current,
      dry: dry.current
    });
  }, []);

  useEffect(() => {
    if (audioElementRef.current) {
      track.current = audioCtx.current.createMediaElementSource(audioElementRef.current);
      delay.current = new Delay(audioCtx.current, {
        type: type.current,
        delay: delayTime.current,
        feedback: feedback.current,
        cutoff: cutoff.current,
        offset: offset.current,
        dry: dry.current
      })
      track.current.connect(delay.current.input);
      delay.current.connect(audioCtx.current.destination);
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
        onChange={typeHandler}
        min={0}
        max={2}
        defaultValue={1}
        step={1}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={delayHandler}
        min={0}
        max={1}
        defaultValue={0.5}
        step={0.01}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={feedbackHandler}
        min={0}
        max={1}
        defaultValue={0.5}
        step={0.1}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={cutoffHandler}
        min={0}
        max={22050}
        defaultValue={8000}
        step={50}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={offsetHandler}
        min={-0.5}
        max={0.5}
        defaultValue={0}
        step={0.01}
      />
      <StyledSlider
        style={{ width: 162, marginLeft: 12 }}
        onChange={dryHandler}
        min={0}
        max={1}
        defaultValue={1}
        step={0.01}
      />
      <audio src={MP3} ref={audioElementRef}></audio>
      <button onClick={playButtonClick} role="switch" aria-checked="false">
				<span>{playing ? 'Pause' : 'Play'}</span>
			</button>
    </div>
  );
};

export default DelayPannel;
