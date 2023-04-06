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

// Display Movie details
async function displayMovieDetails() {
  const movieID = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieID}`);
  // Overlay for movie background
  displayBackgroundImage('movie', movie.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `
         <div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${movie.original_title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
             ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage ${movie.homepage}</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map(company => `<span>${company.name}</span>`).join(', ')}</div>
        </div>`;

  document.querySelector('#movie-details').appendChild(div);

}

// Display Show details
async function displayShowDetails() {
  const showID = window.location.search.split('=')[1];
  const show = await fetchAPIData(`tv/${showID}`);
  // Overlay for movie background
  displayBackgroundImage('tv', show.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `
         <div class="details-top">
          <div>
             ${show.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />` : `<img
              src="images/no-image.jpg" 
              class="card-img-top"
              alt="${show.name}"
            />`
    }
          </div>
          <div>
            <h2>${show.original_title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.last_air_date}</p>
            <p>
             ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage ${show.homepage}</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(show.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(show.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${show.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map(company => `<span>${company.name}</span>`).join(', ')}</div>
        </div>`;

  document.querySelector('#show-details').appendChild(div);

}

// Display backdrop on details pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org./t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);

  }
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
  hideSpinner();
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

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayShowDetails();
      break;
    case "/search.html":
      console.log('Search');
      break;
  }
  activeLinks();
}

document.addEventListener('DOMContentLoaded', init());