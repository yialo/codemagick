'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';

  window.upload = function (data, successHandler, errorHandler) {
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

  var formSubmitHandler = function (evt) {
    window.upload(new FormData(form), function () {
      window.setupShow.closeSetup();
    });
    evt.preventDefault();
  };

  window.upload = {
    addFormSubmitListener: function () {
      form.addEventListener('submit', formSubmitHandler);
    },
    removeFormSubmitListener: function () {
      form.removeEventListener('submit', formSubmitHandler);
    },
  };
}());
