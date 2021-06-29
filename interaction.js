main();
//Home Page
function main() {
  creatHtmlHome();
  createEffect();
  const photobtn = document.querySelector(".left a");
  photobtn.addEventListener("click", (e) => {
    e.preventDefault();
    createPhotoPageHTML();
    const searchInput = document.querySelector(".search-input");
    const form = document.querySelector(".search-form");
    let searchValue;
    const more = document.querySelector(".more");
    searchInput.addEventListener("input", updateInput);
    function updateInput(e) {
      searchValue = e.target.value;
      currentSearch = searchValue;
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      searchPhotos(searchValue);
    });
    more.addEventListener("click", loadMore);
    curatedPhotos();
  });
}

const videoBtn = document.querySelector(".right a");

videoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createVideosHtml();

  //the search button
  const gallery = document.querySelector(".gallery");
  const searchInput = document.querySelector(".search-input");
  const form = document.querySelector(".search-form");
  let searchValue;

  const fetchData = async (searchTerm) => {
    const parameters = { params: { apikey: "ad16638d", s: searchTerm } };
    const response = await axios.get("http://www.omdbapi.com/", parameters);
    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  };

  function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
  }

  //add event listener
  searchInput.addEventListener("input", updateInput);
  function updateInput(e) {
    searchValue = e.target.value;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchMovie(searchValue);
  });

  async function generatingMovie(data) {
    data.forEach((movie) => {
      const imgSrc =
        movie.Poster === "N/A"
          ? "./Photos/Image-Not-Available_.jpg"
          : movie.Poster;
      const summary = document.querySelector(".summary");
      const galleryMovie = document.createElement("div");
      galleryMovie.classList.add("gallery-movie");
      galleryMovie.innerHTML = `
    <div class = "movie-info">
        <p> ${movie.Title}</p>
    </div>
    <img src="${imgSrc}"/>
    `;

      gallery.appendChild(galleryMovie);
      galleryMovie.addEventListener("click", async () => {
        const movieInfo = document.createElement("div");
        summary.classList.add("opacity");
        movieInfo.classList.add("movieInfo");
        const movieSelected = await onMovieClick(movie);
        console.log(movieSelected);
        movieInfo.innerHTML = `
        <div class='media'>
        <div class='image'>
        <img src="${imgSrc}"/>
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
        const btnClose = document.querySelector(".close");
        btnClose.addEventListener("click", (event) => {
          summary.innerHTML = "";
        });
      });
    });
  }

  const onMovieClick = async (movie) => {
    const parameters = { params: { apikey: "ad16638d", i: movie.imdbID } };
    const response = await axios.get("http://www.omdbapi.com/", parameters);
    return response.data;
  };

  async function searchMovie(query) {
    clear();
    const data = await fetchData(query);
    generatingMovie(data);
  }

  searchMovie("dragon");
});
