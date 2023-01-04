import {getItem, setItem} from '@utils/localStorage';
import {nanoid} from 'nanoid';

const transformObjectToInstance = memo => new Memo(memo.content, memo.id, memo.createdAt, memo.updatedAt);

export default class Memo {
  constructor(
    content,
    id = nanoid(),
    createdAt = new Date().toLocaleString(),
    updatedAt = new Date().toLocaleString()
  ) {
    this.content = content;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this._saveMemo();
  }
  getMemo(id) {
    const memos = Memo.getMemos();
    return memos.find(memo => memo.id === id);
  }
  _saveMemo() {
    const memos = getItem('memos') || [];
    const currentMemoIndex = memos.findIndex(memo => memo.id === this.id);

    if (currentMemoIndex === -1) {
      memos.push({...this});
    } else {
      memos[currentMemoIndex] = {...this};
    }
    setItem('memos', memos);
  }
  updateMemo(content) {
    this.content = content;
    this.updatedAt = new Date().toLocaleString();

    this._saveMemo();
  }
  static deleteMemo(id) {
    const memos = Memo.getMemos();
    const memoIndex = memos.findIndex(memo => memo.id === id);
    memos.splice(memoIndex, 1);
    setItem('memos', memos);
  }
  static getMemos() {
    return (getItem('memos') || []).map(transformObjectToInstance);
  }
}
