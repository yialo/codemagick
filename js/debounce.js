'use strict';

(function () {
  var LATENCY = 500;
  var lastTimeout;

  window.debounce = {
    set: function (callback) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(callback, LATENCY);
    },
  };
}());

// TODO: сделать отдельный debounce для каждой части волшебника
