export default class SnackbarController {
    constructor(options = {}) {
        this._setConfig(options)
        this._createSnackbar();
    }
    _setConfig(options) {
        this.snackbarConfig = {
            width: options.width || '240px',
            height: options.height || '40px',
            top: options.top || '120px',
            right: options.right || '40px',
            snackbarSplashSecond: options.snackbarSplashSecond || 1,
            snackbarIndicateSecond: options.snackbarIndicateSecond || 2
        }
    }
    _createSnackbar() {
        const bodyElement = document.body;
        const snackbarElement = document.createElement('div');
        snackbarElement.style = `
            position: absolute;
            display: flex;
            top: ${this.snackbarConfig.top};
            right: -${this.snackbarConfig.width};
            width: ${this.snackbarConfig.width};
            height: ${this.snackbarConfig.height};
            transition: all ${this.snackbarConfig.snackbarSplashSecond}s;
            border: 2px solid #6A6;
            border-radius: 8px;
            background: #fff;
        `;
        
        const snackbarTextElement = document.createElement('p');
        snackbarTextElement.innerText = 'snackbar';
        snackbarTextElement.style = `
            font-size: 14px;
            color: #444444;
            margin: auto;
        `
        snackbarElement.appendChild(snackbarTextElement);

        this.bodyElement = bodyElement;
        this.snackbarElement = snackbarElement;
        this.snackbarTextElement = snackbarTextElement;
    }
    showSnackbar(message, durationSecond) {
        this.snackbarTextElement.innerText = message;
        this.bodyElement.appendChild(this.snackbarElement);
        setTimeout(() => { // UI 렌더 이후 transform 작동을 위한 settimout
            this.snackbarElement.style.setProperty('transform', `translateX(calc(-${this.snackbarConfig.right} - ${this.snackbarConfig.width})`);
        }, 0)
        this.hideSnackbar(durationSecond);
    }
    hideSnackbar(durationSecond) {
        setTimeout(() => {
            this.snackbarElement.style.setProperty('transform', `translateX(${this.snackbarConfig.right})`);
            setTimeout(() => {
                this.bodyElement.removeChild(this.snackbarElement);
            }, (durationSecond || this.snackbarConfig.snackbarSplashSecond) * 1000);
        }, (durationSecond || this.snackbarConfig.snackbarIndicateSecond) * 1000);
    }
}