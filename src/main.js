import { generateMovieList } from "./showMovies.js"; // 영화 출력
import { showSearchResult } from "./search.js"; // 검색

const $popular = document.querySelector("#popular");
const $topRated = document.querySelector("#topRated");

generateMovieList("top_rated"); // 기본값: Top Rated

const searchInput = document.querySelector("#search-text");

const form = document.querySelector("#search-form");

// 검색
form.addEventListener("submit", (event) => {
  event.preventDefault();
  showSearchResult(searchInput.value);
});

// 제목(로고) 클릭 시 화면 새로고침
const $h1 = document.querySelector("h1");
$h1.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.reload();
});

// popular 카테고리
$popular.addEventListener("click", (event) => {
  event.preventDefault();
  generateMovieList("popular");
});

// top rated 카테고리
$topRated.addEventListener("click", (event) => {
  event.preventDefault();
  generateMovieList("top_rated");
});
