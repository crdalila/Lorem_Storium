import { getFromLocalStorage, removeFromLocalStorageArray } from "./localstorage.js";

class IdeaManager {
    static id = 0;
    constructor() {
        this.id = ++IdeaManager.id;
        this.fav = false;
    }
}

class IdeaManagerHTML extends IdeaManager {
    constructor(id, imageInstance, characterInstance, promptInstance) {
        super(id);
        this.randomButton = null;
        this.favButton = null;
        this.idea = null;
        this.imageInstance = imageInstance;
        this.characterInstance = characterInstance;
        this.promptInstance = promptInstance;
    }

    initialize() {
        this.createHTML();
        this.setupEventListenerRandom();
        this.setupEventListenerFav();
    }

    createHTML() {
        //index
        const index = document.getElementById("index");
        const index__manager = document.getElementById("index__manager");

        //botón random
        this.randomButton = document.createElement("button");
        this.randomButton.innerHTML = `<i class="fa-solid fa-shuffle"></i>`;

        //botón fav
        this.favButton = document.createElement("button");
        this.favButton.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        this.favButton.id = "favButton";

        //appends
        index__manager.append(this.randomButton, this.favButton);
        index.append(index__manager);
    }

    //FUNCIONALIDAD DEL BOTÓN RANDOM
    setupEventListenerRandom() {
        if (!this.imageInstance || !this.characterInstance || !this.promptInstance) {
            return;
        }
        if (this.randomButton) {
            this.randomButton.addEventListener("click", () => {
                this.imageInstance.loadRandomImage();
                this.characterInstance.loadRandomCharacter();
                this.promptInstance.loadRandomPrompt();
                this.favButton.innerHTML = `<i class="fa-regular fa-heart"></i>`;
            });
        } else {
            console.error("❌ Error: RandomButton does not exist");
        }
    }

    //FUNCIONALIDAD DEL BOTÓN FAVORITOS
    setupEventListenerFav() {
        if (this.favButton) {
            this.favButton.addEventListener("click", () => {
                const cardData = this.grabRandomInfo();
                let favIdeas = getFromLocalStorage("favorites") || [];

                //comparar datos para ver si están duplicados
                const exists = favIdeas.some(fav =>
                    fav.imgsrc === cardData.imgsrc &&
                    fav.charInfo.name === cardData.charInfo.name &&
                    fav.charInfo.age === cardData.charInfo.age &&
                    fav.charInfo.location === cardData.charInfo.location &&
                    fav.prompt === cardData.prompt
                );
                if (!exists) { //si no existe, guárdalo
                    favIdeas.push(cardData);
                    localStorage.setItem("favorites", JSON.stringify(favIdeas));
                    this.favButton.innerHTML = `<i class="fa-solid fa-heart"></i>`;
                } else { //si existe, elimínalo
                    this.favButton.innerHTML = `<i class="fa-regular fa-heart"></i>`;
                    removeFromLocalStorageArray("favorites", cardData);
                }
            });
        }
    }

    grabRandomInfo() {
        //image
        const imgSrc = document.querySelector('#randomImage').src;

        //character
        const charSection = document.querySelector('.index__options-character-data');
        const charName = charSection.querySelector('h1').textContent;
        const charAge = charSection.querySelector('p').textContent;
        const charLocation = charSection.querySelector('p+p').textContent;
        const charInfo = { //objeto con la info del character
            name: charName,
            age: charAge,
            location: charLocation,
        };

        //prompt
        const randomPrompt = document.querySelector('#randomPrompt').textContent;

        //generar un fav_id: el uniqueString es un string con los datos básicos
        const uniqueString = `${imgSrc}${charName}${randomPrompt}`;
        //encodeURIComponent convierte el string en seguro sin tildes ni ñ
        const fav_id = (encodeURIComponent(uniqueString));

        return {
            fav_id: fav_id,
            imgsrc: imgSrc,
            charInfo: charInfo,
            prompt: randomPrompt,
        };
    }
}

export { IdeaManagerHTML };
