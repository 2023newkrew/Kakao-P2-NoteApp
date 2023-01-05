const body = document.body;

export default function useMemoSnackBar() {
  let snackBarCount = 0;
  let offset = 0;

  const clearOffset = () => {
    snackBarCount = snackBarCount - 1 < 0 ? 0 : snackBarCount - 1;
    offset -= 3.5;
  };
  const countUp = () => {
    offset += 3.5;
    snackBarCount += 1;
  };

  const makeContentElement = content => {
    const element = document.createElement('p');
    element.className = 'content';
    element.textContent = content;
    return element;
  };

  const makeCancelButton = () => {
    const element = document.createElement('button');
    element.className = 'cancel';
    element.textContent = '취소';
    return element;
  };

  const addSnackBar = snackBar => {
    countUp();

    body.appendChild(snackBar);
    snackBar.classList.add('on');
  };

  const removeSnackBar = snackBar => {
    snackBar.classList.remove('on');

    setTimeout(() => {
      body.removeChild(snackBar);
      clearOffset();
    }, 250);
  };

  const render = ({content, onCancel}) => {
    let timeoutId;
    const snackBarEl = document.createElement('div');
    snackBarEl.className = 'snackBar';

    const contentEl = makeContentElement(content);
    const cancelButtonEl = makeCancelButton();

    cancelButtonEl.addEventListener('click', () => {
      clearTimeout(timeoutId);
      onCancel();
      removeSnackBar(snackBarEl);
    });

    snackBarEl.appendChild(contentEl);
    snackBarEl.appendChild(cancelButtonEl);
    snackBarEl.style.transform = `translateY(${-offset}rem)`;

    addSnackBar(snackBarEl);

    timeoutId = setTimeout(() => {
      removeSnackBar(snackBarEl);
    }, 5000);
  };

  return render;
}
