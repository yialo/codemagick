'use strict';

(function () {
  var AMOUNT_OF_SLOTS = 4;
  var setup = window.domElements.setup;
  var container = setup.querySelector('.setup-similar');

  /*
    TODO: оптимизировать рендеринг. Отрисовка 4 блоков волшебников
    должна производиться один раз, далее - только изменение цветов.
  */

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
    window.backend.initialWizards = wizardsData;
    window.backend.currentWizards = wizardsData.slice();
    window.backend.currentWizards.forEach(function (it) {
      it.Rating = {};
    });
    window.similarWizardsRender.renewSimilarWizards(wizardsData);
    container.classList.remove('hidden');
  };

  window.similarWizardsRender = {
    renewSimilarWizards: function (wizardsData) {
      var wizardsList = container.querySelector('.setup-similar-list');
      var fragment = document.createDocumentFragment();

      while (wizardsList.firstChild) {
        wizardsList.removeChild(wizardsList.firstChild);
      }

      for (var i = 0; i < AMOUNT_OF_SLOTS; i += 1) {
        var newWizard = createSimilarWizard(wizardsData[i]);
        fragment.appendChild(newWizard);
      }
      wizardsList.appendChild(fragment);
    },
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
      window.similarWizardsRender.showErrorMessage
  );
}());
