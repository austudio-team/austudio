import styled from "styled-components";

interface StyledAudioBlockProps {
  selected?: boolean;
}

export const LeftStretcher = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 10px solid ${p => p.theme.colors.N700};
  cursor: w-resize;
  opacity: 0;
`;

export const RightStretcher = styled(LeftStretcher)`
  right: 0;
  left: initial;
  border-right: 10px solid ${p => p.theme.colors.N700};
  border-left: 5px solid transparent;
  cursor: e-resize;
`;

export const StyledAudioBlock = styled.div<StyledAudioBlockProps>`
  position: absolute;
  height: 122px;
  background-color: ${p => p.theme.colors.N500};
  top: 0;
  color: ${p => p.theme.colors.N200};
  z-index: ${p => p.selected ? '99 !important' : 'initial'};

  :hover {
    ${LeftStretcher} {
      opacity: 1;
    }
  }

  /* 用 before 实现悬浮边框 */
  &::before {
    content: ' ';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    border: ${p => (
      p.selected ? `1px solid ${p.theme.colors.P100}` : 'none'
    )};
    pointer-events: none;
  }
`;

export const AudioName = styled.div`
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  padding-left: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background-color: ${p => p.theme.colors.N600};
`;

export const CutLine = styled.div`
  position: absolute;
  height: 100%;
  width: 1px;
  top: 0;
  background-color: ${p => p.theme.colors.N300};
  pointer-events: none;
`;
