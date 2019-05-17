'use strict';

(function () {
  var getKeycodeChecker = function (keyName) {
    var Keycode = {ENTER: 13, ESC: 27};
    return function (evt) {
      return (evt.keyCode === Keycode[keyName]);
    };
  };

  window.keycodes = {
    isEnter: getKeycodeChecker('ENTER'),
    isEsc: getKeycodeChecker('ESC'),
  };
}());
