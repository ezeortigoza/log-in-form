// Logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  fetch("api/sessions/current")
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
});
