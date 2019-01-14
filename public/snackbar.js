let showSnackbar;

(function() {
  let snackbarHideTimeOut;
  let messageTimeout;

  const snackbar = document.getElementById('snackbar');
  const snackbarButton = document.getElementById('snackbar-button');
  const snackbarMessage = document.getElementById('snackbar-message');
  const snackbarClassPrefix = tail => `snackbar${tail}`;

  const handleHide = () => {
    snackbar.className = snackbar.className.replace(
      snackbarClassPrefix('--show'),
      snackbarClassPrefix('--hide')
    );
    messageTimeout = setTimeout(() => {
      snackbarMessage.textContent = '';
      clearTimeout(messageTimeout);
    }, 1000);
  };

  const handleShow = (message, type) => {
    snackbar.className = `${snackbarClassPrefix('')} ${snackbarClassPrefix(
      '--show'
    )} ${snackbarClassPrefix(`--${type}`)}`;
    snackbarMessage.textContent = message;
  };

  snackbarButton.onclick = () => {
    clearTimeout(snackbarHideTimeOut);
    handleHide();
  };

  // Expose showSnackbar function
  showSnackbar = (message, type = 'deleted', time = 4000) => {
    clearTimeout(messageTimeout);
    if (snackbar.className.includes(snackbarClassPrefix('--show'))) {
      clearTimeout(snackbarHideTimeOut);
      handleHide();
      const show = setTimeout(() => {
        handleShow(message, type);
        snackbarHideTimeOut = setTimeout(() => {
          handleHide();
          clearTimeout(snackbarHideTimeOut);
        }, time);
        clearTimeout(show);
      }, 1000);
    } else {
      handleShow(message, type);
      snackbarHideTimeOut = setTimeout(() => {
        handleHide();
        clearTimeout(snackbarHideTimeOut);
      }, time);
    }
  };
})();
