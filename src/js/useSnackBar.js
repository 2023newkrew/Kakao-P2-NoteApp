const snackBarContainer = document.body.querySelector('#snackBars');

function useSnackBar() {
  const makeContentElement = content => {
    const element = document.createElement('p');
    element.className = 'content';
    element.textContent = content;
    return element;
  };

  const makeCancelButton = onClick => {
    const element = document.createElement('button');
    element.className = 'cancel';
    element.textContent = '취소';

    element.addEventListener('click', onClick);
    return element;
  };

  const addSnackBar = snackBar => {
    snackBarContainer.appendChild(snackBar);
    snackBar.classList.add('on');
  };

  const removeSnackBar = snackBar => {
    snackBar.classList.remove('on');

    setTimeout(() => {
      snackBarContainer.removeChild(snackBar);
    }, 300);
  };

  const render = ({content, onCancel}) => {
    let timeoutId;
    const snackBarEl = document.createElement('div');
    snackBarEl.className = 'snackBar';

    const contentEl = makeContentElement(content);
    snackBarEl.appendChild(contentEl);

    if (onCancel) {
      const cancelButtonEl = makeCancelButton(() => {
        clearTimeout(timeoutId);
        onCancel();
        removeSnackBar(snackBarEl);
      });
      snackBarEl.appendChild(cancelButtonEl);
    }

    addSnackBar(snackBarEl);

    timeoutId = setTimeout(() => {
      removeSnackBar(snackBarEl);
    }, 5000);
  };

  return render;
}
export default useSnackBar;
