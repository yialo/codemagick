'use strict';

(function () {
  var Keycode = {ENTER: 13, ESC: 27};

  window.keycodes = {
    isEnterKeycode: function (evt) {
      return (evt.keyCode === Keycode.ENTER);
    },
    isEscKeycode: function (evt) {
      return (evt.keyCode === Keycode.ESC);
    },
  };
}());
