// let _aList = [
//   { todo: "자바", complete: false },
//   { todo: "자바 스크립트", complete: true },
//   { todo: "오늘 할일", complete: false },
// ];

function init() {
  initBtnEventListeners();
  loadList;
  viewList();
}

function loadList() {
  let s_aList = localStorage.getItem("todoData");
  if (s_aList) {
    _aList = JSON.parse(s_aList);
  } else {
    _aList = [];
  }
}
function initBtnEventListeners() {
  btnCancel.addEventListener("click", function () {
    toggleBtns();
  });

  btnInp.addEventListener("click", function () {
    console.log(txtInp);
    console.log(txtInp.value);
    if (txtInp.value == "") {
      alert("할일을 입력하세요");
      return;
    } else {
      // 입력
      _aList.push({ todo: txtInp.value, complete: false });
      saveList();
      viewList();
    }
  });
  btnModi.addEventListener("click", function () {
    // 수정
    _aList[curIdx.value].todo = txtInp.value;
    saveList();
    toggleBtns();
    viewList();
  });

  btnDelAll.addEventListener("click", function () {
    const result = confirm("정말 삭제하시겠습니까?");
    if (result == false) return;
    else {
      todoView.innerHTML = "";
      _aList = [];
      saveList();
    }
  });
}

function saveList() {
  localStorage.setItem("todoData", JSON.stringify(_aList));
}

function getInnerText(item, idx) {
  let s = `<li class="d-flex py-2">
        <div class="col-9 justify-content-between ${
          item.complete ? "text-decoration-line-through" : ""
        }" >${item.todo}</div>
        <div class="d-flex gap-3">
                <i class="fa-solid fa-square${
                  item.complete ? "-check" : ""
                }" onclick="done(${idx})"></i>
                <i class="btnModi fa-solid fa-pen ${
                  item.complete ? "btnDisabled" : ""
                }" onclick="modiItem(${idx})"></i>
                <i class="btnDel fa-solid fa-trash ${
                  item.complete ? "btnDisabled" : ""
                }" onclick="delItem(${idx})"></i>
        </div>        
        </li>`;

  return s;
}

function modiItem(idx) {
  curIdx.value = idx;
  txtInp.value = _aList[idx].todo;

  txtInp.focus();
  toggleBtns();
}

function toggleBtns() {
  btnInp.classList.toggle("d-none");
  btnModi.classList.toggle("d-none");
  btnCancel.classList.toggle("d-none");
}

function viewList() {
  let s = "";
  for (let i = 0; i < _aList.length; i++) {
    s += getInnerText(_aList[i], i);
  }
  const lst = document.querySelector(".todoView");
  lst.innerHTML = s;

  if (btnInp.classList.contains("d-none")) btnInp.classList.toggle("d-none");

  if (btnModi.classList.contains("d-none") == false)
    btnModi.classList.toggle("d-none");

  txtInp.value = "";
}

function done(idx) {
  _aList[idx].complete = !_aList[idx].complete;
  saveList();
  viewList();
}

function delItem(idx) {
  _aList.splice(idx, 1);
  saveList();
  viewList();
}
