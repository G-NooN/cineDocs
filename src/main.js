import { generateMovieList } from "./showMovies.js";
import { showSearchResult } from "./search.js";

const $popular = document.querySelector("#popular");
const $topRated = document.querySelector("#topRated");

generateMovieList("top_rated");

const searchInput = document.querySelector("#search-text");

const form = document.querySelector("#search-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showSearchResult(searchInput.value);
});

const $h1 = document.querySelector("h1");
$h1.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.reload();
});

$popular.addEventListener("click", (event) => {
  event.preventDefault();
  generateMovieList("popular");
});

$topRated.addEventListener("click", (event) => {
  event.preventDefault();
  generateMovieList("top_rated");
});
