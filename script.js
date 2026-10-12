/* =========================================================
   Feliz Cumpleaños, Ana Alcántara — interacciones
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------
     Referencias
     ------------------------------------------------------- */
  var intro       = document.getElementById("intro");
  var startBtn    = document.getElementById("startBtn");
  var flow        = document.getElementById("flow");
  var song        = document.getElementById("song");
  var musicToggle = document.getElementById("musicToggle");
  var musicIcon   = document.getElementById("musicIcon");
  var cakeObj     = document.getElementById("cakeObj");
  var blowBtn     = document.getElementById("blowBtn");
  var typedEl     = document.getElementById("typedText");
  var galleryEl   = document.getElementById("gallery-grid");
  var galleryEmpty= document.getElementById("galleryEmpty");
  var lightbox    = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var replayBtn   = document.getElementById("replayBtn");
  var finalConfettiBtn = document.getElementById("finalConfettiBtn");

  /* =======================================================
     1) Título animado letra por letra
     ======================================================= */
  function splitTitle() {
    var titles = document.querySelectorAll("[data-split]");
    for (var t = 0; t < titles.length; t++) {
      var text = titles[t].textContent;
      titles[t].textContent = "";
      for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        var span = document.createElement("span");
        span.className = ch === " " ? "char space" : "char";
        span.textContent = ch === " " ? "\u00A0" : ch;
        span.style.animationDelay = (0.6 + i * 0.045) + "s";
        titles[t].appendChild(span);
      }
    }
  }

  /* =======================================================
     2) Corazones flotantes de fondo
     ======================================================= */
  var heartsBg = document.getElementById("heartsBg");
  function spawnHearts() {
    if (reduceMotion) return;
    var colors = ["#ff5b8a", "#ff9dc0", "#ffd0e2", "#e91e63", "#ff3b6b"];
    var count = 14;
    for (var i = 0; i < count; i++) {
      var h = document.createElement("span");
      h.className = "heart";
      h.textContent = "\u2665";
      h.style.left = Math.random() * 100 + "%";
      h.style.color = colors[Math.floor(Math.random() * colors.length)];
      var size = 10 + Math.random() * 18;
      h.style.fontSize = size + "px";
      h.style.animationDuration = (10 + Math.random() * 12) + "s";
      h.style.animationDelay = (Math.random() * 12) + "s";
      heartsBg.appendChild(h);
    }
  }

  /* =======================================================
     3) Confeti de corazones (canvas)
     ======================================================= */
  var canvas = document.getElementById("confetti");
  var ctx = canvas.getContext("2d");
  var particles = [];
  var rafId = null;

  function resizeCanvas() {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  var HEART_COLORS = ["#ff5b8a", "#ff9dc0", "#ffd0e2", "#e91e63", "#ff3b6b", "#ff8fb3", "#b3123e"];

  function drawHeart(x, y, size, rot, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    var s = size / 32;
    ctx.scale(s, s);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(0, 2, -4, -4, -11, -4);
    ctx.bezierCurveTo(-22, -4, -22, 10, -22, 10);
    ctx.bezierCurveTo(-22, 18, -12, 26, 0, 34);
    ctx.bezierCurveTo(12, 26, 22, 18, 22, 10);
    ctx.bezierCurveTo(22, 10, 22, -4, 11, -4);
    ctx.bezierCurveTo(4, -4, 0, 2, 0, 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function makeParticle(x, y, spread) {
    var angle = Math.random() * Math.PI * 2;
    var speed = spread * (0.4 + Math.random() * 0.9);
    return {
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (3 + Math.random() * 3),
      size: 14 + Math.random() * 20,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      alpha: 1,
      decay: 0.006 + Math.random() * 0.006
    };
  }

  function burst(originX, originY, amount, spread) {
    if (reduceMotion) return;
    for (var i = 0; i < amount; i++) {
      particles.push(makeParticle(originX, originY, spread || 9));
    }
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.vy += 0.14;          // gravedad
      p.vx *= 0.99;          // fricción
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > window.innerHeight + 60) {
        particles.splice(i, 1);
        continue;
      }
      drawHeart(p.x, p.y, p.size, p.rot, p.color, Math.max(p.alpha, 0));
    }
    if (particles.length) {
      rafId = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafId);
      rafId = null;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  function celebrateCenter() {
    burst(window.innerWidth / 2, window.innerHeight * 0.38, 90, 11);
  }

  /* =======================================================
     4) Pastel: apagar velas
     ======================================================= */
  function blowCandles() {
    if (cakeObj.classList.contains("is-blown")) return;
    cakeObj.classList.add("is-blown");
    blowBtn.textContent = "¡Deseo pedido! 💖";
    blowBtn.disabled = true;

    // Corazones desde cada vela + ráfaga central
    var rect = cakeObj.getBoundingClientRect();
    var candles = cakeObj.querySelectorAll(".candle");
    var baseY = rect.top + rect.height * 0.15;
    for (var i = 0; i < candles.length; i++) {
      var cr = candles[i].getBoundingClientRect();
      burst(cr.left + cr.width / 2, cr.top, 26, 7);
    }
    burst(window.innerWidth / 2, baseY, 60, 10);

    if (song && !song.paused) { /* la música sigue */ }
  }

  blowBtn.addEventListener("click", blowCandles);

  /* =======================================================
     5) Máquina de escribir
     ======================================================= */
  function typeWriter(el) {
    var text = el.getAttribute("data-text") || "";
    el.textContent = "";
    if (reduceMotion) {
      el.textContent = text;
      el.classList.add("is-done");
      return;
    }
    var i = 0;
    (function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, 45 + Math.random() * 45);
      } else {
        el.classList.add("is-done");
      }
    })();
  }

  /* =======================================================
     6) Galería + lightbox
     ======================================================= */
  function initGallery() {
    var figures = galleryEl.querySelectorAll(".polaroid");
    var loaded = 0;

    figures.forEach(function (fig, idx) {
      fig.style.setProperty("--tilt", (idx % 2 === 0 ? -3 : 3) + "deg");
      var img = fig.querySelector("img");
      if (!img) return;

      img.addEventListener("error", function () {
        fig.classList.add("is-empty");
      });
      img.addEventListener("load", function () {
        loaded++;
        galleryEmpty.hidden = true;
      });
      img.addEventListener("click", function () {
        if (fig.classList.contains("is-empty")) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.hidden = false;
      });
    });

    // Aparecer las polaroids al entrar en pantalla
    if ("IntersectionObserver" in window) {
      var ioPola = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (i * 90) + "ms";
            entry.target.classList.add("in");
            ioPola.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      figures.forEach(function (fig) { ioPola.observe(fig); });
    } else {
      figures.forEach(function (fig) { fig.classList.add("in"); });
    }

    // Si ninguna foto cargó, mostrar el mensaje de ayuda
    setTimeout(function () {
      if (loaded === 0) galleryEmpty.hidden = false;
    }, 1200);

    function close() {
      lightbox.hidden = true;
      lightboxImg.src = "";
    }
    lightboxClose.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) close();
    });
  }

  /* =======================================================
     7) Revelado al hacer scroll
     ======================================================= */
  function initReveal() {
    var items = document.querySelectorAll(
      ".scene__title, .card, .final__title, .final__sub, .final__sign, #blowBtn, #replayBtn"
    );
    items.forEach(function (el) { el.classList.add("reveal"); });

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    items.forEach(function (el) { io.observe(el); });

    // Disparar el texto escrito al entrar en la sección de mensaje
    var messageSection = document.getElementById("message");
    var typedOnce = false;
    var ioMsg = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !typedOnce) {
          typedOnce = true;
          typeWriter(typedEl);
          ioMsg.disconnect();
        }
      });
    }, { threshold: 0.4 });
    ioMsg.observe(messageSection);
  }

  /* =======================================================
     8) Música
     ======================================================= */
  function updateMusicIcon() {
    var playing = song && !song.paused && !song.ended;
    musicIcon.textContent = playing ? "🔊" : "🔇";
    musicToggle.classList.toggle("is-muted", !playing);
  }
  function tryPlay() {
    if (!song) return;
    var p = song.play();
    if (p && typeof p.catch === "function") {
      p.catch(function () { /* falta el mp3 o el navegador lo bloqueó */ });
    }
  }
  function initMusic() {
    if (!song) return;
    song.addEventListener("error", function () { musicToggle.hidden = true; });
    musicToggle.addEventListener("click", function () {
      if (song.paused) tryPlay(); else song.pause();
    });
    song.addEventListener("play", updateMusicIcon);
    song.addEventListener("pause", updateMusicIcon);
  }

  /* =======================================================
     9) Arranque
     ======================================================= */
  function start() {
    intro.classList.add("is-hidden");
    musicToggle.hidden = false;
    flow.style.visibility = "visible";
    tryPlay();
    // Ráfaga de bienvenida
    setTimeout(function () {
      burst(window.innerWidth * 0.25, window.innerHeight * 0.3, 40, 9);
      burst(window.innerWidth * 0.75, window.innerHeight * 0.3, 40, 9);
    }, 400);
  }

  function replay() {
    document.getElementById("hero").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    setTimeout(celebrateCenter, reduceMotion ? 0 : 500);
  }

  startBtn.addEventListener("click", start);
  replayBtn.addEventListener("click", replay);
  finalConfettiBtn.addEventListener("click", celebrateCenter);

  // Teclado: Enter/Espacio en intro
  document.addEventListener("keydown", function (e) {
    if (!intro.classList.contains("is-hidden") && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      start();
    }
  });

  /* -------------------------------------------------------
     Init
     ------------------------------------------------------- */
  flow.style.visibility = "hidden";
  splitTitle();
  spawnHearts();
  initGallery();
  initReveal();
  initMusic();
})();
