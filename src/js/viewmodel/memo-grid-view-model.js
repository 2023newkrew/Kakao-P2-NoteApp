import Memo from '../model/memo';
import typeCheck from '../util/type-check';

export default class MemoGridViewModel {
  #memos;

  constructor() {
    this.#memos = [];
  }

  getMemos() {
    return this.#memos;
  }

  appendMemo(memo, _ = typeCheck(memo, Memo)) {
    this.#memos.push(memo);
  }

  deleteMemo(memoId) {
    this.#memos = this.#memos.filter((memo) => memo.id !== memoId);
  }
}
