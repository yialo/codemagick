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
      ratingMark: 2,
    },
    'eyes': {
      element: player.querySelector('.wizard-eyes'),
      colors: ['black', 'red', 'blue', 'yellow', 'green'],
      cssProperty: 'fill',
      dbKey: 'colorEyes',
      ratingMark: 1,
    },
    'fireball': {
      element: player.querySelector('.setup-fireball-wrap'),
      colors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
      cssProperty: 'backgroundColor',
      dbKey: 'colorFireball',
      ratingMark: 1,
    },
  };

  var setWizardsRating = function (part, newColor) {
    window.backend.currentWizards.forEach(function (wizard) {
      var rating = 0;
      var dbKey = partMap[part].dbKey;
      if (wizard[dbKey] === newColor) {
        rating += partMap[part].ratingMark;
      }
      wizard.Rating[part] = rating;
    });
  };

  var calculateTotalRating = function () {
    window.backend.currentWizards.forEach(function (wizard) {
      wizard.Rating.total = wizard.Rating.coat + wizard.Rating.eyes + wizard.Rating.fireball;
    });
  };

  var sortSimilarWizards = function () {
    window.backend.currentWizards.sort(function (left, right) {
      return right.Rating.total - left.Rating.total;
    });
  };

  var getWizardPartClickHandler = function (part) {
    return function () {
      var targetElement = partMap[part].element;
      var newColor = window.utilities
        .getRandomArrayElement(partMap[part].colors);
      var input = player.querySelector('input[name=\"' + part + '-color\"]');
      targetElement.style[partMap[part].cssProperty] = newColor;
      input.value = newColor;
      setWizardsRating(part, newColor);
      calculateTotalRating();
      sortSimilarWizards();
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
