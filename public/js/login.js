async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/chat/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

// function fileupload(event) {
//   event.preventDefault();

//   const fileInput = document.querySelector('#file-js-example input[type=file]');
//   fileInput.onchange = () => {
//     if (fileInput.files.length > 0) {
//       const fileName = document.querySelector('#file-js-example .file-name');
//       fileName.textContent = fileInput.files[0].name;
//     }
// }
// }

// document
//   .querySelector(".login-form")
//   .addEventListener("submit", loginFormHandler, fileupload);

