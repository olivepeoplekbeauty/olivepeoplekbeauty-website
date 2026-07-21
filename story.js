// story.js
window.addEventListener("load", function () {

  const hero = document.querySelector(".hero-content");
  if (hero) hero.classList.add("show");

  const items = document.querySelectorAll(".cards > div, .category-icons > div");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    items.forEach(function(item) {
      item.classList.add("reveal");
      observer.observe(item);
    });
  }

});
