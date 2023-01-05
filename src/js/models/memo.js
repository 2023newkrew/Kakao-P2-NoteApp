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
  }

  update(content) {
    this.content = content;
    this.updatedAt = new Date().toLocaleString();

    const memos = getItem('memos') || [];
    const currentMemoIndex = memos.findIndex(memo => memo.id === this.id);
    memos[currentMemoIndex] = {...this};

    setItem('memos', memos);
  }
  delete() {
    const memos = Memo.getMemos();
    const memoIndex = memos.findIndex(memo => memo.id === this.id);
    memos.splice(memoIndex, 1);
    setItem('memos', memos);
  }
  render() {
    return `
      <li class="memo" id="${this.id}">
        <p class="content">${this.content}</p>
        <div class="utils">
          <button class="util edit">수정</button>
          <button class="util delete">삭제</button>
        </div>
      </li>
    `;
  }
  static create(content) {
    const memo = new Memo(content);
    const memos = getItem('memos') || [];
    memos.push({...memo});
    setItem('memos', memos);
  }
  static getMemo(id) {
    const memos = Memo.getMemos();
    return memos.find(memo => memo.id === id);
  }
  static getMemos() {
    return (getItem('memos') || []).map(transformObjectToInstance);
  }
}
