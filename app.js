const userLists = document.getElementById("user-list");
const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputUsername = document.getElementById("username");
const inputEmail = document.getElementById("email");

let usersListArray = [];

async function fetchUsers() {
  let res = await fetch("http://localhost:3000/users");
  let users = await res.json();

  renderUsers(users);
  //
}

fetchUsers();

function renderUsers(users) {
  usersListArray = users;
  let template = "";
  users.forEach((user) => {
    template += `<li class="border rounded-lg p-1 mb-2 text-lg flex justify-between items-center")" data-list-id="${user.id}">
        <textarea class="resize-none rounded-lg border h-10" data-textarea-id="${user.id}">${user.name}</textarea>
        <button class="rounded-md bg-red-500 text-white px-2 py-1" data-btn-id="${user.id}">Delete</button></li>`;
  });

  userLists.innerHTML = template;
}

userLists.addEventListener("change", async (e) => {
  if (!e.target.dataset.textareaId) return;
  // console.log(e.target.value);
  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify({
      name: e.target.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  let id = e.target.dataset.textareaId;
  await fetch("http://localhost:3000/users/" + id, requestOptions);
  await fetchUsers();
});

userLists.addEventListener("click", async (e) => {
  if (!e.target.dataset.btnId) return;
  let id = e.target.dataset.btnId;
  await fetch("http://localhost:3000/users/" + id, {
    method: "DELETE",
  });

  await fetchUsers();
});

// function deleteUser(id) {
//   // console.log(id);
//   fetch("http://localhost:3000/users/" + id, {
//     method: "DELETE",
//   }).then(() => fetchUsers());
// }

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
});

// *************************
// *************************

const showUserModal = document.getElementById("show-modal");
showUserModal.classList.add("hidden");

userLists.addEventListener("click", (e) => {
  if (!e.target.dataset.listId) return;
  // console.log(e.target.dataset.listId);
  showUserModal.innerHTML = "";
  let id = e.target.dataset.listId;
  const user = usersListArray.find((user) => user.id == id);
  // console.log(usersListArray, typeof id);

  const div = document.createElement("div");
  div.innerHTML = `
  <h1>NAME : ${user.name}</h1>
  <h1>USERNAME : ${user.username}</h1>
  <h1>Email : ${user.email}</h1>
  `;
  showUserModal.append(div);
  showUserModal.classList.remove("hidden");
  // document.getElementsByTagName("body")[0].classList.add("bg-zinc-800");
});

window.addEventListener("dblclick", (e) => {
  if (e.target.id !== "show-modal") {
    showUserModal.classList.add("hidden");
    // console.log(showUserModal);
  }
});

// function showModal(id) {
//    showUserModal.classList.toggle("hidden");
//   showUserModal.classList.add("block");
//    const user = usersListArray.find((user) => user.id === id);
//   showUserModal.innerHTML = `
//   <h3 class="show-name">Name : ${user.name}</h3>
//     <h3 class="show-username">Username : ${user.username}</h3>
//    <h3 class="show-email">Email : ${user.email}</h3>
//    `;
// }
