'use strict';

/*
Revealing Setup section
=======================
*/

var setupBlock = document.querySelector('.setup');
var userpic = setupBlock.querySelector('.upload');

/*
Setup block drag'n'drop
*/

var userpicClickPreventDefault = function (clickEvt) {
  clickEvt.preventDefault();
  userpic.removeEventListener('click', userpicClickPreventDefault);
};

var userpicMousedownHandler = function (evt) {
  evt.preventDefault();

  var startCoords = {x: evt.clientX, y: evt.clientY};

  var dragged = false;

  var documentMousemoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: moveEvt.clientX - startCoords.x,
      y: moveEvt.clientY - startCoords.y,
    };

    startCoords = {x: moveEvt.clientX, y: moveEvt.clientY};

    setupBlock.style.top = (setupBlock.offsetTop + shift.y) + 'px';
    setupBlock.style.left = (setupBlock.offsetLeft + shift.x) + 'px';
  };

  var documentMouseupHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', documentMousemoveHandler);
    document.removeEventListener('mouseup', documentMouseupHandler);

    if (dragged) {
      userpic.addEventListener('click', userpicClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', documentMousemoveHandler);
  document.addEventListener('mouseup', documentMouseupHandler);
};

userpic.addEventListener('mousedown', userpicMousedownHandler);

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
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var KEYWORDED_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var HEX_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

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

var generateCoatColor = function () {
  return selectRandomArrayElement(RGB_COLORS);
};
var generateEyesColor = function () {
  return selectRandomArrayElement(KEYWORDED_COLORS);
};

var generateHeroData = function () {
  var generatedName = generateRandomName(FIRSTNAMES, LASTNAMES);
  var heroData = {};
  heroData.name = generatedName;
  heroData.coatColor = generateCoatColor();
  heroData.eyesColor = generateEyesColor();

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

var fragmentForSimilarWizards = document.createDocumentFragment();

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

  fragmentForSimilarWizards.appendChild(newWizard);
}

similarWizardsList.appendChild(fragmentForSimilarWizards);
similarWizardsContainer.classList.remove('hidden');

/* Events */

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var setupOpener = document.querySelector('.setup-open');
var setupOpenerIcon = setupOpener.querySelector('.setup-open-icon');
var setupCloser = setupBlock.querySelector('.setup-close');
var usernameInput = setupBlock.querySelector('.setup-user-name');
var ourWizard = setupBlock.querySelector('.setup-player');
var ourWizardCoat = ourWizard.querySelector('.wizard-coat');
var ourWizardCoatInput = ourWizard.querySelector('[name=\'coat-color\']');
var ourWizardEyes = ourWizard.querySelector('.wizard-eyes');
var ourWizardEyesInput = ourWizard.querySelector('[name=\'eyes-color\']');
var ourWizardFireball = ourWizard.querySelector('.setup-fireball-wrap');
var ourWizardFireballInput = ourWizard
  .querySelector('[name=\'fireball-color\']');

var popupEscPressHandler = function (evt) {
  if (
    evt.keyCode === ESC_KEYCODE && document.activeElement !== usernameInput
  ) {
    evt.preventDefault();
    setupBlock.classList.add('hidden');
  }
};

/* Sets random colors */

/*
  var ourWizardCoatClickHandler = function () {
  var newCoatColor = generateCoatColor();
  ourWizardCoat.style.fill = newCoatColor;
  ourWizardCoatInput.value = newCoatColor;
};

var ourWizardEyesClickHandler = function () {
  var newEyesColor = generateEyesColor();
  ourWizardEyes.style.fill = newEyesColor;
  ourWizardEyesInput.value = newEyesColor;
};

var ourWizardFireballClickHandler = function () {
  var newFireballColor = selectRandomArrayElement(HEX_COLORS);
  ourWizardFireball.style.backgroundColor = newFireballColor;
  ourWizardFireballInput.value = newFireballColor;
};
*/

/* Sets colors in ascending order */

var coatColorCounter = 2;

var ourWizardCoatClickHandler = function () {
  var newCoatColor = RGB_COLORS[coatColorCounter - 1];
  ourWizardCoat.style.fill = newCoatColor;
  ourWizardCoatInput.value = newCoatColor;
  if (coatColorCounter === RGB_COLORS.length) {
    coatColorCounter = 1;
  } else {
    coatColorCounter += 1;
  }
};

var eyesColorCounter = 2;

var ourWizardEyesClickHandler = function () {
  var newEyesColor = KEYWORDED_COLORS[eyesColorCounter - 1];
  ourWizardEyes.style.fill = newEyesColor;
  ourWizardEyesInput.value = newEyesColor;
  if (eyesColorCounter === KEYWORDED_COLORS.length) {
    eyesColorCounter = 1;
  } else {
    eyesColorCounter += 1;
  }
};

var fireballColorCounter = 2;

var ourWizardFireballClickHandler = function () {
  var newFireballColor = HEX_COLORS[fireballColorCounter - 1];
  ourWizardFireball.style.backgroundColor = newFireballColor;
  ourWizardFireballInput.value = newFireballColor;
  if (fireballColorCounter === HEX_COLORS.length) {
    fireballColorCounter = 1;
  } else {
    fireballColorCounter += 1;
  }
};

var openPopup = function () {
  setupBlock.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
  ourWizardCoat.addEventListener('click', ourWizardCoatClickHandler);
  ourWizardEyes.addEventListener('click', ourWizardEyesClickHandler);
  ourWizardFireball.addEventListener('click', ourWizardFireballClickHandler);
};
var closePopup = function () {
  setupBlock.classList.add('hidden');
  setupBlock.removeAttribute('style');
  document.removeEventListener('keydown', popupEscPressHandler);
  ourWizardCoat.removeEventListener('click', ourWizardCoatClickHandler);
  ourWizardEyes.removeEventListener('click', ourWizardEyesClickHandler);
  ourWizardFireball.removeEventListener('click', ourWizardFireballClickHandler);
};

setupOpener.addEventListener('click', function () {
  openPopup();
});

setupOpenerIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupCloser.addEventListener('click', function () {
  closePopup();
});

setupCloser.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
