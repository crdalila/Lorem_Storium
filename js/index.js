// TODO main.js
import { ImageHTML } from './class_image.js';
import { CharacterHTML } from './class_character.js';
import { IdeaManagerHTML } from './class_manager.js';
import { FavHTML } from './class_favs.js';
import { PromptHTML } from './class_prompt.js';


const imageInstance = new ImageHTML();
imageInstance.initialize(); // Inicializamos la imagen
const characterInstance = new CharacterHTML();
characterInstance.initialize(); //inicializamos el personaje
const promptInstance = new PromptHTML();
promptInstance.initialize(); //inicializamos el prompt
const favsInstance = new FavHTML();
favsInstance.initialize(); //inicializamos favoritos
const ideaManager = new IdeaManagerHTML("FAVS", imageInstance, characterInstance, promptInstance);
ideaManager.initialize();