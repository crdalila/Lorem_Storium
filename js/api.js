// FETCH IMÁGENES
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
        console.error("Error fetching image", error);
    }    
}

// FETCH PERSONAJE


// FETCH PROMPT


export { fetchImages }