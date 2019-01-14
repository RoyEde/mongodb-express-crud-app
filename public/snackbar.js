let showSnackbar;

(function() {
  let snackbarHideTimeOut;
  const snackbar = document.getElementById('snackbar');
  const snackbarButton = document.getElementById('snackbar-button');
  const snackbarMessage = document.getElementById('snackbar-message');
  const snackbarClassPrefix = tail => `snackbar${tail}`;

  snackbarButton.onclick = () => {
    clearTimeout(snackbarHideTimeOut);
    snackbar.className = snackbar.className.replace(
      snackbarClassPrefix('--show'),
      snackbarClassPrefix('--hide')
    );
  };

  // Expose showSnackbar function
  showSnackbar = (message, type, time = 4000) => {
    if (snackbar.className.includes(snackbarClassPrefix('--show'))) {
      clearTimeout(snackbarHideTimeOut);
      snackbar.className = snackbar.className.replace(
        snackbarClassPrefix('--show'),
        snackbarClassPrefix('--hide')
      );
      const show = setTimeout(() => {
        snackbar.className = `${snackbarClassPrefix('')} ${snackbarClassPrefix(
          '--show'
        )} ${snackbarClassPrefix(`--${type}`)}`;
        snackbarMessage.textContent = message;
        snackbarHideTimeOut = setTimeout(() => {
          snackbar.className = snackbar.className.replace(
            snackbarClassPrefix('--show'),
            snackbarClassPrefix('--hide')
          );
          snackbarMessage.textContent = '';
          clearTimeout(snackbarHideTimeOut);
        }, time);
        clearTimeout(show);
      }, 1000);
    } else {
      snackbar.className = `${snackbarClassPrefix('')} ${snackbarClassPrefix(
        '--show'
      )} ${snackbarClassPrefix(`--${type}`)}`;
      snackbarMessage.textContent = message;
      snackbarHideTimeOut = setTimeout(() => {
        snackbar.className = snackbar.className.replace(
          snackbarClassPrefix('--show'),
          snackbarClassPrefix('--hide')
        );
        snackbarMessage.textContent = '';
        clearTimeout(snackbarHideTimeOut);
      }, time);
    }
  };
})();
