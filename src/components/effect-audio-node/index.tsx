import React, { useCallback } from 'react';
import { StyledSlider } from '@components/styled/slider';
import Tooltip from '@components/tooltip';
import { Effect } from '@redux/types/audioEffect';
import { EffectRangeContainer, EffectPanelContainer } from '@components/styled/effect';
import { EffectForm } from '@constants/effectForm';

interface EffectAudioNodeProps {
  effect: Effect;
  onChange: (v: any) => void;
}

const EffectAudioNode: React.FC<EffectAudioNodeProps> = props => {
  const { effect, onChange } = props;

  const formType = EffectForm[effect.type];

  const handleOnChange = useCallback((type: string, e: number) => {
    onChange({
      [type]: e,
    });
  }, [onChange]);

  return (
    <EffectPanelContainer>
      {
        formType.map(v => {
          return (
            <EffectRangeContainer key={v.key}>
              <span>{v.name}:</span>
              <Tooltip title={`${v.name}: ${effect.params[v.key]}`}>
                <StyledSlider
                  style={{ width: 162, height: 12, marginLeft: 12 }}
                  onChange={e => handleOnChange(v.key, e)}
                  min={v.range[0]}
                  max={v.range[1]}
                  value={effect.params[v.key]}
                  step={v.step}
                />
              </Tooltip>
            </EffectRangeContainer>
          );
        })
      }
    </EffectPanelContainer>
  );
};

export default EffectAudioNode;
