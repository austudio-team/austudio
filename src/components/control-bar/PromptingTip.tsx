import React from 'react';
import { Tips, CloseIcon, LoadingIcon } from './styled';

interface PromptingTipProps {
  onClose: () => void;
}

const PromptingTip: React.FC<PromptingTipProps> = props => {
  const { onClose } = props;
  return <Tips><CloseIcon onClick={onClose} /><LoadingIcon />Please allow access to microphone...</Tips>
}

export default PromptingTip;
