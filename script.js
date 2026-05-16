/* ============================================
   SECTOR VII — SCRIPT.JS
   CLASSIFICATION: TOP SECRET
   ============================================ */

(() => {
  "use strict";

  // ─── CUSTOM CURSOR ──────────────────────────
  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursorRing");
  let mouseX = 0,
    mouseY = 0,
    ringX = 0,
    ringY = 0;

  if (cursor && cursorRing) {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      cursorRing.style.left = ringX + "px";
      cursorRing.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    };
    animateRing();
    document
      .querySelectorAll("a, button, input, textarea, .feature-item")
      .forEach((el) => {
        el.addEventListener("mouseenter", () =>
          cursorRing.classList.add("hover"),
        );
        el.addEventListener("mouseleave", () =>
          cursorRing.classList.remove("hover"),
        );
      });
  }

  // ─── LIVE ZULU CLOCK ────────────────────────
  const heroTime = document.getElementById("heroTime");
  const updateClock = () => {
    if (!heroTime) return;
    const now = new Date();
    const h = String(now.getUTCHours()).padStart(2, "0");
    const m = String(now.getUTCMinutes()).padStart(2, "0");
    const s = String(now.getUTCSeconds()).padStart(2, "0");
    heroTime.textContent = `${h}:${m}:${s}Z`;
  };
  updateClock();
  setInterval(updateClock, 1000);

  // ─── NAV SCROLL ─────────────────────────────
  const nav = document.getElementById("nav");
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    },
    { passive: true },
  );

  // ─── MOBILE MENU ────────────────────────────
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  let menuOpen = false;

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle("open", menuOpen);
      document.body.style.overflow = menuOpen ? "hidden" : "";
      const [s0, s1, s2] = navToggle.querySelectorAll("span");
      if (menuOpen) {
        s0.style.transform = "translateY(6px) rotate(45deg)";
        s1.style.opacity = "0";
        s2.style.transform = "translateY(-6px) rotate(-45deg)";
      } else {
        [s0, s1, s2].forEach((s) => {
          s.style.transform = "";
          s.style.opacity = "";
        });
      }
    });
    mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", () => {
        menuOpen = false;
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
        navToggle.querySelectorAll("span").forEach((s) => {
          s.style.transform = "";
          s.style.opacity = "";
        });
      });
    });
  }

  // ─── REVEAL ON SCROLL ───────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
  );
  document
    .querySelectorAll(".reveal, .game-feature")
    .forEach((el) => revealObserver.observe(el));

  // ─── SMOOTH SCROLL ──────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // ─── CONTACT FORM ───────────────────────────
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  if (submitBtn && formStatus) {
    submitBtn.addEventListener("click", () => {
      const fields = document.querySelectorAll(".field");
      let valid = true;
      fields.forEach((field) => {
        if (!field.value.trim()) {
          field.style.background = "rgba(200,64,64,0.08)";
          valid = false;
          setTimeout(() => {
            field.style.background = "";
          }, 1400);
        }
      });
      if (!valid) {
        formStatus.textContent = "// ERROR: INCOMPLETE TRANSMISSION";
        formStatus.style.color = "var(--accent)";
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = "ENCRYPTING...";
      formStatus.textContent = "";
      const msgs = [
        "// ENCRYPTING PAYLOAD",
        "// ROUTING THROUGH SECURE CHANNEL",
        "// TRANSMITTING",
      ];
      let mi = 0;
      const msgInterval = setInterval(() => {
        formStatus.textContent = msgs[mi % msgs.length];
        mi++;
      }, 600);
      setTimeout(() => {
        clearInterval(msgInterval);
        submitBtn.textContent = "TRANSMITTED";
        submitBtn.style.background = "#2a6a2a";
        formStatus.textContent =
          "// TRANSMISSION RECEIVED. STAND BY FOR RESPONSE.";
        formStatus.style.color = "#6aacac";
        setTimeout(() => {
          fields.forEach((f) => (f.value = ""));
          submitBtn.disabled = false;
          submitBtn.textContent = "TRANSMIT";
          submitBtn.style.background = "";
          formStatus.textContent = "";
          formStatus.style.color = "";
        }, 4000);
      }, 2400);
    });
  }

  // ─── MINI CHESSBOARD ────────────────────────
  const board = document.getElementById("chessboardMini");
  if (board) {
    // Simple initial position subset (just a dramatic mid-game look)
    const pieces = {
      0: "♜",
      7: "♜",
      2: "♞",
      5: "♛",
      8: "♟",
      9: "♟",
      14: "♟",
      15: "♟",
      27: "♙",
      35: "♗",
      48: "♙",
      50: "♙",
      53: "♙",
      56: "♖",
      60: "♔",
      63: "♖",
      58: "♘",
      62: "♘",
    };
    for (let i = 0; i < 64; i++) {
      const cell = document.createElement("div");
      const row = Math.floor(i / 8),
        col = i % 8;
      cell.className =
        "chess-cell " + ((row + col) % 2 === 0 ? "light" : "dark");
      if (pieces[i]) {
        const piece = document.createElement("div");
        piece.className = "chess-piece";
        piece.textContent = pieces[i];
        cell.appendChild(piece);
      }
      board.appendChild(cell);
    }
  }

  // ─── TITLE GLITCH ───────────────────────────
  const heroTitle = document.querySelector(".hero-title");
  const glyphs = "█▓▒░▪▫■□⬡▲▶";
  const glitchEl = (el) => {
    const original = el.childNodes[0]?.textContent || "";
    if (!original.trim()) return;
    let i = 0;
    const iv = setInterval(() => {
      if (i >= 4) {
        el.childNodes[0].textContent = original;
        clearInterval(iv);
        return;
      }
      const chars = original.split("");
      const pos = Math.floor(Math.random() * chars.length);
      chars[pos] = glyphs[Math.floor(Math.random() * glyphs.length)];
      el.childNodes[0].textContent = chars.join("");
      i++;
    }, 55);
  };
  if (heroTitle) {
    heroTitle.addEventListener("mouseenter", () => {
      heroTitle
        .querySelectorAll(".line")
        .forEach((line, i) => setTimeout(() => glitchEl(line), i * 60));
    });
    const scheduleGlitch = () => {
      const delay = 7000 + Math.random() * 8000;
      setTimeout(() => {
        const lines = heroTitle.querySelectorAll(".line");
        glitchEl(lines[Math.floor(Math.random() * lines.length)]);
        scheduleGlitch();
      }, delay);
    };
    scheduleGlitch();
  }

  // ─── REDACT HOVER REVEAL ────────────────────
  // Only reveals brand-safe info — no tech stack
  const brandSafe = [
    "GAME STUDIO",
    "INDIE DEV",
    "BUILD. SHIP.",
    "SECTOR VII",
    "CLASSIFIED",
    "AUTHORIZED",
    "LEVEL VII",
    "STAND BY",
    "DEPLOY READY",
    "UNDISCLOSED",
    "MULTIPLE OPS",
  ];
  document.querySelectorAll(".redact").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const fake = brandSafe[Math.floor(Math.random() * brandSafe.length)];
      el.style.background = "transparent";
      el.style.color = "var(--accent)";
      el.textContent = fake;
      setTimeout(() => {
        el.style.background = "";
        el.style.color = "transparent";
        el.textContent = "█".repeat(Math.max(6, fake.length));
      }, 600);
    });
  });

  // ─── STAT COUNT-UP ──────────────────────────
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        const num = parseInt(raw, 10);
        if (isNaN(num)) return;
        let current = 0;
        const step = 16;
        const inc = num / (800 / step);
        const tick = setInterval(() => {
          current += inc;
          if (current >= num) {
            el.textContent = raw;
            clearInterval(tick);
          } else {
            el.textContent = Math.floor(current)
              .toString()
              .padStart(raw.length, "0");
          }
        }, step);
        statObserver.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  document
    .querySelectorAll(".stat-num")
    .forEach((el) => statObserver.observe(el));
})();
