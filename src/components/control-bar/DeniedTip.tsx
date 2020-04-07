import React from 'react';
import { Tips, MicOffIcon, CloseIcon } from './styled';

interface DeniedTipProps {
  onClose: () => void;
}

const DeniedTip: React.FC<DeniedTipProps> = props => {
  const { onClose } = props;
  return <Tips><CloseIcon onClick={onClose} /><MicOffIcon />You denied microphone permission...</Tips>
}

export default DeniedTip;
