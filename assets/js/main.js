(function () {
  'use strict';

  // Mobile menu
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // Header border on scroll
  var header = document.querySelector('.header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Generic tab switcher: buttons carry data-<key>, panes carry data-<paneKey>
  function tabs(buttons, panes, key, paneKey) {
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', String(b === btn));
        });
        panes.forEach(function (p) {
          p.classList.toggle('active', p.dataset[paneKey] === btn.dataset[key]);
        });
      });
    });
  }
  tabs(document.querySelectorAll('[data-search]'), document.querySelectorAll('[data-pane]'), 'search', 'pane');
  tabs(document.querySelectorAll('.demo-tabs [data-tab]'), document.querySelectorAll('[data-panel]'), 'tab', 'panel');

  // Pricing toggle: cloud monthly vs self-hosted one-time license
  var billingButtons = document.querySelectorAll('[data-billing]');
  billingButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var mode = btn.dataset.billing;
      billingButtons.forEach(function (b) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      document.querySelectorAll('.price').forEach(function (price) {
        price.querySelector('b').textContent = price.dataset[mode];
        var small = price.querySelector('small');
        small.textContent = small.dataset[mode];
      });
    });
  });

  // Contact form: client-side validation only. Connect it to your backend or a form service.
  var form = document.getElementById('contactForm');
  var msg = document.getElementById('formMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['name', 'email'].forEach(function (name) {
      var input = form.elements[name];
      var value = input.value.trim();
      var valid = value !== '' && (name !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
      input.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      msg.textContent = 'Enter your name and a valid email address.';
      msg.className = 'form-msg err';
      return;
    }
    msg.textContent = 'Thanks. Our team will contact you within one business day.';
    msg.className = 'form-msg ok';
    form.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
