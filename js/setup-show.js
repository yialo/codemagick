'use strict';

(function () {
  var setup = window.domElements.setup;
  var isEnterKeycode = function (evt) {
    return window.keycodes.isEnterKeycode(evt);
  };

  var setupOpener = document.querySelector('.setup-open');
  var setupOpenerIcon = setupOpener.querySelector('.setup-open-icon');
  var setupCloser = setup.querySelector('.setup-close');
  var usernameInput = setup.querySelector('.setup-user-name');

  var openPopup = function () {
    setup.classList.remove('hidden');
    setupCloser.addEventListener('click', setupCloserClickHandler);
    setupCloser.addEventListener('keydown', setupCloserKeydownHandler);
    document.addEventListener('keydown', documentEscPressHandler);
    window.setupMove.addUserpicMousedownListener();
    window.changeColors.addClickListeners();
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    setup.removeAttribute('style');
    setupCloser.removeEventListener('click', setupCloserClickHandler);
    setupCloser.removeEventListener('keydown', setupCloserKeydownHandler);
    document.removeEventListener('keydown', documentEscPressHandler);
    window.setupMove.removeUserpicMousedownListener();
    window.changeColors.removeClickListeners();
  };

  var documentEscPressHandler = function (evt) {
    if (window.keycodes.isEscKeycode(evt) && document.activeElement !== usernameInput) {
      evt.preventDefault();
      closePopup();
    }
  };

  var setupOpenerClickHandler = function () {
    openPopup();
  };

  var setupOpenerIconKeydownkHandler = function (evt) {
    if (isEnterKeycode(evt)) {
      openPopup();
    }
  };

  var setupCloserClickHandler = function () {
    closePopup();
  };

  var setupCloserKeydownHandler = function (evt) {
    if (isEnterKeycode(evt)) {
      closePopup();
    }
  };

  setupOpener.addEventListener('click', setupOpenerClickHandler);
  setupOpenerIcon.addEventListener('keydown', setupOpenerIconKeydownkHandler);
}());
