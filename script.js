let listView = [
  { todo: "자바11111111111111111111111111111", complete: false },
  { todo: "자바 스크립트", complete: true },
  { todo: "오늘 할일", complete: false },
];

let _curIdx = -1;

function getInnerText(item, idx) {
  let s = `<li class="d-flex py-2">
        <div class="col-8 justify-content-between ${
          item.complete ? "text-decoration-line-through" : ""
        }" >${item.todo}</div>
        <div class="d-flex gap-3">
                <i class="fa-solid fa-square${
                  item.complete ? "-check" : ""
                }" onclick="done(${idx})"></i>
                <i class="btnModi fa-solid fa-pen" onclick="modiItem(${idx})"></i>
                <i class="btnDel fa-solid fa-trash" onclick="delItem(${idx})"></i>
        </div>        
        </li>`;

  return s;
}

function modiItem(idx) {
  _curIdx = idx;
  txtInp.value = listView[idx].todo;

  txtInp.focus();
  btnInp.classList.toggle("d-none");
  btnModi.classList.toggle("d-none");
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
  viewList();
}

function delItem(idx) {
  listView.splice(idx, 1);
  viewList();
}
