'use strict';

(function () {
  var renderItem = function (obj) {
    var el = document.createElement('p');
    el.textContent = obj.name;
    document.body.appendChild(el);
  };

  var makeRequest = function (callbackName) {
    var scriptEl = document.createElement('script');
    scriptEl.src = window.utilities.URL + '/data?callback=' + callbackName;
    document.body.appendChild(scriptEl);
  };

  window.renderWizardList = function (data) {
    data.forEach(function (item) {
      renderItem(item);
    });
  };

  makeRequest('renderWizardList');
}());
