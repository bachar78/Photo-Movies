//Create HTML Home
function creatHtmlHome() {
  const body = document.body;
  body.innerHTML = `
  <header>
  <a href=""><i class="fa fa-home" aria-hidden="true"></i></a>
  <h1 id="logo">Photo&Movies</h1>
</header>
<section class="container">
  <div class="welcome-div">
      <h1 class="title">Welcome in <span> Photo&Movies </span> Application</h1>
  </div>
  <div class="columns">
      <div class="card">
          <div class="column left">
             <i class="fa fa-camera" aria-hidden="true"></i>
              <p>For Photos Click Here</p>
              <a href="">Photos</a>
          </div>
      </div>
      <div class="card">
          <div class="column right">
              <i class="fa fa-film" aria-hidden="true"></i>
              <p>For Movies Click Here</p>
              <a href="">Movies</a>
          </div>
      </div>
  </div>
</section>
    `;
}

//Create Logo effect
function createEffect() {
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
}

//create photoPageHTML
function createPhotoPageHTML() {
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
    <div class="gallery">
    </div>
</main>
<div class="nav-button">
    <button class="more">More</button>
</div>
    `;
}

async function fetchApi(url) {
  const auth = "563492ad6f9170000100000159148ec43af24289afaa8a65906d9c42";
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

function generatingPictures(data) {
  const gallery = document.querySelector(".gallery");
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
<div class = "gallery-info">
<p>Photographer: ${photo.photographer}</p>
</div>
<img src = ${photo.src.large}></img>
<a href = ${photo.src.original} target="blank">Download Original</a>
`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  try {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatingPictures(data);
  } catch (error) {
    catchError(error);
  }
}

function clear() {
  const gallery = document.querySelector(".gallery");
  const searchInput = document.querySelector(".search-input");
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function searchPhotos(query) {
  try {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatingPictures(data);
  } catch (error) {
    catchError(error);
  }
}

let page = 1;
let fetchLink;
let currentSearch;
async function loadMore() {
  try {
    page++;
    if (currentSearch) {
      fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    } else {
      fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatingPictures(data);
  } catch (error) {
    catchError(error);
  }
}
