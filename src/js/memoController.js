import {MAX_INPUT_LENGTH} from '@constants/memo';
import {KEY_CODE} from '@constants/event';
import Memo from '@models/memo';

export default class MemoController {
  constructor(
    /* 메모 입력창 */ textInputElement,
    /* 입력창 추가 정보 */ inpuInfo,
    /* 저장 버튼 */ saveButton,
    /* 메모 리스트 담는 요소 */ memoContainer
  ) {
    this.textInputElement = textInputElement;
    this.memoContainer = memoContainer;
    this.saveButton = saveButton;
    this.currentPressedKeys = [];
    this.memos = Memo.getMemos();

    if (inpuInfo) {
      this.inpuInfo = inpuInfo;
      this._setInputInfo(`0 / ${MAX_INPUT_LENGTH}`);
    }

    this._init();
  }
  _init() {
    this._initFormHandler();
    this._renderMemos();
    this._initMemoHandler();
  }
  _initFormHandler() {
    this.textInputElement.addEventListener('input', event => {
      const {
        target: {value},
      } = event;

      if (value.length > MAX_INPUT_LENGTH) {
        this.textInputElement.value = value.slice(0, MAX_INPUT_LENGTH);
      }

      this._setInputInfo(`${value.length} / ${MAX_INPUT_LENGTH}`);
    });

    this.textInputElement.addEventListener('keypress', event => {
      // // Enter => Save memo
      if (event.keyCode === KEY_CODE.Enter) {
        this._saveMemo();
        event.preventDefault();
      }
    });
    this.saveButton.addEventListener('click', () => {
      this._saveMemo();
    });
  }
  _initMemoHandler() {
    this.memoContainer.addEventListener('click', event => {
      const memoElement = event.target.parentNode.parentNode;
      const memoId = memoElement.id;

      if (event.target.classList.contains('delete')) {
        Memo.deleteMemo(memoId);
        this._renderMemos();
      }
      // TODO: 메모 수정 기능
      // if (event.target.classList.contains('edit')) {
      //   const memo = Memo.getMemo(memoId);
      // }
    });
  }
  _setInputInfo(infoText) {
    if (!this.inpuInfo) {
      return;
    }

    this.inpuInfo.textContent = infoText;
  }
  _saveMemo() {
    const content = this.textInputElement.value.trim();
    if (!content) {
      return;
    }

    const memo = new Memo(content);
    this.textInputElement.value = '';
    this.memos.push(memo);

    this._renderMemo(memo);
  }
  _renderMemo(memo) {
    const memoItem = document.createElement('li');
    memoItem.className = 'memo';
    memoItem.id = memo.id;
    memoItem.innerHTML = `
      <p class="content">${memo.content}</p>
      <div class="utils">
        <button class="util edit">수정</button>
        <button class="util delete">삭제</button>
      </div>
    `;

    this.memoContainer.appendChild(memoItem);
  }
  _renderMemos() {
    this.memoContainer.innerHTML = '';
    const memos = Memo.getMemos();
    memos.forEach(memo => {
      this._renderMemo(memo);
    });
  }
}
