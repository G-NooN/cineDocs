import { generateMovieList } from "./showMovies.js"; // 영화 출력
import { showSearchResult } from "./search.js"; // 검색

generateMovieList("top_rated"); // 기본값: Top Rated

// 제목(로고) 클릭 시 화면 새로고침 => 메인페이지 화면 이동으로 변경
const title = document.querySelector(".title");
title.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "./index.html";
});

// 검색창 유효성 검사
const form = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-text");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (searchInput.value.length === 0) {
    alert("제목을 입력해주세요.");
    return;
  } else {
    showSearchResult(searchInput.value);
    searchInput.value = "";
  }
});

// 검색창 on/off 설정
const search = document.querySelector("#search");
const searchBtnStatus = document.querySelector("#searchBtnStatus");
search.addEventListener("click", () => {
  if (form.style.display === "none") {
    form.style.display = "flex";
    searchBtnStatus.innerText = "on";
  } else {
    form.style.display = "none";
    searchBtnStatus.innerText = "off";
  }
  searchInput.focus();
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
