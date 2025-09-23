// let _aList = [
//   { todo: "자바", complete: false },
//   { todo: "자바 스크립트", complete: true },
//   { todo: "오늘 할일", complete: false },
// ];

function init() {
  initBtnEventListeners();
  loadList();
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

function addItem() {
  if (txtInp.value == "") {
    alert("할일을 입력하세요");
    return;
  } else {
    // 입력
    _aList.push({ todo: txtInp.value, complete: false });
    saveList();
    viewList();
  }
}

function initBtnEventListeners() {
  txtInp.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addItem();
    }
  });

  btnInp.addEventListener("click", function () {
    addItem();
  });

  btnDelAll.addEventListener("click", function () {
    const result = confirm("Are you sure you want to delete all to-do items?");
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
  let s = `
    <li class="d-flex py-2 align-items-center gap-3">
        
        <i class="btnUD fa-regular fa-square${
          item.complete ? "-check" : ""
        }" onclick="done(${idx})"></i>
        
        <div class="col-9 ${
          item.complete ? "text-decoration-line-through" : ""
        }" ><input
            type="text"
            id="inpItem_${idx}"
            class="form-control ${item.complete ? "btnDisabled" : ""}"
            placeholder=""
            value="${item.todo}"
            onkeydown="modiEventKeyPress(event, this, ${idx}, '${item.todo}')"
            onblur="modiItem(this, ${idx})"
          />        
        </div>
        <div class="d-flex gap-2">                
          <i class="btnUD btnModi fa-regular fa-pen-to-square ${
            item.complete ? "btnDisabled" : ""
          }" onclick="focusInp(${idx})"></i>
          <i class="btnUD btnDel fa-regular fa-square-minus ${
            item.complete ? "btnDisabled" : ""
          }" onclick="delItem(${idx})"></i>
        </div>        
    </li>`;

  return s;
}

function focusInp(idx) {
  const inpItem = document.getElementById(`inpItem_${idx}`);
  inpItem.focus();
}

function modiEventKeyPress(event, obj, idx, valOrg) {
  if (event.key === "Enter") {
    modiItem(obj, idx);
  } else if (event.key === "Escape") {
    obj.value = valOrg;
    txtInp.focus();
  }
}

function modiItem(obj, idx) {
  _aList[idx].todo = obj.value;
  saveList();
  viewList();
}

// function modiItem(obj, idx) {
//   curIdx.value = idx;
//   txtInp.value = _aList[idx].todo;
//   txtInp.focus();
//   toggleBtns();
// }

// function toggleBtns() {
//   btnInp.classList.toggle("d-none");
//   // btnModi.classList.toggle("d-none");
//   btnCancel.classList.toggle("d-none");
// }

function viewList() {
  let s = "";
  for (let i = 0; i < _aList.length; i++) {
    s += getInnerText(_aList[i], i);
  }
  const lst = document.querySelector(".todoView");
  lst.innerHTML = s;

  //if (btnInp.classList.contains("d-none")) btnInp.classList.toggle("d-none");

  // if (btnModi.classList.contains("d-none") == false)
  //   btnModi.classList.toggle("d-none");

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
