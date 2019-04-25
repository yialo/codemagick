'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.keycodes = {
    isEnterKeycode: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    isEscKeycode: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
  };
}());
