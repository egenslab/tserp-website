(function () {
  'use strict';

  // Mobile menu
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Header shadow on scroll
  var header = document.querySelector('.header');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 10); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Demo tabs
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });
      document.querySelectorAll('.tab-panel').forEach(function (p) {
        p.classList.toggle('active', p.dataset.panel === tab.dataset.tab);
      });
    });
  });

  // Pricing toggle (cloud monthly vs self-hosted license)
  var billingButtons = document.querySelectorAll('[data-billing]');
  billingButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var mode = btn.dataset.billing;
      billingButtons.forEach(function (b) { b.classList.toggle('active', b === btn); });
      document.querySelectorAll('.price').forEach(function (price) {
        price.querySelector('b').textContent = price.dataset[mode];
        var small = price.querySelector('small');
        small.textContent = small.dataset[mode];
      });
    });
  });

  // Animated counters
  function animateCount(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.decimals || '0', 10);
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var start = null;
    var duration = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var value = (target * eased).toFixed(decimals);
      el.textContent = prefix + Number(value).toLocaleString(undefined, {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
      }) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Reveal on scroll + trigger counters
  document.querySelectorAll('.section-head, .card, .feature, .plan, .faq details, .split > div').forEach(function (el) {
    el.classList.add('reveal');
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.dataset.count) animateCount(el); else el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal, [data-count]').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('[data-count]').forEach(animateCount);
  }

  // Contact form (client-side validation; wire `action` to your backend or form service)
  var form = document.getElementById('contactForm');
  var msg = document.getElementById('formMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['name', 'email'].forEach(function (name) {
      var input = form.elements[name];
      var valid = input.value.trim() !== '' && (name !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value));
      input.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      msg.textContent = 'Please enter your name and a valid email.';
      msg.className = 'form-msg err';
      return;
    }
    msg.textContent = 'Thank you! Our team will contact you within one business day.';
    msg.className = 'form-msg ok';
    form.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
