import { SelectBlockAction, EditorAction } from '@redux/types/editor';

export function selectBlock(sliceId: string | null): SelectBlockAction {
  return {
    type: EditorAction.SELECT_BLOCK,
    payload: {
      id: sliceId,
    },
  };
}
