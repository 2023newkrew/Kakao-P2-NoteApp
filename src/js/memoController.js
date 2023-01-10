import {MAX_INPUT_LENGTH} from '@constants/memo';
import {KEY_CODE} from '@constants/event';
import Memo from '@models/memo';
import useSnackBar from '@/useSnackBar';
import useModal from '@/useModal';

const pushSnackBar = useSnackBar();
const {renderModal, closeModal} = useModal();

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
      // Enter => Save memo
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
      } else if (event.target.classList.contains('edit')) {
        this._handleEditMemo(memoId);
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

    const snackBar = {
      content: '메모가 추가되었습니다',
    };
    pushSnackBar(snackBar);
  }
  _handleEditMemo(id) {
    const currentMemo = Memo.getMemo(id);

    const modalContent = `
      <label for="edit-memo" class="content-label">메모 수정</label>
      <textarea
        name="edit-memo"
        class="content-input"
        type="text"
        maxlength="200"
        placeholder="메모를 남겨보세요."
        rows="5"
        cols="40"
      >${currentMemo.content}</textarea>
      <p class="content-info mt"></p>
      <button class="primary mt submit">저장</button>`;

    const content = document.createElement('div');
    content.className = 'form mb';
    content.innerHTML = modalContent;

    const textArea = content.querySelector('.content-input');

    const handleSave = () => {
      currentMemo.update(textArea.value);
      closeModal();
      pushSnackBar({
        content: '메모를 수정하였습니다',
      });
      this._render();
    };

    textArea.addEventListener('keypress', event => {
      if (event.keyCode === KEY_CODE.Enter) {
        handleSave();
      }
    });

    const saveButton = content.querySelector('.submit');
    saveButton.addEventListener('click', handleSave);

    renderModal(content);
  }
  _render() {
    const memos = Memo.getMemos();
    this.memoContainer.innerHTML = memos.map(memo => memo.render()).join('\n');
  }
  changeMemoType() {
    this.memoContainer.classList.toggle('detail');
  }
}
