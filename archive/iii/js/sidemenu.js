/* Inner pages: highlight the section being read in the side menu, and keep it in view on small screens */
(function () {
  var links = [].slice.call(document.querySelectorAll('#right a[href^="#"]'));
  if (!links.length) return;
  var items = links.map(function (a) {
    var id = a.getAttribute('href').slice(1);
    return { a: a, t: document.querySelector('a[name="' + id + '"]') || document.getElementById(id) };
  }).filter(function (i) { return i.t; });
  if (!items.length) return;
  var ul = links[0].parentNode.parentNode, current = null, ticking = false;

  function update() {
    ticking = false;
    var line = window.innerHeight * 0.3, active = items[0];
    items.forEach(function (i) { if (i.t.getBoundingClientRect().top <= line) active = i; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) active = items[items.length - 1];
    if (active === current) return;
    current = active;
    items.forEach(function (i) { i.a.classList.toggle('active', i === active); });
    if (ul.scrollWidth > ul.clientWidth) {
      ul.scrollLeft = active.a.offsetLeft - ul.clientWidth / 2 + active.a.offsetWidth / 2;
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
