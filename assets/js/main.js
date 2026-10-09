(function () {
  'use strict';

  var mobileQuery = window.matchMedia('(max-width: 960px)');

  // Mobile drawer
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  function closeDrawer() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Mega menus: hover on desktop, click everywhere, accordion inside the mobile drawer
  var megaItems = Array.prototype.slice.call(document.querySelectorAll('.has-mega'));
  function setMega(item, open) {
    item.classList.toggle('open', open);
    item.querySelector('.nav-link').setAttribute('aria-expanded', String(open));
  }
  function closeAllMega(except) {
    megaItems.forEach(function (item) { if (item !== except) setMega(item, false); });
  }
  megaItems.forEach(function (item) {
    var button = item.querySelector('.nav-link');
    var timer;
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !item.classList.contains('open');
      closeAllMega(item);
      setMega(item, open);
    });
    item.addEventListener('mouseenter', function () {
      if (mobileQuery.matches) return;
      clearTimeout(timer);
      closeAllMega(item);
      setMega(item, true);
    });
    item.addEventListener('mouseleave', function () {
      if (mobileQuery.matches) return;
      timer = setTimeout(function () { setMega(item, false); }, 150);
    });
  });
  document.addEventListener('click', function (e) {
    if (!mobileQuery.matches && !e.target.closest('.has-mega')) closeAllMega();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeAllMega(); closeDrawer(); }
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { closeAllMega(); closeDrawer(); });
  });

  // Header border on scroll
  var header = document.querySelector('.header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Booking widget tabs
  var searchButtons = document.querySelectorAll('[data-search]');
  searchButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      searchButtons.forEach(function (b) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });
      document.querySelectorAll('[data-pane]').forEach(function (p) {
        p.classList.toggle('active', p.dataset.pane === btn.dataset.search);
      });
    });
  });

  // Pricing: period (monthly / yearly / lifetime) x currency (BDT / USD)
  var BDT_PER_USD = 120;
  var YEARLY_DISCOUNT = 0.8;
  var state = { period: 'monthly', currency: 'BDT' };

  // Convert a USD amount to the selected currency, rounded (BDT to the nearest 100)
  function convert(usd) {
    return state.currency === 'USD' ? Math.round(usd) : Math.round((usd * BDT_PER_USD) / 100) * 100;
  }
  function format(value) {
    return (state.currency === 'USD' ? '$' : '৳ ') + value.toLocaleString('en-US');
  }
  function renderPrices() {
    document.querySelectorAll('.plan').forEach(function (plan) {
      var price = plan.querySelector('.price');
      var amount = price.querySelector('b');
      var unit = price.querySelector('small');
      var note = plan.querySelector('.billing-note');
      var monthly = parseFloat(price.dataset.monthly);
      var lifetime = parseFloat(price.dataset.lifetime);
      if (isNaN(monthly)) return; // custom-priced plan
      if (state.period === 'monthly') {
        amount.textContent = format(convert(monthly));
        unit.textContent = '/month';
        note.textContent = 'Billed monthly';
      } else if (state.period === 'yearly') {
        var perMonth = convert(monthly * YEARLY_DISCOUNT);
        amount.textContent = format(perMonth);
        unit.textContent = '/month';
        note.textContent = 'Billed yearly: ' + format(perMonth * 12);
      } else {
        amount.textContent = format(convert(lifetime));
        unit.textContent = 'one-time';
        note.textContent = 'Self-hosted · 12 months updates';
      }
    });
  }
  function bindSeg(attr, key) {
    var buttons = document.querySelectorAll('[data-' + attr + ']');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state[key] = btn.dataset[attr];
        buttons.forEach(function (b) {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        renderPrices();
      });
    });
  }
  bindSeg('period', 'period');
  bindSeg('currency', 'currency');
  renderPrices();

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
