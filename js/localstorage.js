import { ImageHTML } from "./class_image.js";
import { CharacterHTML } from "./class_character.js";
import { IdeaManagerHTML } from "./class_manager.js"

// Guardar objetos en LocalStorage
function saveToLocalStorage (favs, idea) { //donde se guarda, el qué TODO idea es un array de ideas
	const stringIdea = JSON.stringify(idea); //de JSON a string
	localStorage.setItem(favs, stringIdea);
	console.log("Guardando en favoritos **");
}

// Recuperar todos los objetos guardados en el LocalStorage
function getFromLocalStorage (favs) {
	const resultString = localStorage.getItem(favs);
	const resultJSON = JSON.parse(resultString); //de string a JSON
	const result = [];
	if(resultJSON !== null) {
		resultJSON.forEach(idea => { //crear un array de ideas
			result.push(idea);
		});	
	}
	console.log("Lo que está en localstorage **", result);
	return result;
}

// Añadir libros al array guardado en LocalStorage
function addToLocalStorageArray (favs, idea) {
	const array = getFromLocalStorage(favs) || [];
	array.push(idea);
	console.log("Este es el array", array);
	saveToLocalStorage(favs, array);
}

// Eliminar libros del array guardado en LocalStorage
function removeFromLocalStorageArray(favs, idea) {
    let array = getFromLocalStorage(favs);
    if (!array || array.length === 0) {
        return;
    }
    //buscar el índice del favorito basado en la imagen
    const index = array.findIndex(element => element.imgsrc === idea.imgsrc);
    if (index === -1) {
        return; //si no se encuentra, no hacemos nada
    }
    array.splice(index, 1);
    localStorage.setItem(favs, JSON.stringify(array));
}


export {
	saveToLocalStorage,
	getFromLocalStorage,
	addToLocalStorageArray,
	removeFromLocalStorageArray,
}