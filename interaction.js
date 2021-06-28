//Logo Effect
const title = document.querySelector("#logo");
titleText = title.textContent;
titleArray = titleText.split("");

title.innerHTML = "";
for (let i = 0; i < titleArray.length; i++) {
  title.innerHTML += `<span>${titleArray[i]}</span>`;
}

let char = 0;
let interval = setInterval(onTrack, 100);

function onTrack() {
  const span = title.querySelectorAll("span")[char];
  span.classList.add("fade");
  char++;
  if (char === titleArray.length) {
    complete();
  }
}

function complete() {
  clearInterval(interval);
  interval = null;
}

//Home Page

const photobtn = document.querySelector(".left a");
const videobtn = document.querySelector(".right a");
const container = document.querySelector(".container");

photobtn.addEventListener("click", (e) => {
  e.preventDefault();
  container.innerHTML = "";
  container.innerHTML = `
    <section>
    <div class="box">
        <form class="search-form">
            <input type="text" name="search" placeholder="Type..." class="search-input">
            <input type="submit" class="submit-btn" value="Search">
        </form>
    </div>
</section>
<main>
    <div class="gallery">
    </div>
</main>
<div class="nav-button">
    <button class="more">More</button>
</div>
    `;
  const auth = "563492ad6f9170000100000159148ec43af24289afaa8a65906d9c42";
  const gallery = document.querySelector(".gallery");
  const searchInput = document.querySelector(".search-input");
  const form = document.querySelector(".search-form");
  let searchValue;
  const more = document.querySelector(".more");
  let page = 1;
  let fetchLink;
  let currentSearch;
  //add event listener
  searchInput.addEventListener("input", updateInput);
  function updateInput(e) {
    searchValue = e.target.value;
    currentSearch = searchValue;
  }
  //add another event listener
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPhotos(searchValue);
  });

  //add another event listener
  more.addEventListener("click", loadMore);

  async function fetchApi(url) {
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    const data = await dataFetch.json();
    return data;
  }

  async function generatingPictures(data) {
    data.photos.forEach((photo) => {
      const galleryImg = document.createElement("div");
      galleryImg.classList.add("gallery-img");
      galleryImg.innerHTML = `
<div class = "gallery-info">
<p>${photo.photographer}</p>
<a href = ${photo.src.original}>Download</a>
</div>
<img src = ${photo.src.large}></img>
`;
      gallery.appendChild(galleryImg);
    });
  }

  function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
  }

  async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatingPictures(data);
  }

  async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatingPictures(data);
  }

  async function loadMore() {
    page++;
    if (currentSearch) {
      fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    } else {
      fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatingPictures(data);
  }

  curatedPhotos();
});


videobtn.addEventListener('click', (e) => {
  e.preventDefault();
  container.innerHTML = "";
  container.innerHTML = `
    <section>
    <div class="box">
        <form class="search-form">
            <input type="text" name="search" placeholder="Type..." class="search-input">
            <input type="submit" class="submit-btn" value="Search">
        </form>
    </div>
</section>
<main>
  <div class="gallery"></div>
  <div class="summary opacity"></div>
</main>`
  
//the search button
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;


const fetchData = async (searchTerm) => {
    const parameters = {params: {apikey: "ad16638d", s: searchTerm}}
    const response = await axios.get('http://www.omdbapi.com/', parameters);
    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = ''; 
}

//add event listener
searchInput.addEventListener('input', updateInput);
function updateInput(e) {
    searchValue = e.target.value;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchMovie(searchValue);
})


async function generatingMovie(data) {
    data.forEach(movie => {
        const summary = document.querySelector('.summary');
    const galleryMovie = document.createElement('div');
    galleryMovie.classList.add('gallery-movie');
    galleryMovie.innerHTML = `
    <div class = "movie-info">
        <p> ${movie.Title}</p>
    </div>
    <img src = ${movie.Poster}></img>
    `;
    
    gallery.appendChild(galleryMovie);
    galleryMovie.addEventListener('click', async () => {
        const movieInfo = document.createElement('div');
        summary.classList.add('opacity');
        movieInfo.classList.add('movieInfo');
        const movieSelected = await onMovieClick(movie);
        movieInfo.innerHTML = `
        <div class='media'>
        <div class='image'>
          <img src='${movieSelected.Poster}'/>
        </div>
        <div class='content'>
          <h1>${movieSelected.Title}</h1>
          <h4>${movieSelected.Genre}</h4>
          <p>${movieSelected.Plot}</p>
        </div>
        </div>
      <p >Awards: ${movieSelected.Awards}</p>
      <p>Box Office: ${movieSelected.BoxOffice}</p>
      <p>Metasore: ${movieSelected.Metascore}</p>
      <p>IMDB Rating: ${movieSelected.imdbRating}</p>
      <p>IMDB Votes: ${movieSelected.imdbVotes}</p>
      <button class='close'>Close</button>
    `;
      summary.appendChild(movieInfo);
      const btnClose = document.querySelector('.close');
    btnClose.addEventListener('click', event => {
      summary.innerHTML = '';
      })
    })
      
    });
}
   
const onMovieClick = async (movie) => {
    const parameters = {params: {apikey: "ad16638d", i: movie.imdbID}}
    const response = await axios.get('http://www.omdbapi.com/', parameters);
    return response.data;
    
}
  

async function searchMovie(query) {
    clear();
    const data = await fetchData(query);
    generatingMovie(data);
}

searchMovie('dragon');
})


