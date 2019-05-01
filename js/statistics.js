'use strict';

(function () {
  var Cloud = {
    Coord: {X: 110, Y: 10},
    Padding: {LEFT: 50, TOP: 16},
    WIDTH: 420,
    HEIGHT: 270,
    SHADOW_SHIFT: 10,
  };
  var CloudShadowCoord = {
    X: Cloud.Coord.X + Cloud.SHADOW_SHIFT,
    Y: Cloud.Coord.Y + Cloud.SHADOW_SHIFT,
  };
  var CloudContentStart = {
    X: Cloud.Coord.X + Cloud.Padding.LEFT,
    Y: Cloud.Coord.Y + Cloud.Padding.TOP,
  };
  var Text = {
    STRING_HEIGHT: 16,
    MARGIN_BOTTOM: 12,
  };
  var TEXT_SECOND_LINE = CloudContentStart.Y + Text.STRING_HEIGHT;
  var Bar = {
    Margin: {
      TOP: 4,
      BOTTOM: 10,
    },
    GAP: 50,
    WIDTH: 40,
    MAX_HEIGHT: 150,
    START_Y: TEXT_SECOND_LINE + Text.STRING_HEIGHT * 2 + Text.MARGIN_BOTTOM,
  };

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    arr.forEach(function (element, i) {
      if (i >= 1 && element > maxElement) {
        maxElement = element;
      }
    });
    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(
        ctx,
        CloudShadowCoord.X,
        CloudShadowCoord.Y,
        'rgba(0, 0, 0, 0.7)'
    );
    renderCloud(ctx, Cloud.Coord.X, Cloud.Coord.Y, '#ffffff');

    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText(
        'Ура вы победили!',
        CloudContentStart.X,
        CloudContentStart.Y
    );
    ctx.fillText(
        'Список результатов:',
        CloudContentStart.X,
        TEXT_SECOND_LINE
    );

    var maxTime = getMaxElement(times);
    var timeColumnUnit = Bar.MAX_HEIGHT / maxTime;

    names.forEach(function (name, i) {
      var time = times[i];

      if (name === 'Вы') {
        ctx.fillStyle = '#ff0000';
      } else {
        ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
      }

      var barHeight = time * timeColumnUnit;
      var barRelativeY = Bar.MAX_HEIGHT - barHeight;
      var barContentStartX = CloudContentStart.X + (Bar.WIDTH + Bar.GAP) * i;

      ctx.fillRect(
          barContentStartX,
          Bar.START_Y + barRelativeY,
          Bar.WIDTH,
          barHeight
      );
      ctx.fillStyle = '#000000';
      ctx.fillText(
          Math.round(time),
          barContentStartX,
          Bar.START_Y + barRelativeY - Text.STRING_HEIGHT - Bar.Margin.TOP
      );
      ctx.fillText(
          name,
          barContentStartX,
          Bar.START_Y + Bar.MAX_HEIGHT + Bar.Margin.BOTTOM
      );
    });
  };
}());
