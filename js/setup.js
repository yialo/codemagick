'use strict';

/*
Revealing Setup section
=======================
*/

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

/*
Initial data
============
*/

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

var RGB_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 100, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var KEYWORDED_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

/*
Generating random heroes data
=============================
*/

var selectRandomArrayElement = function (targetArray) {
  var randomScaledNumber = Math.floor(Math.random() * targetArray.length);
  var randomArrayElement = targetArray[randomScaledNumber];
  return randomArrayElement;
};

var joinTwoWordsInRandomOrder = function (firstWord, secondWord) {
  var binaryTester = Math.round(Math.random());
  var newWord = '';

  if (binaryTester === 0) {
    newWord = firstWord + ' ' + secondWord;
  } else {
    newWord = secondWord + ' ' + firstWord;
  }

  return newWord;
};

var generateRandomName = function (firstnamesArray, lastnamesArray) {
  var randomFirstname = selectRandomArrayElement(firstnamesArray);
  var randomLastname = selectRandomArrayElement(lastnamesArray);
  var randomName = joinTwoWordsInRandomOrder(randomFirstname, randomLastname);
  return randomName;
};

var generateHeroData = function () {
  var generatedName = generateRandomName(FIRSTNAMES, LASTNAMES);
  var generatedCoatColor = selectRandomArrayElement(RGB_COLORS);
  var generatedEyesColor = selectRandomArrayElement(KEYWORDED_COLORS);

  var heroData = {};
  heroData.name = generatedName;
  heroData.coatColor = generatedCoatColor;
  heroData.eyesColor = generatedEyesColor;

  return heroData;
};

var heroesData = [];

for (var heroCounter = 0; heroCounter < 4; heroCounter += 1) {
  heroesData.push(generateHeroData());
}

/*
Creating DOM element for similar hero from template
*/

var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var createSimilarWizard = function (
    wizardName,
    wizardCoatColor,
    wizardEyesColor
) {
  var similarWizardElement = similarWizardTemplate.cloneNode(true);
  var wizardNameElement = similarWizardElement
    .querySelector('.setup-similar-label');
  var wizardCoatElement = similarWizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = similarWizardElement.querySelector('.wizard-eyes');

  wizardNameElement.textContent = wizardName;
  wizardCoatElement.style.fill = wizardCoatColor;
  wizardEyesElement.style.fill = wizardEyesColor;

  return similarWizardElement;
};

/*
Adding new DOM elements to page
===============================
*/

var similarWizardsContainer = document.querySelector('.setup-similar');
var similarWizardsList = similarWizardsContainer
  .querySelector('.setup-similar-list');

for (
  var wizardCounter = 0;
  wizardCounter < heroesData.length;
  wizardCounter += 1
) {
  var newWizard = createSimilarWizard(
      heroesData[wizardCounter].name,
      heroesData[wizardCounter].coatColor,
      heroesData[wizardCounter].eyesColor
  );

  similarWizardsList.appendChild(newWizard);
}

similarWizardsContainer.classList.remove('hidden');
