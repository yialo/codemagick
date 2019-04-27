'use strict';

(function () {
  var wizard = window.domElements.setup.querySelector('.setup-player');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var wizardFireball = wizard.querySelector('.setup-fireball-wrap');

  var wizardCoatClickHandler = function () {
    var newCoatColor = window.wizardData.getRandomCoatColor();
    var wizardCoatInput = wizard.querySelector('input[name=\'coat-color\']');
    wizardCoat.style.fill = newCoatColor;
    wizardCoatInput.value = newCoatColor;
  };

  var wizardEyesClickHandler = function () {
    var newEyesColor = window.wizardData.getRandomEyesColor();
    var wizardEyesInput = wizard.querySelector('input[name=\'eyes-color\']');
    wizardEyes.style.fill = newEyesColor;
    wizardEyesInput.value = newEyesColor;
  };

  var wizardFireballClickHandler = function () {
    var newFireballColor = window.wizardData.getRandomFireballColor();
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
