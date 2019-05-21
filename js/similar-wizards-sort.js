'use strict';

(function () {
  var setWizardsRating = function (wizards, currentWizard) {
    wizards.forEach(function (wizard) {
      var rating = 0;
      if (wizard.colorCoat === currentWizard.colorCoat) {
        rating += 2;
      }
      if (wizard.colorEyes === currentWizard.colorEyes) {
        rating += 1;
      }
      wizard.rating = rating;
    });
  };
}());
