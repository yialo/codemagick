'use strict';

(function () {
  var setup = window.domElements.setup;
  var createSimilarWizard = function (wizardData) {
    var wizardElement = document.querySelector('#similar-wizard-template')
      .content.querySelector('.setup-similar-item')
      .cloneNode(true);
    var nameElement = wizardElement.querySelector('.setup-similar-label');
    var coatElement = wizardElement.querySelector('.wizard-coat');
    var eyesElement = wizardElement.querySelector('.wizard-eyes');

    nameElement.textContent = wizardData.name;
    coatElement.style.fill = wizardData.colorCoat;
    eyesElement.style.fill = wizardData.colorEyes;

    return wizardElement;
  };

  var addSimilarWizards = function (wizardsData) {
    var AMOUNT_OF_WIZARDS = 4;
    var container = setup.querySelector('.setup-similar');
    var wizardsList = container.querySelector('.setup-similar-list');
    var fragmentForWizards = document.createDocumentFragment();

    for (var i = 0; i < AMOUNT_OF_WIZARDS; i += 1) {
      var newWizard = createSimilarWizard(wizardsData[i]);
      fragmentForWizards.appendChild(newWizard);
    }

    wizardsList.appendChild(fragmentForWizards);
    container.classList.remove('hidden');
  };

  window.similarWizards = {
    showErrorMessage: function (errMessage) {
      var node = document.createElement('span');
      node.style.position = 'absolute';
      node.style.zIndex = '1';
      node.style.top = '10px';
      node.style.left = '50%';
      node.style.transform = 'translateX(-50%)';
      node.style.color = 'red';
      node.textContent = errMessage;
      setup.insertBefore(node, setup.firstChild);
    },
  };

  window.backend.download(
      addSimilarWizards,
      window.similarWizards.showErrorMessage
  );
}());
