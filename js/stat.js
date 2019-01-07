'use strict';

var CLOUD_X = 110;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_SHADOW_SHIFT = 10;
var CLOUD_SHADOW_X = CLOUD_X + CLOUD_SHADOW_SHIFT;
var CLOUD_SHADOW_Y = CLOUD_Y + CLOUD_SHADOW_SHIFT;

var CLOUD_PADDING_LEFT = 50;
var CLOUD_PADDING_TOP = 16;

var CLOUD_CONTENT_START_X = CLOUD_X + CLOUD_PADDING_LEFT;
var CLOUD_CONTENT_START_Y = CLOUD_Y + CLOUD_PADDING_TOP;

var TEXT_STRING_HEIGHT = 16;
var TEXT_SECOND_LINE_Y = CLOUD_CONTENT_START_Y + TEXT_STRING_HEIGHT;
var TEXT_MARGIN_BOTTOM = 12;

var BAR_MARGIN_TOP = 4;
var BAR_MARGIN_BOTTOM = 10;
var BAR_START_Y = TEXT_SECOND_LINE_Y + TEXT_STRING_HEIGHT * 2 + TEXT_MARGIN_BOTTOM;
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

  var timeColumnUnit = BAR_MAX_HEIGHT / maxTime;

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = '#ff0000';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
    }

    var barHeight = times[i] * timeColumnUnit;
    var barRelativeY = BAR_MAX_HEIGHT - barHeight;
    var barContentStartX = CLOUD_CONTENT_START_X + (BAR_WIDTH + BAR_GAP) * i;

    ctx.fillRect(
        barContentStartX,
        BAR_START_Y + barRelativeY,
        BAR_WIDTH,
        barHeight
    );
    ctx.fillStyle = '#000000';
    ctx.fillText(
        Math.round(times[i]),
        barContentStartX,
        BAR_START_Y + barRelativeY - TEXT_STRING_HEIGHT - BAR_MARGIN_TOP
    );
    ctx.fillText(
        names[i],
        barContentStartX,
        BAR_START_Y + BAR_MAX_HEIGHT + BAR_MARGIN_BOTTOM
    );
  }
};
