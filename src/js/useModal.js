const useModal = () => {
  const makeHeader = () => {
    const haeder = document.createElement('header');
    haeder.className = 'header';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', () => {
      const modal = document.body.querySelector('.modal');
      document.body.removeChild(modal);
    });

    haeder.appendChild(closeButton);
    return haeder;
  };

  const makeModal = content => {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const layer = document.createElement('layer');
    layer.className = 'layer';

    const contentSection = document.createElement('div');
    const header = makeHeader();

    contentSection.className = 'content';
    contentSection.appendChild(content);
    layer.appendChild(header);
    layer.appendChild(contentSection);

    modal.appendChild(layer);

    return modal;
  };

  const renderModal = content => {
    const modal = makeModal(content);
    document.body.appendChild(modal);
  };
  const closeModal = () => {
    document.body.querySelector('.modal').remove();
  };

  return {renderModal, closeModal};
};
export default useModal;
