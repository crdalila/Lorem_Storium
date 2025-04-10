import { fetchImages } from "./api.js";
import { FavHTML } from "./class_favs.js";

class Image {
    constructor(id, imageLink, moreInfo) {
        this.id = id;
        this.imageLink = imageLink;
        this.moreInfo = moreInfo;

        this.fav = false;
    }
}

class ImageHTML extends Image {
    constructor(id, imageLink, moreInfo) {
        super(id, imageLink, moreInfo);
        this.imageElement = null;
        this.randomButton = null;
    }
    // INICIALIZAR IMAGEN
    initialize() {
        this.createHTML();
        this.setupEventListeners();
    }
    // CREAR HTML IMAGEN
    createHTML() {
        const index = document.getElementById("index");
        const index__options = document.getElementById("index__options");
        // sección imagen + botón
        const imageSection = document.createElement("section");
        imageSection.classList.add("index__options-image");
        imageSection.innerHTML = "";

        // imagen
        this.imageElement = document.createElement("img");
        this.imageElement.setAttribute("alt", "Random image from Picsum");
        this.imageElement.setAttribute("id", "randomImage");

        // botón
        this.randomButton = document.createElement("button");
        this.randomButton.innerHTML = `<i class="fa-solid fa-shuffle"></i>`;

        // appends
        imageSection.append(this.imageElement, this.randomButton);
        index__options.append(imageSection);
        index.append(index__options);
    }

    // EVENT LISTENERS
    setupEventListeners() {
        this.loadRandomImage();

        if (this.randomButton) {
            this.randomButton.addEventListener('click', () => {
                this.loadRandomImage();
                const favButton = document.getElementById('favButton');
                favButton.innerHTML = `<i class="fa-regular fa-heart"></i>`;
            });
        }
    }

    // CARGAR IMAGEN ALEATORIA
    async loadRandomImage() {
        try {
            const imageData = await fetchImages();
            if (imageData && imageData.length > 0) {
                this.imageLink = imageData[0].download_url;
                this.render();
            }
        } catch (error) {
            console.error("❌ Error loading the image", error);
        }
    }

    // RENDERIZAR IMAGEN
    render() {
        if (this.imageElement) { //comprueba si lo has creado en createHTML
            this.imageElement.src = this.imageLink; //el src te lo cambia a una nueva imagen
        }
    }
}

export { ImageHTML }