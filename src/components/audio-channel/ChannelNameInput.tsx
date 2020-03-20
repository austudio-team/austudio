import React, { useCallback, useRef, useEffect } from 'react';
import { StyledChannelNameInput } from './styled';

interface ChannelNameInputProps {
  defaultValue: string;
  blurHandler: (value: string) => void;
}

const ChannelNameInput: React.FC<ChannelNameInputProps> = props => {
  const { defaultValue, blurHandler } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const save = useCallback((save = true) => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      if (value.trim() === '' || !save) {
        blurHandler(defaultValue);
      } else {
        blurHandler(value);
      }
    }
  }, [blurHandler, defaultValue]);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
    const detect = (e: MouseEvent) => {
      if (!inputRef.current) return;
      !inputRef.current.contains((e.target as any)) && save(true);
    };
    window.addEventListener('mousedown', detect, true);
    return () => {
      window.removeEventListener('mousedown', detect, true);
    };
  }, [save]);

  const handleKeydown = useCallback((e: React.KeyboardEvent) => {
    if (e.nativeEvent.code === 'Enter') {
      save(true);
    } else if (e.nativeEvent.code === 'ESC') {
      save(false);
    }
  }, [save]);

  return <StyledChannelNameInput onKeyDown={handleKeydown} ref={inputRef} defaultValue={defaultValue} />;
}

export default ChannelNameInput;
