var app = document.getElementsByTagName("BODY")[0];
if (localStorage.darkMode == "goDark") {
  app.setAttribute("class", "goDark");
} else {
  app.setAttribute("class", " ");
}

function toggle_light_mode() {
  let toggle = document.querySelector(".light-mode-button");
  if (localStorage.getItem("goDark")) {
    // document.body.classList.add("goDark");
    toggle.innerText = "Light";
  } else {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();

      if (document.body.classList.contains("goDark")) {
        // Turning the theme off:
        document.body.classList.remove("goDark");
        localStorage.darkMode = " ";
        toggle.innerText = "Dark";
      } else {
        document.body.classList.add("goDark");
        localStorage.darkMode = "goDark";
        toggle.innerText = "Light";
      }
    });
  }
}

toggle_light_mode();
