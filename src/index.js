import "./styles/index.scss"

// 이미지 로드

import gridImage from "./assets/grid.svg"
import listImage from "./assets/list.svg"
import logoImage from "./assets/logo.svg"
import menuImage from "./assets/menu.svg"
import notesImage from "./assets/notes.svg"
import reminderImage from "./assets/reminder.svg"
import settingsImage from "./assets/settings.svg"
import userImage from "./assets/user.svg"

// 이미지 로드

import 'suneditor/src/assets/css/suneditor.css'
import suneditor from 'suneditor'

// How to import language files (default: en)
import lang from 'suneditor/src/lang'


import plugins from 'suneditor/src/plugins'

suneditor.create('text-area', {
    plugins: plugins,
    buttonList: [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        '/',
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['table', 'link', 'image', 'video', 'audio'],
        ['fullScreen', 'showBlocks', 'codeView'],
        ['preview', 'print'],
        ['save', 'template'],
    ],
    maxCharCount: 200,
    value: ''
})