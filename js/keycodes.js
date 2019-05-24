'use strict';

(function () {
  var Keycode = {ENTER: 13, ESC: 27};
  var getKeycodeChecker = function (keyName) {
    return function (evt) {
      return (evt.keyCode === Keycode[keyName]);
    };
  };

  window.keycodes = {
    isEnter: getKeycodeChecker('ENTER'),
    isEsc: getKeycodeChecker('ESC'),
  };
}());
