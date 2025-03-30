import { ImageHTML } from "./class_image.js"
import { CharacterHTML } from "./class_character.js"
import { getFromLocalStorage } from "./localstorage.js";

class IdeaManager {
    constructor(id) {
        this.id = id;
        this.fav = false;
    }
    // FUNCIÓN GUARDAR FAVORITOS
/*     saveFav() {
        if (this.fav) {
            return;
        }
        this.fav = true;
    }
    // FUNCIÓN BORRAR FAVORITOS
    removeFav() {
        if (!this.fav) {
            return;
        }
        this.fav = false;
    } */
}

class IdeaManagerHTML extends IdeaManager {
    constructor(id, imageInstance, /* characterInstance, */ promptInstance) {
        super(id);
        this.randomButton = null;
        this.favButton = null;
        this.idea = null;
        this.imageInstance = imageInstance; //para que no nos genere un html nuevo sino que lo coja de la imagen que ya tenemos
        /* this.characterInstance = characterInstance; */
        this.promptInstance = promptInstance;
    }

    // FUNCION GUARDAR FAVORITOS
/*     saveFav() {
        super.saveFav();
        this.article.classList.add("favIdea");
    }

    // FUNCION BORRAR FAVORITOS
    removeFav() {
        super.removeFav();
        this.article.classList.remove("favIdea");
    } */

    // INICIALIZAR
    initialize() {
        this.createHTML();
        this.setupEventListenerRandom();
        /* this.setupEventListenerFav(); */ //TODO favs
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
        if (!this.imageInstance /* ||!this.characterInstance */) {
            return;
        }
        if (this.randomButton) {
            this.randomButton.addEventListener("click", () => {
                this.imageInstance.loadRandomImage();
                /* this.characterInstance.loadRandomCharacter(); */
                this.promptInstance.loadRandomPrompt();
            });
        } else {
            console.error("❌ Error: RandomButton no existe");
        }
    }

/*     setupEventListenerFav() {
        if (this.favButton) { //si el botón está bien creado
            this.favButton.addEventListener("click", () => {
                const favIdeas = getFromLocalStorage("favorites");
                const isFavIdea = favIdeas.some( fav => fav.id === this.id); //para ver si ya está entre los favs
                if (isFavIdea) {
                    this.removeFav();
                    removeFromLocalStorageArray("favorites", this);
                    const localStorageIdeas = getFromLocalStorage("favorites") || [];
                    displayFavoriteIdeas(localStorageIdeas);
                } else {
                    this.saveFav();
                    addToLocalStorageArray("favorites", this);
                }
                this.render();
            })
        }
    } */

    /*     initializeWishlist(){
            const wishlistImg = document.createElement("img");
            wishlistImg.setAttribute("src", "./assets/wishlist-img.jpg");
            wishlistImg.setAttribute("id", "wishlist-img");
    
            const wishlistSection = document.getElementById("wishlist");
            const tituloWishlist = document.createElement('h1');
            tituloWishlist.textContent = "WISHLIST";
            wishlistSection.innerHTML = "";
            const wishlistLocalStorage = getFromLocalStorage("favorites") || []; //si hay wishlist la carga, si no, array vacío
            const wishlistLocalStorageDiv = document.createElement("div");
            wishlistLocalStorageDiv.setAttribute("id", "wishlist__books");
            wishlistSection.append(wishlistImg, tituloWishlist, wishlistLocalStorageDiv);
            displayFavoriteIdeas(wishlistLocalStorage);
            
        } */

    // RENDERIZAR DATOS EN EL HTML
    /*     render() {
            if (!this.character) { //por si no personaje cargado
                return;
            }
        } */
}

/* function displayFavoriteIdeas(ideas) {
    const favsSection = document.getElementById("favorites");
    favsSection.innerHTML = ""; //si hemos hecho búsqueda anterior, la borra
    ideas.forEach(idea => {
        idea.initialize(favs);
    })
}
 */
export { IdeaManagerHTML };