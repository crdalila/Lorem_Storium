import { getFromLocalStorage, removeFromLocalStorageArray } from "./localstorage.js";


class Fav {
    static id = 0;
    constructor() {
        this.id = ++Fav.id;
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
        //HTML
        this.favorites = document.getElementById("favorites");
        if (!this.favorites) {
            console.error("❌ Error: Fav section does not exist in the HTML");
            return;
        }
        this.favorites.innerHTML = ''; // Limpiar la sección antes de actualizar

        const favTitle = document.createElement('h1');
        favTitle.textContent = "YOUR FAV IDEAS";
        this.favorites.appendChild(favTitle);

        //obtener los favoritos desde localStorage e invertir el orden
        const favLocalStorage = getFromLocalStorage("favorites") || [];
        const reversedFavs = favLocalStorage.reverse(); // Último añadido aparecerá primero

        //crear una tarjeta por cada fav
        reversedFavs.forEach(favData => {
            //div favCard
            const favCard = document.createElement("div");
            favCard.classList.add("favorites__card");

            const favIdea = document.createElement("div");
            favIdea.classList.add("favorites__idea");

            //image
            const favImage = document.createElement("img");
            favImage.src = favData.imgsrc;
            favImage.alt = "favorite image";

            //character
            const favCharacterData = document.createElement("section");
            favCharacterData.classList.add("favorites__card-character");

            const characterName = document.createElement("h2");
            characterName.textContent = favData.charInfo.name ? favData.charInfo.name : "Unknown Name"; //si no hay datos, genera este texto alternativo

            const characterAge = document.createElement("p");
            characterAge.textContent = favData.charInfo.age ? favData.charInfo.age : "Unknown Age";

            const characterLocation = document.createElement("p");
            characterLocation.textContent = favData.charInfo.location ? favData.charInfo.location : "Unknown Location";

            favCharacterData.append(characterName, characterAge, characterLocation);

            //prompt
            const favPrompt = document.createElement("p");
            favPrompt.textContent = `Prompt: ${favData.prompt}`;

            // Botón para eliminar de favoritos
            this.removeButton = document.createElement("button");
            this.removeButton.innerHTML = `<i class="fa-solid fa-heart"></i>`;
            if (this.removeButton) {
                this.removeButton.addEventListener("click", () => {
                    removeFromLocalStorageArray("favorites", favData);
                    this.updateFavoritesSection();
                });
            } else {
                console.error("❌ Error: RemoveButton does not exist");
            }
            //append
            favIdea.append(favImage, favCharacterData, favPrompt);
            favCard.append(this.removeButton, favIdea);
            this.favorites.appendChild(favCard); // Agregar cada tarjeta a la sección
        });
    };
}

export { FavHTML }