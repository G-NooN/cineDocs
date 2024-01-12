import { generateMovieList } from "./showMovies.js"; // 영화 출력
import { showSearchResult } from "./search.js"; // 검색

generateMovieList("top_rated"); // 기본값: Top Rated

// 제목(로고) 클릭 시 화면 새로고침
const h1 = document.querySelector("h1");
h1.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.reload();
});

// 검색
const form = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-text");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  showSearchResult(searchInput.value);
});

/* 영화 리스트 카테고리 설정 */
// popular 카테고리
const popular = document.querySelector("#popular");
popular.addEventListener("click", (event) => {
  event.preventDefault();
  generateMovieList("popular");
});
// top rated 카테고리
const topRated = document.querySelector("#top-rated");
topRated.addEventListener("click", (event) => {
  event.preventDefault();
  generateMovieList("top_rated");
});
