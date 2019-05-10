'use strict';

(function () {
  var wizard = window.domElements.setup.querySelector('.setup-player');
  var partMap = {
    'coat': {
      element: wizard.querySelector('.wizard-coat'),
      colors: [
        'rgb(101, 137, 164)',
        'rgb(241, 43, 107)',
        'rgb(146, 100, 161)',
        'rgb(56, 159, 117)',
        'rgb(215, 210, 55)',
        'rgb(0, 0, 0)',
      ],
      style: 'fill',
    },
    'eyes': {
      element: wizard.querySelector('.wizard-eyes'),
      colors: ['black', 'red', 'blue', 'yellow', 'green'],
      style: 'fill',
    },
    'fireball': {
      element: wizard.querySelector('.setup-fireball-wrap'),
      colors: [
        '#ee4830',
        '#30a8ee',
        '#5ce6c0',
        '#e848d5',
        '#e6e848',
      ],
      style: 'backgroundColor',
    },
  };

  var getWizardPartClickHandler = function (part) {
    return function () {
      var targetElement = partMap[part].element;
      var newColor = window.utilities
        .getRandomArrayElement(partMap[part].colors);
      var input = wizard.querySelector('input[name=\'' + part + '-color\']');
      targetElement.style[partMap[part].style] = newColor;
      input.value = newColor;
    };
  };

  var PARTS = ['coat', 'eyes', 'fireball'];
  var partHandlers = PARTS.map(function (item) {
    return getWizardPartClickHandler(item);
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
