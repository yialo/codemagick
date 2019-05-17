'use strict';

(function () {
  window.utilities = {
    URL: 'https://js.dump.academy/code-and-magick',
    getRandomArrayElement: function (targetArray) {
      var randomIndex = Math.floor(Math.random() * targetArray.length);
      return targetArray[randomIndex];
    },
    joinTwoWordsInRandomOrder: function (firstWord, secondWord) {
      var binaryTester = Math.round(Math.random());

      if (binaryTester === 0) {
        return firstWord.concat(' ', secondWord);
      }

      return secondWord.concat(' ', firstWord);
    },
  };
}());
