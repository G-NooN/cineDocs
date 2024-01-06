const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjBmMTZkZjFlYjA4YmZjOGQxNWQ3OGJjYjBlMGM4NyIsInN1YiI6IjY1OTkyYTQ0ODliNTYxMDIwMTJkMTIwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AopUxBQtjeqovOo23P_ix9YfZafyz2YYi8G-AkDAKWk",
  },
};

const url = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR";

fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    const movie_list = document.querySelector(".movie_list");
    const movie_data = data["results"];

    movie_data.forEach((movie) => {
      let _id = movie["id"];
      let _title = movie["title"];
      let _original_title = movie["original_title"];
      let _release_date = movie["release_date"];
      let _vote_average = movie["vote_average"];
      let _overview = movie["overview"];
      let _poster_path = movie["poster_path"];

      let movie_html = `
      <div class="movie_card" onclick="alert('[${_title}]의 Movie ID : ${_id}')">
        <div class="movie_content">
          <h2>${_title} (${_original_title})</h2>
          <p><strong>개봉일</strong> : ${_release_date} / <strong>평점</strong> : ${_vote_average}</p>
          <p>${_overview}</p>
        </div>
        <div class="movie_img">
          <img src="https://image.tmdb.org/t/p/w185${_poster_path}" />
        </div>
      </div>`;

      movie_list.innerHTML += movie_html;
    });
  })
  .catch((err) => console.error(err));
