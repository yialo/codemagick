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
      dbKey: 'colorCoat',
      rating: 2,
    },
    'eyes': {
      element: player.querySelector('.wizard-eyes'),
      colors: ['black', 'red', 'blue', 'yellow', 'green'],
      cssProperty: 'fill',
      dbKey: 'colorEyes',
      rating: 1,
    },
    'fireball': {
      element: player.querySelector('.setup-fireball-wrap'),
      colors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
      cssProperty: 'backgroundColor',
      dbKey: 'colorFireball',
      rating: 1,
    },
  };

  var CurrentColor = {
    coat: 'rgb(101, 137, 164)',
    eyes: 'black',
    fireball: '#ee4830',
  };

  var setWizardsRank = function (part, newColor) {
    window.similarWizardsRender.currentWizards.forEach(function (wizard) {
      var rank = 0;
      var dbKey = partMap[part].dbKey;
      if (wizard[dbKey] === newColor) {
        rank += partMap[part].rating;
      }
      wizard.Rating[part] = rank;
    });
  };

  var calculateTotalRating = function () {
    window.similarWizardsRender.currentWizards.forEach(function (wizard) {
      wizard.Rating.total = wizard.Rating.coat + wizard.Rating.eyes + wizard.Rating.fireball;
    });
  };

  var sortSimilarWizards = function () {
    window.similarWizardsRender.currentWizards.sort(function (left, right) {
      return right.Rating.total - left.Rating.total;
    });
  };

  var getNewColor = function (part, currentColor) {
    var length = partMap[part].colors.length;
    var currentColorIndex = partMap[part].colors.indexOf(currentColor);
    var newColor;
    if (currentColorIndex === length - 1) {
      newColor = partMap[part].colors[0];
    } else {
      newColor = partMap[part].colors[currentColorIndex + 1];
    }
    CurrentColor[part] = newColor;
    return newColor;
  };

  var getWizardPartClickHandler = function (part) {
    return function () {
      var targetElement = partMap[part].element;
      var newColor = getNewColor(part, CurrentColor[part]);
      var input = player.querySelector('input[name=\"' + part + '-color\"]');
      targetElement.style[partMap[part].cssProperty] = newColor;
      input.value = newColor;
      // setWizardsRank(part, newColor);
      // calculateTotalRating();
      // sortSimilarWizards();
      // window.similarWizardsRender
      //   .renewSimilarWizards(window.similarWizardsRender.currentWizards);
    };
  };

  var PARTS = ['coat', 'eyes', 'fireball'];
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
