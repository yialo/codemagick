'use strict';

(function () {
  window.utilities = {
    getRandomArrayElement: function (targetArray) {
      var randomIndex = Math.floor(Math.random() * targetArray.length);
      var randomArrayElement = targetArray[randomIndex];
      return randomArrayElement;
    },
    joinTwoWordsInRandomOrder: function (firstWord, secondWord) {
      var binaryTester = Math.round(Math.random());
      var newWord = '';

      if (binaryTester === 0) {
        newWord = firstWord.concat(' ', secondWord);
      } else {
        newWord = secondWord.concat(' ', firstWord);
      }

      return newWord;
    },
  };
}());
