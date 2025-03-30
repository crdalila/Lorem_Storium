import { ImageHTML } from "./class_image.js";
import { CharacterHTML } from "./class_character.js";
import { IdeaManagerHTML } from "./class_favs.js"

// Guardar objetos en LocalStorage
function saveToLocalStorage (favs, idea) { //donde se guarda, el qué
	const stringIdea = JSON.stringify(idea);
	localStorage.setItem(favs, stringIdea);
}

// Recuperar todos los objetos guardados en el LocalStorage
function getFromLocalStorage (favs) {
	const resultString = localStorage.getItem(favs);
	const resultJSON = JSON.parse(resultString);
	const result = [];
	if(resultJSON !== null) {
		resultJSON.forEach(idea => { //crear un array de ideas
			const ideaCard = new ImageHTML (
				idea.id,
			)
            ideaCard = new CharacterHTML (
                idea.id,
            )
			result.push(ideaCard);
		});	
	}
	return result;
}

// Añadir libros al array guardado en LocalStorage
function addToLocalStorageArray (favs, idea) {
	const array = getFromLocalStorage(favs) || [];
	const index = array.findIndex(element => element.id === idea.id);
	if (index !== -1) {
		return;
	}
	array.push(idea);
	saveToLocalStorage(favs, array);
}

// Eliminar libros del array guardado en LocalStorage
function removeFromLocalStorageArray (favs, idea) {
	const array = getFromLocalStorage(favs);
	if (!array) {
		return;
	}
	const index = array.findIndex(element => element.id === idea.id);
	if (index === -1) {
		return;
	}
	array.splice(index, 1);
	saveToLocalStorage(favs, array);
}

export {
	saveToLocalStorage,
	getFromLocalStorage,
	addToLocalStorageArray,
	removeFromLocalStorageArray,
}