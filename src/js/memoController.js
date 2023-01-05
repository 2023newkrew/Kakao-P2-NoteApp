import {MAX_INPUT_LENGTH} from '@constants/memo';
import {KEY_CODE} from '@constants/event';
import Memo from '@models/memo';
import useSnackBar from '@/useMemoSnackBar';

const pushSnackBar = useSnackBar();

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

    if (inpuInfo) {
      this.inpuInfo = inpuInfo;
      this._setInputInfo(`0 / ${MAX_INPUT_LENGTH}`);
    }

    this._init();
  }
  _init() {
    this._render();
    this._initFormHandler();
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
  _handleDeleteMemo(memoId) {
    const memo = Memo.getMemo(memoId);
    memo.delete();

    const snackBar = {
      content: `메모를 삭제했습니다.`,
      onCancel: () => {
        Memo.create(memo.content);
        this._render();
      },
    };
    pushSnackBar(snackBar);

    this._render();
  }
  _initMemoHandler() {
    this.memoContainer.addEventListener('click', event => {
      const memoElement = event.target.parentNode.parentNode;
      const memoId = memoElement.id;

      if (event.target.classList.contains('delete')) {
        this._handleDeleteMemo(memoId);
      }
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

    Memo.create(content);
    this.textInputElement.value = '';

    this._render();
  }
  _render() {
    const memos = Memo.getMemos();
    this.memoContainer.innerHTML = memos.map(memo => memo.render()).join('\n');
  }
}
