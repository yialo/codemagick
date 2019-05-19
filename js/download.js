'use strict';

(function () {
  window.download = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;

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
  };
}());
