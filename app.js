const userLists = document.getElementById("user-list");
const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputUsername = document.getElementById("username");
const inputEmail = document.getElementById("email");

let usersListArray = [];

async function fetchUsers() {
  let res = await fetch("http://localhost:3000/users");
  let users = await res.json();
  usersListArray = users.map((user) => {
    return user;
  });
  renderUsers(users);
  //
}

fetchUsers();

function renderUsers(users) {
  let template = "";
  users.forEach((user) => {
    template += `<li
        class="border rounded-lg p-1 mb-2 text-lg flex justify-between items-center" data-id="${user.id}" onclick="showModal(${user.id})"
      >
        <p>${user.name}</p>
        <button class="rounded-md bg-red-500 text-white px-2 py-1" onclick="deleteUser(${user.id})">
          Delete
        </button>
      </li>`;
  });

  userLists.innerHTML = template;
}

function deleteUser(id) {
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
      id: Math.floor(Math.random() * 10000),
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

function showModal(id) {
  showUserModal.classList.toggle("hidden");
  //   showUserModal.classList.add("block");

  const user = usersListArray.find((user) => user.id === id);
  showUserModal.innerHTML = `
  <h3 class="show-name">Name : ${user.name}</h3>
  <h3 class="show-username">Username : ${user.username}</h3>
  <h3 class="show-email">Email : ${user.email}</h3>
  `;
}

// window.addEventListener("click", (e) => {
//   if (e.target.id !== "show-modal") {
//     showUserModal.classList.add("hidden");
//     console.log(showUserModal);
//   }
// });
