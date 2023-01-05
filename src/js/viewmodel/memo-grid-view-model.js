/* eslint-disable no-loop-func */
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

  deleteMemo(createdAt) {
    this.#memos = this.#memos.filter(
      (memo) => memo.getData().createdAt.getTime().toString() !== createdAt,
    );
  }

  *diffMemos() {
    let lastMemos = [];

    while (true) {
      const addedMemosArray = this.#memos.filter(
        (memo) => lastMemos.indexOf(memo) === -1,
      );

      const deletedMemosArray = lastMemos.filter(
        (memo) => this.#memos.indexOf(memo) === -1,
      );

      lastMemos = [...this.#memos];
      yield { addedMemosArray, deletedMemosArray };
    }
  }
}
