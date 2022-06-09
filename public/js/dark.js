var app = document.getElementsByTagName("BODY")[0];
if (localStorage.darkMode == "goDark") {
  app.setAttribute("class", "goDark");
} else {
  app.setAttribute("class", " ");
}

function toggle_light_mode() {
  let toggle = document.querySelector(".light-mode-button");
  if (localStorage.getItem("goDark")) {
    toggle.innerText = "Light Mode";
  } else {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();

      if (document.body.classList.contains("goDark")) {
        document.body.classList.remove("goDark");
        localStorage.darkMode = " ";
        toggle.innerText = "Dark Mode";
      } else {
        document.body.classList.add("goDark");
        localStorage.darkMode = "goDark";
        toggle.innerText = "Light Mode";
      }
    });
  }
}

toggle_light_mode();
