import styled from "styled-components";

interface StyledAudioBlockProps {
  selected?: boolean;
}

export const StyledAudioBlock = styled.div<StyledAudioBlockProps>`
  position: absolute;
  height: 122px;
  background-color: ${p => p.theme.colors.N500};
  top: 0;
  color: ${p => p.theme.colors.N200};
  z-index: ${p => p.selected ? '99 !important' : 'initial'};
  /* 用 before 实现悬浮边框 */
  &::before {
    content: ' ';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
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
