import 'suneditor/src/assets/css/suneditor.css'
import SUNEDITOR from 'suneditor'

import plugins from 'suneditor/src/plugins'
import Post from '@scripts/post';


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
    }

    listenKeyPressEvent() {
        this.sunEditor.onKeyDown = (event) => {
            // * 한글로 입력 시 Enter가 두 번씩 눌러지는 문제 해결
            // ! keyPress로 하면 해결되나 sunEditor의 경우 keyPress 이벤트 부재
            // ! 기존 Editor에 작성은 200글자를 넘을 수 없으나, 복사 붙여넣기를 통해서는 넘길 수 있음
            if (event.key === "Enter" && !event.isComposing) {
                const text = this.getContents();
                if (text.length <= 200) {
                    this.makePost(text);
                    this.setContents("");
                } else if (text.length > 200) {
                    alert("200자를 초과할 수 없습니다 !");
                }

                event.preventDefault();
            }
        };
    }

    makePost(text) {
        const post = new Post();
        const postElement = post.makePost(text);
        post.makeCloseButton(postElement);
        post.attachPosts(postElement);
    }
}
