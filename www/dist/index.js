/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function () {\n  var namespace = \"image_color_app\";\n  var menuItems = [];\n  var maxFileGallery = 20;\n  var images = JSON.parse(window.localStorage.getItem(namespace)) || [];\n  var lang = \"fr\";\n  var acceptableExtensions = [];\n  var menu = window.document.querySelector(\"#menu\");\n  var gallery = window.document.querySelector(\"#gallery\");\n  var previewColor = window.document.querySelector(\"#previewColor\");\n  var colorPanel = window.document.querySelector(\"#colorPanel\");\n  var previewImg = window.document.querySelector(\"#previewImg\");\n  var footerB = window.document.querySelector(\"#footerB\");\n  var imagePreview = window.document.querySelector(\"#imagePreview\");\n  var file = window.document.querySelector(\"#file\");\n  var espaceBoutonUp = window.document.querySelector(\"#espaceBoutonUp\");\n  /**\r\n   * \r\n   * @param {String} tagName \r\n   * @param {String} txt \r\n   * @param {HTMLElement} parent\r\n   * @returns {HTMLElement} \r\n   */\n\n  function textInElement(tagName, text, parent) {\n    if (!tagName) {\n      throw new Error(\"textInElement requires a tag name\");\n    }\n\n    var element = window.document.createElement(tagName);\n\n    if (\"undefined\" !== typeof text) {\n      element.appendChild(window.document.createTextNode(text));\n    }\n\n    if (parent instanceof HTMLElement) {\n      parent.appendChild(element);\n    }\n\n    return element;\n  }\n\n  function displayUpload() {\n    if (images.length < maxFileGallery) {\n      var boutonUpload = textInElement(\"button\", \"Télécharger une image\", espaceBoutonUp);\n      boutonUpload.setAttribute(\"class\", \"btn-danger m-4\");\n      var form = textInElement(\"form\", \" \", espaceBoutonUp);\n      var inputFormUrl = textInElement(\"input\", \" \", form);\n      var inputTypeSubmit = textInElement(\"input\", \" \", form);\n      form.setAttribute(\"action\", \"\");\n      form.setAttribute(\"method\", \"get\");\n      form.setAttribute(\"class\", \"form-group mb-5\");\n      inputFormUrl.setAttribute(\"type\", \"url\");\n      inputFormUrl.setAttribute(\"required\", \"required\");\n      inputTypeSubmit.setAttribute(\"type\", \"submit\");\n      inputTypeSubmit.setAttribute(\"class\", \"btn-danger\");\n      inputTypeSubmit.setAttribute(\"value\", \"Envoyer\");\n      form.addEventListener(\"submit\", function (event) {\n        onSubmitForm(event, this);\n      });\n      boutonUpload.addEventListener(\"click\", function () {\n        file.click();\n      });\n      file.addEventListener(\"change\", function (event) {\n        onChangeFile(event, this.files[0]);\n      });\n    }\n  }\n\n  function onSubmitForm(event, form) {\n    event.preventDefault();\n    var xhr = new XMLHttpRequest();\n    xhr.open(\"GET\", \"https://api.imagga.com/v2/colors?image_url=\" + form.elements[0].value);\n\n    xhr.onload = function (event) {\n      var colorObject = JSON.parse(this.responseText);\n\n      if (200 === this.status) {\n        pushImage(form.elements[0].value, form.elements[0].value, null, null, colorObject.result.colors); // console.log(colorObject);\n\n        displayImage();\n        gallery.lastChild.lastChild.onclick();\n        window.localStorage.setItem(namespace, JSON.stringify(images));\n        return;\n      }\n\n      alert(\"Oooups! Une erreur est survenue\");\n    };\n\n    xhr.setRequestHeader(\"Authorization\", \"Basic YWNjX2VkNjMyZTg3MDlkYjIwNDowOTQ5OThhMzA5NDFhMDM0NzE3YzQyMDhkNWFkMGNmNg==\");\n    xhr.send();\n  }\n  /**\r\n   * \r\n   * @param {Event} event\r\n   * @param  {File} uploadedFile \r\n   */\n\n\n  function onChangeFile(event) {\n    //avoir le client\n    var xhr = new XMLHttpRequest(); //ouvrir une connexion\n\n    xhr.open(\"POST\", \"https://api.imagga.com/v2/colors\"); // enregistrer des event handlers\n\n    xhr.onload = function (event) {\n      var colorObject = JSON.parse(xhr.responseText);\n      var reader = new FileReader();\n      reader.readAsDataURL(file.files[0]);\n\n      reader.onerror = function (event) {};\n\n      reader.onload = function (event) {\n        if (200 === xhr.status) {\n          pushImage(reader.result, reader.result, null, null, colorObject.result.colors); // console.log(colorObject.result.colors);\n\n          displayImage();\n          gallery.lastChild.lastChild.onclick();\n          window.localStorage.setItem(namespace, JSON.stringify(images));\n          return;\n        }\n\n        alert(\"Oooups! Une erreur est survenue\");\n      };\n    }; //customize headers\n\n\n    xhr.setRequestHeader(\"Authorization\", \"Basic YWNjX2VkNjMyZTg3MDlkYjIwNDowOTQ5OThhMzA5NDFhMDM0NzE3YzQyMDhkNWFkMGNmNg==\"); //New formData\n\n    var body = new FormData();\n    body.append(\"image\", file.files[0]); //envoyer la requête\n\n    xhr.send(body);\n  }\n\n  function displayImage() {\n    gallery.innerHTML = \"\";\n\n    if (images.length >= 1 && images.length <= maxFileGallery) {\n      for (var imgDetails in images) {\n        if (null === images[imgDetails].extension || isExtensionOK(images[imgDetails])) {\n          var divImg = textInElement(\"div\", \"\", gallery);\n          var newImg = textInElement(\"img\", \"\", divImg);\n          divImg.setAttribute(\"class\", \"col-10 col-lg-5\");\n          divImg.style = \"height: 15em; overflow: hidden; margin-top: 1em; margin-bottom: 1em;\";\n          newImg.setAttribute(\"alt\", images[imgDetails].nom);\n          newImg.setAttribute(\"src\", images[imgDetails].url);\n          newImg.setAttribute(\"class\", \"img-fluid\");\n          registerEvent(newImg, imgDetails);\n        }\n      }\n    } else if (images.length === 0) {\n      textInElement(\"b\", \"GALERIE VIDE\", gallery);\n    } else {\n      textInElement(\"b\", \"GALERIE PLEINE\", gallery);\n    }\n  }\n\n  function registerEvent(newImg, key) {\n    newImg.onclick = function (event) {\n      clickImage(event, key);\n    };\n  }\n\n  function clickImage(event, key) {\n    espaceBoutonDel.innerHTML = \"\";\n    colorPanel.innerHTML = \"\";\n    var delButton = textInElement(\"button\", \"Supprimer l'image\", espaceBoutonDel);\n    delButton.style.marginTop = \"2em\";\n    delButton.setAttribute(\"class\", \"btn-danger\");\n    imagePreview.setAttribute(\"src\", images[key].url);\n    imagePreview.setAttribute(\"class\", \"img-fluid\");\n    delButton.addEventListener(\"click\", function (event) {\n      Delete(event, imagePreview);\n    });\n    displayColors(images[key].colors.background_colors);\n    displayColors(images[key].colors.forground_colors);\n    displayColors(images[key].colors.image_colors);\n  }\n\n  function displayColors(imgColors) {\n    for (var keyColors in imgColors) {\n      console.log(imgColors);\n      var divColors = textInElement(\"div\", \" \", colorPanel);\n      divColors.style.backgroundColor = imgColors[keyColors].closest_palette_color_html_code;\n      divColors.style.height = \"5em\";\n      divColors.style.color = \"#D6D6D6\";\n      divColors.setAttribute(\"class\", \"justify-content-center mt-3\");\n      textInElement(\"H3\", imgColors[keyColors].closest_palette_color, divColors);\n      textInElement(\"h3\", imgColors[keyColors].closest_palette_color_html_code, divColors);\n    }\n  }\n\n  function Delete(event, imagePreview) {\n    colorPanel.innerHTML = \"\";\n    var imageFound = images.find(function (urlImage) {\n      return urlImage.url === imagePreview.getAttribute(\"src\");\n    });\n    var keyImageFound = images.indexOf(imageFound);\n    images.splice(keyImageFound, 1);\n    window.localStorage.setItem(namespace, JSON.stringify(images));\n    displayImage();\n    imagePreview.setAttribute(\"src\", \"/assets/imgPlaceholder.png\");\n    espaceBoutonDel.innerHTML = \"\";\n  }\n\n  function displayExtension() {\n    textInElement(\"h6\", \"Extensions acceptées :\", espaceBoutonUp);\n\n    for (var key in acceptableExtensions) {\n      var ext1 = textInElement(\"ul\", \"\", espaceBoutonUp);\n      textInElement(\"li\", acceptableExtensions[key].nom, ext1);\n    }\n  }\n\n  function displayTitle() {\n    var divPrev = textInElement(\"div\", \"\", header);\n    divPrev.style.minHeight = \"3em\";\n    var bienvenueMess = window.document.createElement(\"div\");\n    header.appendChild(bienvenueMess);\n    textInElement(\"h1\", \"\", bienvenueMess);\n    bienvenueMess.setAttribute(\"class\", \"col-10 col-lg-10 text-center text-light ml-auto mr-auto mt-12 pb-1\");\n    bienvenueMess.style.marginTop = \"2em\";\n\n    if (\"fr\" === lang) {\n      var bienvenueMessFr = textInElement(\"h1\", \"Obtenez les couleurs de vos images\", bienvenueMess);\n      bienvenueMessFr.style.fontWeight = \"bold\";\n      bienvenueMessFr.style.textTransform = \"uppercase\";\n    } else if (\"en\" === lang) {\n      var bienvenueMessEn = textInElement(\"h1\", \"Get the colors of your pictures\", bienvenueMess);\n    } else if (\"de\" === lang) {\n      var bienvenueMessDe = textInElement(\"h1\", \"Holen Sie sich die Farben Ihres Bildes\", bienvenueMess);\n    } else if (!lang) {\n      throw new Error(\"No language selected\");\n    }\n  }\n\n  function displayItem() {\n    for (var key in menuItems) {\n      var lienMenuLI = window.document.createElement(\"li\");\n      lienMenuLI.setAttribute(\"class\", \"nav-item\");\n      var lienMenu = window.document.createElement(\"a\");\n      lienMenu.setAttribute(\"class\", \"nav-link\");\n      var nomsMenu = window.document.createTextNode(menuItems[key].nom);\n      lienMenu.setAttribute(\"href\", menuItems[key].url);\n      menu.appendChild(lienMenuLI);\n      lienMenuLI.appendChild(lienMenu);\n      lienMenu.appendChild(nomsMenu);\n      lienMenuLI.setAttribute(\"class\", \"text-center\");\n    }\n  } //LES 2 FENETRES COLORS ET PREVIEW setPreview\n\n\n  function setImageColorPreview() {\n    previewColor.setAttribute(\"style\", \"margin-top: 2em;\");\n    colorPanel.setAttribute(\"class\", \"col-12 col-lg-4  bg-dark\");\n    previewImg.setAttribute(\"class\", \"col-12 col-lg-8 mx-auto bg-light\");\n    var divTitreColors = textInElement(\"div\", \"\", colorPanel);\n    textInElement(\"p\", \"Panel de couleurs vide\", divTitreColors);\n    divTitreColors.style.minHeight = \"2em\";\n  }\n  /**\r\n   * \r\n   * @param {String} url \r\n   * @param {String} nom \r\n   * @param {Number} taille \r\n   * @param {String} extension \r\n   */\n\n\n  function pushImage(url, nom, taille, extension, colors) {\n    images.push({\n      url: url,\n      nom: nom,\n      taille: taille,\n      extension: extension,\n      colors: colors\n    });\n  }\n  /**\r\n   * \r\n   * @param {String} nom \r\n   * @param {String} url \r\n   */\n\n\n  function pushItems(nom, url) {\n    menuItems.push({\n      nom: nom,\n      url: url\n    });\n  }\n  /**\r\n   * \r\n   * @param {*} nom \r\n   */\n\n\n  function pushExt(nom) {\n    acceptableExtensions.push({\n      nom: nom\n    });\n  }\n  /**\r\n   * \r\n   * @param {Object} image \r\n   * @returns {Boolean}\r\n   */\n\n\n  function isExtensionOK(image) {\n    for (var key in acceptableExtensions) {\n      if (image.extension === acceptableExtensions[key].nom) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n\n  function displayContact() {\n    var contact = window.document.querySelector(\"#contact\");\n    var divContact = textInElement(\"div\", \"\", contact);\n    divContact.setAttribute(\"class\", \"bg-primary col-8 col-lg-4 mx-auto p-4 shadow\");\n    divContact.style.minHeight = \"5em\";\n    var titreContact = textInElement(\"h1\", \"Contact\", divContact);\n    titreContact.style.fontWeight = \"bolder\";\n    var textContact = textInElement(\"p\", \"Gillian Sokoloff\", divContact);\n    textInElement(\"p\", \"Mail : gillian.sokoloff@gmail.com\", divContact);\n    textInElement(\"p\", \"Téléphone : 00 33 6 84 38 09 23\", divContact);\n  }\n\n  pushItems(\"Accueil \", \"#\");\n  pushItems(\"Preview\", \"#TitrePreview\");\n  pushItems(\"Galerie \", \"#TitreGalerie\");\n  pushItems(\"Contact\", \"#contact\");\n  pushExt(\"jpg\");\n  pushExt(\"png\");\n  displayExtension();\n  displayTitle();\n  displayItem();\n  displayImage();\n  setImageColorPreview();\n  displayUpload();\n  displayContact();\n})();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/index.scss?");

/***/ }),

/***/ 0:
/*!*********************************************!*\
  !*** multi ./src/index.js ./src/index.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/index.js */\"./src/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/index.scss */\"./src/index.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js_./src/index.scss?");

/***/ })

/******/ });