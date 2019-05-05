'use strict';

(function () {
  var setup = window.domElements.setup;
  var userpic = setup.querySelector('.upload');

  var userpicClickPreventDefault = function (clickEvt) {
    clickEvt.preventDefault();
    userpic.removeEventListener('click', userpicClickPreventDefault);
  };

  var getCoords = function (x, y) {
    return {x: x, y: y};
  };

  var userpicMousedownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = getCoords(evt.clientX, evt.clientY);

    var dragged = false;

    var documentMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = getCoords(
          moveEvt.clientX - startCoords.x,
          moveEvt.clientY - startCoords.y
      );

      startCoords = getCoords(moveEvt.clientX, moveEvt.clientY);

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
