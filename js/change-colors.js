'use strict';

(function () {
  var getRandomArrayElement = function (targetArray) {
    return window.utilities.getRandomArrayElement(targetArray);
  };

  var getRandomCoatColor = function () {
    var COAT_COLORS = [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)',
    ];
    return getRandomArrayElement(COAT_COLORS);
  };

  var getRandomEyesColor = function () {
    var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
    return getRandomArrayElement(EYES_COLORS);
  };

  var getRandomFireballColor = function () {
    var FIREBALL_COLORS = [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848',
    ];
    return getRandomArrayElement(FIREBALL_COLORS);
  };

  var wizard = window.domElements.setup.querySelector('.setup-player');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var wizardFireball = wizard.querySelector('.setup-fireball-wrap');

  var wizardCoatClickHandler = function () {
    var newCoatColor = getRandomCoatColor();
    var wizardCoatInput = wizard.querySelector('input[name=\'coat-color\']');
    wizardCoat.style.fill = newCoatColor;
    wizardCoatInput.value = newCoatColor;
  };

  var wizardEyesClickHandler = function () {
    var newEyesColor = getRandomEyesColor();
    var wizardEyesInput = wizard.querySelector('input[name=\'eyes-color\']');
    wizardEyes.style.fill = newEyesColor;
    wizardEyesInput.value = newEyesColor;
  };

  var wizardFireballClickHandler = function () {
    var newFireballColor = getRandomFireballColor();
    var wizardFireballInput = wizardFireball
      .querySelector('input[name=\'fireball-color\']');
    wizardFireball.style.backgroundColor = newFireballColor;
    wizardFireballInput.value = newFireballColor;
  };

  window.changeColors = {
    addClickListeners: function () {
      wizardCoat.addEventListener('click', wizardCoatClickHandler);
      wizardEyes.addEventListener('click', wizardEyesClickHandler);
      wizardFireball.addEventListener('click', wizardFireballClickHandler);
    },
    removeClickListeners: function () {
      wizardCoat.removeEventListener('click', wizardCoatClickHandler);
      wizardEyes.removeEventListener('click', wizardEyesClickHandler);
      wizardFireball.removeEventListener('click', wizardFireballClickHandler);
    },
  };
}());
