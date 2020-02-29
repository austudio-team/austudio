import { editorMarginTop, editorChannelWidth, editorMarginBottom } from "./constants";

export function scrollYLimiter(
  deltaY: number,
  scrollY: React.MutableRefObject<number>,
  editorHeight: React.MutableRefObject<number>,
  editorScrollHeight: React.MutableRefObject<number>,
) {
  scrollY.current = Math.min(0, scrollY.current - deltaY);
  scrollY.current = Math.max(scrollY.current, editorHeight.current - editorScrollHeight.current - editorMarginTop - editorMarginBottom);
}

export function indicatorLimiter(screenX: number, editorWidth: number) {
  return Math.max(Math.min(screenX, editorWidth), editorChannelWidth);
}

export function watchEditorRect(
  editorHeight: React.MutableRefObject<number>,
  editorWidth: React.MutableRefObject<number>,
  channelScroller: React.RefObject<HTMLDivElement>,
) {
  if (channelScroller.current) {
    editorHeight.current = channelScroller.current.clientHeight;
    editorWidth.current = channelScroller.current.clientWidth;
  }
}

export function watchScrollHeight(
  editorScrollHeight: React.MutableRefObject<number>,
  channelScroller: React.RefObject<HTMLDivElement>,
) {
  if (channelScroller.current) {
    editorScrollHeight.current = channelScroller.current.scrollHeight;
  }
}