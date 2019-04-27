'use strict';

(function () {
  var setup = window.domElements.setup;
  var userpic = setup.querySelector('.upload');

  var userpicClickPreventDefault = function (clickEvt) {
    clickEvt.preventDefault();
    userpic.removeEventListener('click', userpicClickPreventDefault);
  };

  var userpicMousedownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {x: evt.clientX, y: evt.clientY};

    var dragged = false;

    var documentMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y,
      };

      startCoords = {x: moveEvt.clientX, y: moveEvt.clientY};

      setup.style.top = (setup.offsetTop + shift.y) + 'px';
      setup.style.left = (setup.offsetLeft + shift.x) + 'px';
    };

    var documentMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', documentMousemoveHandler);
      document.removeEventListener('mouseup', documentMouseupHandler);

      if (dragged) {
        userpic.addEventListener('click', userpicClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', documentMousemoveHandler);
    document.addEventListener('mouseup', documentMouseupHandler);
  };

  window.setupMove = {
    addUserpicMousedownListener: function () {
      userpic.addEventListener('mousedown', userpicMousedownHandler);
    },
    removeUserpicMousedownListener: function () {
      userpic.removeEventListener('mousedown', userpicMousedownHandler);
    },
  };
}());
