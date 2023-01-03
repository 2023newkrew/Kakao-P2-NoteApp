import {MAX_INPUT_LENGTH} from './constants/memo';

export default class MemoController {
  constructor(textInputElement, inpuInfo) {
    this.textInputElement = textInputElement;
    if (inpuInfo) {
      this.inpuInfo = inpuInfo;
      this.inpuInfo.textContent = `0 / ${MAX_INPUT_LENGTH}`;
    }
  }
  init() {
    this._initInputHandler();
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
  }
  _setInputInfo(infoText) {
    if (!this.inpuInfo) {
      return;
    }

    this.inpuInfo.textContent = infoText;
  }
}
