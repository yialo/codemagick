'use strict';

(function () {
  var partMap = {
    'coat': {
      selector: '.wizard-coat',
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
      rating: 4,
    },
    'eyes': {
      selector: '.wizard-eyes',
      colors: ['black', 'red', 'blue', 'yellow', 'green'],
      cssProperty: 'fill',
      databaseKey: 'colorEyes',
      rating: 2,
    },
    'fireball': {
      selector: '.setup-fireball-wrap',
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

  var getSortedWizards = function () {
    return window.similarWizards.data.slice()
      .sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = compareNames(left.name, right.name);
        }
        return rankDiff;
      });
  };

  var incrementColor = function (part) {
    var colors = partMap[part].colors;
    var currentColorIndex = colors.indexOf(CurrentColor[part]);
    if (currentColorIndex === colors.length - 1) {
      CurrentColor[part] = colors[0];
    } else {
      CurrentColor[part] = colors[currentColorIndex + 1];
    }
  };

  var player = window.domElements.setup.querySelector('.setup-player');
  var getPartClickHandler = function (part) {
    return function () {
      incrementColor(part);
      var map = partMap[part];
      var element = player.querySelector(map.selector);
      element.style[map.cssProperty] = CurrentColor[part];
      var input = player.querySelector('input[name=\"' + part + '-color\"]');
      input.value = CurrentColor[part];
      if (window.backend.isDownloaded) {
        window.debounce.set(function () {
          window.similarWizards.update(getSortedWizards());
        });
      }
    };
  };

  var manageClickListeners = function (action) {
    return function () {
      PARTS.forEach(function (part) {
        var target = player.querySelector(partMap[part].selector);
        var clickHandler = getPartClickHandler(part);
        target[action + 'EventListener']('click', clickHandler);
      });
    };
  };

  window.changeColors = {
    getSorterWizards: getSortedWizards,
    addClickListeners: manageClickListeners('add'),
    removeClickListeners: manageClickListeners('remove'),
  };
}());
