import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ExportDialogContainer, TitleWrapper, Title, ExportPanelContainer, CloseIcon, FormatCard, CardContainer, FormatTitle, FormatSubTitle, ExportButton, RollingIcon, RenderProgress } from './styled';
import { isFirefox } from '@utils/browser';
import { FormatList } from './constants';
import { closeExportDialog } from '@redux/actions/menu';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@redux/reducers';
import { exportPanelOpenedSelector } from '@redux/selectors/menu';
import { getAudioController } from '@audio/AudioController';
import eventEmitter from '@utils/event';
import { AudioControllerEvent } from '@events/audioController';
import { throttle } from 'lodash';
import { getNotification } from '@utils/notification';

const mapState = (state: RootState) => ({
  exportOpen: exportPanelOpenedSelector(state.menu),
});

const mapDispatch = {
  closeExportDialog,
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const ExportDialog: React.FC<Props> = props => {
  const { closeExportDialog, exportOpen } = props;
  const [selected, setSelected] = useState<number>(0);
  const [rendering, setRendering] = useState<boolean>(false);
  const renderProgressRef = useRef<HTMLDivElement>(null);
  const handleFormatClick = useCallback((i: number) => {
    if (rendering) return;
    setSelected(i)
  }, [rendering, setSelected]);
  const startRender = useCallback(async () => {
    if(rendering) return;
    setRendering(true);
    try {
      await getAudioController().export(FormatList[selected].params);
    } catch (e) {
      getNotification().then(n => {
        n.notice({
          content: `${e}`,
          duration: 5,
        });
      });
    }
    setRendering(false);
    closeExportDialog();
  }, [rendering, closeExportDialog, selected]);

  useEffect(() => {
    if (rendering) {
      const handler = throttle((p: number) => {
        if (renderProgressRef.current) {
          renderProgressRef.current.style.width = `${p * 100}%`;
        }
      }, 100, { leading: true, trailing: true });
      eventEmitter.on(AudioControllerEvent.AUDIO_CONTROLLER_EXPORT_PROGRESS, handler);
      return () => {
        eventEmitter.off(AudioControllerEvent.AUDIO_CONTROLLER_EXPORT_PROGRESS, handler);
      }
    }
  }, [rendering]);

  const closeDialog = useCallback(() => {
    closeExportDialog();
  }, [closeExportDialog]);

  return !exportOpen ? null : (
    <ExportDialogContainer supportBackdropFilter={!isFirefox}>
      <ExportPanelContainer
      >
        <TitleWrapper>
          <CloseIcon onClick={closeDialog} />
          <Title>Export</Title>
        </TitleWrapper>
        <CardContainer>
          {FormatList.map((v, i) => (
            <FormatCard key={i} selected={selected === i} onClick={() => handleFormatClick(i)}>
              <FormatTitle>{v.displayTitle}</FormatTitle>
              <FormatSubTitle>{v.displaySubTitle}</FormatSubTitle>
            </FormatCard>
          ))}
        </CardContainer>
        <ExportButton onClick={startRender} rendering={rendering}>{rendering ? (
          <><RollingIcon />Rendering<RenderProgress ref={renderProgressRef} /></>
        ) : 'Export'}
        </ExportButton>
      </ExportPanelContainer>
    </ExportDialogContainer>
  );
}

export default connector(ExportDialog);
