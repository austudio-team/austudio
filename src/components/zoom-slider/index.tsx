import React, { useCallback } from 'react';
import { ZoomWrapper } from './styled';
import { zoomSelector } from '@redux/selectors/editor';
import { RootState } from '@redux/reducers';
import { updateZoom } from '@redux/actions/editor';
import { connect, ConnectedProps } from 'react-redux';
import { StyledSlider } from '@components/styled/slider';

const mapState = (state: RootState) => ({
  zoom: zoomSelector(state.editor),
});

const mapDispatch = {
  updateZoom,
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const ZoomSlider: React.FC<Props> = props => {
  const { zoom, updateZoom } = props;
  const handleZoomChange = useCallback((v: number) => {
    updateZoom(v);
  }, [updateZoom])
  return (
    <ZoomWrapper>
      <StyledSlider min={1} max={100} value={zoom} onChange={handleZoomChange} step={5} />
    </ZoomWrapper>
  );
}

export default connector(ZoomSlider);
