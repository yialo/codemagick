'use strict';

(function () {
  window.similarWizards = {};

  var AMOUNT_OF_SLOTS = 4;
  var updateColors = function (wizardElement, wizardData) {
    var nameElement = wizardElement.querySelector('.setup-similar-label');
    var coatElement = wizardElement.querySelector('.wizard-coat');
    var eyesElement = wizardElement.querySelector('.wizard-eyes');
    nameElement.textContent = wizardData.name;
    coatElement.style.fill = wizardData.colorCoat;
    eyesElement.style.fill = wizardData.colorEyes;
  };

  var wizardElements = [];
  var updateSimilarWizards = function (wizardsData) {
    for (var i = 0; i < AMOUNT_OF_SLOTS; i += 1) {
      updateColors(wizardElements[i], wizardsData[i]);
    }
  };

  var createWizardElement = function () {
    var wizardElement = document.querySelector('#similar-wizard-template')
      .content.querySelector('.setup-similar-item')
      .cloneNode(true);
    return wizardElement;
  };

  var setup = window.domElements.setup;
  var container = setup.querySelector('.setup-similar');
  var wizardsList = container.querySelector('.setup-similar-list');

  var addSimilarWizards = function (wizardsData) {
    window.similarWizards.data = wizardsData;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < AMOUNT_OF_SLOTS; i += 1) {
      var newWizardElement = createWizardElement();
      wizardElements.push(newWizardElement);
      fragment.appendChild(newWizardElement);
    }
    wizardsList.appendChild(fragment);
    updateSimilarWizards(window.changeColors.getSortedWizards());
    container.classList.remove('hidden');
  };

  var showErrorMessage = function (errMessage) {
    var node = document.createElement('span');
    node.style.position = 'absolute';
    node.style.zIndex = '1';
    node.style.top = '10px';
    node.style.left = '50%';
    node.style.transform = 'translateX(-50%)';
    node.style.color = 'red';
    node.textContent = errMessage;
    setup.insertBefore(node, setup.firstChild);
  };

  window.backend.download(addSimilarWizards, showErrorMessage);

  window.similarWizards.update = updateSimilarWizards;
  window.similarWizards.showErrorMessage = showErrorMessage;
}());
