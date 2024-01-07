// TMDB API Authentication Token
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjBmMTZkZjFlYjA4YmZjOGQxNWQ3OGJjYjBlMGM4NyIsInN1YiI6IjY1OTkyYTQ0ODliNTYxMDIwMTJkMTIwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AopUxBQtjeqovOo23P_ix9YfZafyz2YYi8G-AkDAKWk",
  },
};

const url = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR";

// window.onload
window.onload = function () {
  // title.onclick => reload
  const cineDocsTitle = document.getElementById("cineDocsTitle");
  cineDocsTitle.addEventListener("click", function (e) {
    window.location.reload();
  });

  // 검색창
  const inputText = document.getElementById("search_text");
  // If user press "Enter"
  inputText.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      showSearchResults();
    }
  });

  // [검색] 버튼
  const searchButton = document.getElementById("search_btn");
  searchButton.addEventListener("click", showSearchResults);

  // TMDB API data 가져오기
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const movie_list = document.querySelector(".movie_list");
      const movie_data = data["results"];

      // API의 정보를 HTML에 담아, return HTML Array
      const movie_result = movie_data.map((movie) => {
        let movie_html = `
      <div class="movie_card" onclick="alert('[${movie["title"]}] 의 Movie ID : ${movie["id"]}')">
        <div class="movie_content">
          <h2>${movie["title"]} (${movie["original_title"]})</h2>
          <p><strong>개봉일</strong> : ${movie["release_date"]} / <strong>평점</strong> : ${movie["vote_average"]}</p>
          <p>${movie["overview"]}</p>
        </div>
        <div class="movie_img">
          <img src='https://image.tmdb.org/t/p/w185${movie["poster_path"]}' />
        </div>
      </div>`;
        return movie_html;
      });

      // return된 HTML Array를 화면에 출력
      movie_result.forEach((movie) => {
        movie_list.innerHTML += movie;
      });
    })
    .catch((err) => console.error(err));

  // 검색 결과 출력
  function showSearchResults() {
    // TMDB API 가져오기
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        const movie_list = document.querySelector(".movie_list");
        const movie_data = data["results"];
        // 검색 결과 Array return
        const searched_list = movie_data.filter((movie) => {
          return (
            movie["title"].includes(inputText.value) ||
            movie["original_title"].toUpperCase().includes(inputText.value.toUpperCase())
          );
        });

        // 검색 결과 Array에 따라 return HTML Array
        const searched_result = searched_list.map((movie) => {
          let movie_html = `
      <div class="movie_card" onclick="alert('[${movie["title"]}] 의 Movie ID : ${movie["id"]}')">
        <div class="movie_content">
          <h2>${movie["title"]} (${movie["original_title"]})</h2>
          <p><strong>개봉일</strong> : ${movie["release_date"]} / <strong>평점</strong> : ${movie["vote_average"]}</p>
          <p>${movie["overview"]}</p>
        </div>
        <div class="movie_img">
          <img src='https://image.tmdb.org/t/p/w185${movie["poster_path"]}' />
        </div>
      </div>`;
          return movie_html;
        });

        // 기존 HTML 초기화
        movie_list.innerHTML = "";

        // return된 HTML Array를 화면에 출력
        searched_result.forEach((movie) => {
          movie_list.innerHTML += movie;
        });
      })
      .catch((err) => console.log(err));
  }
};
