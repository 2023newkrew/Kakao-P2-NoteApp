import { createAppComponent } from './components/app';

const { documentFragment } = createAppComponent();

document.body.appendChild(documentFragment);
