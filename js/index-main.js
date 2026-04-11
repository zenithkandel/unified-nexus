/**
 * Unified Nexus Main JavaScript
 * Manages: 
 * 1. Three.js Background Rendering
 * 2. Scroll Animations & Navbar state
 * 3. Dynamic Data Fetching (Clubs/Leadership)
 * 4. Application Form Submission
 * 5. Mobile Navigation Menu
 */

/* --- 1. Three.js Hero Geometry (Particles & Wireframes) --- */
function initThreeJS() {
  const container = document.getElementById("canvas-container");
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );
  camera.position.z = 15;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Dynamic Theme Colors for geometry
  const rootStyles = getComputedStyle(document.documentElement);
  const getHex = (varName) => parseInt(rootStyles.getPropertyValue(varName).trim().replace('#', '0x'), 16) || 0xAAAAAA;

  const colors = [
    getHex("--c-716F75"),
    getHex("--c-959294"),
    getHex("--c-AAAAAA"),
    getHex("--c-7F2B3E"),
    getHex("--c-661B28")
  ];

  const geometries = [
    new THREE.TetrahedronGeometry(0.8), // Triangle like
    new THREE.BoxGeometry(0.8, 0.8, 0.8), // Rectangle
    new THREE.OctahedronGeometry(0.8), // Octagon
    new THREE.IcosahedronGeometry(1.2, 0),
  ];

  const particles = [];
  const particleCount = 40; // multiple small animated moving particles

  for (let i = 0; i < particleCount; i++) {
    const geom =
      geometries[Math.floor(Math.random() * geometries.length)];
    const col = colors[Math.floor(Math.random() * colors.length)];
    const mat = new THREE.MeshBasicMaterial({
      color: col,
      wireframe: Math.random() > 0.3, // Mostly wireframe
      transparent: true,
      opacity: Math.random() * 0.3 + 0.1, // very translucent (0.1 to 0.4)
    });

    const mesh = new THREE.Mesh(geom, mat);

    // Random position spread across the view
    mesh.position.x = (Math.random() - 0.5) * 35;
    mesh.position.y = (Math.random() - 0.5) * 20;
    mesh.position.z = (Math.random() - 0.5) * 20 - 5;

    // Random rotation speed
    mesh.userData = {
      rx: (Math.random() - 0.5) * 0.02,
      ry: (Math.random() - 0.5) * 0.02,
      dx: (Math.random() - 0.5) * 0.01,
      dy: (Math.random() - 0.5) * 0.01,
    };

    scene.add(mesh);
    particles.push(mesh);
  }

  // Expose to global scope so the theme switcher can access it
  window.globalParticlesArray = particles;

  function animate() {
    requestAnimationFrame(animate);

    particles.forEach((p) => {
      p.rotation.x += p.userData.rx;
      p.rotation.y += p.userData.ry;
      p.position.x += p.userData.dx;
      p.position.y += p.userData.dy;

      // Wrap around screen
      if (p.position.x > 20) p.position.x = -20;
      if (p.position.x < -20) p.position.x = 20;
      if (p.position.y > 15) p.position.y = -15;
      if (p.position.y < -15) p.position.y = 15;
    });

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
initThreeJS();

/* --- 2. Scroll Animations & Navbar --- */
let animateCount = 0;
let animateTimeout = null;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains("is-visible")) {
          // Cap the delay so fast scrolling doesn't stall the UI, max out at 0.3s
          const delay = Math.min(animateCount * 0.05, 0.3);
          entry.target.style.transitionDelay = `${delay}s`;
          entry.target.classList.add("is-visible");
          animateCount++;
        }
      } else {
        entry.target.classList.remove("is-visible");
        entry.target.style.transitionDelay = "0s";
      }
    });
    clearTimeout(animateTimeout);
    animateTimeout = setTimeout(() => {
      animateCount = 0;
    }, 100); // Reset staggered delay much faster
  },
  { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => observer.observe(el));

window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  const canvasContainer = document.getElementById("canvas-container");
  if (canvasContainer) {
    if (window.scrollY > window.innerHeight * 0.4) {
      canvasContainer.classList.add("scrolled-bg");
      if (window.globalParticlesArray) {
        window.globalParticlesArray.forEach((p, i) => {
          if (i % 2 === 0) p.visible = false;
        });
      }
    } else {
      canvasContainer.classList.remove("scrolled-bg");
      if (window.globalParticlesArray) {
        window.globalParticlesArray.forEach((p, i) => {
          p.visible = true;
        });
      }
    }
  }
});

/* --- 3. Dynamic Data Fetching --- */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const clubsRes = await fetch("api/public/clubs.php");
    const clubsData = await clubsRes.json();
    if (clubsData.success) {
      const grid = document.getElementById("clubs-grid-dynamic");
      const select = document.getElementById("clubId");
      grid.innerHTML = "";
      clubsData.data.forEach((club) => {
        grid.innerHTML += `
                <div class="club-card reveal">
                  <div class="club-image-wrapper">
                    <img src="${club.hero_image_path || "images/clubs/placeholder.jpg"}" alt="${club.name}" class="club-image" onerror="this.src='https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=600&q=80'" />
                    <div class="club-image-overlay"></div>
                  </div>
                  <div class="club-content">
                    <span class="section-label" style="font-size: 0.75rem;">${club.theme_motive || "Creative Arts"}</span>
                    <h3>${club.name}</h3>
                    <p>${club.description}</p>
                  </div>
                </div>
              `;
        const option = document.createElement("option");
        option.value = club.id;
        option.textContent = club.name;
        select.appendChild(option);
      });
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    }

    const execRes = await fetch("api/public/executive.php");
    const execData = await execRes.json();
    if (execData.success) {
      const grid = document.getElementById("leader-grid-dynamic");
      grid.innerHTML = "";
      execData.data.forEach((exec) => {
        grid.innerHTML += `
                <div class="leader-item reveal">
                  <div class="leader-image-wrapper">
                    <img src="${exec.photo_path || "images/leadership/placeholder.png"}" alt="${exec.full_name}" class="leader-image" onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'" />
                  </div>
                  <div class="leader-info">
                    <span class="leader-name">${exec.full_name}</span>
                    <span class="leader-role">${exec.role_title}</span>
                  </div>
                </div>
              `;
      });
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    }
  } catch (error) {
    console.error("Failed to load backend data:", error);
    document.getElementById("clubs-grid-dynamic").innerHTML =
      "<p style='color:var(--c-AAAAAA);'>Could not load clubs at this moment.</p>";
    document.getElementById("leader-grid-dynamic").innerHTML =
      "<p style='color:var(--c-AAAAAA);'>Could not load executives at this moment.</p>";
  }
});

/* --- 4. Handle Application Submit --- */
document
  .getElementById("join-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("submit-btn");
    const msgBox = document.getElementById("form-msg");
    btn.textContent = "Submitting...";
    btn.disabled = true;
    msgBox.className = "form-message";
    msgBox.textContent = "";

    const payload = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      clubId: Number(document.getElementById("clubId").value),
      message: document.getElementById("message").value,
    };

    try {
      const res = await fetch("api/public/apply.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        msgBox.classList.add("success");
        msgBox.textContent =
          "Application submitted! Welcome to the movement.";
        e.target.reset();
      } else {
        msgBox.classList.add("error");
        msgBox.textContent =
          data.message || "Failed to submit process. Check inputs.";
      }
    } catch (err) {
      msgBox.classList.add("error");
      msgBox.textContent = "Network error. Try again.";
    } finally {
      btn.textContent = "Submit Application";
      btn.disabled = false;
    }
  });

/* --- Mobile Menu Logic --- */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link, .btn');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

if (navLinks) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });
}

/* --- Theme Toggle Logic --- */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const currentTheme = localStorage.getItem('nexusTheme') || 'dark';

const setLightMode = () => {
  document.documentElement.setAttribute('data-theme', 'light');
  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = `<svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  }
  localStorage.setItem('nexusTheme', 'light');
};

const setDarkMode = () => {
  document.documentElement.removeAttribute('data-theme');
  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = `<svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }
  localStorage.setItem('nexusTheme', 'dark');
};

// Initialize
if (currentTheme === 'light') {
  setLightMode();
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'light') {
      setDarkMode();
    } else {
      setLightMode();
    }
  });
}