'use strict';

(function () {
  var Cloud = {
    _Coord: {X: 110, Y: 10},
    _Offset: {X: 50, Y: 16},
    _Size: {X: 420, Y: 270},
    SHIFT: 10,
    getCoord: function (axis) {
      return this._Coord[axis];
    },
    getShadowCoord: function (axis) {
      return this.getCoord(axis) + this.SHIFT;
    },
    getOffset: function (axis) {
      return this._Offset[axis];
    },
    getSize: function (axis) {
      return this._Size[axis];
    },
    getContentStart: function (axis) {
      return this.getCoord(axis) + this.getOffset(axis);
    },
  };

  var Text = {
    STRING_HEIGHT: 16,
    MARGIN_BOTTOM: 12,
    getSecondLine: function () {
      return Cloud.getContentStart('Y') + this.STRING_HEIGHT;
    },
    getStartY: function () {
      return (this.getSecondLine() + this.STRING_HEIGHT * 2 + this.MARGIN_BOTTOM);
    },
  };

  var Bar = {
    Margin: {TOP: 4, BOTTOM: 10},
    GAP: 50,
    WIDTH: 40,
    MAX_HEIGHT: 150,
  };

  var renderRectangle = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, Cloud.getSize('X'), Cloud.getSize('Y'));
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
    renderRectangle(
        ctx,
        Cloud.getShadowCoord('X'),
        Cloud.getShadowCoord('Y'),
        'rgba(0, 0, 0, 0.7)'
    );
    renderRectangle(ctx, Cloud.getCoord('X'), Cloud.getCoord('Y'), '#ffffff');

    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText(
        'Ура вы победили!',
        Cloud.getContentStart('X'),
        Cloud.getContentStart('Y')
    );
    ctx.fillText(
        'Список результатов:',
        Cloud.getContentStart('X'),
        Text.getSecondLine()
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
      var barContentStartX = Cloud.getContentStart('X')
        + (Bar.WIDTH + Bar.GAP) * i;

      ctx.fillRect(
          barContentStartX,
          Text.getStartY() + barRelativeY,
          Bar.WIDTH,
          barHeight
      );
      ctx.fillStyle = '#000000';
      ctx.fillText(
          Math.round(time),
          barContentStartX,
          Text.getStartY() + barRelativeY - Text.STRING_HEIGHT - Bar.Margin.TOP
      );
      ctx.fillText(
          name,
          barContentStartX,
          Text.getStartY() + Bar.MAX_HEIGHT + Bar.Margin.BOTTOM
      );
    });
  };
}());
