/* ==========================================
   CONFIG & CUSTOMIZATION DATA
   ========================================== */
const loveData = {
  herName: "My Love",
  myName: "Yours Always",
  
  heroSubtitle: "For the girl who means the world to me...",
  heroTitle: "I made this little world just for you.",
  heroDesc: "Because sometimes, words aren't enough to explain how important someone can become.",
  
  importanceMessages: [
    "You make ordinary days feel special.",
    "Your presence means more to me than you probably realize.",
    "You are someone I never want to take for granted.",
    "You make my world feel a little warmer.",
    "You're one of the most precious parts of my life."
  ],
  
  favoriteThings: [
    "Your smile",
    "Your laugh",
    "Your kindness",
    "Your personality",
    "Your little habits",
    "The way you care",
    "The way you understand me",
    "The way you make me feel",
    "The little things you probably don't realize I notice"
  ],
  
  promises: [
    {
      title: "I'll listen.",
      desc: "Even when you don't know how to explain what's wrong."
    },
    {
      title: "I'll appreciate you.",
      desc: "Not just on special days, but on ordinary ones too."
    },
    {
      title: "I'll make time for you.",
      desc: "Because you deserve to feel important."
    },
    {
      title: "I'll remind you.",
      desc: "Especially on the days when you forget how amazing you are."
    },
    {
      title: "I'll keep choosing you.",
      desc: "Again and again."
    }
  ],
  
  letterPages: [
    "I've been thinking about how rare it is to find someone who instantly makes the world feel gentler. From the moment you walked into my life, things started feeling a little brighter.",
    "I appreciate everything about you—the way you listen, your warmth, and the effortless way you bring joy into quiet moments. Even the smallest things you do mean the world to me.",
    "Thank you for simply being who you are. Loving you is the easiest, most natural thing I have ever known, and I am so deeply grateful for every second with you."
  ],
  
  gardenMemories: [
    "That random conversation that made me smile.",
    "Those moments when we talk about absolutely nothing.",
    "The little things you do without realizing how much they mean.",
    "The moments I wish I could pause.",
    "Every memory I carry with me."
  ]
};

/* ==========================================
   APPLICATION INITIALIZATION
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
  initHeroScatterTulips();
  initAmbientParticles();
  initImportanceTulips();
  initConstellation();
  initGiftBox();
  initLoveLetter();
  initDigitalGarden();
  initPromises();
  initWordlessHeartCanvas();
  initScrollSequence();
  initSurpriseModal();
  initNavigation();
  initMusicPlayer();
  initCursorTrail();
});

/* ==========================================
   TULIP SVG GENERATOR HELPER
   ========================================== */
function createTulipSVG(color = "#E899A5", width = 80, height = 120) {
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Stem -->
      <path d="M50 80 Q48 115 50 145" stroke="#7A9A60" stroke-width="4" stroke-linecap="round"/>
      <!-- Leaves -->
      <path d="M50 115 Q30 100 25 85 Q38 95 50 115" fill="#8BAE6E"/>
      <path d="M50 125 Q70 110 75 95 Q62 105 50 125" fill="#7A9A60"/>
      <!-- Flower Petals -->
      <path class="petal-back" d="M50 35 Q35 10 50 5 Q65 10 50 35" fill="#C25972"/>
      <path class="petal-left" d="M50 80 C25 60 20 25 40 15 C50 25 48 50 50 80" fill="${color}"/>
      <path class="petal-right" d="M50 80 C75 60 80 25 60 15 C50 25 52 50 50 80" fill="${color}"/>
      <path class="petal-center" d="M50 80 C35 55 38 25 50 20 C62 25 65 55 50 80" fill="#F4C2C2"/>
    </svg>
  `;
}

/* ==========================================
   1. HERO SCATTERED TULIPS
   ========================================== */
function initHeroScatterTulips() {
  const container = document.getElementById("hero-tulip-container");
  if (!container) return;
  
  const count = 14;
  for (let i = 0; i < count; i++) {
    const wrapper = document.createElement("div");
    wrapper.className = "scatter-tulip";
    
    // Random position
    const posX = Math.random() * 92;
    const posY = Math.random() * 88;
    const scale = 0.6 + Math.random() * 0.7;
    const rotation = (Math.random() - 0.5) * 40;
    const opacity = 0.4 + Math.random() * 0.5;
    
    wrapper.style.left = `${posX}%`;
    wrapper.style.top = `${posY}%`;
    wrapper.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    wrapper.style.opacity = opacity;
    
    wrapper.innerHTML = createTulipSVG("#E899A5", 90, 130);
    container.appendChild(wrapper);
  }
}

/* ==========================================
   AMBIENT BACKGROUND CANVAS (PETALS & PARTICLES)
   ========================================== */
function initAmbientParticles() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  const particles = Array.from({ length: 35 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 5 + 3,
    speedY: Math.random() * 0.8 + 0.3,
    speedX: Math.sin(Math.random() * Math.PI) * 0.5,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 1.5,
    opacity: Math.random() * 0.5 + 0.3
  }));
  
  function render() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.5;
      p.rotation += p.rotSpeed;
      
      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      
      // Draw Soft Pink Petal
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 1.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#F4C2C2";
      ctx.fill();
      ctx.restore();
    });
    
    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================
   2. IMPORTANCE BLOOMING TULIPS
   ========================================== */
function initImportanceTulips() {
  const grid = document.getElementById("tulip-buds-grid");
  if (!grid) return;
  
  loveData.importanceMessages.forEach((msg, idx) => {
    const card = document.createElement("div");
    card.className = "tulip-card glass-card";
    card.innerHTML = `
      <div class="tulip-svg-wrapper">
        ${createTulipSVG("#E899A5", 85, 125)}
      </div>
      <div class="tulip-message-text">${msg}</div>
    `;
    card.addEventListener("click", () => {
      card.classList.toggle("bloomed");
    });
    grid.appendChild(card);
  });
}

/* ==========================================
   3. STAR CONSTELLATION
   ========================================== */
function initConstellation() {
  const canvas = document.getElementById("constellation-canvas");
  const container = document.getElementById("star-cards-container");
  if (!canvas || !container) return;
  const ctx = canvas.getContext("2d");
  
  let w = (canvas.width = container.parentElement.clientWidth);
  let h = (canvas.height = container.parentElement.clientHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = container.parentElement.clientWidth;
    h = canvas.height = container.parentElement.clientHeight;
    drawLines();
  });

  // Calculate Heart-Shaped Coordinates for Stars
  const items = loveData.favoriteThings;
  const activated = new Set();
  const starPositions = [];

  items.forEach((item, i) => {
    const t = (i / items.length) * Math.PI * 2;
    // Heart curve math equation
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    
    const posX = (w / 2) + x * (w / 45);
    const posY = (h / 2) + y * (h / 45);

    starPositions.push({ x: posX, y: posY, text: item, id: i });

    // Render Star Element
    const star = document.createElement("div");
    star.className = "star-node";
    star.style.left = `${posX}px`;
    star.style.top = `${posY}px`;

    // Render Popover Card
    const popover = document.createElement("div");
    popover.className = "star-card-popover";
    popover.innerText = item;
    popover.style.left = `${posX + 15}px`;
    popover.style.top = `${posY - 20}px`;

    container.appendChild(star);
    container.appendChild(popover);

    star.addEventListener("click", () => {
      star.classList.add("activated");
      popover.classList.add("visible");
      activated.add(i);
      drawLines();

      if (activated.size === items.length) {
        document.getElementById("constellation-center-message").classList.remove("hidden");
      }
    });
  });

  function drawLines() {
    ctx.clearRect(0, 0, w, h);
    if (activated.size < 2) return;

    ctx.beginPath();
    ctx.strokeStyle = "rgba(232, 153, 165, 0.7)";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);

    const activeIndices = Array.from(activated).sort((a, b) => a - b);
    for (let i = 0; i < activeIndices.length; i++) {
      const posA = starPositions[activeIndices[i]];
      const posB = starPositions[activeIndices[(i + 1) % activeIndices.length]];
      ctx.moveTo(posA.x, posA.y);
      ctx.lineTo(posB.x, posB.y);
    }
    ctx.stroke();
  }
}

/* ==========================================
   4. GIFT BOX INTERACTION
   ========================================== */
function initGiftBox() {
  const giftBox = document.getElementById("gift-box");
  const giftMsg = document.getElementById("gift-message-container");
  if (!giftBox) return;

  giftBox.addEventListener("click", () => {
    giftBox.classList.add("opened");
    setTimeout(() => {
      giftMsg.classList.remove("hidden");
    }, 600);
  });
}

/* ==========================================
   5. LOVE LETTER MODAL & PAGES
   ========================================== */
function initLoveLetter() {
  const envelope = document.getElementById("envelope-element");
  const modal = document.getElementById("letter-modal");
  const closeBtn = document.getElementById("close-letter-btn");
  const body = document.getElementById("letter-body");
  const nextBtn = document.getElementById("letter-next-btn");

  if (!envelope || !modal) return;

  let currentPage = 0;

  envelope.addEventListener("click", () => {
    modal.classList.remove("hidden");
    currentPage = 0;
    renderPage();
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  nextBtn.addEventListener("click", () => {
    currentPage++;
    if (currentPage < loveData.letterPages.length) {
      renderPage();
    } else {
      modal.classList.add("hidden");
    }
  });

  function renderPage() {
    body.style.opacity = 0;
    setTimeout(() => {
      body.innerText = loveData.letterPages[currentPage];
      body.style.opacity = 1;
      
      if (currentPage === loveData.letterPages.length - 1) {
        nextBtn.querySelector("span").innerText = "Close Letter";
      } else {
        nextBtn.querySelector("span").innerText = "There's more...";
      }
    }, 300);
  }
}

/* ==========================================
   6. DIGITAL GARDEN
   ========================================== */
function initDigitalGarden() {
  const garden = document.getElementById("interactive-garden");
  const container = document.getElementById("garden-plants-container");
  const prompt = document.getElementById("garden-prompt");
  if (!garden) return;

  let memoryIndex = 0;

  garden.addEventListener("click", (e) => {
    if (prompt) prompt.style.display = "none";
    
    const rect = garden.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const memory = loveData.gardenMemories[memoryIndex % loveData.gardenMemories.length];
    memoryIndex++;

    const item = document.createElement("div");
    item.className = "planted-item";
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.setAttribute("data-memory", memory);

    // Alternating garden elements
    const icons = ["🌷", "🌸", "💖", "✨", "🦋"];
    item.innerHTML = `<span style="font-size: 2rem;">${icons[memoryIndex % icons.length]}</span>`;

    container.appendChild(item);
  });
}

/* ==========================================
   7. PROMISES GRID
   ========================================== */
function initPromises() {
  const grid = document.getElementById("promises-grid");
  if (!grid) return;

  loveData.promises.forEach(p => {
    const card = document.createElement("div");
    card.className = "promise-card glass-card";
    card.innerHTML = `
      <h3 class="promise-title">${p.title}</h3>
      <p class="promise-desc">${p.desc}</p>
    `;
    grid.appendChild(card);
  });
}

/* ==========================================
   8. WORDLESS HEART PARTICLE CANVAS
   ========================================== */
function initWordlessHeartCanvas() {
  const btn = document.getElementById("show-heart-btn");
  const wrapper = document.getElementById("canvas-heart-wrapper");
  const canvas = document.getElementById("heart-particle-canvas");
  if (!btn || !canvas) return;

  btn.addEventListener("click", () => {
    btn.style.display = "none";
    wrapper.classList.remove("hidden");
    startHeartParticles(canvas);
  });
}

function startHeartParticles(canvas) {
  const ctx = canvas.getContext("2d");
  const w = (canvas.width = canvas.parentElement.clientWidth);
  const h = (canvas.height = canvas.parentElement.clientHeight);

  const particles = [];
  const total = 350;

  for (let i = 0; i < total; i++) {
    const t = Math.random() * Math.PI * 2;
    // Mathematical heart coordinates
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    
    particles.push({
      targetX: (w / 2) + x * 11,
      targetY: (h / 2) + y * 11,
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2.5 + 1,
      speed: Math.random() * 0.04 + 0.02
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#F4C2C2";

    particles.forEach(p => {
      p.x += (p.targetX - p.x) * p.speed;
      p.y += (p.targetY - p.y) * p.speed;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ==========================================
   9. INTERSECTION OBSERVER FOR SEQUENCES
   ========================================== */
function initScrollSequence() {
  const steps = document.querySelectorAll(".final-step");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  steps.forEach(s => observer.observe(s));
}

/* ==========================================
   10. FINAL SURPRISE MODAL
   ========================================== */
function initSurpriseModal() {
  const btn = document.getElementById("final-surprise-btn");
  const overlay = document.getElementById("surprise-overlay");
  const close = document.getElementById("close-surprise-btn");
  const tulipContainer = document.getElementById("grand-tulip-svg");

  if (!btn || !overlay) return;

  btn.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    if (tulipContainer && !tulipContainer.hasChildNodes()) {
      tulipContainer.innerHTML = createTulipSVG("#F4C2C2", 140, 200);
    }
  });

  close.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });
}

/* ==========================================
   12. NAVIGATION & SMOOTH SCROLLING
   ========================================== */
function initNavigation() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (toggle) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("active");
    });
  }

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      if (links) links.classList.remove("active");
      navItems.forEach(n => n.classList.remove("active"));
      item.classList.add("active");
    });
  });
}

/* ==========================================
   13. MUSIC PLAYER TOGGLE
   ========================================== */
function initMusicPlayer() {
  const btn = document.getElementById("music-toggle");
  const audio = document.getElementById("bg-music");
  if (!btn || !audio) return;

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => {
        btn.classList.add("playing");
      }).catch(err => console.log("Audio play deferred:", err));
    } else {
      audio.pause();
      btn.classList.remove("playing");
    }
  });
}

/* ==========================================
   14. CURSOR TRAIL (DESKTOP)
   ========================================== */
function initCursorTrail() {
  const trail = document.getElementById("cursor-trail");
  if (!trail || window.innerWidth < 768) return;

  window.addEventListener("mousemove", (e) => {
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
  });
}