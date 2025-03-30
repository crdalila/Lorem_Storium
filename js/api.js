// FETCH IMÁGENES: picsum
async function fetchImages() {
    const BASE_URL_IMG = "https://picsum.photos/v2/list?";

    try {
        const randomPage = Math.floor(Math.random() * 100) + 1; //para que nos dé la página random de 1 a 100
        const finalURL = new URL (BASE_URL_IMG);

        finalURL.searchParams.append("page", randomPage);
        finalURL.searchParams.append("limit", 1);

        const response = await fetch(finalURL.toString());
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error("❌ Error fetching image", error);
    }    
}

// FETCH PERSONAJE: randomuser.me
async function fetchCharacter() {
    const BASE_URL_CHARACTER = "https://randomuser.me/api/";

    try {
        const finalURL = new URL (BASE_URL_CHARACTER);
        const response = await fetch(finalURL.toString());
        const data = await response.json();
        return data.results; //.results porque es un objeto
    }
    catch(error) {
        console.error("❌ Error fetching character data", error);
    }
}

// FETCH PROMPT: quotable
async function fetchPrompt() {
    const BASE_URL_PROMPT = "https://api.quotable.io/quotes/random/";

    try {
        const finalURL = new URL (BASE_URL_PROMPT);
        const response = await fetch(finalURL.toString());
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error("❌ Error fetching prompt", error);
    }
}

export { fetchImages,
    fetchCharacter,
    fetchPrompt,
 }