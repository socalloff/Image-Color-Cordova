"use strict";
(function () {
    var namespace = "image_color_app";
    var menuItems = [];
    var maxFileGallery = 20;
    var images = JSON.parse(window.localStorage.getItem(namespace)) || [];
    var lang = "fr";
    var acceptableExtensions = [];
    var menu = window.document.querySelector("#menu");
    var gallery = window.document.querySelector("#gallery");
    var previewColor = window.document.querySelector("#previewColor");
    var colorPanel = window.document.querySelector("#colorPanel");
    var previewImg = window.document.querySelector("#previewImg");
    var footerB = window.document.querySelector("#footerB");
    var imagePreview = window.document.querySelector("#imagePreview");
    var file = window.document.querySelector("#file");
    var espaceBoutonUp = window.document.querySelector("#espaceBoutonUp");


    /**
     * 
     * @param {String} tagName 
     * @param {String} txt 
     * @param {HTMLElement} parent
     * @returns {HTMLElement} 
     */
    function textInElement(tagName, text, parent) {
        if (!tagName) {
            throw new Error("textInElement requires a tag name");
        }

        var element = window.document.createElement(tagName);

        if ("undefined" !== typeof text) {
            element.appendChild(window.document.createTextNode(text));
        }

        if (parent instanceof HTMLElement) {
            parent.appendChild(element);
        }
        return element;
    }



    function displayUpload() {
        if (images.length < maxFileGallery) {
            var boutonUpload = textInElement("button", "Télécharger une image", espaceBoutonUp);
            boutonUpload.setAttribute("class", "btn-danger m-4");

            var form = textInElement("form", " ", espaceBoutonUp);
            var inputFormUrl = textInElement("input", " ", form);
            var inputTypeSubmit = textInElement("input", " ", form);

            form.setAttribute("action", "");
            form.setAttribute("method", "get");
            form.setAttribute("class", "form-group mb-5");
            inputFormUrl.setAttribute("type", "url");
            inputFormUrl.setAttribute("required", "required");
            inputTypeSubmit.setAttribute("type", "submit");
            inputTypeSubmit.setAttribute("class", "btn-danger");
            inputTypeSubmit.setAttribute("value", "Envoyer");

            form.addEventListener("submit", function (event) {
                onSubmitForm(event, this);
            });

            boutonUpload.addEventListener("click", function () {
                file.click();
            });
            file.addEventListener("change", function (event) {
                onChangeFile(event, this.files[0])
            });
        }
    }

    function onSubmitForm(event, form) {
        event.preventDefault();
        var xhr = new XMLHttpRequest;

        xhr.open("GET", "https://api.imagga.com/v2/colors?image_url=" + form.elements[0].value);
        xhr.onload = function (event) {

            var colorObject = JSON.parse(this.responseText);

            if (200 === this.status) {
                pushImage(
                    form.elements[0].value,
                    form.elements[0].value,
                    null,
                    null,
                    colorObject.result.colors
                );
                // console.log(colorObject);
                displayImage();
                gallery.lastChild.lastChild.onclick();
                window.localStorage.setItem(namespace, JSON.stringify(images));

                return;
            }
            alert("Oooups! Une erreur est survenue");
        };
        xhr.setRequestHeader(
            "Authorization",
            "Basic YWNjX2VkNjMyZTg3MDlkYjIwNDowOTQ5OThhMzA5NDFhMDM0NzE3YzQyMDhkNWFkMGNmNg=="
        );
        xhr.send();
    }

    /**
     * 
     * @param {Event} event
     * @param  {File} uploadedFile 
     */
    function onChangeFile(event) {
        //avoir le client
        var xhr = new XMLHttpRequest;
        //ouvrir une connexion
        xhr.open("POST", "https://api.imagga.com/v2/colors");
        // enregistrer des event handlers
        xhr.onload = function (event) {

            var colorObject = JSON.parse(xhr.responseText);
            var reader = new FileReader;

            reader.readAsDataURL(file.files[0]);

            reader.onerror = function (event) { };

            reader.onload = function (event) {

                if (200 === xhr.status) {
                    pushImage(
                        reader.result,
                        reader.result,
                        null,
                        null,
                        colorObject.result.colors,
                    );
                    // console.log(colorObject.result.colors);
                    displayImage();
                    gallery.lastChild.lastChild.onclick();
                    window.localStorage.setItem(namespace, JSON.stringify(images));

                    return;
                }
                alert("Oooups! Une erreur est survenue");
            };
        };
        //customize headers
        xhr.setRequestHeader(
            "Authorization",
            "Basic YWNjX2VkNjMyZTg3MDlkYjIwNDowOTQ5OThhMzA5NDFhMDM0NzE3YzQyMDhkNWFkMGNmNg=="
        );
        //New formData
        var body = new FormData;
        body.append("image", file.files[0]);
        //envoyer la requête
        xhr.send(body);
    }

    function displayImage() {
        gallery.innerHTML = "";

        if (images.length >= 1 && images.length <= maxFileGallery) {

            for (var imgDetails in images) {
                if (null === images[imgDetails].extension || isExtensionOK(images[imgDetails])) {

                    var divImg = textInElement("div", "", gallery);
                    var newImg = textInElement("img", "", divImg);

                    divImg.setAttribute("class", "col-10 col-lg-5");
                    divImg.style = "height: 15em; overflow: hidden; margin-top: 1em; margin-bottom: 1em;";
                    newImg.setAttribute("alt", images[imgDetails].nom);
                    newImg.setAttribute("src", images[imgDetails].url);
                    newImg.setAttribute("class", "img-fluid");
                    registerEvent(newImg, imgDetails);

                }
            }
        } else if (images.length === 0) {
            textInElement("b", "GALERIE VIDE", gallery);
        } else {
            textInElement("b", "GALERIE PLEINE", gallery);
        }
    }

    function registerEvent(newImg, key) {
        newImg.onclick = function (event) {
            clickImage(event, key);
        };
    }

    function clickImage(event, key) {
        espaceBoutonDel.innerHTML = "";
        colorPanel.innerHTML = "";
        var delButton = textInElement("button", "Supprimer l'image", espaceBoutonDel);
        delButton.style.marginTop = "2em";
        delButton.setAttribute("class", "btn-danger");
        imagePreview.setAttribute("src", images[key].url);
        imagePreview.setAttribute("class", "img-fluid");
        delButton.addEventListener("click", function (event) {
            Delete(event, imagePreview);
        });

        displayColors(images[key].colors.background_colors);
        displayColors(images[key].colors.forground_colors);
        displayColors(images[key].colors.image_colors);
    }

    function displayColors(imgColors) {
        for (var keyColors in imgColors) {

            console.log(imgColors);

            var divColors = textInElement("div", " ", colorPanel);
            divColors.style.backgroundColor = imgColors[keyColors].closest_palette_color_html_code;
            divColors.style.height = "5em";
            divColors.style.color = "#D6D6D6";
            divColors.setAttribute("class", "justify-content-center mt-3");

            textInElement("H3", imgColors[keyColors].closest_palette_color, divColors);
            textInElement("h3", imgColors[keyColors].closest_palette_color_html_code, divColors);

        }
    }

    function Delete(event, imagePreview) {
        colorPanel.innerHTML = "";
        var imageFound = images.find(function (urlImage) {
            return urlImage.url === imagePreview.getAttribute("src");
        })

        var keyImageFound = images.indexOf(imageFound);
        images.splice(keyImageFound, 1);
        window.localStorage.setItem(namespace, JSON.stringify(images));
        displayImage();
        imagePreview.setAttribute("src", "/assets/imgPlaceholder.png");
        espaceBoutonDel.innerHTML = "";

    }

    function displayExtension() {
        textInElement("h6", "Extensions acceptées :", espaceBoutonUp);
        for (var key in acceptableExtensions) {
            var ext1 = textInElement("ul", "", espaceBoutonUp);
            textInElement("li", acceptableExtensions[key].nom, ext1);
        }
    }

    function displayTitle() {
        var divPrev = textInElement("div", "", header);
        divPrev.style.minHeight = "3em";
        var bienvenueMess = window.document.createElement("div");
        header.appendChild(bienvenueMess);
        textInElement("h1", "", bienvenueMess);
        bienvenueMess.setAttribute("class", "col-10 col-lg-10 text-center text-light ml-auto mr-auto mt-12 pb-1");
        bienvenueMess.style.marginTop = "2em";

        if ("fr" === lang) {
            var bienvenueMessFr = textInElement("h1", "Obtenez les couleurs de vos images", bienvenueMess);
            bienvenueMessFr.style.fontWeight = "bold";
            bienvenueMessFr.style.textTransform = "uppercase";
        } else if ("en" === lang) {
            var bienvenueMessEn = textInElement("h1", "Get the colors of your pictures", bienvenueMess);
        } else if ("de" === lang) {
            var bienvenueMessDe = textInElement("h1", "Holen Sie sich die Farben Ihres Bildes", bienvenueMess);
        } else if (!lang) {
            throw new Error("No language selected");
        }
    }

    function displayItem() {
        for (var key in menuItems) {

            var lienMenuLI = window.document.createElement("li");
            lienMenuLI.setAttribute("class", "nav-item");

            var lienMenu = window.document.createElement("a");
            lienMenu.setAttribute("class", "nav-link");

            var nomsMenu = window.document.createTextNode(menuItems[key].nom);

            lienMenu.setAttribute("href", menuItems[key].url);

            menu.appendChild(lienMenuLI);
            lienMenuLI.appendChild(lienMenu);
            lienMenu.appendChild(nomsMenu);

            lienMenuLI.setAttribute("class", "text-center");
        }
    }

    //LES 2 FENETRES COLORS ET PREVIEW setPreview
    function setImageColorPreview() {
        previewColor.setAttribute("style", "margin-top: 2em;");
        colorPanel.setAttribute("class", "col-12 col-lg-4  bg-dark");
        previewImg.setAttribute("class", "col-12 col-lg-8 mx-auto bg-light");

        var divTitreColors = textInElement("div", "", colorPanel);
        textInElement("p", "Panel de couleurs vide", divTitreColors);
        divTitreColors.style.minHeight = "2em";
    }

    /**
     * 
     * @param {String} url 
     * @param {String} nom 
     * @param {Number} taille 
     * @param {String} extension 
     */
    function pushImage(url, nom, taille, extension, colors) {
        images.push(
            {
                url: url,
                nom: nom,
                taille: taille,
                extension: extension,
                colors: colors
            });
    }
    /**
     * 
     * @param {String} nom 
     * @param {String} url 
     */
    function pushItems(nom, url) {
        menuItems.push(
            {
                nom: nom,
                url: url,
            });
    }
    /**
     * 
     * @param {*} nom 
     */
    function pushExt(nom) {
        acceptableExtensions.push(
            {
                nom: nom,
            });
    }
    /**
     * 
     * @param {Object} image 
     * @returns {Boolean}
     */
    function isExtensionOK(image) {
        for (var key in acceptableExtensions) {
            if (image.extension === acceptableExtensions[key].nom) {
                return true;
            }
        }
        return false;
    }

    function displayContact() {
        var contact = window.document.querySelector("#contact");
        var divContact = textInElement("div", "", contact);
        divContact.setAttribute("class", "bg-primary col-8 col-lg-4 mx-auto p-4 shadow");
        divContact.style.minHeight = "5em";
        var titreContact = textInElement("h1", "Contact", divContact);
        titreContact.style.fontWeight = "bolder";
        var textContact = textInElement("p", "Gillian Sokoloff", divContact);
        textInElement("p", "Mail : gillian.sokoloff@gmail.com", divContact);
        textInElement("p", "Téléphone : 00 33 6 84 38 09 23", divContact);
    }

    pushItems("Accueil ", "#");
    pushItems("Preview", "#TitrePreview");
    pushItems("Galerie ", "#TitreGalerie");
    pushItems("Contact", "#contact");

    pushExt("jpg");
    pushExt("png");

    displayExtension();
    displayTitle();
    displayItem();
    displayImage();
    setImageColorPreview();
    displayUpload();
    displayContact();

})();




