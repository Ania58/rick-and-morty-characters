console.log('https://rickandmortyapi.com/api/character/?page=1');
console.log('https://rickandmortyapi.com/api/character/?page=2');



document.addEventListener('DOMContentLoaded', () => {
    const characterList = document.getElementById('character-list');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    let currentPage = 1;
    function fetchCharacters(page) {
        return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
                throw error; 
            });
    }
    function displayCharacters (characters) {
        characterList.innerHTML="";
        characters.results.forEach(character => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = character.image;
            img.alt = character.name;
            const p = document.createElement('p');
            p.textContent = `${character.name} - ${character.species}`;
            li.appendChild(img);
            li.appendChild(p);
            characterList.appendChild(li);
        }
        )
    }
    function updatePage(page) {
        fetchCharacters(page)
            .then(data => {
                displayCharacters(data);
                currentPage = page;
            })
            .catch(error => {
                console.error('Error updating page:', error);
            });
    }
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            updatePage(currentPage - 1);
        }
    });
    
    nextPageButton.addEventListener('click', () => {
        updatePage(currentPage + 1);
    });
    
    updatePage(currentPage);
})