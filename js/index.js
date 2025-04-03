// TODO main.js
import { ImageHTML } from './class_image.js';
import { CharacterHTML } from './class_character.js';
import { IdeaManagerHTML } from './class_manager.js';
import { FavHTML } from './class_favs.js';
import { PromptHTML } from './class_prompt.js';
import { showSection } from './showsection.js';


// INICIALIZAR EL HTML DESDE SUS CLASES

//img
const imageInstance = new ImageHTML();
imageInstance.initialize();

//character
const characterInstance = new CharacterHTML();
characterInstance.initialize();

//prompt
const promptInstance = new PromptHTML();
promptInstance.initialize();

//favs
const favsInstance = new FavHTML();
favsInstance.initialize();

//el mánager
const ideaManager = new IdeaManagerHTML("FAVS", imageInstance, characterInstance, promptInstance);
ideaManager.initialize();


// MOSTRAR O NO EL CONTENIDO DE LA PÁGINA (por link HOME o link FAV)
const home_link = document.getElementById("home_link");
home_link.addEventListener("click", (e) => {
	showSection('index');
});

const fav_link = document.getElementById("favs_link");
fav_link.addEventListener("click", (e) => {
	showSection('favorites');
});