'use strict';

(function () {
  var TIMEOUT = 5000;

  /*
    TODO: определить xhr через расширение прототипа XMLHttpRequest
  */

  window.backend = {
    upload: function (data, successHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = TIMEOUT;

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          successHandler(xhr.response);
        } else {
          errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler('Ошибка сетевого соединения');
      });

      xhr.addEventListener('timeout', function () {
        errorHandler('Данные не удалось получить в течение ' + xhr.timeout / 1000 + ' секунд');
      });

      xhr.open('POST', window.utilities.URL);
      xhr.send(data);
    },
    download: function (successHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = TIMEOUT;

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            successHandler(xhr.response);
            break;
          case 404:
            errorHandler('Неверный адрес');
            break;
          default:
            errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler('Ошибка сетевого соединения');
      });

      xhr.addEventListener('timeout', function () {
        errorHandler('Данные не удалось получить в течение ' + xhr.timeout / 1000 + ' секунд');
      });

      xhr.open('GET', window.utilities.URL + '/data');
      xhr.send();
    },
  };
}());
