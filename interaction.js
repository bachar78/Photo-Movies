//Home Page
function main() {
  creatHtmlHome();
  createEffect();
  const home = document.querySelector(".fa-home");
  home.addEventListener("click", (e) => {
    e.preventDefault();
    main();
  });
  const photoBtn = document.querySelector(".left a");
  photoBtn.addEventListener("click", (e) => {
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

  //Movies gallery
  const videoBtn = document.querySelector(".right a");
  videoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createVideosHtml();

    //the search button

    const searchInput = document.querySelector(".search-input");
    const form = document.querySelector(".search-form");
    let searchValue;
    searchInput.addEventListener("input", updateInput);
    function updateInput(e) {
      searchValue = e.target.value;
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      searchMovie(searchValue);
    });

    async function generatingMovie(data) {
      const gallery = document.querySelector(".gallery");
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
          createSummeryHtml(movieInfo, movieSelected);
          summary.appendChild(movieInfo);
          const btnClose = document.querySelector(".close");
          btnClose.addEventListener("click", (event) => {
            summary.innerHTML = "";
          });
        });
      });
    }

    async function searchMovie(query) {
      if (query) {
        clear();
      }
      const data = await fetchData(query);
      generatingMovie(data);
    }
    searchMovie("dragon");
  });
}

window.addEventListener("load", main);
