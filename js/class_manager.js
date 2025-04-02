import { ImageHTML } from "./class_image.js";
import { CharacterHTML } from "./class_character.js";
import { PromptHTML } from "./class_prompt.js";
import { addToLocalStorageArray, getFromLocalStorage, removeFromLocalStorageArray } from "./localstorage.js";

class IdeaManager {
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
        this.randomButton.innerHTML = `<i class="fa-solid fa-shuffle"></i>`;

        this.favButton = document.createElement("button");
        this.favButton.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        this.favButton.id = "favButton";

        //appends
        index__manager.append(this.randomButton, this.favButton);
        index.append(index__manager);
    }

    // BOTÓN RANDOM PARA LOS TRES ELEMENTOS: IMG, PERSONAJE Y PROMPT 
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

    // BOTÓN FAVORITOS CREA UN OBJETO CON LA INFO DE ESTA COMBINACIÓN Y LA METE EN LOCALSTORAGE
    setupEventListenerFav() {
        if (this.favButton) {
            this.favButton.addEventListener("click", () => {
                const cardData = this.grabRandomInfo();
                const favIdeas = getFromLocalStorage("favorites") || [];
                const isFavIdea = favIdeas.some(fav => fav.id === this.id);
                if (isFavIdea) {
                    this.removeFav();
                    removeFromLocalStorageArray("favorites", this);
                } else {
                    this.saveFav();
                    addToLocalStorageArray("favorites", cardData);
                }
            });
        }
    }

    // COGER LA INFORMACIÓN QUE QUEREMOS GUARDAR EN FAVORITOS
    grabRandomInfo() {
        // image
        const imgSrc = document.querySelector('#randomImage').src; //coge el src del id randomImage

        // character
        const charSection = document.querySelector('.index__options-character-data');
        const charName = charSection.querySelector('h1').textContent; //coge el textContent del h1 DENTRO de charSection
        const charAge = charSection.querySelector('p').textContent;
        const charLocation = charSection.querySelector('p+p').textContent; //coge el SEGUNDO p de charInfo
        const charInfo = { //guardamos la info del personaje en un objeto
            name: charName,
            age: charAge,
            location: charLocation,
        }

        //prompt
        const randomPrompt = document.querySelector('#randomPrompt').textContent;

        //datos guardados en objeto
        const favCardData = {
            imgsrc: imgSrc,
            charInfo: charInfo, //esto es un objeto
            prompt: randomPrompt,
        }
        return favCardData
    }
}

export { IdeaManagerHTML };