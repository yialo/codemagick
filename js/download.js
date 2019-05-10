'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';
  window.download = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;

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

    xhr.open('GET', URL);
    xhr.send();
  };
}());
