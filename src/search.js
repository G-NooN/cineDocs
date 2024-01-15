// 검색 결과 출력
export const showSearchResult = (searchKeyword) => {
  const movieItems = document.querySelectorAll(".movie-item");
  const searchedValue = searchKeyword;

  movieItems.forEach((item) => {
    const title = item.querySelector(".movie-title").textContent; // 한국어 제목
    const originalTitle = item.querySelector(".movie-original-title").textContent.toUpperCase(); // 원제

    title.includes(searchedValue) ||
    title.toUpperCase().includes(searchedValue.toUpperCase()) ||
    originalTitle.includes(searchedValue.toUpperCase())
      ? (item.style.display = "block")
      : (item.style.display = "none");
  });
  if (areAllElementsHidden(movieItems)) {
    alert("검색 결과가 존재하지 않습니다.");
    return;
  }
};

function areAllElementsHidden(nodeList) {
  for (let i = 0; i < nodeList.length; i++) {
    if (window.getComputedStyle(nodeList[i]).display !== "none") {
      return false;
    }
  }
  return true;
}
