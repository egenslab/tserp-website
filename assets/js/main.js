(function () {
  'use strict';

  var t = window.tsI18n ? window.tsI18n.t : function (s) { return s; };

  // ---------- Scroll position on navigation ----------
  // A new page always opens at the top; links with #section scroll below the sticky header.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  function headerOffset() {
    var h = document.querySelector('.header');
    return (h ? h.offsetHeight : 0) + 12;
  }
  function scrollToHash(hash, smooth) {
    var target = hash && hash.length > 1 && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return false;
    var y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    window.scrollTo({ top: Math.max(0, y), behavior: smooth ? 'smooth' : 'auto' });
    return true;
  }
  window.addEventListener('load', function () {
    if (!scrollToHash(location.hash, false)) window.scrollTo(0, 0);
  });
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var hash = link.getAttribute('href');
    if (hash === '#top') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (scrollToHash(hash, true)) { e.preventDefault(); history.replaceState(null, '', hash); }
  });
  var mobileQuery = window.matchMedia('(max-width: 960px)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---------- Mobile drawer ----------
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  function setDrawer(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', t(open ? 'Close menu' : 'Open menu'));
  }
  toggle.addEventListener('click', function () { setDrawer(!nav.classList.contains('open')); });

  // ---------- Mega menus: hover on desktop, click everywhere, accordion in the drawer ----------
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
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { closeAllMega(); setDrawer(false); });
  });

  // ---------- Language switcher ----------
  var lang = document.getElementById('lang');
  var langBtn = lang.querySelector('.lang-btn');
  var langButtons = lang.querySelectorAll('[data-lang]');
  function setLangMenu(open) {
    lang.classList.toggle('open', open);
    langBtn.setAttribute('aria-expanded', String(open));
  }
  function markLang(code) {
    lang.querySelector('.lang-current').textContent = code === 'bn' ? 'বাং' : 'EN';
    langButtons.forEach(function (b) { b.setAttribute('aria-current', String(b.dataset.lang === code)); });
  }
  langBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    setLangMenu(!lang.classList.contains('open'));
  });
  langButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      if (window.tsI18n) window.tsI18n.apply(b.dataset.lang);
      setLangMenu(false);
    });
  });
  markLang(window.tsI18n ? window.tsI18n.lang : 'en');
  document.addEventListener('ts:langchange', function (e) { markLang(e.detail.lang); });

  // Close popovers on outside click / Escape
  document.addEventListener('click', function (e) {
    if (!mobileQuery.matches && !e.target.closest('.has-mega')) closeAllMega();
    if (!e.target.closest('#lang')) setLangMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeAllMega(); setDrawer(false); setLangMenu(false); }
  });

  // ---------- Header border on scroll ----------
  var header = document.querySelector('.header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Booking widget tabs ----------
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

  // ---------- Pricing: period (monthly / yearly / lifetime) x currency (BDT / USD) ----------
  var BDT_PER_USD = 120;
  var YEARLY_DISCOUNT = 0.8;
  var priceState = { period: 'monthly', currency: 'BDT' };

  // Convert a USD amount to the selected currency, rounded (BDT to the nearest 100)
  function convert(usd) {
    return priceState.currency === 'USD' ? Math.round(usd) : Math.round((usd * BDT_PER_USD) / 100) * 100;
  }
  function format(value) {
    return (priceState.currency === 'USD' ? '$' : '৳ ') + value.toLocaleString('en-US');
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
      if (priceState.period === 'monthly') {
        amount.textContent = format(convert(monthly));
        unit.textContent = t('/month');
        note.textContent = t('Billed monthly');
      } else if (priceState.period === 'yearly') {
        var perMonth = convert(monthly * YEARLY_DISCOUNT);
        amount.textContent = format(perMonth);
        unit.textContent = t('/month');
        note.textContent = t('Billed yearly:') + ' ' + format(perMonth * 12);
      } else {
        amount.textContent = format(convert(lifetime));
        unit.textContent = t('one-time');
        note.textContent = t('Self-hosted · 12 months updates');
      }
    });
  }
  function bindSeg(attr, key) {
    var buttons = document.querySelectorAll('[data-' + attr + ']');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        priceState[key] = btn.dataset[attr];
        buttons.forEach(function (b) {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        renderPrices();
      });
    });
  }
  if (document.querySelector('.plan')) {
    bindSeg('period', 'period');
    bindSeg('currency', 'currency');
    renderPrices();
    document.addEventListener('ts:langchange', renderPrices);
  }

  // ---------- Customer stories carousel ----------
  var carousel = document.getElementById('storiesCarousel');
  if (carousel) {
    var track = carousel.querySelector('.car-track');
    var slides = Array.prototype.slice.call(track.children);
    var dotsWrap = carousel.querySelector('.car-dots');
    var prev = document.querySelector('[data-car="prev"]');
    var next = document.querySelector('[data-car="next"]');
    var autoTimer = null;

    function perView() {
      var w = slides[0].getBoundingClientRect().width;
      return Math.max(1, Math.round(track.clientWidth / w));
    }
    function pageCount() { return Math.max(1, slides.length - perView() + 1); }
    function currentIndex() {
      var left = track.scrollLeft;
      var best = 0;
      slides.forEach(function (s, i) {
        if (Math.abs(s.offsetLeft - slides[0].offsetLeft - left) < Math.abs(slides[best].offsetLeft - slides[0].offsetLeft - left)) best = i;
      });
      return best;
    }
    function goTo(i) {
      var max = pageCount() - 1;
      if (i > max) i = 0;
      if (i < 0) i = max;
      track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }
    function buildDots() {
      dotsWrap.innerHTML = '';
      for (var i = 0; i < pageCount(); i++) {
        var d = document.createElement('button');
        d.type = 'button';
        d.setAttribute('role', 'tab');
        d.setAttribute('aria-label', String(i + 1));
        d.addEventListener('click', goTo.bind(null, i));
        dotsWrap.appendChild(d);
      }
      updateDots();
    }
    function updateDots() {
      var idx = Math.min(currentIndex(), pageCount() - 1);
      Array.prototype.forEach.call(dotsWrap.children, function (d, i) { d.setAttribute('aria-selected', String(i === idx)); });
    }
    prev.addEventListener('click', function () { goTo(currentIndex() - 1); restartAuto(); });
    next.addEventListener('click', function () { goTo(currentIndex() + 1); restartAuto(); });
    var scrollTimer;
    track.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(updateDots, 80);
    }, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(currentIndex() - 1); }
    });
    function startAuto() {
      if (reduceMotion.matches || autoTimer) return;
      autoTimer = setInterval(function () { goTo(currentIndex() + 1); }, 6000);
    }
    function stopAuto() { clearInterval(autoTimer); autoTimer = null; }
    function restartAuto() { stopAuto(); startAuto(); }
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('focusin', stopAuto);
    carousel.addEventListener('focusout', startAuto);
    track.addEventListener('touchstart', stopAuto, { passive: true });
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildDots, 150);
    });
    buildDots();
    startAuto();
  }

  // ---------- Features page: highlight the section in view ----------
  var fnavLinks = document.querySelectorAll('.fnav a');
  if (fnavLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    fnavLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        fnavLinks.forEach(function (a) { a.classList.remove('active'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('active');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.fdetail').forEach(function (el) { spy.observe(el); });
  }

  // ---------- Blog category filter ----------
  var filterButtons = document.querySelectorAll('[data-filter]');
  if (filterButtons.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.dataset.filter;
        filterButtons.forEach(function (b) {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        document.querySelectorAll('#postGrid .post-card').forEach(function (card) {
          card.hidden = cat !== 'all' && card.dataset.cat !== cat;
        });
      });
    });
  }

  // ---------- Contact form: client-side validation only ----------
  // Connect it to your backend or a form service (add action/method and remove preventDefault).
  var form = document.getElementById('contactForm');
  if (form) {
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
        msg.textContent = t('Enter your name and a valid email address.');
        msg.className = 'form-msg err';
        return;
      }
      msg.textContent = t('Thanks. Our team will contact you within one business day.');
      msg.className = 'form-msg ok';
      form.reset();
    });
  }

  // ---------- Blog article: reading progress and table-of-contents highlight ----------
  var article = document.getElementById('article');
  if (article) {
    var bar = document.getElementById('readBar');
    var tocLinks = document.querySelectorAll('#tocNav a');
    var headings = Array.prototype.map.call(tocLinks, function (l) { return document.getElementById(l.getAttribute('href').slice(1)); });
    var onRead = function () {
      var r = article.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.6;
      var pct = Math.min(100, Math.max(0, (-r.top + headerOffset()) / Math.max(total, 1) * 100));
      if (bar) bar.style.width = pct + '%';
      var current = 0;
      headings.forEach(function (h, i) { if (h && h.getBoundingClientRect().top < headerOffset() + 80) current = i; });
      tocLinks.forEach(function (l, i) { l.classList.toggle('active', i === current); });
    };
    window.addEventListener('scroll', onRead, { passive: true });
    onRead();
  }

  // ---------- Footer newsletter: client-side only (connect to your email tool) ----------
  var nl = document.getElementById('newsletterForm');
  if (nl) {
    nl.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = nl.elements.email;
      var nlMsg = document.getElementById('nlMsg');
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      input.classList.toggle('invalid', !valid);
      nlMsg.textContent = t(valid ? 'Thanks for subscribing.' : 'Enter a valid email address.');
      nlMsg.className = 'nl-msg ' + (valid ? 'ok' : 'err');
      if (valid) nl.reset();
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
