(function () {
  var header = document.querySelector(".site-header");
  if (header) {
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 6);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var root = document.querySelector("[data-news-scroller]");
  if (!root) return;

  var viewport = root.querySelector("[data-news-viewport]");
  var track = root.querySelector("[data-news-track]");
  if (!viewport || !track) return;

  var visible = parseInt(root.getAttribute("data-visible"), 10) || 5;

  function setViewportHeight() {
    var items = Array.prototype.slice.call(track.querySelectorAll("[data-news-item]"));
    if (!items.length) return;

    var sample = items.slice(0, Math.min(visible, items.length));
    var total = sample.reduce(function (sum, item) {
      return sum + item.getBoundingClientRect().height;
    }, 0);
    viewport.style.height = Math.max(total, 1) + "px";
  }

  setViewportHeight();
  window.addEventListener("resize", setViewportHeight);
})();
