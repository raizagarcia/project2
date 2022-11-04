// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("project2 JS imported successfully!");
});

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

const overlay = document.getElementById("preloader");

window.addEventListener("load", function () {
  setTimeout(function () {
    overlay.style.opacity = "0";
    overlay.style.transition = "0.3s ease-out";
    overlay.style.display = "none";
  }, 1000);
});
