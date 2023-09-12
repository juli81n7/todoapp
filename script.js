const newItem = document.querySelector(".new_item");
const count = document.querySelector(".count");
const submitBtn = document.querySelector(".submit");
const checkbox = document.querySelectorAll(".checkbox");
const deleteBox = document.querySelectorAll(".delete");
const completedNumber = document.querySelector(".completed_number");

const top = document.querySelector(".top");
const doneSection = document.querySelector(".done_section");
let shoppingList = [];

window.onload = function () {
  let lS = JSON.parse(localStorage.getItem("shoppingList"));
  console.log(lS);
  shoppingList = lS;
  displayList(shoppingList);
};
function Newitem() {
  let newObject = {};
  let newid = shoppingList.length;
  newObject.text = newItem.value;
  newObject.count = count.value;
  newObject.id = newid;
  newObject.completed = false;
  newObject.deleted = false;

  console.log(shoppingList);
  console.log(newObject);

  shoppingList.push(newObject);

  displayList(shoppingList);

  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

  newItem.value = "";
}

submitBtn.addEventListener("click", () => {
  let newObject = {};
  let newid = shoppingList.length;
  newObject.text = newItem.value;
  newObject.count = count.value;
  newObject.id = newid;
  newObject.completed = false;
  newObject.deleted = false;

  console.log(shoppingList);
  console.log(newObject);

  shoppingList.push(newObject);

  displayList(shoppingList);

  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

  newItem.value = "";
});

newItem.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    let newObject = {};
    let newid = shoppingList.length;
    newObject.text = newItem.value;
    newObject.count = count.value;
    newObject.id = newid;
    newObject.completed = false;
    newObject.deleted = false;

    console.log(shoppingList);
    console.log(newObject);

    shoppingList.push(newObject);

    displayList(shoppingList);

    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

    newItem.value = "";
    count.value = "";
  }
});

count.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    let newObject = {};
    let newid = shoppingList.length;
    newObject.text = newItem.value;
    newObject.count = count.value;
    newObject.id = newid;
    newObject.completed = false;
    newObject.deleted = false;

    console.log(shoppingList);
    console.log(newObject);

    shoppingList.push(newObject);

    displayList(shoppingList);

    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

    newItem.value = "";
    count.value = "";
  }
});

function displayList(list) {
  document.querySelector(".to_do_list").textContent = "";
  document.querySelector(".done_list").textContent = "";
  let completedAmount = 0;
  list.forEach((item) => {
    // create clone
    const cloneToDo = document.querySelector("template#item").content.cloneNode(true);

    // set clone data
    cloneToDo.querySelector("h3").textContent = item.text;

    if (item.count) {
      cloneToDo.querySelector(".antal").value = item.count;
    } else {
      cloneToDo.querySelector(".antal").classList.add("remove");
    }

    cloneToDo.querySelector(".item").id = item.id;

    cloneToDo.querySelector(".delete").id = item.id;

    cloneToDo.querySelector(".delete").addEventListener("click", deleteClick);

    function deleteClick() {
      console.log("DELETE", item.id);
      shoppingList = removeObjectWithId(shoppingList, item.id);
      displayList(shoppingList);
      localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    }

    cloneToDo.querySelector(".checkbox").id = item.id;

    cloneToDo.querySelector(".checkbox").addEventListener("click", doneClick);
    function doneClick() {
      console.log("done", item.id);
      shoppingList = itemWithIdDone(shoppingList, item.id);
      displayList(shoppingList);
      localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
      console.log(shoppingList);
    }

    // append clone to list
    if (item.completed === false) {
      document.querySelector(".to_do_list").appendChild(cloneToDo);
    } else if (item.completed === true) {
      cloneToDo.querySelector(".checkbox").classList.add("active");
      completedAmount = ++completedAmount;
      completedNumber.textContent = `${completedAmount} Completed  `;
      document.querySelector(".done_list").appendChild(cloneToDo);
    }
  });
}

function removeObjectWithId(arr, id) {
  const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  arr.splice(objWithIdIndex, 1);
  return arr;
}

function itemWithIdDone(arr, id) {
  const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  if (objWithIdIndex !== -1) {
    // Check if the object with the given id was found
    if (arr[objWithIdIndex].completed) {
      arr[objWithIdIndex].completed = false; // Mark it as not completed
    } else {
      arr[objWithIdIndex].completed = true; // Mark it as completed
    }
  }

  return arr;
}

top.addEventListener("click", () => {
  console.log("top klik");
  if (doneSection.classList.contains("hidden")) doneSection.classList.remove("hidden");
  else {
    doneSection.classList.add("hidden");
  }
});
completedNumber.addEventListener("click", () => {
  console.log("top klik");
  if (doneSection.classList.contains("hidden")) doneSection.classList.remove("hidden");
  else {
    doneSection.classList.add("hidden");
  }
});
