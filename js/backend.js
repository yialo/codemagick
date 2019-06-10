'use strict';

(function () {
  window.backend = {isDownloaded: false};
  var Status = {SUCCESS: 200, NOT_FOUND: 404};
  var TIMEOUT = 5000;
  var URL = 'https://js.dump.academy/code-and-magick';

  var getXhr = function (direction, onSuccessCallback, onErrorCallback) {
    var messagePartialMap = {'get': 'получить', 'send': 'отправить'};
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status.SUCCESS:
          onSuccessCallback(xhr.response);
          break;
        case Status.NOT_FOUND:
          onErrorCallback('Неверный адрес');
          break;
        default:
          onErrorCallback('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onErrorCallback('Ошибка сетевого соединения');
    });
    xhr.addEventListener('timeout', function () {
      onErrorCallback('Данные не удалось ' + messagePartialMap[direction] + ' в течение ' + xhr.timeout / 1000 + ' секунд');
    });
    return xhr;
  };

  window.backend.upload = function (data, successHandler, errorHandler) {
    var xhr = getXhr('send', successHandler, errorHandler);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend.download = function (successHandler, errorHandler) {
    var successHandlerWrapper = function (response) {
      window.backend.isDownloaded = true;
      successHandler(response);
    };
    var xhr = getXhr('get', successHandlerWrapper, errorHandler);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };
}());
