'use strict';

var setupBlock = document.querySelector('.setup');
var userpic = setupBlock.querySelector('.upload');

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

    setupBlock.style.top = (setupBlock.offsetTop + shift.y) + 'px';
    setupBlock.style.left = (setupBlock.offsetLeft + shift.x) + 'px';
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

userpic.addEventListener('mousedown', userpicMousedownHandler);
