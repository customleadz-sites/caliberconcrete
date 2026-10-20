/* Caliber Concrete LLC — site JS (no dependencies) */
(function () {
  "use strict";

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var sub = a.parentElement;
        if (sub && sub.classList.contains("has-sub") && window.matchMedia("(max-width: 980px)").matches) {
          e.preventDefault();
          var open = sub.classList.toggle("is-open");
          a.setAttribute("aria-expanded", open ? "true" : "false");
          return;
        }
        document.body.classList.remove("nav-open");
      });
    });
  }

  /* ---- Mark current nav link ---- */
  var path = location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
  document.querySelectorAll(".nav a, .aside__list a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").replace(/\.html$/, "");
    if (!href || href.charAt(0) === "#" || /^tel:|^mailto:/.test(href)) return;
    if (href === "/" && (path === "/" || /\/index$/.test(path))) a.setAttribute("aria-current", "page");
    else if (href !== "/" && path.split("/").pop() === href) a.setAttribute("aria-current", "page");
    else if (href === "services" && /driveways|patios|sidewalks|stamped-decorative/.test(path) && a.closest(".nav")) a.setAttribute("aria-current", "page");
  });

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Gallery filters ---- */
  var filters = document.querySelector(".filters");
  if (filters) {
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      filters.querySelectorAll("button").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.getAttribute("data-filter");
      document.querySelectorAll(".gallery figure").forEach(function (fig) {
        var cats = (fig.getAttribute("data-cat") || "").split(" ");
        fig.classList.toggle("is-hidden", f !== "all" && cats.indexOf(f) === -1);
      });
    });
  }

  /* ---- Lightbox (any figure with data-full) ---- */
  var figs = Array.prototype.slice.call(document.querySelectorAll("figure[data-full]"));
  if (figs.length) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">&#8249;</button>' +
      '<img alt="" />' +
      '<button class="lightbox__nav lightbox__nav--next" aria-label="Next">&#8250;</button>' +
      '<div class="lightbox__cap"></div>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lightbox__cap");
    var idx = 0;
    function visible() { return figs.filter(function (f) { return !f.classList.contains("is-hidden"); }); }
    function show(i) {
      var list = visible();
      if (!list.length) return;
      idx = (i + list.length) % list.length;
      var f = list[idx];
      lbImg.src = f.getAttribute("data-full");
      lbImg.alt = (f.querySelector("img") || {}).alt || "";
      var cap = f.querySelector("figcaption");
      lbCap.textContent = cap ? cap.textContent : "";
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function close() { lb.classList.remove("is-open"); document.body.style.overflow = ""; }
    figs.forEach(function (f) { f.addEventListener("click", function () { show(visible().indexOf(f)); }); });
    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lb.querySelector(".lightbox__nav--prev").addEventListener("click", function () { show(idx - 1); });
    lb.querySelector(".lightbox__nav--next").addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---- US phone field: formats as (479) 555-0100 while typing ---- */
  document.querySelectorAll("input[data-us-phone]").forEach(function (input) {
    function format() {
      var d = input.value.replace(/\D/g, "");
      if (d.charAt(0) === "1") d = d.slice(1);
      d = d.slice(0, 10);
      var out = d;
      if (d.length > 6) out = "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6);
      else if (d.length > 3) out = "(" + d.slice(0, 3) + ") " + d.slice(3);
      else if (d.length > 0) out = "(" + d;
      input.value = out;
      input.setCustomValidity(d.length === 10 && /^[2-9]/.test(d) && /^[2-9]/.test(d.slice(3)) ? "" : "Enter a 10-digit US phone number, e.g. (479) 555-0100");
    }
    input.addEventListener("input", format);
    input.addEventListener("blur", format);
    format();
  });

  /* ---- Quote form (Web3Forms via fetch) → /thank-you ----
     The access key lives in the form's hidden "access_key" field — see README.
     Until a real key is in place the form still goes to /thank-you so the flow
     can be reviewed, but nothing is sent. */
  document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (typeof form.reportValidity === "function" && !form.reportValidity()) return;
      var action = form.getAttribute("action") || "";
      var key = (form.querySelector('input[name="access_key"]') || {}).value || "";
      var btn = form.querySelector("button[type=submit]");
      var done = function () { window.location.href = "/thank-you"; };
      if (action.indexOf("api.web3forms.com") === -1 || /YOUR_WEB3FORMS/.test(key)) {
        console.warn("Quote form is not connected yet — add the Web3Forms access key.");
        done();
        return;
      }
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending…"; }
      var data = new FormData(form);
      var ph = form.querySelector("input[data-us-phone]");
      if (ph && ph.value) data.set(ph.name, "+1 " + ph.value);
      fetch(action, { method: "POST", headers: { Accept: "application/json" }, body: data })
        .then(function (r) { return r.json(); })
        .then(function (d) { if (d && d.success) done(); else throw new Error("send failed"); })
        .catch(function () {
          alert("Sorry — something went wrong sending your request. Please call or text (479) 212-3971 and we'll take care of you.");
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || "Send"; }
        });
    });
  });

  /* ---- Service-area map (Leaflet, only on pages with #map) ---- */
  var mapEl = document.getElementById("map");
  if (mapEl && window.L) {
    var towns = [
      ["Gentry", 36.2676, -94.4844, true],
      ["Siloam Springs", 36.1881, -94.5405],
      ["Bentonville", 36.3729, -94.2088],
      ["Centerton", 36.3595, -94.2852],
      ["Rogers", 36.3320, -94.1185],
      ["Springdale", 36.1867, -94.1288],
      ["Fayetteville", 36.0626, -94.1574]
    ];
    var map = L.map(mapEl, { scrollWheelZoom: false, zoomControl: true, attributionControl: true, zoomSnap: 0.25 });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);
    var bounds = [];
    towns.forEach(function (t) {
      var home = !!t[3];
      L.circleMarker([t[1], t[2]], {
        radius: home ? 11 : 8, color: home ? "#F4F2EE" : "#979697", weight: 2,
        fillColor: home ? "#0D335C" : "#1E4A7A", fillOpacity: .95
      }).addTo(map).bindPopup(home ? t[0] + " — Home base" : t[0]);
      bounds.push([t[1], t[2]]);
    });
    // Service radius: Gentry → Springdale (edge of the circle passes through Springdale)
    var home = L.latLng(36.2676, -94.4844), radius = 33141;
    // Set the view FIRST (a circle's bounds can't be read until the map has a center/zoom)
    // Fit the whole circle with a little breathing room top and bottom (the box is wider than it is tall, so height is the limit)
    map.fitBounds(home.toBounds(radius * 2), { padding: [18, 18] });
    L.circle(home, { radius: radius, color: "#BDBCBC", weight: 2, dashArray: "8 8", fillColor: "#1E4A7A", fillOpacity: .22 }).addTo(map);
  }
})();
