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

//new list
const newListBtn = document.querySelector(".new_list_btn");
const newListInput = document.querySelector(".new_list");

let listName;
let currentlist;
//defining array
let lists = [];

console.log(currentlist);
console.log(lists);

let newid = 0;

window.onload = function () {
  body.dataset.theme = "light";
  if (localStorage.getItem("lists") !== null) {
    console.log("DEN ER GOD NOK");
    let lS = localStorage.getItem("lists");
    lists = JSON.parse(lS);
    // let currentlistindex = pars.findIndex((obj) => obj.name === listName);
    console.log("ls" + lS);
    console.log("parsed", lists[0]);

    currentlist = lists[0].arr;
    document.querySelector("h1").textContent = lists[0].name;
    const currentlistNameString = lists[0].name;

    displayList(currentlist);

    createListBtns();
  } else {
    console.log("DEN ER NULL");
    listName = "default";
    lists.push({ name: listName, arr: [] });
    // let lS = JSON.stringify(lists);
    // localStorage.setItem("lists", lS);
    let currentlistindex = lists.findIndex((obj) => obj.name === listName);
    document.querySelector("h1").textContent = lists[currentlistindex].name;
    currentlist = lists[currentlistindex].arr;
    createListBtns();

    // displayList(currentlist);
  }

  alert.classList.add("no");

  let lStheme = localStorage.getItem("theme");
  console.log(lStheme);
  body.dataset.theme = lStheme;
  select.value = lStheme;
};

newListBtn.addEventListener("click", () => {
  newListInput.classList.remove("no");
  newListInput.focus();

  newListInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      let value = newListInput.value;
      createNewListBtn(value);
      createNewList(value);
    }
  });
});

function createNewList(newname) {
  console.log("new", newname);

  lists.push({ name: newname, arr: [] });
  localStorage.setItem("lists", JSON.stringify(lists));
  let currentlistindex = lists.findIndex((obj) => obj.name === newname);
  currentlist = lists[currentlistindex].arr;
  document.querySelector("h1").textContent = lists[currentlistindex].name;
  displayList(currentlist);
}

function createNewListBtn(name) {
  document.querySelectorAll(".btn_list_inner button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.querySelector(".list_name").textContent = name;
  const cloneBtn = document.querySelector("template#btn").content.cloneNode(true);
  const newClassName = name.split(" ").join("");
  newListInput.classList.add("no");
  newListInput.value = "";
  cloneBtn.querySelector("button").textContent = name;
  cloneBtn.querySelector("button").classList.add(newClassName);
  cloneBtn.querySelector("button").classList.add("active");
  document.querySelector(".btn_list_inner").appendChild(cloneBtn);

  // cloneBtn.querySelector("button").addEventListener("click", (e) => {
  //   // Remove the "active" class from all buttons
  //   document.querySelectorAll(".btn_list_inner button").forEach((btn) => {
  //     btn.classList.remove("active");
  //   });

  //   // Add the "active" class to the clicked button
  //   e.target.classList.add("active");
  // });

  showNewList(name);
}

function createListBtns() {
  lists.forEach((obj) => {
    const cloneBtn = document.querySelector("template#btn").content.cloneNode(true);
    console.log("arr name", obj.name);
    let newname = obj.name;
    cloneBtn.querySelector("button").textContent = obj.name;
    let newClassName = newname.split(" ").join("");
    console.log(newClassName);
    cloneBtn.querySelector("button").classList.add(newClassName);

    cloneBtn.querySelector("button").addEventListener("click", (e) => {
      // Remove the "active" class from all buttons
      document.querySelectorAll(".btn_list_inner button").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add the "active" class to the clicked button
      e.target.classList.add("active");

      showNewList(obj.name);
    });
    document.querySelector(".btn_list_inner").appendChild(cloneBtn);
  });
}

function showNewList(new_list) {
  console.log("klikket");
  lists.forEach((arr) => {
    if (arr.name === new_list) {
      console.log(arr);
      document.querySelector("h1").textContent = arr.name;
      currentlist = arr.arr;
      displayList(arr.arr);
    }
  });
}
function createNewObject() {
  if (newItem.value === "") {
    alert.classList.remove("no");
    console.log("error");
  } else {
    let newObject = {};
    newid = currentlist.length;
    newObject.count = count.value;
    newObject.text = newItem.value;
    newObject.id = newid;
    newObject.completed = false;
    newObject.deleted = false;
    newObject.notes = notes.value;
    newObject.date = date.value;

    console.log(currentlist);

    currentlist.push(newObject);

    console.log("object", newObject);
    console.log("LISTS", lists);

    localStorage.setItem("lists", JSON.stringify(lists));

    displayList(currentlist);

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

submitBtn.addEventListener("click", () => {
  console.log("btn klik");
  createNewObject();
});

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

  console.log("displayer", list);
  // document.querySelector("h2").textContent = list.name;
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
      currentlist = removeObjectWithId(currentlist, item.id);
      displayList(currentlist);
      localStorage.setItem("lists", JSON.stringify(lists));
    }

    cloneToDo.querySelector(".checkbox").id = item.id;

    cloneToDo.querySelector(".checkbox").addEventListener("click", doneClick);

    function doneClick() {
      console.log("done", item.id);
      currentlist = itemWithIdDone(currentlist, item.id);
      displayList(currentlist);
      localStorage.setItem("lists", JSON.stringify(lists));
      console.log(currentlist);
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

// document.querySelector(".complete").addEventListener("click", deleteList);

// function deleteList() {
//   console.log("slet det hele");
//   console.log(lists);
//   let currentlistindex = lists.findIndex((obj) => obj.name === document.querySelector("h1").textContent);
//   console.log(lists[currentlistindex]);
//   const btnclass = lists[currentlistindex].name;
//   console.log(btnclass);

//   delete lists[currentlistindex];
//   localStorage.setItem("lists", JSON.stringify(lists));
//   console.log(lists);
//   console.log(lists[1].arr);
//   currentlist = lists[1].arr;
//   displayList(currentlist);

// }
