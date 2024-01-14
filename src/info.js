// info.html 페이지의 영화 상세 정보 구성
const generateMovieInfo = async (movie_id) => {
  const movie = await fetchMovieDetailsData(movie_id); // 받은 movie_id에 해당하는 하나의 영화 detail 정보 객체

  // body 태그 안 영화 상세정보 페이지 메인 구성 - (포스터이미지, 영화 제목, 원제, 개요)
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

  // 영화 뒷배경 이미지 (backdrop_path 주소 사용) 뜨게 하기
  const movieInfoMain = document.querySelector(".movieInfo-main");
  movieInfoMain.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;

  // head태그의 title (페이지, 탭 제목) : 영화 제목과 개봉연도, 사이트제목 뜨게 하기
  const movieHeadTitle = document.querySelector("title");
  let movieYear = movie.release_date.slice(0, 4);

  movieHeadTitle.innerHTML = `${movie.title} (${movieYear}) ─ CinéDocs`;
};

// 메인페이지에서 (영화카드 클릭 -> showMovies.js에서 클릭이벤트) movie_id 넘겨받기
if (localStorage.getItem("movie_id")) {
  // 있으면
  const movie_id = localStorage.getItem("movie_id");
  generateMovieInfo(movie_id);
}

// TMDB API 데이터 가져오기 - Details
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

  const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=ko-KR`;

  const movie_data = await fetch(url, options).then((data) => data.json());

  return movie_data; // 이 객체는 results 키 없음 주의
}
