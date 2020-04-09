import React, { useState, useCallback } from 'react';
import { ExportDialogContainer, TitleWrapper, Title, ExportPanelContainer, CloseIcon, FormatCard, CardContainer, FormatTitle, FormatSubTitle, ExportButton, RollingIcon } from './styled';
import { isFirefox } from '@utils/browser';
import { FormatList } from './constants';
import { closeExportDialog } from '@redux/actions/menu';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@redux/reducers';
import { exportPanelOpenedSelector } from '@redux/selectors/menu';
import { getAudioController } from '@audio/AudioController';

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
  const handleFormatClick = useCallback((i: number) => {
    if (rendering) return;
    setSelected(i)
  }, [rendering, setSelected]);
  const startRender = useCallback(async () => {
    if(rendering) return;
    setRendering(true);
    await getAudioController().export(FormatList[selected].params);
    setRendering(false);
    closeExportDialog();
  }, [rendering, closeExportDialog, selected]);

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
          <><RollingIcon />Rendering</>
        ) : 'Export'}
        </ExportButton>
      </ExportPanelContainer>
    </ExportDialogContainer>
  );
}

export default connector(ExportDialog);
