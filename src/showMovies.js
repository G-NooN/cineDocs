// 영화 리스트 출력
export const generateMovieList = async (urlInfo) => {
  const movies = await fetchMovieData(urlInfo);

  const $movieList = document.querySelector("#movie-list");
  $movieList.innerHTML = movies
    .map(
      (movie) => `
  <div class="movie-item" id="${movie.id}">
    <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title}">
    <h2><span class="movie-title">${movie.title}</span> (<span class="movie-original-title">${movie.original_title}</span>)</h2>
    <p><strong>개봉일</strong> : ${movie.release_date} / <strong>평점</strong> : ${movie.vote_average}</p>
    <p>${movie.overview}</p>
  </div>`
    )
    .join("");

  const $movieItem = document.querySelectorAll(".movie-item");
  $movieItem.forEach((movie) => movie.addEventListener("click", showMovieID));

  // 영화 클릭 시 제목 & ID alert 출력
  function showMovieID({ target }) {
    if (target.parentNode.matches(".movie-item")) {
      let movieTitle = target.parentNode.firstElementChild.nextElementSibling.innerText;
      alert(`[제목] : ${movieTitle}
[Movie ID] : ${target.parentNode.id}`);
    } else if (target.parentNode.matches("h2")) {
      // h2 title
      let movieTitle = target.parentNode.innerText;
      alert(`[제목] : ${movieTitle}
[Movie ID] : ${target.parentNode.parentNode.id}`);
    } else {
      // p overview
      let movieTitle = target.parentNode.previousElementSibling.innerText;
      alert(`[제목] : ${movieTitle}
[Movie ID] : ${target.parentNode.parentNode.id}`);
    }
  }
};

// TMDB API 데이터 가져오기
async function fetchMovieData(urlInfo) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjBmMTZkZjFlYjA4YmZjOGQxNWQ3OGJjYjBlMGM4NyIsInN1YiI6IjY1OTkyYTQ0ODliNTYxMDIwMTJkMTIwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AopUxBQtjeqovOo23P_ix9YfZafyz2YYi8G-AkDAKWk",
    },
  };

  const url = `https://api.themoviedb.org/3/movie/${urlInfo}?language=ko-KR`;

  const movie_data = await fetch(url, options).then((data) => data.json());

  return movie_data.results;
}
