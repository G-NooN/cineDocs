const submitBtn = document.querySelector("#submit-btn");
const commentList = JSON.parse(localStorage.getItem("comment-list")) || [];

submitBtn.addEventListener("click", saveComment);

// 리뷰 저장
function saveComment() {
  const name = document.querySelector("#user-name");
  const password = document.querySelector("#user-password");
  const commentText = document.querySelector("#comment");

  /* 유효성 검사 */
  // 이름을 입력하지 않은 경우
  if (name.value === "") {
    alert("이름을 입력하세요.");
    setTimeout(function () {
      name.focus();
    });
    return;
  } else if (password.value === "") {
    // 비밀번호를 입력하지 않은 경우
    alert("비밀번호를 입력하세요.");
    setTimeout(function () {
      password.focus();
    });
    return;
  } else if (commentText.value === "") {
    // 내용을 입력하지 않은 경우
    alert("내용을 입력하세요.");
    setTimeout(function () {
      commentText.focus();
    });
    return;
  }

  // 글자 수 제한
  const maxLength = 15;
  if (commentText.value.length > maxLength) {
    alert("리뷰는 15자 이하여야 합니다.");
    setTimeout(function () {
      commentText.focus();
    });
    return;
  }

  const comment = {
    name: name.value,
    password: password.value,
    commentText: commentText.value,
  };

  commentList.unshift(comment);
  localStorage.setItem("comment-list", JSON.stringify(commentList));

  alert("리뷰가 등록되었습니다.");

  // 입력 창 초기화
  document.getElementById("user-name").value = "";
  document.getElementById("user-password").value = "";
  document.getElementById("comment").value = "";

  displayComments();
}

// 리뷰 내역 출력
function displayComments() {
  const commentBox = document.querySelector("#comment-list");
  commentBox.innerHTML = "";

  commentList.forEach((comment, index) => {
    const newComment = document.createElement("div");
    newComment.className = "comment-item";
    newComment.innerHTML = `
        <div class="comment-box">
          <div class="comment-data">
            <div class="comment-header">
              <i class="fa-solid fa-user-pen"></i>
              <p class="comment-name">${comment.name}</p>
            </div>
            <p class="comment-contents">${comment.commentText}</p>
          </div>
          <div id="control-btn">
            <button onclick="editComment(${index})" id="editCommentBtn">수정</button>
            <button onclick="deleteComment(${index})" id="deleteCommentBtn">삭제</button>
          </div>
        </div>`;
    commentBox.appendChild(newComment);
  });
}

// 리뷰 삭제
function deleteComment(index) {
  const commentIndex = commentList[index]; //배열 commentList에서 특정 index에 위치한 요소를 가져와 comment라는 변수에 할당하였다.

  const commentBox = document.getElementById("comment-list");

  const passwordInput = document.createElement("div");
  passwordInput.innerHTML = `
      <div class="passwordInputForm" id="passwordInputForm">
        <input type="password" id="confirmPassword" placeholder="비밀번호 입력" required/>
        <div id="confirmButtons">
          <button type="button" onclick="checkPasswordDelete(${index})">확인</button>
          <button type="button" id="cancelEditBtn" onclick="cancelEdit(${index})">취소</button>
        </div>
      </div>`;

  const passwordInputId = `passwordInput_${index}`;

  const makePasswordInput = document.getElementById(passwordInputId);
  if (makePasswordInput) {
    commentBox.replaceChild(passwordInput, makePasswordInput);
  } else {
    const buttonsContainer =
      commentBox.children[index].querySelector("#control-btn");
    buttonsContainer.replaceWith(passwordInput);
  }
} // 비밀번호 입력칸이 다른 리뷰 칸에 생성되는 일이 있어서, passwordInput에 인덱스값을 붙여 특정해주고 수정, 삭제 버튼이 있던 위치에 비밀번호 입력칸과 확인, 취소 버튼이 오게 하였다.

// 삭제 시 비밀번호 확인
function checkPasswordDelete(index) {
  const commentIndex = commentList[index];
  const enteredPassword = document.getElementById("confirmPassword");

  // 비밀번호가 일치하는 경우
  if (enteredPassword.value === commentIndex.password) {
    commentList.splice(index, 1); // 해당 인덱스를 가진 리뷰를 1개만 삭제한다. 1이라는 숫자를 넣어주지 않으면 해당 인덱스를 가진 리뷰를 포함해 먼저 작성된 리뷰들이 전부 삭제된다.
    localStorage.removeItem("comment-list");
    localStorage.setItem("comment-list", JSON.stringify(commentList)); // 업데이트된 commentList를 다시 저장한다.

    alert("리뷰가 삭제되었습니다.");

    displayComments();
  } else if (enteredPassword.value === "") {
    // 비밀번호를 입력하지 않은 경우
    alert("비밀번호를 입력해주세요.");
    setTimeout(function () {
      enteredPassword.focus();
    });
  } else {
    // 비밀번호가 틀린 경우
    alert("비밀번호가 틀렸습니다.");
    setTimeout(function () {
      enteredPassword.focus();
    });
  }
}

// 삭제 취소버튼 누를시 실행되는 함수.
function cancelEdit(index) {
  //주어진 index가 유효한 범위에 있는지 확인.
  if (index < 0 || index >= commentList.length) {
    return;
  }
  //주어진 index에 해당하는 댓글 가져오기
  const commentIndex = commentList[index];

  const commentBox = document.getElementById("comment-list");

  // cancelEditBtn이 존재한다면, 이전에(삭제버튼을 눌렀을 때) 등록된 이벤트 리스너를 제거한다.
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  if (cancelEditBtn) {
    cancelEditBtn.removeEventListener("click", function () {
      cancelEdit(index);
    });
  }

  // 해당 인덱스에 있는 댓글을 다시 표시
  canceledComment(index);
}

// 삭제 버튼을 누르기 전, 수정, 삭제 버튼이 있는 리뷰를 보여준다.
function canceledComment(index) {
  const commentBox = document.getElementById("comment-list");

  // index가 유효한 범위에 있는지 확인
  if (index < 0 || index >= commentList.length) {
    return;
  }

  const commentIndex = commentList[index];

  const newComment = document.createElement("div");
  newComment.className = "comment-item";
  newComment.innerHTML = `
    <div class="comment-box">
      <div class="comment-data">
        <p class="comment-name">${commentIndex.name}</p>
        <p class="comment-contents">${commentIndex.commentText}</p>
      </div>
      <div id="control-btn">
        <button onclick="editComment(${index})" id="editCommentBtn">수정</button>
        <button onclick="deleteComment(${index})" id="deleteCommentBtn">삭제</button>
      </div>
    </div>`;

  commentBox.replaceChild(newComment, commentBox.children[index]);
}
//삭제 버튼을 눌러 비밀번호 input과 확인, 취소 버튼을 만들때 passwordInput 요소들이 수정, 삭제 버튼을 포함한 buttonsContainer 자리를 대신했기 때문에, 취소 버튼을 눌렀을때 passwordInput이 만들어지기 전의 buttonsContainer이 있던 리뷰의 모습을 다시 불러오기 위해서 리뷰를 다시 만들었다.

displayComments();
