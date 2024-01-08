export const generateMovieList = async (urlInfo) => {
  const movies = await fetchMovieData(urlInfo);

  const $movieList = document.querySelector("#movie-list");

  $movieList.innerHTML = movies
    .map(
      (movie) => `
  <li class="movie-item" id="${movie.id}">
    <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title}">
    <h2><span class="movie-title">${movie.title}</span> (<span class="movie-original-title">${movie.original_title}</span>)</h2>
    <p><strong>개봉일</strong> : ${movie.release_date} / <strong>평점</strong> : ${movie.vote_average}</p>
    <p>${movie.overview}</p>
  </li>`
    )
    .join("");

  $movieList.addEventListener("click", showMovieID);

  function showMovieID({ target }) {
    if (target === $movieList) return;

    if (target.matches(".movie-item")) {
      alert(`Movie ID : ${target.id}`);
    } else {
      alert(`Movie ID : ${target.parentNode.id}`);
    }
  }
};

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
