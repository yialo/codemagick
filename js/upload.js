'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';

  var upload = function (data, successHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      successHandler(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var setup = window.domElements.setup;
  var form = setup.querySelector('.setup-wizard-form');
  var usernameField = form.querySelector('.setup-user-name');

  var usernameFieldInvalidHandler = function (evt) {
    var self = evt.target;
    if (self.validity.tooShort) {
      self.setCustomValidity('Имя должно состоять как минимум из двух символов');
    } else if (self.validity.tooLong) {
      self.setCustomValidity('Имя должно состоять не более чем из 25 символов');
    } else if (self.validity.valueMissing) {
      self.setCustomValidity('Это обязательное поле');
    } else {
      self.setCustomValidity('');
    }
  };
  var usernameFieldInputHandler = function (evt) {
    var self = evt.target;
    if (self.value.length < 2) {
      self.setCustomValidity('Имя должно состоять как минимум из двух символов');
    } else {
      self.setCustomValidity('');
    }

    self.reportValidity();
  };

  var formSubmitHandler = function (evt) {
    upload(new FormData(form), function () {
      window.setupShow.closeSetup();
    });
    evt.preventDefault();
  };

  window.upload = {
    addFormEventListeners: function () {
      form.addEventListener('submit', formSubmitHandler);
      usernameField.addEventListener('invalid', usernameFieldInvalidHandler);
      usernameField.addEventListener('input', usernameFieldInputHandler);
    },
    removeFormEventListeners: function () {
      form.removeEventListener('submit', formSubmitHandler);
      usernameField
        .removeEventListener('invalid', usernameFieldInvalidHandler);
      usernameField.removeEventListener('input', usernameFieldInputHandler);
    },
  };
}());