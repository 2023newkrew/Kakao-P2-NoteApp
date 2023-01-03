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

// How to import plugins
import image from 'suneditor/src/plugins/dialog/link'
import list from 'suneditor/src/plugins/submenu/list'
import { font, video } from 'suneditor/src/plugins'

// How to import language files (default: en)
import lang from 'suneditor/src/lang'


suneditor.create('text-area', {
    plugins: [font, video, image, list],
    buttonList: [
        ['font', 'video', 'image', 'list']
    ],
    lang: lang.ko,
    maxCharCount: 200,
    className: 'sun-editor',
    height: 100,
});