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
        this.removeButton = null;
    }

    // INICIALIZAR
    initialize() {
        this.updateFavoritesSection();
    }

    updateFavoritesSection() {
        this.favorites = document.getElementById("favorites");
        if (!this.favorites) {
            console.error("❌ Error: La sección de favoritos no existe en el HTML");
            return;
        }

        //createHTML
        this.favorites.innerHTML = ''; // Limpiar la sección antes de actualizar

        const favTitle = document.createElement('h1');
        favTitle.textContent = "YOUR FAV IDEAS";
        this.favorites.appendChild(favTitle);

        // Obtener los favoritos desde localStorage e invertir el orden
        const favLocalStorage = getFromLocalStorage("favorites") || [];
        const reversedFavs = favLocalStorage.reverse(); // Último añadido aparecerá primero

        reversedFavs.forEach(favData => {
            //div favCard
            const favCard = document.createElement("div");
            favCard.classList.add("favorites__card");

            //image
            const favImage = document.createElement("img");
            favImage.src = favData.imgsrc;
            favImage.alt = "favorite image";

            //character
            const favCharacterData = document.createElement("section");
            favCharacterData.classList.add("favorites__card-character");

            const characterName = document.createElement("h1");
            characterName.textContent = `Name: ${favData.charInfo.name}`;

            const characterAge = document.createElement("p");
            characterAge.textContent = `Age: ${favData.charInfo.age}`;

            const characterLocation = document.createElement("p");
            characterLocation.textContent = `Location: ${favData.charInfo.location}`;

            favCharacterData.append(characterName, characterAge, characterLocation);

            //prompt
            const favPrompt = document.createElement("p");
            favPrompt.textContent = `Prompt: ${favData.prompt}`;

            // Botón para eliminar de favoritos
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove from favorites";
            removeButton.addEventListener("click", () => {
                removeFromLocalStorageArray("favorites", favData);
                this.updateFavoritesSection();
            });

            // Ensamblar la tarjeta
            favCard.append(favImage, favCharacterData, favPrompt, removeButton);
            this.favorites.appendChild(favCard); // Agregar cada tarjeta a la sección
        });
        return reversedFavs;
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