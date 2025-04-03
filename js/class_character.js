import { fetchCharacter } from "./api.js";

class Character {
    constructor(data = {}) { //desestructuración, por si no nos da alguno de los datos, generamos '' por defecto
        const {
            id = '',
            name = { first: '', last: '' },
            location = { city: '', country: '' },
            dob = { age: '' },
        } = data;

        this.id = id;
        this.name = name.first;
        this.surname = name.last;
        this.location = location.city;
        this.country = location.country;
        this.dob = dob.age;

        this.fav = false;
    }
}

class CharacterHTML extends Character {
    constructor(id, name, surname, location, country, dob) {
        super (id, name, surname, location, country, dob);
        this.character = null; // el personaje está vacío al principio
        this.randomButton = null;
        this.characterSection = null; //los necesitamos aquí y no como variable dentro de createHTML porque lo vamos a necesitar fuera también
        this.characterName = null; //los usamos en render
        this.characterLocation = null;
        this.characterDob = null;
    }

    // INICIALIZAR
    initialize() {
        this.createHTML();
        this.setupEventListeners();
    }

    // CREAR HTML
    createHTML() {
        const index = document.getElementById("index");
        const index__options = document.getElementById("index__options");
        // sección datos + botón
        this.characterSection = document.createElement("section");
        this.characterSection.classList.add("index__options-character");
        
        // datos
        const characterData = document.createElement("section");
        characterData.classList.add("index__options-character-data");

        this.characterName = document.createElement("h1");
        this.characterLocation = document.createElement("p");
        this.characterDob = document.createElement("p");
        
        //botón
        this.randomButton = document.createElement("button");
        this.randomButton.innerHTML = `<i class="fa-solid fa-shuffle"></i>`;
        
        //appends
        characterData.append(this.characterName, this.characterDob, this.characterLocation);
        this.characterSection.append(characterData, this.randomButton);
        index__options.appendChild(this.characterSection);
        index.appendChild(index__options);
    }

    // EVENT LISTENERS
    setupEventListeners() {
        this.loadRandomCharacter(); //nos carga un personaje nuevo

        if (this.randomButton) { //si el botón está bien creado
            this.randomButton.addEventListener("click", () => this.loadRandomCharacter());
        }
    }

    // CARGAR PERSONAJE ALEATORIO
    async loadRandomCharacter() {
        try {
            const characterArray = await fetchCharacter(); //por cómo nos da los datos la API, todos los datos están en el [0]
            if (characterArray && characterArray.length > 0) { //si el array de datos existe (mayor que 0 elementos)
                this.character = new Character(characterArray[0]); //el personaje se crea con una instancia de Character y lo almacena en character que estaba vacío
                this.render();
            }
        } catch (error) {
            console.error("❌ Error. You cant load random characters", error);
        }
    }

    // RENDERIZAR DATOS EN EL HTML
    render() {
        if (!this.character) { //por si no personaje cargado
            return;
        }
        //actualiza el HTML
        this.characterName.textContent = `${this.character.name} ${this.character.surname}`;
        this.characterDob.textContent = `Age: ${this.character.dob}`;
        this.characterLocation.textContent = `Location: ${this.character.location}, ${this.character.country}`;
    }
}

export { CharacterHTML };
