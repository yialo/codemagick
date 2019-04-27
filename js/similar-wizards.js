'use strict';

(function () {
  var createSimilarWizard = function () {
    var wizardElement = document.querySelector('#similar-wizard-template')
      .content.querySelector('.setup-similar-item')
      .cloneNode(true);
    var nameElement = wizardElement.querySelector('.setup-similar-label');
    var coatElement = wizardElement.querySelector('.wizard-coat');
    var eyesElement = wizardElement.querySelector('.wizard-eyes');

    nameElement.textContent = window.wizardData.getRandomName();
    coatElement.style.fill = window.wizardData.getRandomCoatColor();
    eyesElement.style.fill = window.wizardData.getRandomEyesColor();

    return wizardElement;
  };

  var container = window.domElements
    .setup.querySelector('.setup-similar');
  var wizardsList = container.querySelector('.setup-similar-list');
  var fragmentForWizards = document.createDocumentFragment();

  for (var i = 0; i < 4; i += 1) {
    var newWizard = createSimilarWizard();
    fragmentForWizards.appendChild(newWizard);
  }

  wizardsList.appendChild(fragmentForWizards);
  container.classList.remove('hidden');
}());
