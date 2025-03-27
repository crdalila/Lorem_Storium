class Image {
    constructor(id, imageLink, moreInfo) {
        this.id = id;
        this.imageLink = imageLink;
        this.moreInfo = moreInfo;

        this.fav = false;
    }
    // GUARDAR FAVORITOS
    saveFav() {
        if(this.fav) {
            return;
        }
        this.fav = true;
    }

    // BORRAR FAVORITOS
    removeFav() {
        if(!this.fav) {
            return;
        }
        this.fav = false;
    }
}

class ImageHTML extends Image {
    constructor(id, imageLink, moreInfo, fav) {
        super(id, imageLink, moreInfo, fav);

    }
    // CREACIÓN DE SECCIÓN IMAGEN
    createHTML(fatherElement) {
        const imageSection = document.createElement("section");
        imageSection.classList.add("section__image");

        fatherElement.appendChild(imageSection);
    }

    // INICIALIZAR IMAGEN
    initialize(fatherElement) {
        this.createHTML(fatherElement);
        this.render();
    }

    // VISUALIZAR IMAGEN
    render() {
        imageSection.innerHTML = "";

        const image = document.createElement("img");
        const favButton = document.createElement("button");
        const randomButton = document.createElement("button")

        image.setAttribute("src", this.imageLinks);

        attributesInfoLink.classList.add("attribute", "info");
        attributesInfoLink.textContent = "MÁS INFO";
        attributesInfoLink.setAttribute("href", this.infoLink);
        attributesInfoLink.setAttribute("target", "_blank");

        if (isBookmark) {
            favButton.innerHTML =; // TODO INNERHTML icono
        } else {
            favButton.innerHTML = ; // TODO INNERHTML icono
        }

        favButton.addEventListener("click", () => {
            if (isBookmark) {
                this.removeFav();
                removeFromLocalStorageArray("favorites", this);
				const wishlistLocalStorage = getFromLocalStorage("favorites") || [];
				displayFavoriteBooks(wishlistLocalStorage);
            } else {
                this.saveFav();
                console.log(this);
                addToLocalStorageArray("favorites", this);
            }
            this.render();
        })

        attributeList.append(attributesPublisherDate, attributesPageCount, attributesLanguage, attributesDescription);

        this.article.appendChild(image);
        this.article.appendChild(attributesTitle);
        this.article.appendChild(attributeAuthors);
        this.article.appendChild(attributeList);

        // CREACION DE LISTA DE CATEGORIAS
        if (attributesCategories.length === 1) { // SI SOLO HAY UNA CATEGORIA SE CREA UN ELEMENTO "A"
            const category = document.createElement("a");
        } else {
            this.createCategories(attributesCategories);
        }
        this.article.appendChild(attributesCategories);

        this.article.appendChild(wishButton);
        
        this.article.appendChild(attributesInfoLink);
    }

    // AÑADIDO DE NOMBRES DE AUTORES A UN MISMO STRING
    authorsNames(array) {
        let authorsNamesString = "";

        if (array.length === 1) {
            return array[0];
        }

        for (let i = 0; i < array.length; i++) {
            authorsNamesString += array[i] + (i === array.length - 1) ? "" : ", ";
        }

        return authorsNamesString;
    }

    // AÑADIDO DE TODAS LAS CATEGORIAS A LA LISTA EN FUNCION DE LA CANTIDAD
    createCategories(attributesCategories) {
        for (let i = 0; i < this.categories.length; i++) {
            const category = document.createElement("li");
            category.classList.add("attribute", "category");
            if (i === 0) {
                category.textContent = "Géneros: " + this.categories[i];
            } else {
            category.textContent += this.categories[i];
            }
            attributesCategories.append(category);
        }
    }
}
}