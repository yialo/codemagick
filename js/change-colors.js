'use strict';

(function () {
  var player = window.domElements.setup.querySelector('.setup-player');
  var partMap = {
    'coat': {
      element: player.querySelector('.wizard-coat'),
      colors: [
        'rgb(101, 137, 164)',
        'rgb(241, 43, 107)',
        'rgb(146, 100, 161)',
        'rgb(56, 159, 117)',
        'rgb(215, 210, 55)',
        'rgb(0, 0, 0)',
      ],
      cssProperty: 'fill',
      databaseKey: 'colorCoat',
      rating: 3,
    },
    'eyes': {
      element: player.querySelector('.wizard-eyes'),
      colors: ['black', 'red', 'blue', 'yellow', 'green'],
      cssProperty: 'fill',
      databaseKey: 'colorEyes',
      rating: 1,
    },
    'fireball': {
      element: player.querySelector('.setup-fireball-wrap'),
      colors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
      cssProperty: 'backgroundColor',
      databaseKey: 'colorFireball',
      rating: 1,
    },
  };
  var CurrentColor = {
    coat: 'rgb(101, 137, 164)',
    eyes: 'black',
    fireball: '#ee4830',
  };
  var PARTS = ['coat', 'eyes', 'fireball'];

  var getRank = function (wizard) {
    var rank = 0;
    PARTS.forEach(function (part) {
      var key = partMap[part].databaseKey;
      if (wizard[key] === CurrentColor[part]) {
        rank += partMap[part].rating;
      }
    });
    return rank;
  };

  var compareNames = function (left, right) {
    if (left < right) {
      return -1;
    } else if (left > right) {
      return 1;
    }
    return 0;
  };

  var getSorterWizards = function () {
    return window.similarWizardsRender.data
      .slice().sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = compareNames(left.name, right.name);
        }
        return rankDiff;
      });
  };

  var changeCurrentColor = function (part) {
    var length = partMap[part].colors.length;
    var currentColorIndex = partMap[part].colors.indexOf(CurrentColor[part]);
    if (currentColorIndex === length - 1) {
      CurrentColor[part] = partMap[part].colors[0];
    } else {
      CurrentColor[part] = partMap[part].colors[currentColorIndex + 1];
    }
  };

  var getWizardPartClickHandler = function (part) {
    return function () {
      var map = partMap[part];
      var targetElement = map.element;
      changeCurrentColor(part);
      var input = player.querySelector('input[name=\"' + part + '-color\"]');
      targetElement.style[map.cssProperty] = CurrentColor[part];
      input.value = CurrentColor[part];
      window.similarWizardsRender
        .renewSimilarWizards(getSorterWizards());
    };
  };

  var partHandlers = PARTS.map(function (part) {
    return getWizardPartClickHandler(part);
  });

  window.changeColors = {
    addClickListeners: function () {
      PARTS.forEach(function (item, i) {
        partMap[item].element
          .addEventListener('click', partHandlers[i]);
      });
    },
    removeClickListeners: function () {
      PARTS.forEach(function (item, i) {
        partMap[item].element
          .removeEventListener('click', partHandlers[i]);
      });
    },
  };
}());
