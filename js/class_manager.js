import { ImageHTML } from "./class_image.js";
import { CharacterHTML } from "./class_character.js";
import { PromptHTML } from "./class_prompt.js";
import { getFromLocalStorage, removeFromLocalStorageArray } from "./localstorage.js";

class IdeaManager {
    constructor(id) {
        this.id = id;
        this.fav = false;
    }
}

class IdeaManagerHTML extends IdeaManager {
    constructor(id, imageInstance, characterInstance, promptInstance) {
        super(id);
        this.randomButton = null;
        this.favButton = null;
        this.idea = null;
        this.imageInstance = imageInstance; //para que no nos genere un html nuevo sino que lo coja de la imagen que ya tenemos
        this.characterInstance = characterInstance;
        this.promptInstance = promptInstance;
    }

    // INICIALIZAR
    initialize() {
        this.createHTML();
        this.setupEventListenerRandom();
        this.setupEventListenerFav();
    }

    // CREAR HTML DEL INDEX MANAGER
    createHTML() {
        const index = document.getElementById("index");
        const index__manager = document.getElementById("index__manager")

        //botones
        this.randomButton = document.createElement("button");
        this.randomButton.textContent = "Random";

        this.favButton = document.createElement("button");
        this.favButton.textContent = "Fav";

        //appends
        index__manager.append(this.randomButton, this.favButton);
        index.append(index__manager);
    }

    // EVENT LISTENERS
    setupEventListenerRandom() {
        if (!this.imageInstance || !this.characterInstance || !this.promptInstance) {
            return;
        }
        if (this.randomButton) {
            this.randomButton.addEventListener("click", () => {
                this.imageInstance.loadRandomImage();
                this.characterInstance.loadRandomCharacter();
                this.promptInstance.loadRandomPrompt();
            });
        } else {
            console.error("❌ Error: RandomButton no existe");
        }
    }

    setupEventListenerFav() { //TODO no funciona
        if (this.favButton) {
            this.favButton.addEventListener("click", () => {
                const favIdeas = getFromLocalStorage("favorites") || [];
                const isFavIdea = favIdeas.some(fav => fav.id === this.id);

                if (isFavIdea) {
                    this.removeFav();
                    removeFromLocalStorageArray("favorites", this);
                } else {
                    this.saveFav();
                    addToLocalStorageArray("favorites", this);
                }
                favsManager.updateFavoritesSection(); // Llamamos a FavsManager para actualizar la UI
            });
        }
    }
}


export { IdeaManagerHTML };