// PARA DAR O NO VISIBILIDAD A UNA PÁGINA

function showSection(sectionId) {
	document.querySelectorAll('.content').forEach(section => {	//convertimos todas las secciones en hidden
		section.classList.add('hidden');
	})
	document.getElementById(sectionId).classList.remove('hidden')
}

export { showSection };