// id 넘겨받기
if (localStorage.getItem("movie_id")) {
  // 있으면
  const movie_id = localStorage.getItem("movie_id");
  // alert(movie_id); 여기까지 잘 뜸
  generateMovieInfo(movie_id);
}

const generateMovieInfo = async (movie_id) => {
  // alert(movie_id);
  const movie = await fetchMovieDetailsData(movie_id); // movie_id 해당하는 하나의 영화 detail 정보 객체

  const movieInfo = document.querySelector(".movieInfo-box");
  movieInfo.innerHTML = `
      <img
      src="https://image.tmdb.org/t/p/original${movie.poster_path}"
      alt="${movie.title}"
      />
      <div class="movieInfo-detail-box">
        <h1 class="movieInfo-Ktitle">
        ${movie.title}
        </h1>
        <span class="movieInfo-Otitle">
        (${movie.original_title})
        </span>
        <p>
        ${movie.overview}
        </p>
    </div>`;
};

// TMDB API 데이터 가져오기 -Details
// 이 함수의 인자로 movie_id, 해당(클릭된)영화 id 넘겨받아야
async function fetchMovieDetailsData(movie_id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODQ3YmVhNWM5OTI1OTMyN2NlNjA0NTIxMDIzOWE1NSIsInN1YiI6IjY1OWFiODFhN2Q1NTA0NWI2Mjg4NTlmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o2XUntr54hPQ0qan4hAjjQ456_VBFIcBlYtClhhWcLA",
    },
  };

  const url = "https://api.themoviedb.org/3/movie/${movie_id}?language=ko-KO";

  const movie_data = await fetch(url, options).then((data) => data.json());

  return movie_data; // 이 객체는 results 키 없음
}
