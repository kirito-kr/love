document.addEventListener("DOMContentLoaded", () => {
  const TULIP_ASSET_PATH = "assets/images/tulip.png";

  /* ==========================================================================
     1. HERO SECTION: RANDOMIZED DECORATIVE FLOATING TULIPS
     ========================================================================== */
  function initHeroTulips() {
    const container = document.getElementById("hero-tulips-container");
    if (!container) return;

    const isMobile = window.innerWidth <= 768;
    const tulipCount = isMobile ? 12 : 28; // Reduced count on smaller screens

    for (let i = 0; i < tulipCount; i++) {
      let x = Math.random() * 100;
      let y = Math.random() * 100;

      // Keep center of the hero relatively clear for text readability
      if (x > 25 && x < 75 && y > 20 && y < 75) {
        if (Math.random() > 0.5) {
          x = Math.random() < 0.5 ? Math.random() * 22 : 78 + Math.random() * 20;
        } else {
          y = Math.random() < 0.5 ? Math.random() * 18 : 78 + Math.random() * 20;
        }
      }

      const tulip = document.createElement("img");
      tulip.src = TULIP_ASSET_PATH;
      tulip.alt = ""; // Empty alt for decorative images
      tulip.classList.add("floating-tulip");

      // Randomize dimensions & styling
      const baseSize = isMobile ? 30 : 50;
      const size = baseSize + Math.random() * (isMobile ? 35 : 55);
      const opacity = 0.2 + Math.random() * 0.5;
      const rotation = -35 + Math.random() * 70;
      const duration = 4 + Math.random() * 6;
      const delay = Math.random() * 5;

      tulip.style.left = `${x}%`;
      tulip.style.top = `${y}%`;
      tulip.style.width = `${size}px`;
      tulip.style.opacity = opacity.toString();
      tulip.style.transform = `rotate(${rotation}deg)`;
      tulip.style.animationDuration = `${duration}s`;
      tulip.style.animationDelay = `${delay}s`;

      container.appendChild(tulip);
    }
  }

  /* ==========================================================================
     2. INTERACTIVE TULIPS SECTION ("Do You Know How Important You Are?")
     ========================================================================== */
  function initInteractiveTulips() {
    const cards = document.querySelectorAll(".interactive-tulip-card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const isBloomed = card.classList.contains("bloomed");
        if (!isBloomed) {
          card.classList.add("bloomed");
          const messageText = card.getAttribute("data-message");
          const msgEl = card.querySelector(".card-message");
          if (msgEl && messageText) {
            msgEl.textContent = messageText;
          }

          // Generate petal burst around clicked tulip
          createPetalBurst(card);
        }
      });
    });
  }

  function createPetalBurst(card) {
    const wrapper = card.querySelector(".tulip-wrapper");
    if (!wrapper) return;

    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("card-petal-particle");

      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = 40 + Math.random() * 40;
      const dx = `${Math.cos(angle) * velocity}px`;
      const dy = `${Math.sin(angle) * velocity}px`;

      particle.style.setProperty("--dx", dx);
      particle.style.setProperty("--dy", dy);
      particle.style.left = "50%";
      particle.style.top = "50%";

      wrapper.appendChild(particle);

      setTimeout(() => particle.remove(), 800);
    }
  }

  /* ==========================================================================
     3. TULIP GARDEN SECTION ("Little Things")
     ========================================================================== */
  const gardenContainer = document.getElementById("tulip-garden");
  const noteButtons = document.querySelectorAll(".discovery-note");
  const noteDisplay = document.getElementById("note-text");
  let discoveredCount = 0;

  function initGarden() {
    if (!gardenContainer) return;
    // Start with a few tulips
    for (let i = 0; i < 3; i++) {
      addTulipToGarden(false);
    }

    noteButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const noteText = btn.getAttribute("data-note");
        if (noteDisplay) noteDisplay.textContent = noteText;

        if (!btn.classList.contains("active")) {
          btn.classList.add("active");
          discoveredCount++;
          // Add new tulips as messages are discovered
          addTulipToGarden(true);
          addTulipToGarden(true);
        }
      });
    });
  }

  function addTulipToGarden(animate = true) {
    if (!gardenContainer) return;

    const tulip = document.createElement("img");
    tulip.src = TULIP_ASSET_PATH;
    tulip.alt = "";
    tulip.classList.add("garden-tulip-item");
    if (animate) tulip.classList.add("newly-added");

    // Randomize height and swaying speed slightly
    const height = 60 + Math.random() * 50;
    const delay = Math.random() * 3;
    tulip.style.height = `${height}px`;
    tulip.style.animationDelay = `${delay}s`;

    gardenContainer.appendChild(tulip);
  }

  /* ==========================================================================
     4. FINAL SECTION SURPRISE SEQUENCE
     ========================================================================== */
  const triggerBtn = document.getElementById("trigger-final-btn");
  const overlay = document.getElementById("final-overlay");
  const closeBtn = document.getElementById("close-final-btn");
  const msg1 = document.getElementById("final-msg-1");
  const msg2 = document.getElementById("final-msg-2");

  function initFinalSurprise() {
    if (!triggerBtn || !overlay) return;

    triggerBtn.addEventListener("click", () => {
      overlay.classList.remove("hidden");
      setTimeout(() => overlay.classList.add("active"), 50);

      // Start animations sequence
      startPetalRain();
      startHeartParticles();

      // Fade in text line by line
      setTimeout(() => msg1.classList.add("visible"), 1800);
      setTimeout(() => msg2.classList.add("visible"), 3600);
      setTimeout(() => closeBtn.classList.add("visible"), 4800);
    });

    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
      setTimeout(() => {
        overlay.classList.add("hidden");
        msg1.classList.remove("visible");
        msg2.classList.remove("visible");
        closeBtn.classList.remove("visible");
        stopHeartParticles();
      }, 600);
    });
  }

  // Floating Pink Petals Effect
  function startPetalRain() {
    const petalContainer = document.getElementById("petal-container");
    if (!petalContainer) return;
    petalContainer.innerHTML = "";

    const count = 25;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div");
      petal.classList.add("falling-petal");

      const size = 10 + Math.random() * 15;
      const left = Math.random() * 100;
      const duration = 5 + Math.random() * 7;
      const delay = Math.random() * 5;

      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.2}px`;
      petal.style.left = `${left}%`;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;

      petalContainer.appendChild(petal);
    }
  }

  // Heart-Shaped Particle Effect using HTML5 Canvas
  let heartAnimId = null;
  function startHeartParticles() {
    const canvas = document.getElementById("heart-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    const particles = [];
    const particleCount = window.innerWidth <= 768 ? 60 : 120;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 - 20;

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random() * Math.PI * 2;
      // Heart parametric equation
      const scale = window.innerWidth <= 768 ? 10 : 15;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      particles.push({
        x: cx + hx * scale + (Math.random() - 0.5) * 30,
        y: cy + hy * scale + (Math.random() - 0.5) * 30,
        baseX: cx + hx * scale,
        baseY: cy + hy * scale,
        size: Math.random() * 3 + 1,
        color: `rgba(255, ${120 + Math.random() * 80}, ${160 + Math.random() * 50}, ${0.4 + Math.random() * 0.5})`,
        alpha: Math.random(),
        speed: 0.02 + Math.random() * 0.03
      });
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.alpha += p.speed;
        const currentAlpha = Math.abs(Math.sin(p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ff7597";
        ctx.fill();
      });

      heartAnimId = requestAnimationFrame(render);
    }
    render();
  }

  function stopHeartParticles() {
    if (heartAnimId) cancelAnimationFrame(heartAnimId);
  }

  /* ==========================================================================
     5. AUDIO PLAYER
     ========================================================================== */
  function initAudio() {
    const musicBtn = document.getElementById("music-toggle");
    const audio = document.getElementById("bg-music");
    const musicText = musicBtn ? musicBtn.querySelector(".music-text") : null;

    if (!musicBtn || !audio) return;

    musicBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().then(() => {
          if (musicText) musicText.textContent = "Pause Music";
        }).catch(() => {});
      } else {
        audio.pause();
        if (musicText) musicText.textContent = "Play Music";
      }
    });
  }

  // Initialize all features
  initHeroTulips();
  initInteractiveTulips();
  initGarden();
  initFinalSurprise();
  initAudio();
});