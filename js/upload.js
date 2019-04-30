'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';

  var upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          successHandler(xhr.response);
          break;
        case 404:
          errorHandler('Адрес не существует');
          break;
        default:
          errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Ошибка сетевого соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Данные не удалось отправить в течение ' + xhr.timeout / 1000 + ' секунд');
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
