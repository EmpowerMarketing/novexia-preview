/* Novexia Biopharma — site behaviour (no dependencies) */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var INBOX = "Gregory@novexiabio.com";
  /* Forms are handled by Netlify Forms: each <form> has data-netlify="true"
     and a hidden "form-name" field. Netlify detects them at deploy time.
     Email alerts are set in Netlify: Forms > Form notifications. */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Icons (Lucide-style, 24x24, stroke) ---------- */
  var ICONS = {
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>',
    molecule: '<circle cx="12" cy="12" r="2.5"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="m6.6 7.2 3.4 3.1M17.4 7.2 14 10.3M6.6 16.8l3.4-3.1M17.4 16.8 14 13.7"/>',
    flask: '<path d="M9 3h6"/><path d="M10 3v6.2L4.6 18.4A1.7 1.7 0 0 0 6.1 21h11.8a1.7 1.7 0 0 0 1.5-2.6L14 9.2V3"/><path d="M7.5 15h9"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    glasses: '<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 14a2 2 0 0 1 4 0"/><path d="M3 14 4.5 7h2M21 14l-1.5-7h-2"/>',
    drop: '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
    pipeline: '<path d="M4 6h10"/><path d="M4 12h16"/><path d="M4 18h7"/><circle cx="17" cy="6" r="2"/><circle cx="14" cy="18" r="2"/>',
    vial: '<path d="M9 3h6M10 3v4h4V3"/><rect x="8" y="7" width="8" height="14" rx="2"/><path d="M8 13h8"/>',
    tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z"/><circle cx="7.5" cy="7.5" r="1.5"/>'
  };
  function icon(name, cls) {
    return '<svg ' + (cls ? 'class="' + cls + '" ' : "") + 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.molecule) + "</svg>";
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  var AUDIENCE = {
    pro: { label: "Professional / wholesale", cls: "tag--pro" },
    consumer: { label: "Consumer", cls: "tag--consumer" },
    pipeline: { label: "Pipeline", cls: "tag--pipeline" }
  };

  /* ---------- Header: scrolled state + mobile menu ---------- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  if (toggle) {
    var setOpen = function (open) {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && document.body.classList.contains("nav-open")) { setOpen(false); toggle.focus(); } });
    document.querySelectorAll(".primary-nav a").forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    window.matchMedia("(min-width: 1081px)").addEventListener("change", function (m) { if (m.matches) setOpen(false); });
  }

  /* ---------- Current year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Reveal on scroll ---------- */
  function observeReveals(root) {
    var els = (root || document).querySelectorAll(".reveal:not(.in-view), .reborn-img");
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in-view"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Products listing ---------- */
  var products = window.NOVEXIA_PRODUCTS || [];
  var grid = document.getElementById("product-grid");
  if (grid) {
    grid.innerHTML = products.map(function (p, i) {
      var a = AUDIENCE[p.audience] || AUDIENCE.pro;
      var visual = p.image
        ? '<picture><source srcset="' + esc(p.image) + '.webp" type="image/webp"><img src="' + esc(p.image) + '.jpg" alt="" loading="lazy" decoding="async" width="1261" height="370"></picture>'
        : icon(p.icon);
      return '<a class="card card--link product-card reveal" style="--d:' + (i % 3) + '" data-audience="' + esc(p.audience) + '" href="' + esc(p.link || "product.html?id=" + encodeURIComponent(p.id)) + '">' +
        '<div class="visual">' + visual + "</div>" +
        '<span class="tag ' + a.cls + '">' + a.label + "</span>" +
        "<h3>" + esc(p.name) + "</h3>" +
        "<p>" + esc(p.summary) + "</p>" +
        '<ul class="meta"><li>' + icon("tag") + esc(p.family) + "</li><li>" + icon("check") + esc(p.status) + "</li></ul>" +
        '<span class="link-arrow">View details ' + icon("arrow") + "</span></a>";
    }).join("");

    var chips = document.querySelectorAll(".chip[data-filter]");
    var applyFilter = function (f) {
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.dataset.filter === f)); });
      grid.querySelectorAll(".product-card").forEach(function (card) { card.hidden = f !== "all" && card.dataset.audience !== f; });
      var live = document.getElementById("filter-status");
      if (live) live.textContent = grid.querySelectorAll(".product-card:not([hidden])").length + " product families shown";
    };
    chips.forEach(function (c) { c.addEventListener("click", function () { applyFilter(c.dataset.filter); }); });
    var initial = new URLSearchParams(location.search).get("filter");
    if (initial && document.querySelector('.chip[data-filter="' + initial + '"]')) applyFilter(initial);
  }

  /* ---------- Product detail ---------- */
  var detail = document.getElementById("product-detail");
  if (detail) {
    var id = new URLSearchParams(location.search).get("id");
    var p = products.filter(function (x) { return x.id === id; })[0];
    if (!p) {
      detail.innerHTML = '<div class="prose"><h2>Product not found</h2><p>This product may have moved. <a href="products.html">Browse all products</a>.</p></div>';
    } else {
      var a = AUDIENCE[p.audience] || AUDIENCE.pro;
      document.title = p.name + " | Novexia Biopharma";
      var setText = function (sel, txt) { var el = document.querySelector(sel); if (el) el.textContent = txt; };
      setText("[data-p-name]", p.name);
      setText("[data-p-crumb]", p.name);
      setText("[data-p-summary]", p.summary);
      setText("[data-p-family]", p.family);
      var cta = p.audience === "pro"
        ? '<a class="btn btn--blue" href="wholesale.html">Request account access ' + icon("arrow") + '</a><a class="btn btn--ghost" href="hcp.html">HCP resources</a>'
        : p.audience === "consumer"
          ? '<a class="btn btn--blue" href="' + esc(p.link || "contact.html") + '">Learn more ' + icon("arrow") + '</a><a class="btn btn--ghost" href="wholesale.html">Wholesale inquiry</a>'
          : '<a class="btn btn--blue" href="contact.html?topic=updates">Get launch updates ' + icon("arrow") + '</a><a class="btn btn--ghost" href="contact.html?topic=partnership">Partner with us</a>';
      var notice = p.audience === "pro"
        ? '<div class="notice"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg><p>For licensed pharmacies, outsourcing facilities and qualified healthcare organizations only. Not for sale to consumers. Product names, strengths, labeling and pricing are shared after eligibility is verified.</p></div>'
        : p.audience === "pipeline"
          ? '<div class="notice notice--warn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg><p>This product is in development or under evaluation and is not currently available for sale. Details may change.</p></div>'
          : "";
      detail.innerHTML =
        '<div class="detail-grid"><div class="prose reveal">' +
        "<h2>Overview</h2>" + p.overview.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
        '<h2>Highlights</h2><ul class="check-list">' + p.highlights.map(function (h) { return "<li>" + icon("check") + "<span>" + esc(h) + "</span></li>"; }).join("") + "</ul>" +
        notice + "</div>" +
        '<aside class="card aside-card reveal" style="--d:1"><span class="tag ' + a.cls + '">' + a.label + "</span>" +
        '<div class="table-wrap" style="margin:6px 0 24px"><table><tbody>' +
        "<tr><th scope=\"row\">Family</th><td>" + esc(p.family) + "</td></tr>" +
        "<tr><th scope=\"row\">Status</th><td>" + esc(p.status) + "</td></tr>" +
        "<tr><th scope=\"row\">Formats</th><td>" + p.formats.map(esc).join("<br>") + "</td></tr>" +
        '</tbody></table></div><div class="btn-row">' + cta + "</div></aside></div>";
    }
  }

  observeReveals();

  /* ---------- Prefill contact topic from ?topic= ---------- */
  var topicSel = document.querySelector('select[name="topic"]');
  var topicParam = new URLSearchParams(location.search).get("topic");
  if (topicSel && topicParam) {
    Array.prototype.forEach.call(topicSel.options, function (o) { if (o.value === topicParam) topicSel.value = topicParam; });
  }

  /* ---------- Forms: validate, then send to the Novexia inbox ---------- */
  document.querySelectorAll("form[data-inquiry]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var btn = form.querySelector('button[type="submit"]');

    function validateField(field) {
      var input = field.querySelector("input, select, textarea");
      if (!input) return true;
      var ok = input.checkValidity();
      field.classList.toggle("has-error", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      return ok;
    }
    form.querySelectorAll(".field").forEach(function (f) {
      var input = f.querySelector("input, select, textarea");
      if (input) input.addEventListener("blur", function () { if (input.value) validateField(f); });
      if (input) input.addEventListener("input", function () { if (f.classList.contains("has-error")) validateField(f); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll(".field");
      var firstBad = null;
      fields.forEach(function (f) { if (!validateField(f) && !firstBad) firstBad = f; });
      if (firstBad) { var i = firstBad.querySelector("input, select, textarea"); if (i) i.focus(); return; }

      var formData = new FormData(form);
      var data = {};
      formData.forEach(function (v, k) { data[k] = v; });
      if (data["bot-field"]) return; // bot

      btn.disabled = true; btn.setAttribute("aria-busy", "true");
      var label = btn.innerHTML; btn.textContent = "Sending…";
      status.className = "form-status"; status.textContent = "";

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
        .then(function (r) { if (!r.ok) throw new Error("Send failed (" + r.status + ")"); })
        .then(function () {
          form.reset();
          status.className = "form-status is-success";
          status.textContent = "Thank you. Your inquiry has been sent to the Novexia team, and we'll be in touch shortly.";
          status.focus();
        })
        .catch(function () {
          var skip = { "form-name": 1, "bot-field": 1, subject: 1 };
          var body = Object.keys(data).filter(function (k) { return !skip[k]; }).map(function (k) { return k + ": " + data[k]; }).join("\n");
          var href = "mailto:" + INBOX + "?subject=" + encodeURIComponent(data.subject || "Website inquiry") + "&body=" + encodeURIComponent(body);
          status.className = "form-status is-error";
          status.innerHTML = "We couldn't send your message just now. Please <a href=\"" + href + "\">email us directly</a> at " + INBOX + ".";
          status.focus();
        })
        .finally(function () { btn.disabled = false; btn.removeAttribute("aria-busy"); btn.innerHTML = label; });
    });
  });
})();
