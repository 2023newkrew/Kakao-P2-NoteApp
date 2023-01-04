import 'suneditor/src/assets/css/suneditor.css'
import SUNEDITOR from 'suneditor'

import plugins from 'suneditor/src/plugins'
import Post from './post';


export default class SunEditor {
    constructor() {
        this.sunEditor = null;
    }

    setContents(text) {
        this.sunEditor.setContents(text);
    }

    getContents() {
        return this.sunEditor.getContents();
    }


    createSunEditor() {
        this.sunEditor = SUNEDITOR.create('text-area', {
            plugins: plugins,
            buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['paragraphStyle', 'blockquote'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                ['image']
            ],
            value: "",
            maxCharCount: 200,
            className: "sun-editor",
            width: "100%",
            defaultTag: "div",
        })

        this.listenKeyPressEvent();
    }

    listenKeyPressEvent() {
        this.sunEditor.onKeyDown = function (event) {
            // * 한글로 입력 시 Enter가 두 번씩 눌러지는 문제 해결
            // ! keyPress로 하면 해결되나 sunEditor의 경우 keyPress 이벤트 부재
            // TODO : 글자 수가 200자를 넘어갈 수 있는 문제 존재
            if (event.key === "Enter" && !event.isComposing) {
                const text = this.getContents();
                this.makePost(text);

                this.setContents("");
                event.preventDefault();
            }
        }.bind(this);
    }

    makePost(text) {
        const post = new Post();
        post.makePost(text);
    }
}
