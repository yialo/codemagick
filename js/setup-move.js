'use strict';

(function () {
  var setup = window.domElements.setup;
  var userpic = setup.querySelector('.upload');

  var userpicClickPreventDefault = function (clickEvt) {
    clickEvt.preventDefault();
    userpic.removeEventListener('click', userpicClickPreventDefault);
  };

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var userpicMousedownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    var dragged = false;

    var documentMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = new Coordinate(
          moveEvt.clientX - startCoords.x,
          moveEvt.clientY - startCoords.y
      );

      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);

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
