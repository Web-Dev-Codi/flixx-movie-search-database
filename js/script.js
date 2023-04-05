// Global object
const global = {
    currentPage: window.location.pathname
};

// Popular 20 popular Movies
async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular');

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />` : `<img
              src="images/no-image.jpg" 
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;

        document.querySelector('#popular-movies').appendChild(div);
    });
}

// Display 20 Popular Shows
async function displayPopularShows() {
    const { results } = await fetchAPIData('tv/popular');

    results.forEach((shows) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = ` 
          <a href="tv-details.html?id=${shows.tv_id}">
        ${shows.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${shows.poster_path}"
              class="card-img-top"
              alt="${shows.name}"
            />` : `<img
              src="images/no-image.jpg" 
              class="card-img-top"
              alt="${shows.name}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${shows.name}</h5>
             <p class="card-text">
              <small class="text-muted">Aired: ${shows.first_air_date}</small>
            </p>
          </div>`;

        document.querySelector('#popular-shows').appendChild(div);
    });
}



// Fetch data from TMDB api
async function fetchAPIData(endpoint) {
    // Api Key
    const apiKey = '1b4e39380ba062c4708176b03ec88bd0';
    // Url to the endpoint
    const api_URL = 'https://api.themoviedb.org/3';
    // Show Spinner on load of page
    showSpinner();
    // Initalizing fetch
    const response = await fetch(`${api_URL}/${endpoint}?api_key=${apiKey}&language=en-US`);
    // Assigning variable named data to the respose json object
    const data = await response.json();
    // Hide Spinner after load
    hideSpinner()
    return data;
}

// Show spinner
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

// Hide Spinner
function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

// highlight active link
function activeLinks() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

// Initalize App our own custom router using a switch statement
function init() {
    switch (global.currentPage) {  // Created a instance for  our routing 
        case "/":
        case '/index.html':
            displayPopularMovies();
            break;
        case "/shows.html":
            displayPopularShows();
            break;
        case "/movie-details.html":
            console.log('Movie Details');
            break;
        case "/search.html":
            console.log('Search');
            break;
        case "/tv-details.html":
            console.log('Tv Details');
            break;
    }
    activeLinks();
}

document.addEventListener('DOMContentLoaded', init());