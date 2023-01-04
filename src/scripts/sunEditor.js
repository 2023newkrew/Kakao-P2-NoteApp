import 'suneditor/src/assets/css/suneditor.css'
import SUNEDITOR from 'suneditor'

import plugins from 'suneditor/src/plugins'
import Post from './post';


export default class SunEditor {
    constructor() {
        this.sunEditor = null;
        this.post = new Post();
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
        this.sunEditor.onKeyDown = function (event) {
            if (event.key === "Enter" && !event.isComposing) {
                const text = this.sunEditor.getContents();
                this.post.makePost(text);
                this.setContents("");
                event.preventDefault();
            }
        }.bind(this);
    }
}
