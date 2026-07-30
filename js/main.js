/* ============================================================
   BLESSED CONSTRUCTION — shared script for ALL pages
   Every page is its own .html file and loads this same file.
   Images live in /images and are referenced by filename.
   ============================================================ */
(function () {
  "use strict";
  var WA = "917010705106"; // WhatsApp number for enquiries

  function $(id) { return document.getElementById(id); }
  function each(sel, fn) { Array.prototype.slice.call(document.querySelectorAll(sel)).forEach(fn); }

  /* ---------- image helper (file path or placeholder svg) ---------- */
  function img(src, alt) {
    return '<img class="pimg" src="' + src + '" alt="' + (alt || "") + '" loading="lazy" ' +
      'style="width:100%;height:100%;object-fit:cover;display:block;">';
  }
  window.BCimg = img;

  /* ---------- nav / progress / scroll ---------- */
  var nav = $("navbar"), prog = $("progress");
  window.addEventListener("scroll", function () {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
    if (prog) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (h > 0 ? (window.scrollY / h * 100) : 0) + "%";
    }
    var bt = $("backTop");
    if (bt) bt.classList.toggle("show", window.scrollY > 600);
  });
  if ($("hamburger")) {
    $("hamburger").addEventListener("click", function () {
      $("navLinks").classList.toggle("open");
    });
  }
  if ($("backTop")) {
    $("backTop").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  // in-page anchors (used on pages that scroll to a section)
  each("[data-go]", function (el) {
    el.addEventListener("click", function (e) {
      var id = el.getAttribute("data-go");
      var t = $(id);
      if (!t) return; // not on this page — let the href navigate normally
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 70, behavior: "smooth" });
      if ($("navLinks")) $("navLinks").classList.remove("open");
    });
  });

  /* ---------- reveal on scroll ---------- */
  var obs = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.12 });
  each(".reveal", function (el) { obs.observe(el); });
  window.BCobserve = function (el) { obs.observe(el); };

  /* ---------- hero title letter animation (home page only) ---------- */
  var ht = $("heroTitle");
  if (ht) {
    var nodes = Array.prototype.slice.call(ht.childNodes), i = 0, out = "";
    function wrap(t) {
      var s = "";
      t.split("").forEach(function (c) {
        if (c === " ") { s += "&nbsp;"; }
        else { s += '<span class="ch" style="animation-delay:' + (0.3 + i * 0.045) + 's">' + c + "</span>"; i++; }
      });
      return s;
    }
    nodes.forEach(function (n) {
      if (n.nodeType === 3) out += wrap(n.textContent);
      else out += '<span class="em">' + wrap(n.textContent) + "</span>";
    });
    ht.innerHTML = out;
    setTimeout(function () {
      each("#heroServices .hsvc", function (el, idx) {
        el.style.animationDelay = (idx * 0.12) + "s";
        el.classList.add("in");
      });
    }, 1000);
  }

  /* ---------- animated stat counters ---------- */
  var cObs = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting || e.target.dataset.done) return;
      e.target.dataset.done = "1";
      var el = e.target,
        target = parseFloat(el.getAttribute("data-count")),
        suf = el.getAttribute("data-suf") || "",
        start = null, dur = 1600;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var val = Math.floor(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = val + suf;
        if (p < 1) requestAnimationFrame(step); else el.textContent = target + suf;
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  each(".num[data-count]", function (el) { cObs.observe(el); });

  /* ---------- FAQ accordion ---------- */
  each(".faq-item", function (item) {
    var q = item.querySelector(".faq-q");
    if (!q) return;
    q.addEventListener("click", function () { item.classList.toggle("open"); });
  });

  /* ---------- testimonials carousel ---------- */
  var tTrack = $("testiTrack"), tDots = $("testiDots");
  if (tTrack && tDots) {
    var cards = tTrack.children, idx = 0;
    function goT(n) {
      idx = (n + cards.length) % cards.length;
      tTrack.style.transform = "translateX(-" + (idx * 100) + "%)";
      each("#testiDots .tdot", function (d, i) { d.classList.toggle("active", i === idx); });
    }
    for (var t = 0; t < cards.length; t++) {
      (function (n) {
        var d = document.createElement("button");
        d.className = "tdot" + (n === 0 ? " active" : "");
        d.setAttribute("aria-label", "Testimonial " + (n + 1));
        d.addEventListener("click", function () { goT(n); });
        tDots.appendChild(d);
      })(t);
    }
    setInterval(function () { goT(idx + 1); }, 6000);
  }

  /* ---------- lightbox ---------- */
  var lb = $("lightbox");
  window.BCopenLightbox = function (src, title, tamil) {
    if (!lb) return;
    $("lbImg").innerHTML = img(src, title);
    $("lbT").textContent = title || "";
    $("lbTm").textContent = tamil || "";
    lb.classList.add("show");
    document.body.classList.add("locked");
  };
  function closeLB() {
    if (!lb) return;
    lb.classList.remove("show");
    document.body.classList.remove("locked");
  }
  if (lb) {
    if ($("lbClose")) $("lbClose").addEventListener("click", closeLB);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });
  }
  // any .gal-item with data-src opens in the lightbox
  each(".gal-item[data-src], .com-item[data-src]", function (el) {
    el.addEventListener("click", function () {
      window.BCopenLightbox(el.getAttribute("data-src"), el.getAttribute("data-title"), el.getAttribute("data-tamil"));
    });
  });

  /* ---------- enquiry modal ---------- */
  var enqBg = $("enqBg");
  function openEnq(svc) {
    if (!enqBg) return;
    if ($("enqForm")) $("enqForm").style.display = "block";
    if ($("enqDone")) $("enqDone").style.display = "none";
    ["eName", "ePhone", "ePlace", "ePrice", "eMsg"].forEach(function (id) { if ($(id)) $(id).value = ""; });
    if ($("eService")) {
      $("eService").selectedIndex = 0;
      if (svc) {
        var sel = $("eService");
        for (var i = 0; i < sel.options.length; i++) {
          if (sel.options[i].value === svc) { sel.selectedIndex = i; break; }
        }
      }
    }
    enqBg.classList.add("show");
    document.body.classList.add("locked");
  }
  function closeEnq() {
    if (!enqBg) return;
    enqBg.classList.remove("show");
    document.body.classList.remove("locked");
  }
  window.BCopenEnq = openEnq;
  if (enqBg) {
    if ($("enqClose")) $("enqClose").addEventListener("click", closeEnq);
    enqBg.addEventListener("click", function (e) { if (e.target === enqBg) closeEnq(); });
  }
  if ($("navEnquire")) $("navEnquire").addEventListener("click", function () { openEnq(""); });
  each("[data-enquire]", function (el) {
    el.addEventListener("click", function (ev) {
      ev.stopPropagation();
      ev.preventDefault();
      openEnq(el.getAttribute("data-enquire") || "");
    });
  });
  each(".enquire", function (el) {
    if (el.hasAttribute("data-enquire")) return;
    el.addEventListener("click", function (ev) { ev.stopPropagation(); ev.preventDefault(); openEnq(""); });
  });

  function waSend(fields) {
    var text = "*New Enquiry — Blessed Construction*";
    for (var k in fields) text += "%0A" + k + ": " + encodeURIComponent(fields[k] || "-");
    window.open("https://wa.me/" + WA + "?text=" + text, "_blank", "noopener");
  }

  if ($("enqSend")) {
    $("enqSend").addEventListener("click", function () {
      var ph = $("ePhone");
      if (ph && !ph.value.trim()) { ph.focus(); ph.style.borderColor = "#C0392B"; return; }
      waSend({
        Name: $("eName") ? $("eName").value : "", Phone: ph ? ph.value : "",
        Service: $("eService") ? $("eService").value : "", Place: $("ePlace") ? $("ePlace").value : "",
        Budget: $("ePrice") ? $("ePrice").value : "", Message: $("eMsg") ? $("eMsg").value : ""
      });
      if ($("enqForm")) $("enqForm").style.display = "none";
      if ($("enqDone")) $("enqDone").style.display = "block";
    });
  }

  /* ---------- contact form -> WhatsApp ---------- */
  if ($("contactForm")) {
    $("contactForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var ph = $("cPhone");
      if (ph && !ph.value.trim()) { ph.focus(); return; }
      waSend({
        Name: $("cName") ? $("cName").value : "", Contact: ph ? ph.value : "",
        Service: $("cService") ? $("cService").value : "", Place: $("cPlace") ? $("cPlace").value : "",
        Message: $("cMsg") ? $("cMsg").value : ""
      });
      var b = $("submitBtn");
      if (b) { b.textContent = "✓ Thank you! Sent on WhatsApp"; b.style.background = "var(--green)"; b.style.opacity = "1"; }
    });
  }

  /* ---------- external links always open ---------- */
  each('a[target="_blank"]', function (a) {
    a.addEventListener("click", function (ev) {
      var url = a.getAttribute("href");
      if (url && url.indexOf("http") === 0) {
        ev.preventDefault();
        var w = window.open(url, "_blank", "noopener");
        if (!w) window.location.href = url;
      }
    });
  });

  /* ---------- esc closes overlays ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (lb && lb.classList.contains("show")) { closeLB(); return; }
    if (enqBg && enqBg.classList.contains("show")) { closeEnq(); return; }
  });
})();
