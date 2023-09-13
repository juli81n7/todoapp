// theme selector
const select = document.querySelector("select");
const body = document.querySelector("body");

// input for new item
const newItem = document.querySelector(".new_item");
const count = document.querySelector(".count");
const date = document.querySelector(".date");
const notes = document.querySelector(".more_info");
const submitBtn = document.querySelector(".submit");
const moreNew = document.querySelector(".new_outer");

// error message for new item
const alert = document.querySelector(".alert");
// number of completed
const completedNumber = document.querySelector(".completed_number");

//showing done
const top = document.querySelector(".top");
const doneSection = document.querySelector(".done_section");
const doneHeader = document.querySelector(".done_header");

//defining array
let shoppingList = [];

window.onload = function () {
  let lS = JSON.parse(localStorage.getItem("shoppingList"));
  console.log(lS);
  shoppingList = lS;
  displayList(shoppingList);
  alert.classList.add("no");
};

function createNewObject() {
  if (newItem.value === "") {
    alert.classList.remove("no");
    console.log("error");
  } else {
    let newObject = {};
    let newid = shoppingList.length;
    newObject.text = newItem.value;
    newObject.count = count.value;
    newObject.id = newid;
    newObject.completed = false;
    newObject.deleted = false;
    newObject.notes = notes.value;
    newObject.date = date.value;

    console.log(shoppingList);
    console.log(newObject);

    shoppingList.push(newObject);

    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    displayList(shoppingList);

    newItem.value = "";
    count.value = "";
    date.value = "";
    notes.value = "";
    moreNew.classList.add("hidden");
    alert.classList.add("no");
  }
}

newItem.addEventListener("click", () => {
  moreNew.classList.remove("hidden");
  alert.classList.add("no");
});

submitBtn.addEventListener("click", createNewObject());

newItem.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    createNewObject();
  }
});

count.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    createNewObject();
  }
});
date.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    createNewObject();
  }
});
notes.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    createNewObject();
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
      cloneToDo.querySelector(".antal_label").classList.add("remove");
    }

    if (item.date) {
      cloneToDo.querySelector(".date").value = item.date;
    } else {
      cloneToDo.querySelector(".date").classList.add("remove");
      cloneToDo.querySelector(".date_label").classList.add("remove");
    }
    if (item.notes) {
      cloneToDo.querySelector(".setnotes").textContent = item.notes;
    } else {
      cloneToDo.querySelector(".set_notes_label").classList.add("remove");
      cloneToDo.querySelector(".setnotes").classList.add("remove");
      cloneToDo.querySelector(".set_notes").classList.add("remove");
    }

    if (item.notes || item.date || item.count) {
    } else {
      cloneToDo.querySelector(".view_more_btn").classList.add("remove");
      cloneToDo.querySelector(".item_content_outer").classList.add("remove");
    }

    cloneToDo.querySelector(".item").id = item.id;

    cloneToDo.querySelector(".delete").id = item.id;

    cloneToDo.querySelector(".item").addEventListener("click", expand);
    function expand() {
      if (this.classList.contains("hidden")) {
        this.classList.remove("hidden");
      } else {
        this.classList.add("hidden");
      }
    }

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
      doneHeader.textContent = "Done ( " + completedAmount + " )";
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

window.onclick = function (event) {
  if (event.target.contains(moreNew) && event.target !== moreNew) {
    console.log("You clicked outside the box!");
    moreNew.classList.add("hidden");
    alert.classList.add("no");
  } else {
    console.log("You clicked inside the box!");
  }
};

select.addEventListener("change", () => {
  const selectValue = select.value;
  if (selectValue === "light") {
    body.dataset.theme = "light";
    console.log("fuck af lyst");
    localStorage.setItem("theme", "light");
  } else if (selectValue === "dark") {
    body.dataset.theme = "dark";
    console.log("fuck af mørkt");
    localStorage.setItem("theme", "dark");
  } else if (selectValue === "hawaii") {
    body.dataset.theme = "hawaii";
    console.log("fuck af hawaii");
    localStorage.setItem("theme", "hawaii");
  }
});
