/* Camalyn – script.js
   No libraries needed.
   1. Shows the top nav once the hero has scrolled away.
   2. Filters the recruitment case studies by location.
   (Smooth scrolling and the nav offset are handled in CSS.) */
(function () {
  'use strict';

  /* 1. Nav ------------------------------------------------------------------ */
  var nav  = document.getElementById('main-nav'),
      hero = document.getElementById('top');

  if (nav && hero) {
    if ('IntersectionObserver' in window) {
      // nav appears once less than 100px of the hero is still on screen
      new IntersectionObserver(function (entries) {
        nav.classList.toggle('is-visible', !entries[0].isIntersecting);
      }, { rootMargin: '-100px 0px 0px 0px' }).observe(hero);
    } else {
      nav.classList.add('is-visible');   // very old browsers: just always show it
    }
  }

  /* 2. Case study filter ---------------------------------------------------- */
  // Each card lists its places in data-places (e.g. "london europe").
  var bar = document.getElementById('case-filters');
  if (!bar) { return; }

  var cards   = [].slice.call(document.querySelectorAll('#recruitmentcasestudies .card')),
      buttons = [].slice.call(bar.querySelectorAll('button')),
      status  = document.getElementById('case-filter-status');

  function matches(card, filter) {
    return filter === 'all' ||
      (card.getAttribute('data-places') || '').split(' ').indexOf(filter) > -1;
  }

  function apply(filter) {
    var shown = 0;

    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-filter') === filter);
    });

    cards.forEach(function (card) {
      var show = matches(card, filter);
      card.hidden = !show;
      if (show) {
        shown++;
        card.classList.remove('is-entering');
        void card.offsetWidth;                 // restart the fade-in
        card.classList.add('is-entering');
      }
    });

    if (status) {
      status.textContent = 'Showing ' + shown + ' of ' + cards.length + ' case studies';
    }
  }

  buttons.forEach(function (b) {
    var filter = b.getAttribute('data-filter');
    b.querySelector('.n').textContent =
      cards.filter(function (c) { return matches(c, filter); }).length;
    b.addEventListener('click', function () { apply(filter); });
  });
}());
