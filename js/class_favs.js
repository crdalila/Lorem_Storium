import { ImageHTML } from "./class_image.js";
import { CharacterHTML } from "./class_character.js";
import { fetchPrompt } from "./api.js";
import { IdeaManagerHTML } from "./class_manager.js";
import { getFromLocalStorage, removeFromLocalStorageArray } from "./localstorage.js";


class Fav {
    constructor(id) {
        this.id = id;
        this.fav = false;
    }
    // FUNCIÓN GUARDAR FAVORITOS
    saveFav() {
        this.fav = true;
    }
    // FUNCIÓN BORRAR FAVORITOS
    removeFav() {
        this.fav = false;
    }
}

class FavHTML extends Fav {
    constructor(id) {
        super(id);
        this.favCard = null;
        this.favorites = null;
        this.favButton = null;
    }

    // INICIALIZAR
    initialize() {
        this.createHTML();
        this.updateFavoritesSection();
    }

    // CREAR HTML DEL INDEX MANAGER
    createHTML() {
        this.favorites = document.getElementById("favorites");
        this.favorites.innerHTML = '';

        const favTitle = document.createElement('h1');
        favTitle.textContent = "YOUR FAV IDEAS";

        //tarjeta de favoritos
        const favsLocalStorage = getFromLocalStorage("favorites") || []; //si hay wishlist la carga, si no, array vacío

        this.favCard = document.createElement("section");
        this.favCard.setAttribute("id", "favorites__card");

        this.favButton = document.createElement("button");
        this.favButton.textContent = "Fav";
        /* 
                const favImage = document.createElement("img"); //img
        
                const favCharacterData = document.createElement("section"); //personaje
                favCharacterData.classList.add("favorites__card-character");
                const characterName = document.createElement("h1");
                const characterLocation = document.createElement("p");
                const characterDob = document.createElement("p");
        
                const favPrompt = document.createElement("p"); //prompt
                favCharacterData.append(characterName, characterLocation, characterDob);
         */
        //appends
        this.favCard.append(favsLocalStorage);
        this.favorites.appendChild(favTitle, this.favCard);

        this.updateFavoritesSection();
    }

    updateFavoritesSection() { //TODO hacer render para que aparezcan sin tener que actualizar o cambiar de página
        if (!this.favorites) {
            console.error("❌ Error: La sección de favoritos no existe en el HTML");
            return;
        }
        
        // Obtener las ideas favoritas desde localStorage
        const favIdeas = getFromLocalStorage("favorites") || [];

        favIdeas.forEach(favData => {
            const favElement = document.createElement("div");
            favElement.classList.add("favorite-item");
            favElement.textContent = `Idea: ${this.favCard}`;

            // Botón para quitar de favoritos
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove from favorites"; //TODO icono de corazón lleno/vacío
            removeButton.addEventListener("click", () => {
                removeFromLocalStorageArray("favorites", favData);
                this.updateFavoritesSection(); // Actualizar la UI después de eliminar
            });

            favElement.appendChild(removeButton);
            this.favorites.appendChild(favElement);
        });
    }

    // EVENT LISTENERS: BOTÓN BORRAR FAVORITOS
    setupEventListenerFav() {
        if (!this.favCard) {
            return;
        }
        if (this.favButton) {
            this.favButton.addEventListener("click", () => {
                removeFromLocalStorageArray("favorites", idea);
                this.updateFavoritesSection(); // Actualizar la UI después de eliminar
            });
        } else {
            console.error("❌ Error: FavButton no existe");
        }
    }
}

export { FavHTML }