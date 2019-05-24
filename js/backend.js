'use strict';

(function () {
  var Status = {SUCCESS: 200, NOT_FOUND: 404};
  var TIMEOUT = 5000;
  var URL = 'https://js.dump.academy/code-and-magick';
  window.backend = {isDownloaded: false};

  /*
    TODO: определить xhr через расширение прототипа XMLHttpRequest
  */

  window.backend.upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === Status.SUCCESS) {
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

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend.download = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status.SUCCESS:
          window.backend.isDownloaded = true;
          successHandler(xhr.response);
          break;
        case Status.NOT_FOUND:
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

    xhr.open('GET', URL + '/data');
    xhr.send();
  };
}());
