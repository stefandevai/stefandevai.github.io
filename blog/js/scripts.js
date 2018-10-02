window.addEventListener("DOMContentLoaded", parallax, false);

var title = document.getElementById("blog-title");
var poem = document.getElementById("poem");

function parallax(e) {
  applyParallax(title, -.2);
  applyParallax(poem, .2);

  requestAnimationFrame(parallax);
}

function applyParallax(el, speed) {
  el.style.transform = "translate3d(0, " + window.scrollY * speed + "px, 0)";
}

