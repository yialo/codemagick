'use strict';

(function () {
  var getRandomArrayElement = function (targetArray) {
    return window.utilities.getRandomArrayElement(targetArray);
  };

  window.wizardData = {
    getRandomName: function () {
      var FIRSTNAMES = [
        'Иван',
        'Хуан Себастьян',
        'Мария',
        'Кристоф',
        'Виктор',
        'Юлия',
        'Люпита',
        'Вашингтон',
      ];
      var LASTNAMES = [
        'да Марья',
        'Верон',
        'Мирабелла',
        'Вальц',
        'Онопко',
        'Топольницкая',
        'Нионго',
        'Ирвинг',
      ];

      var randomFirstname = getRandomArrayElement(FIRSTNAMES);
      var randomLastname = getRandomArrayElement(LASTNAMES);
      var randomName = window.utilities
        .joinTwoWordsInRandomOrder(randomFirstname, randomLastname);

      return randomName;
    },

    getRandomCoatColor: function () {
      var COAT_COLORS = [
        'rgb(101, 137, 164)',
        'rgb(241, 43, 107)',
        'rgb(146, 100, 161)',
        'rgb(56, 159, 117)',
        'rgb(215, 210, 55)',
        'rgb(0, 0, 0)',
      ];
      return getRandomArrayElement(COAT_COLORS);
    },

    getRandomEyesColor: function () {
      var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
      return getRandomArrayElement(EYES_COLORS);
    },

    getRandomFireballColor: function () {
      var FIREBALL_COLORS = [
        '#ee4830',
        '#30a8ee',
        '#5ce6c0',
        '#e848d5',
        '#e6e848',
      ];
      return getRandomArrayElement(FIREBALL_COLORS);
    },
  };
}());
