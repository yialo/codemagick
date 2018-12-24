'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var names = ['Вы', 'Кекс', 'Катя', 'Игорь'];
var times = [2725, 4025, 1244, 1339];

var renderCloud = function (canvasContext, x, y, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx) {
  renderCloud(ctx, 120, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 110, 10, 'white');
};
