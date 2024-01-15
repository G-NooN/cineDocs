// info.html 페이지의 영화 상세 정보 구성
const generateMovieInfo = async (movie_id) => {
  const movie = await fetchMovieDetailsData(movie_id);
  // movie: 받은 movie_id에 해당하는 하나의 영화 detail 정보 객체들의 '배열' (한국어,영어버전)
  const movieK = movie[0]; // 한국어버전
  const movieE = movie[1]; // 영어버전

  // * 영화 장르 객체데이터에서 꺼내서 뜨게 하기 (movieK객체 안 key인 genres는 객체가 요소인 배열 (여러 장르))
  const genres = movieK.genres; // 배열
  let genreNames = [];
  genres.forEach((genre) => {
    genreNames.push(genre.name); // genre.name - 장르명, genreNames- 장르명들이 담긴 배열
  });
  const genreNamesStr = genreNames.join(" / "); // 배열의 원소들(장르명)을 연결해 하나의 문자열로 만들기

  // * movieTagline 한글 버전이 없는 경우 (영문버전은 존재) -> 영문버전 데이터에서 가져오기 (시도중)
  let movieTagline = "";
  if (movieK.tagline === "") {
    // 한글 버전 없을 시
    movieTagline = movieE.tagline; // 영어 버전에서 가져오기
  } else {
    movieTagline = movieK.tagline;
  }

  // movieTagline 한글 버전이 없는 경우 (영문버전은 존재) -> 영문버전 데이터에서 가져오기 (시도중)
  /* if (movie.tagline === "") {
    const movieTagline = 
  } */

  // body 태그 안 영화 상세정보 페이지 메인 구성 - (포스터이미지, 영화 제목, 원제, 개요)
  const movieInfo = document.querySelector(".movieInfo-box");
  /*  movie.status 추가 고려해보기 */
  movieInfo.innerHTML = `
      <img
      src="https://image.tmdb.org/t/p/original${movieK.poster_path}"
      alt="${movieK.title}"
      />
      <div class="movieInfo-detail-box">
        <h1 class="movieInfo-title">
          ${movieK.title} (${movieK.original_title})
        </h1>
        <p class="movieInfo-details">
          <span class="movieInfo-date">ㆍ 개봉일│${movieK.release_date}</span>
          <span class="movieInfo-vote">ㆍ 평점│${movieK.vote_average}</span>
          <span class="movieInfo-runtime">ㆍ 러닝타임│${movieK.runtime}분</span>
        </p>
        <p class="movieInfo-details">
          <span class="movieInfo-genre">ㆍ 장르│${genreNamesStr}</span>
        </p>
        <pre class="movieInfo-tagline">
        <span class="material-symbols-outlined quoteSymbol">
        format_quote
        </span>  ${movieTagline}  <span class="material-symbols-outlined">
        format_quote
        </span>
        </pre>
        <p class="movieInfo-overview">
          ${movieK.overview}
        </p>
    </div>`;

  // + 영화 뒷배경 이미지 (backdrop_path 주소 사용) 뜨게 하기
  const movieInfoMain = document.querySelector(".movieInfo-main");
  movieInfoMain.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movieK.backdrop_path}')`;

  // + head태그의 title (페이지, 탭 제목) : 영화 제목과 개봉연도, 사이트제목 뜨게 하기
  const movieHeadTitle = document.querySelector("title");
  let movieYear = movieK.release_date.slice(0, 4);

  movieHeadTitle.innerHTML = `${movieK.title} (${movieYear}) ─ CinéDocs`;
};

// 메인페이지에서 (영화카드 클릭 -> showMovies.js에서 클릭이벤트) movie_id 넘겨받기
if (localStorage.getItem("movie_id")) {
  // 있으면
  const movie_id = localStorage.getItem("movie_id");
  generateMovieInfo(movie_id);
}

// TMDB API 데이터 가져오기 - Details (한국어,영어 버전)
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

  const urlKo = `https://api.themoviedb.org/3/movie/${movie_id}?language=ko-KR`;
  const urlEn = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;

  const movie_Kdata = await fetch(urlKo, options).then((data) => data.json()); // 이 객체는 results 키 없음 주의
  const movie_Edata = await fetch(urlEn, options).then((data) => data.json());

  const movie_data = [movie_Kdata, movie_Edata]; // 한국어, 영어 데이터 모두 하나의 배열에 담기

  return movie_data; // 배열을 리턴
}

// 상단 메뉴 href
const popular = document.querySelector("#popular");
popular.addEventListener("click", () => {
  window.location.href = "./index.html";
});
const topRated = document.querySelector("#top-rated");
topRated.addEventListener("click", () => {
  window.location.href = "./index.html";
});
