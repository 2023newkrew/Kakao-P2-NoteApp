import {MAX_INPUT_LENGTH} from './constants/memo';
import {KEY_CODE} from './constants/event';
import Memo from './models/memo';

export default class MemoController {
  constructor(
    /* 메모 입력창 */ textInputElement,
    /* 입력창 추가 정보 */ inpuInfo,
    /* 메모 리스트 담는 요소 */ memoContainer
  ) {
    this.textInputElement = textInputElement;
    this.currentPressedKeys = [];
    this.memos = [];
    if (inpuInfo) {
      this.inpuInfo = inpuInfo;
      this.inpuInfo.textContent = `0 / ${MAX_INPUT_LENGTH}`;
    }
    this.memoContainer = memoContainer;
  }
  init() {
    this._initInputHandler();
    this._renderMemos();
  }
  _initInputHandler() {
    this.textInputElement.addEventListener('input', event => {
      const {
        target: {value},
      } = event;

      if (value.length > MAX_INPUT_LENGTH) {
        this.textInputElement.value = value.slice(0, MAX_INPUT_LENGTH);
      }

      this._setInputInfo(`${value.length} / ${MAX_INPUT_LENGTH}`);
    });

    this.textInputElement.addEventListener('keydown', event => {
      this.currentPressedKeys[event.keyCode] = true;
      // // Ctrl + Enter
      if (this._isCtrlEnterPressed()) {
        event.preventDefault();
        this._saveMemo();
      }
    });

    this.textInputElement.addEventListener('keyup', event => {
      this.currentPressedKeys[event.keyCode] = false;
    });
  }
  _setInputInfo(infoText) {
    if (!this.inpuInfo) {
      return;
    }

    this.inpuInfo.textContent = infoText;
  }
  _isCtrlEnterPressed() {
    return this.currentPressedKeys[KEY_CODE.Ctrl] && this.currentPressedKeys[KEY_CODE.Enter];
  }
  _saveMemo() {
    const content = this.textInputElement.value;
    const memo = new Memo(content);
    this.textInputElement.value = '';
    this.memos.push(memo);

    this._renderMemo(memo);
  }
  _renderMemo(memo) {
    const memoElement = document.createElement('li');
    memoElement.className = 'memo';
    memoElement.textContent = memo.content;

    this.memoContainer.appendChild(memoElement);
  }
  _renderMemos() {
    this.memos.forEach(memo => {
      this._renderMemo(memo);
    });
  }
}
