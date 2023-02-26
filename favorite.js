const BASE_URL = "https://webdev.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/movies/";
const POSTER_URL = BASE_URL + "/posters/";

const movies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
const MOVIES_PER_PAGE = 12;

const dataPanel = document.querySelector("#data-panel");


//函式
function renderMovieList(data) {
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += `<div class="col-sm-3">
          <div class="mb-2">
            <div class="card">
              <img
                src="${POSTER_URL + item.image}"
                class="card-img-top"
                alt="Movie Poster"
              />
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
              </div>
              <div class="card-footer">
                <button
                  class="btn btn-primary btn-show-movie"
                  data-bs-toggle="modal"
                  data-bs-target="#movie-modal"
                  data-id="${item.id}"
                >
                  More
                </button>
                 <button class="btn btn-danger btn-remove-favorite" data-id="${
                   item.id
                 }">x</button>
              </div>
            </div>
          </div>
        </div>
    `;
  });

  dataPanel.innerHTML = rawHTML;
}

function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");

  axios.get(INDEX_URL + id).then((response) => {
    let data = response.data.results;

    modalTitle.innerText = data.title;
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image}" alt="">`;
    modalDate.innerText = "Release date: " + data.release_date;
    modalDescription.innerText = data.description;
  });
}

function removeFromFavorite(id) {
  if (!movies || !movies.length) return;

  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) return;

  movies.splice(movieIndex, 1);

  localStorage.setItem("favoriteMovies", JSON.stringify(movies));

  renderMovieList(movies);
}

//顯示最愛
renderMovieList(movies);

//按鈕事件
dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(Number(event.target.dataset.id));
  } else if (event.target.matches(".btn-remove-favorite")) {
    removeFromFavorite(Number(event.target.dataset.id));
  }
});

