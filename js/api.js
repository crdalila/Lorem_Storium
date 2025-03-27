
const BASE_URL_IMG = "https://picsum.photos/v2/list?";

// FETCH IMÁGENES
async function fetchImages() {
    try {
        const randomPage = Math.floor(Math.random() * 100) + 1; //para que nos dé la página random de 1 a 100
        const finalURL = new URL (BASE_URL_IMG);

        finalURL.searchParams.append("page", randomPage);
        finalURL.searchParams.append("limit", 1);

        const response = await fetch(finalURL.toString());
        const data = await response.json();

        if (data.length > 0) {
            const imageUrl = data[0].download_url;
            
            // Actualizar la imagen en el DOM
            const imgElement = document.getElementById('random-image');
            imgElement.src = imageUrl;
            imgElement.alt = `Random image from page ${randomPage}`;
        }   
    }
    catch(error) {
        console.error("Error fetching image", error);
    }    
}

// Cargar imagen al cargar la página
document.addEventListener('DOMContentLoaded', fetchImages);

// Opcional: añadir un botón para cargar nueva imagen
const refreshButton = document.getElementById('refresh-image');
if (refreshButton) {
    refreshButton.addEventListener('click', fetchImages);
}

/* 
async function fetchImages(BASE_URL) {
    try {
        const response = await fetch(BASE_URL.toString());
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error(error);
    }
}

 */

// FETCH PERSONAJE


// FETCH PROMPT



/* fetch("https://api.nekosapi.com/v4/images/random", {
    method: "GET",
}).then(res => res.json())
.then(data => {
    console.log(data);
}) */ //TODO otra posible API