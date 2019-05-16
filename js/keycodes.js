'use strict';

(function () {
  var checkKeycode = function (keyName) {
    var Keycode = {ENTER: 13, ESC: 27};
    return function (evt) {
      return (evt.keyCode === Keycode[keyName]);
    };
  };

  window.keycodes = {
    isEnter: checkKeycode('ENTER'),
    isEsc: checkKeycode('ESC'),
  };
}());
