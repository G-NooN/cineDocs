// 영화 리스트 출력
export const generateMovieList = async (category) => {
  const movies = await fetchMovieData(category);

  const movieList = document.querySelector("#movie-list");
  movieList.innerHTML = movies
    .map(
      (movie) => `
  <div class="movie-item" id="${movie.id}">
    <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title}">
    <h2 class="movie-title">${movie.title}</h2>
    <span class="movie-original-title">(${movie.original_title})</span>
    <p class="movie-item-info"><strong>개봉일</strong> : ${movie.release_date} / <strong>평점</strong> : ${movie.vote_average}</p>
    <p class="movieMain-overview">${movie.overview}</p>
  </div>`
    )
    .join("");

  // 영화 클릭 시 info.html(상세페이지)로 넘어가기, 영화id 데이터 전달하기
  const movieItem = document.querySelectorAll(".movie-item");
  movieItem.forEach((movie) =>
    movie.addEventListener("click", (event) => {
      if (event.target.getAttribute("class") === "movie-item") {
        // 그냥 다른 태그 아닌 div 박스 빈공간 누르는 경우
        const movie_id = event.target.getAttribute("id");
        localStorage.setItem("movie_id", movie_id); // 잘 저장됨
        window.location.href = "./info.html"; // 잘 넘어감
      } else if (event.target.parentElement.getAttribute("class") === "movie-item") {
        // img, p 태그 누르는 경우
        const movie_id = event.target.parentElement.getAttribute("id");
        localStorage.setItem("movie_id", movie_id);
        window.location.href = "./info.html";
      } else {
        // <h2>태그 안 <span>태그인 movie-title 들을 누르는 경우
        const movie_id = event.target.parentElement.parentElement.getAttribute("id");
        localStorage.setItem("movie_id", movie_id);
        window.location.href = "./info.html";
      }
      // console.log(event); // event 객체내용 확인 가능 (콘솔로만 가능)
      // PointerEvent {key:value}로 이뤄진 객체, target 이라는 key - 눌린 태그 (img,p등) 혹은 div 가 있음
    })
  );
};
// TMDB API 데이터 가져오기
async function fetchMovieData(category) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjBmMTZkZjFlYjA4YmZjOGQxNWQ3OGJjYjBlMGM4NyIsInN1YiI6IjY1OTkyYTQ0ODliNTYxMDIwMTJkMTIwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AopUxBQtjeqovOo23P_ix9YfZafyz2YYi8G-AkDAKWk",
    },
  };

  const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR`;

  const movie_data = await fetch(url, options).then((data) => data.json());

  return movie_data.results;
}
