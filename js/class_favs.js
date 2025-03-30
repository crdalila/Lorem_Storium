import { ImageHTML } from "./class_image.js"
import { CharacterHTML } from "./class_name.js"

class IdeaManager {
    constructor (id) {
        this.id = id;
        this.fav = false;
    }
}

class IdeaManagerHTML extends IdeaManager {
    constructor (id, imageInstance) {
        super (id);
        this.randomButton = null;
        this.favButton = null;
        this.idea = null;
        this.imageInstance = imageInstance;
    }

    // INICIALIZAR
    initialize() {
        this.createHTML();
        this.setupEventListenerRandom();
        /* this.setupEventListenerFav(); */
    }

    // CREAR HTML
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
        if (!this.imageInstance) {
            return;
        }
        if (this.randomButton) {
            this.randomButton.addEventListener("click", () => {
                this.imageInstance.loadRandomImage();
            });
        } else {
            console.error("RandomButton no existe");
        }
    }
    

/*     setupEventListenerFav() {
        this.loadRandomCharacter(); //nos carga un personaje nuevo

        if (this.FavButton) { //si el botón está bien creado
            this.FavButton.addEventListener("click", () => {
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
        }
    }
 */
    // RENDERIZAR DATOS EN EL HTML
/*     render() {
        if (!this.character) { //por si no personaje cargado
            return;
        }
    } */
}

export { IdeaManagerHTML };