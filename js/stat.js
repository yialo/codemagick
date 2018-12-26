'use strict';

var CLOUD_X = 110;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_SHADOW_SHIFT = 10;
var CLOUD_SHADOW_X = CLOUD_X + CLOUD_SHADOW_SHIFT;
var CLOUD_SHADOW_Y = CLOUD_Y + CLOUD_SHADOW_SHIFT;

var CLOUD_PADDING_LEFT = 50;
var CLOUD_PADDING_TOP = 10;

var CLOUD_CONTENT_START_X = CLOUD_X + CLOUD_PADDING_LEFT;
var CLOUD_CONTENT_START_Y = CLOUD_Y + CLOUD_PADDING_TOP;
var TEXT_STRING_GAP = 16;
var TEXT_SECOND_LINE_Y = CLOUD_CONTENT_START_Y + TEXT_STRING_GAP;

var BAR_MARGIN_TOP = 10;
var BAR_START_Y = TEXT_SECOND_LINE_Y + TEXT_STRING_GAP + BAR_MARGIN_TOP;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_SHADOW_X, CLOUD_SHADOW_Y, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(
      'Ура вы победили!',
      CLOUD_CONTENT_START_X,
      CLOUD_CONTENT_START_Y
  );
  ctx.fillText(
      'Список результатов:',
      CLOUD_CONTENT_START_X,
      TEXT_SECOND_LINE_Y
  );

  var maxTime = getMaxElement(times);

  var timeIncrement = BAR_MAX_HEIGHT / maxTime;

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = '#000000';
    }

    var barHeight = times[i] * timeIncrement;
    var barRelativeY = BAR_MAX_HEIGHT - barHeight;

    ctx.fillRect(
        CLOUD_CONTENT_START_X + (BAR_WIDTH + BAR_GAP) * i,
        BAR_START_Y + barRelativeY,
        BAR_WIDTH,
        barHeight
    );
  }
};

/*
var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP;

window.renderStatistics = function (ctx, players, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * i);
    ctx.fillRect(CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP + (GAP + BAR_HEIGHT) * i, (barWidth * times[i]) / maxTime, BAR_HEIGHT);
  }
};
*/
