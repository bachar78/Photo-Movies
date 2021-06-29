function createVideosHtml() {
  const container = document.querySelector(".container");
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
</main>`;
}

const fetchData = async (searchTerm) => {
  try {
    const parameters = { params: { apikey: "ad16638d", s: searchTerm } };
    const response = await axios.get("http://www.omdbapi.com/", parameters);
    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  }
  catch (error) {
    catchError(error);
  }
}

const onMovieClick = async (movie) => {
  try {
    const parameters = { params: { apikey: "ad16638d", i: movie.imdbID } };
    const response = await axios.get("http://www.omdbapi.com/", parameters);
    return response.data;
  }
  catch (error) {
    catchError(error);
  }
  
  
};

function createSummeryHtml(div, item) {
  const imgSrc =
    item.Poster === "N/A" ? "./Photos/Image-Not-Available_.jpg" : item.Poster;
  div.innerHTML = `
        <div class='media'>
        <div class='image'>
        <img src="${imgSrc}"/>
        </div>
        <div class='content'>
          <h1>${item.Title}</h1>
          <h4>${item.Genre}</h4>
          <p>${item.Plot}</p>
        </div>
        </div>
      <p >Awards: ${item.Awards}</p>
      <p>Box Office: ${item.BoxOffice}</p>
      <p>Metasore: ${item.Metascore}</p>
      <p>IMDB Rating: ${item.imdbRating}</p>
      <p>IMDB Votes: ${item.imdbVotes}</p>
      <button class='close'>Close</button>
    `;
}

function catchError(error) {
  const container = document.querySelector('.container');
    container.innerHTML = `
    <h1 class='error-message'>${error.message}</h1>
    `
}