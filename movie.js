// Définition de l'API et fonction de récupération des films
const apiKey = 'f1cd3768';
const apiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&`;
 
async function searchFilms(searchTerm) {
    try {
        const response = await fetch(apiUrl + 's=' + searchTerm);
        const data = await response.json();
 
        if (data.Response === 'True') {
            return data.Search;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
 
// Fonction pour afficher les films
function displayFilms(movies) {
    FilmContainer.innerHTML = '';
 
    if (movies.length > 0) {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
 
            const titleElement = document.createElement('h2');
            titleElement.textContent = movie.Title;
            movieElement.appendChild(titleElement);
 
            if (movie.Poster !== 'N/A') {
                const posterElement = document.createElement('img');
                posterElement.src = movie.Poster;
                movieElement.appendChild(posterElement);
            }
 
            const yearElement = document.createElement('p');
            yearElement.textContent = 'Released: ' + movie.Year;
            movieElement.appendChild(yearElement);
 
            FilmContainer.appendChild(movieElement);
        });
    } else {
        FilmContainer.innerHTML = 'No movies found';
    }
}
 
// Continuation du script.js
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const FilmContainer = document.getElementById('FilmContainer');
const favoritesFilmsContainer = document.getElementById('favoritesFilmsContainer');
 
searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value;
    const movies = await searchFilms(searchTerm);
    displayFilms(movies);
});
 
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
 
function toggleFavorite(movie) {
    const index = favorites.findIndex(fav => fav.id === movie.id);
    if (index !== -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(movie);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
 
function displayFavorites() {
    favoritesFilmsContainer.innerHTML = '';
    favorites.forEach(favorite => {
        const favElement = document.createElement('div');
        favElement.textContent = favorite.title;
        favoritesFilmsContainer.appendChild(favElement);
    });
}
 
displayFavorites();