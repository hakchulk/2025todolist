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
    alert("Enter your to-do item");
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
    <li class="d-flex align-items-center gap-3">      
        <i class="btnUD fa-regular fa-square${
          item.complete ? "-check" : ""
        }" onclick="done(${idx})"></i>
        
        <input
            class="form-control 
            ${item.complete ? "text-decoration-line-through" : ""} ${
    item.complete ? "btnDisabled" : ""
  }"
            type="text"
            id="inpItem_${idx}"
            placeholder=""
            value="${item.todo}"
            onkeydown="modiEventKeyPress(event, this, ${idx}, '${item.todo}')"
            onblur="modiItem(this, ${idx})"
          />        
        
        <div class="d-flex gap-2">                
          <i class="btnUD btnModi fa-regular fa-pen-to-square ${
            item.complete ? "btnDisabled" : ""
          }" onclick="focusInp(${idx})"></i>
          <i class="btnUD btnDel fa-regular fa-square-minus ${
            item.complete ? "btnDisabled" : ""
          }" onclick="delItem(${idx})"></i>          
        </div>
    </li>
        <hr />
`;

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

function viewList() {
  let s = "";
  for (let i = 0; i < _aList.length; i++) {
    s += getInnerText(_aList[i], i);
  }
  const lst = document.querySelector(".todoView");
  lst.innerHTML = s;

  txtInp.value = "";
}

function done(idx) {
  _aList[idx].complete = !_aList[idx].complete;
  saveList();
  viewList();
}

function delItem(idx) {
  const result = confirm(
    `Are you sure you want to delete [${_aList[idx].todo}]?`
  );
  if (result == false) return;

  _aList.splice(idx, 1);
  saveList();
  viewList();
}
