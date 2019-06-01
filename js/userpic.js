'use strict';

(function () {
  var PERMITTED_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var userpic = window.domElements.setup.querySelector('.upload');
  var icon = userpic.querySelector('.setup-user-pic');
  var fileChooser = userpic.querySelector('input[type="file"]');

  var fileChooserChangeHandler = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var isPermittedType = PERMITTED_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (isPermittedType) {
      var reader = new FileReader();

      var readerLoadHandler = function () {
        icon.src = reader.result;
      };
      reader.addEventListener('load', readerLoadHandler);
      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', fileChooserChangeHandler);
}());
