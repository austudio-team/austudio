import { editorMarginTop } from "./constants";

export function scrollYLimiter(
  e: WheelEvent,
  scrollY: React.MutableRefObject<number>,
  editorHeight: React.MutableRefObject<number>,
  editorScrollHeight: React.MutableRefObject<number>,
) {
  scrollY.current = Math.min(0, scrollY.current - e.deltaY);
  scrollY.current = Math.max(scrollY.current, editorHeight.current - editorScrollHeight.current - editorMarginTop);
}

export function watchHeight(
  editorHeight: React.MutableRefObject<number>,
  channelScroller: React.RefObject<HTMLDivElement>,
) {
  if (channelScroller.current) {
    editorHeight.current = channelScroller.current.clientHeight;
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
