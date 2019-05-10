'use strict';

(function () {
  var setup = window.domElements.setup;
  var setupOpener = document.querySelector('.setup-open');
  var setupOpenerIcon = setupOpener.querySelector('.setup-open-icon');
  var setupCloser = setup.querySelector('.setup-close');
  var usernameInput = setup.querySelector('.setup-user-name');

  var openSetup = function () {
    setup.classList.remove('hidden');
    setupCloser.addEventListener('click', setupCloserClickHandler);
    setupCloser.addEventListener('keydown', setupCloserKeydownHandler);
    document.addEventListener('keydown', documentEscPressHandler);
    window.setupMove.addUserpicMousedownListener();
    window.changeColors.addClickListeners();
    window.upload.addFormEventListeners();
  };

  var closeSetup = function () {
    setup.classList.add('hidden');
    setup.removeAttribute('style');
    setupCloser.removeEventListener('click', setupCloserClickHandler);
    setupCloser.removeEventListener('keydown', setupCloserKeydownHandler);
    document.removeEventListener('keydown', documentEscPressHandler);
    window.setupMove.removeUserpicMousedownListener();
    window.changeColors.removeClickListeners();
    window.upload.removeFormEventListeners();
  };

  var documentEscPressHandler = function (evt) {
    if (window.keycodes.isEscKeycode(evt) && document.activeElement !== usernameInput) {
      evt.preventDefault();
      closeSetup();
    }
  };

  var setupOpenerClickHandler = function () {
    openSetup();
  };

  var setupOpenerIconKeydownHandler = function (evt) {
    if (window.keycodes.isEnterKeycode(evt)) {
      openSetup();
    }
  };

  var setupCloserClickHandler = function () {
    closeSetup();
  };

  var setupCloserKeydownHandler = function (evt) {
    if (window.keycodes.isEnterKeycode(evt)) {
      closeSetup();
    }
  };

  setupOpener.addEventListener('click', setupOpenerClickHandler);
  setupOpenerIcon.addEventListener('keydown', setupOpenerIconKeydownHandler);

  window.setupShow = {
    closeSetup: function () {
      closeSetup();
    },
  };
}());
