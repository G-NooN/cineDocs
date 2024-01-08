export const showSearchResult = (searchKeyword) => {
  const movieItems = document.querySelectorAll(".movie-item");

  movieItems.forEach((item) => {
    const title = item.querySelector(".movie-title").textContent;
    const originalTitle = item.querySelector(".movie-original-title").textContent.toUpperCase();
    const searchedValue = searchKeyword;

    if (title.includes(searchedValue) || originalTitle.includes(searchedValue.toUpperCase())) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
};
