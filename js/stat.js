'use strict';

var CLOUD_X = 110;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_SHADOW_SHIFT = 10;

var FONT_SIZE = 16;
var CLOUD_PADDING_LEFT = 50;
var LEGEND_FIRST_LINE_Y = 20;
var LEGEND_SECOND_LINE_Y = LEGEND_FIRST_LINE_Y + FONT_SIZE;
var BAR_SHIFT_Y = 10;
var BAR_Y = LEGEND_FIRST_LINE_Y + FONT_SIZE + BAR_SHIFT_Y;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx) {
  renderCloud(
      ctx,
      CLOUD_X + CLOUD_SHADOW_SHIFT,
      CLOUD_Y + CLOUD_SHADOW_SHIFT,
      'rgba(0, 0, 0, 0.7)'
  );
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaselint = 'hanging';
  ctx.fillText(
      'Ура вы победили!',
      CLOUD_X + CLOUD_PADDING_LEFT,
      CLOUD_Y + LEGEND_FIRST_LINE_Y
  );
  ctx.fillText(
      'Список результатов:',
      CLOUD_X + CLOUD_PADDING_LEFT,
      CLOUD_Y + LEGEND_SECOND_LINE_Y
  );

  ctx.fillStyle = 'red';
  ctx.fillRect(CLOUD_X + CLOUD_PADDING_LEFT, CLOUD_Y + BAR_Y, 50, 50);

  var maxTime = getMaxElement(times);
};

/*
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 20;
var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP;

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * i);
    ctx.fillRect(CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP + (GAP + BAR_HEIGHT) * i, (barWidth * times[i]) / maxTime, BAR_HEIGHT);
  }
};
*/
