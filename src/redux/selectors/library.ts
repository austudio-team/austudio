import { LibraryState } from "@redux/types/library";

export function audioListSelector(state: LibraryState) {
  return state.audioList;
}

export function audioMapSelector(state: LibraryState) {
  return state.audioInfo;
}

export function audioItemSelector(state: LibraryState, audioId: string) {
  return state.audioInfo[audioId];
}
