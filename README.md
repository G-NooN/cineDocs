## CineDocs

TMDB API를 활용한 영화 리스트 출력 Project ([결과물 링크](https://g-noon.github.io/cineDocs))

### 주요 작업

1. fetch를 통한 TMDB API data GET
   - 영화 ID(id)
   - 제목(title)
   - 원제(original_title)
   - 개봉일(release_date)
   - 평점(vote_average)
   - 개요(overview)
   - 포스터 이미지 주소(poster_path)
2. TMDB API data 출력
   - 제목(title)
   - 원제(original_title)
   - 개봉일(release_date)
   - 평점(vote_average)
   - 개요(overview)
   - 포스터 이미지 주소(baseURL + fileSize + poster_path)
3. Movie 카드 클릭 시 영화 ID 출력(alert)
4. 검색 기능
   - 엔터(Enter) 키 또는 [검색] 버튼 클릭 시 작동
   - 한국어, 영어(대/소문자 구분 x) 지원
