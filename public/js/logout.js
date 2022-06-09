async function logout() {
  const response = await fetch("/chat/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

// document.querySelector("#log-out").addEventListener("click", logout);
// document.getElementById('logout').addEventListener('click', logout);
