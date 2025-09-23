// let listView = [
//   { todo: "자바", complete: false },
//   { todo: "자바 스크립트", complete: true },
//   { todo: "오늘 할일", complete: false },
// ];

function init() {
  let sListView = localStorage.getItem("todoData");
  if (sListView) {
    listView = JSON.parse(sListView);
  } else {
    listView = [];
  }
  viewList();
}

function saveList() {
  localStorage.setItem("todoData", JSON.stringify(listView));
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
  txtInp.value = listView[idx].todo;

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
  for (let i = 0; i < listView.length; i++) {
    s += getInnerText(listView[i], i);
  }
  const lst = document.querySelector(".todoView");
  lst.innerHTML = s;

  if (btnInp.classList.contains("d-none")) btnInp.classList.toggle("d-none");

  if (btnModi.classList.contains("d-none") == false)
    btnModi.classList.toggle("d-none");

  txtInp.value = "";
}

function done(idx) {
  listView[idx].complete = !listView[idx].complete;
  saveList();
  viewList();
}

function delItem(idx) {
  listView.splice(idx, 1);
  saveList();
  viewList();
}
