const userLists = document.getElementById("user-list");
const addUser = document.getElementById("add-user");
const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputUsername = document.getElementById("username");
const inputEmail = document.getElementById("email");
//
let add = true;
addUser.addEventListener("click", () => {
  if (add) form.classList.remove("hidden");
  else form.classList.add("hidden");
  add = !add;
  inputName.value = "";
  inputUsername.value = "";
  inputEmail.value = "";
});
//
let usersListArray = [];

async function fetchUsers() {
  let res = await fetch("http://localhost:3000/users");
  let users = await res.json();

  renderUsers(users);
}

fetchUsers();

async function renderUsers(users) {
  usersListArray = users;
  let template = "";
  users.forEach((user) => {
    template += `<li class="border rounded-lg p-1 mb-2 text-lg flex justify-between items-center" data-list-id="${user.id}">
        <p class="w-52">${user.name}</p>
        <button class="rounded-md bg-orange-500 text-white px-2 py-1"  onclick="showPreview(${user.id})">Preview</button>
        <button class="rounded-md bg-yellow-400 text-white px-2 py-1"  onclick="updateUser(${user.id})">Update</button>
        <button class="rounded-md bg-red-600 text-white px-2 py-1" onclick="deleteUser(${user.id})">Delete</button></li>`;
  });

  userLists.innerHTML = template;
}

// userLists.addEventListener("change", async (e) => {
//   if (!e.target.dataset.textareaId) return;
//   // console.log(e.target.value);
// const requestOptions = {
//   method: "PATCH",
//   body: JSON.stringify({
//     name: e.target.value,
//   }),
//   headers: {
//     "Content-type": "application/json; charset=UTF-8",
//   },
// };
//   let id = e.target.dataset.textareaId;
//   await fetch("http://localhost:3000/users/" + id, requestOptions);
//   await fetchUsers();
// });

// userLists.addEventListener("click", async (e) => {
//   if (!e.target.dataset.btnId) return;
//   let id = e.target.dataset.btnId;
//   await fetch("http://localhost:3000/users/" + id, {
//     method: "DELETE",
//   });

//   await fetchUsers();
// });

function deleteUser(id) {
  // console.log(id);
  fetch("http://localhost:3000/users/" + id, {
    method: "DELETE",
  }).then(() => fetchUsers());
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: Math.floor(Math.random() * 100000),
      name: inputName.value,
      username: inputUsername.value,
      email: inputEmail.value,
    }),
  };

  await fetch("http://localhost:3000/users", requestOptions);
  await fetchUsers();

  inputName.value = "";
  inputUsername.value = "";
  inputEmail.value = "";
  form.classList.add("hidden");
});

// *************************
// *************************

const showUserModal = document.getElementById("show-modal");
const closeModal = document.getElementById("close");

showUserModal.classList.add("hidden");

// userLists.addEventListener("click", (e) => {
//   if (!e.target.dataset.previewId) return;
//   showUserModal.innerHTML = "";
//   let id = e.target.dataset.previewId;
//   const user = usersListArray.find((user) => user.id == id);
//   // console.log(usersListArray, typeof id);

//   showUserModal.innerHTML = `
//   <div class="mx-auto w-7 h-7 rounded-[50%] text-left rotate-45 text-6xl cursor-pointer -translate-y-9" id="close">+</div>
//   <div class="text-lg leading-8 mx-auto">
//     <h1>NAME : ${user.name}</h1>
//     <h1>USERNAME : ${user.username}</h1>
//     <h1>Email : ${user.email}</h1>
//   </div>
//   `;

//   showUserModal.classList.remove("hidden");
// });

document.addEventListener("click", (e) => {
  if (!(e.target.id === "close")) return;
  else showUserModal.classList.add("hidden");
});

// window.addEventListener("dblclick", (e) => {
//   if (e.target.id !== "show-modal") {
//     showUserModal.classList.add("hidden");
//     // console.log(showUserModal);
//   }
// });

function showPreview(id) {
  const user = usersListArray.find((user) => user.id == id);
  // console.log(usersListArray, typeof id);

  showUserModal.innerHTML = `
  <div class="mx-auto w-7 h-7 rounded-[50%] text-left rotate-45 text-6xl cursor-pointer -translate-y-9" id="close">+</div>
  <div class="text-lg leading-8 mx-auto">
    <h1>NAME : ${user.name}</h1>
    <h1>USERNAME : ${user.username}</h1>
    <h1>Email : ${user.email}</h1>
  </div>
  `;

  showUserModal.classList.remove("hidden");
}

// *********************************
// *********************************
// *********************************
// *****      Update         *******

const updateForm = document.getElementById("update-form");
const updateName = document.getElementById("update-name");
const updateUsername = document.getElementById("update-username");
const updateEmail = document.getElementById("update-email");
const closeUpdate = document.getElementById("close-update");

function updateUser(id) {
  updateForm.classList.remove("hidden");
  const user = usersListArray.find((user) => user.id == id);
  // console.log(user);
  updateName.value = user.name;
  updateUsername.value = user.username;
  updateEmail.value = user.email;

  updateForm.onsubmit = async (e) => {
    e.preventDefault();
    const updateOptions = {
      method: "PATCH",
      body: JSON.stringify({
        name: updateName.value,
        username: updateUsername.value,
        email: updateEmail.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    await fetch("http://localhost:3000/users/" + id, updateOptions);
    await fetchUsers();
    // console.log(id);
    updateForm.classList.add("hidden");
  };
}

function closeUpdateForm() {
  updateForm.classList.add("hidden");
}

// window.addEventListener("click", (e) => {
//   if (updateForm.classList.contains("hidden")) return;

//   // if (
//   //   !updateForm.classList.contains("hidden") &&
//   //   e.target.id !== "update-form"
//   // ) {
//   // }
//   console.log(true);
//   e.target === updateForm
//     ? updateForm.classList.remove("hidden")
//     : updateForm.classList.add("hidden");
//   // e.target === modal ? modal.classList.remove("show-modal") : false
// });
