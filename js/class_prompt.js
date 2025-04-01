import { fetchPrompt } from "./api.js";

class Prompt {
    constructor(id, content) {
        this.id = id;
        this.content = content;
        this.fav = false;
    }
}

class PromptHTML extends Prompt {
    constructor(id, content) {
        super(id, content);
        this.promptElement = null;
        this.randomButton = null;
    }
    // INICIALIZAR PROMPT
    initialize() {
        this.createHTML();
        this.setupEventListeners();
    }
    // CREAR HTML PROMPT
    createHTML() {
        const index = document.getElementById("index");
        const index__options = document.getElementById("index__options");
        // sección frase + botón
        const promptSection = document.createElement("section");
        promptSection.classList.add("index__options-prompt");
        promptSection.innerHTML = "";

        // prompt
        this.promptElement = document.createElement("p");
        this.promptElement.id="randomPrompt";
        // botón
        this.randomButton = document.createElement("button");
        this.randomButton.innerHTML = `<i class="fa-solid fa-shuffle"></i>`;

        // appends
        promptSection.append(this.promptElement, this.randomButton);
        index__options.append(promptSection);
        index.append(index__options);
    }
    // EVENT LISTENERS
    setupEventListeners() {
        this.loadRandomPrompt();

        if (this.randomButton) {
            this.randomButton.addEventListener('click', () => this.loadRandomPrompt());
        }
    }
    // CARGAR FRASE ALEATORIA
    async loadRandomPrompt() {
        
        try {
            const promptArray = await fetchPrompt(); //por cómo nos da los datos la API, todos los datos están en el [0]
            if (promptArray && promptArray.length > 0) { //si el array de datos existe (mayor que 0 elementos)
                const promptData = promptArray[0];
                this.content = promptData.content;
                this.render();
            }
        } catch (error) {
            console.error("❌ Error al cargar la frase inspiradora", error);
        }
    }
    render() {
        if (this.promptElement) { //por si no hay frase cargada
            this.promptElement.textContent = this.content;
        }
    }
}


export { PromptHTML }