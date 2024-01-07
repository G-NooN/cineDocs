const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjBmMTZkZjFlYjA4YmZjOGQxNWQ3OGJjYjBlMGM4NyIsInN1YiI6IjY1OTkyYTQ0ODliNTYxMDIwMTJkMTIwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AopUxBQtjeqovOo23P_ix9YfZafyz2YYi8G-AkDAKWk",
  },
};

const url = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR";

window.onload = function () {
  const cineDocsTitle = document.getElementById("cineDocsTitle");
  cineDocsTitle.addEventListener("click", function (e) {
    window.location.reload();
  });

  const inputText = document.getElementById("search_text");
  inputText.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      showSearchResults();
    }
  });

  const searchButton = document.getElementById("search_btn");
  searchButton.addEventListener("click", showSearchResults);

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const movie_list = document.querySelector(".movie_list");
      const movie_data = data["results"];

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

      movie_result.forEach((movie) => {
        movie_list.innerHTML += movie;
      });
    })
    .catch((err) => console.error(err));

  function showSearchResults() {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        const movie_list = document.querySelector(".movie_list");
        const movie_data = data["results"];
        const searched_list = movie_data.filter((movie) => {
          return (
            movie["title"].includes(inputText.value) ||
            movie["original_title"].toUpperCase().includes(inputText.value.toUpperCase())
          );
        });
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

        movie_list.innerHTML = "";
        searched_result.forEach((movie) => {
          movie_list.innerHTML += movie;
        });
      })
      .catch((err) => console.log(err));
  }
};
