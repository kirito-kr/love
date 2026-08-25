const TULIP_ASSET_PATH = "assets/images/tulip.png";

function initApp() {
  initHeroTulips();
  initInteractiveTulips();
  initGarden();
  initFinalSurprise();
  initAudio();
}

// Safely execute whether DOM is loading or already parsed
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

/* 1. HERO FLOATING TULIPS */
function initHeroTulips() {
  const container = document.getElementById("hero-tulips-container");
  if (!container) return;

  container.innerHTML = "";
  const isMobile = window.innerWidth <= 768;
  const tulipCount = isMobile ? 10 : 22;

  for (let i = 0; i < tulipCount; i++) {
    let x = Math.random() * 100;
    let y = Math.random() * 100;

    // Preserve central text readability zone
    if (x > 25 && x < 75 && y > 20 && y < 75) {
      x = Math.random() < 0.5 ? Math.random() * 22 : 78 + Math.random() * 20;
    }

    const tulip = document.createElement("img");
    tulip.src = TULIP_ASSET_PATH;
    tulip.alt = "";
    tulip.classList.add("floating-tulip");

    const baseSize = isMobile ? 30 : 50;
    const size = baseSize + Math.random() * (isMobile ? 30 : 50);

    tulip.style.left = `${x}%`;
    tulip.style.top = `${y}%`;
    tulip.style.width = `${size}px`;
    tulip.style.opacity = (0.2 + Math.random() * 0.45).toString();
    tulip.style.transform = `rotate(${-35 + Math.random() * 70}deg)`;
    tulip.style.animationDuration = `${4 + Math.random() * 5}s`;
    tulip.style.animationDelay = `${Math.random() * 4}s`;

    container.appendChild(tulip);
  }
}

/* 2. INTERACTIVE TULIP CARDS */
function initInteractiveTulips() {
  const cards = document.querySelectorAll(".interactive-tulip-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("bloomed")) {
        card.classList.add("bloomed");
        const messageText = card.getAttribute("data-message");
        const msgEl = card.querySelector(".card-message");
        if (msgEl && messageText) {
          msgEl.textContent = messageText;
        }
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
    const velocity = 40 + Math.random() * 30;
    particle.style.setProperty("--dx", `${Math.cos(angle) * velocity}px`);
    particle.style.setProperty("--dy", `${Math.sin(angle) * velocity}px`);
    particle.style.left = "50%";
    particle.style.top = "50%";

    wrapper.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
  }
}

/* 3. TULIP GARDEN SECTION */
function initGarden() {
  const gardenContainer = document.getElementById("tulip-garden");
  const noteButtons = document.querySelectorAll(".discovery-note");
  const noteDisplay = document.getElementById("note-text");

  if (!gardenContainer) return;
  gardenContainer.innerHTML = "";

  // Render initial set of tulips
  for (let i = 0; i < 4; i++) {
    addTulipToGarden(gardenContainer, false);
  }

  noteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const noteText = btn.getAttribute("data-note");
      if (noteDisplay && noteText) {
        noteDisplay.textContent = noteText;
      }

      noteButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Grow garden dynamically
      addTulipToGarden(gardenContainer, true);
      addTulipToGarden(gardenContainer, true);
    });
  });
}

function addTulipToGarden(container, animate = true) {
  const tulip = document.createElement("img");
  tulip.src = TULIP_ASSET_PATH;
  tulip.alt = "";
  tulip.classList.add("garden-tulip-item");
  if (animate) tulip.classList.add("newly-added");

  const height = 65 + Math.random() * 45;
  tulip.style.height = `${height}px`;
  tulip.style.animationDelay = `${Math.random() * 3}s`;

  container.appendChild(tulip);
}

/* 4. FINAL SURPRISE SEQUENCE */
let heartAnimId = null;

function initFinalSurprise() {
  const triggerBtn = document.getElementById("trigger-final-btn");
  const overlay = document.getElementById("final-overlay");
  const closeBtn = document.getElementById("close-final-btn");
  const msg1 = document.getElementById("final-msg-1");
  const msg2 = document.getElementById("final-msg-2");

  if (!triggerBtn || !overlay) return;

  triggerBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    startPetalRain();
    startHeartParticles();

    setTimeout(() => msg1 && msg1.classList.add("visible"), 1500);
    setTimeout(() => msg2 && msg2.classList.add("visible"), 3200);
    setTimeout(() => closeBtn && closeBtn.classList.add("visible"), 4500);
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
      if (msg1) msg1.classList.remove("visible");
      if (msg2) msg2.classList.remove("visible");
      closeBtn.classList.remove("visible");
      if (heartAnimId) cancelAnimationFrame(heartAnimId);
    });
  }
}

function startPetalRain() {
  const petalContainer = document.getElementById("petal-container");
  if (!petalContainer) return;
  petalContainer.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    const petal = document.createElement("div");
    petal.classList.add("falling-petal");
    const size = 10 + Math.random() * 14;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${5 + Math.random() * 6}s`;
    petal.style.animationDelay = `${Math.random() * 4}s`;
    petalContainer.appendChild(petal);
  }
}

function startHeartParticles() {
  const canvas = document.getElementById("heart-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = window.innerWidth <= 768 ? 50 : 100;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2 - 20;

  for (let i = 0; i < particleCount; i++) {
    const t = Math.random() * Math.PI * 2;
    const scale = window.innerWidth <= 768 ? 9 : 14;
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    particles.push({
      x: cx + hx * scale + (Math.random() - 0.5) * 20,
      y: cy + hy * scale + (Math.random() - 0.5) * 20,
      size: Math.random() * 3 + 1,
      color: `rgba(255, ${120 + Math.random() * 80}, ${160 + Math.random() * 50}, ${0.5 + Math.random() * 0.4})`,
      alpha: Math.random(),
      speed: 0.02 + Math.random() * 0.03
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.alpha += p.speed;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.abs(Math.sin(p.alpha));
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#ff7597";
      ctx.fill();
    });
    heartAnimId = requestAnimationFrame(render);
  }
  render();
}

/* 5. AUDIO CONTROLLER */
function initAudio() {
  const musicBtn = document.getElementById("music-toggle");
  const audio = document.getElementById("bg-music");
  if (!musicBtn || !audio) return;

  const musicText = musicBtn.querySelector(".music-text");

  musicBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => {
        if (musicText) musicText.textContent = "Pause Music";
      }).catch((err) => {
        console.warn("Audio playback failed. Ensure asset exists at assets/music/our-song.mp3", err);
      });
    } else {
      audio.pause();
      if (musicText) musicText.textContent = "Play Music";
    }
  });
}
