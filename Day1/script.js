const darkbtn = document.getElementById("darkbutton");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", "inactive");
};


if (localStorage.getItem("darkmode") === "active") {
  enableDarkmode();
} else {
  disableDarkmode();
}


darkbtn.addEventListener("click", () => {
  const darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
