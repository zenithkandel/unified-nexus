/* ==========================================================================
   Unified Nexus — Three.js Scene
   ========================================================================== */

class ThreeScene {
  constructor() {
    this.container = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.mesh = null;
    this.clock = null;
    this.frameCount = 0;
    this.targetFPS = 30;
    this.frameInterval = 1000 / this.targetFPS;
    this.lastFrameTime = 0;

    this.initOnLoad();
  }

  initOnLoad() {
    // Wait for loader to complete
    window.addEventListener('loaderComplete', () => {
      this.init();
    });

    // Fallback if loader doesn't exist
    if (!document.querySelector('.loader')) {
      setTimeout(() => this.init(), 100);
    }
  }

  init() {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded. 3D effects disabled.');
      return;
    }

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Check if we're on mobile
    if (window.innerWidth < 768) {
      return;
    }

    this.container = document.querySelector('.hero__background');
    if (!this.container) return;

    this.createScene();
    this.createMesh();
    this.animate();

    // Handle resize
    window.addEventListener('resize', () => this.onResize());
  }

  createScene() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    // Add canvas
    const canvas = this.renderer.domElement;
    canvas.classList.add('hero__background-canvas');
    canvas.style.pointerEvents = 'none';
    this.container.appendChild(canvas);

    // Clock for animation timing
    this.clock = new THREE.Clock();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
  }

  createMesh() {
    // Create wireframe icosahedron
    const geometry = new THREE.IcosahedronGeometry(1.5, 1);

    // Wireframe material with paper-like color
    const material = new THREE.MeshBasicMaterial({
      color: 0xc8c0b4, // --color-ink-ghost
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0.5, 0, 0);
    this.scene.add(this.mesh);

    // Create floating particles
    this.createParticles();
  }

  createParticles() {
    const particleCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xc8c0b4,
      size: 0.02,
      transparent: true,
      opacity: 0.6
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Throttle to target FPS
    const now = performance.now();
    const delta = now - this.lastFrameTime;

    if (delta < this.frameInterval) return;

    this.lastFrameTime = now - (delta % this.frameInterval);

    const elapsed = this.clock.getElapsedTime();

    // Rotate mesh slowly
    if (this.mesh) {
      this.mesh.rotation.x = elapsed * 0.1;
      this.mesh.rotation.y = elapsed * 0.15;
    }

    // Animate particles
    if (this.particles) {
      this.particles.rotation.y = elapsed * 0.02;

      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(elapsed + i) * 0.001;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    if (!this.container || !this.camera || !this.renderer) return;

    // Skip resize on mobile
    if (window.innerWidth < 768) {
      return;
    }

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.container) {
      const canvas = this.container.querySelector('canvas');
      if (canvas) {
        canvas.remove();
      }
    }
  }
}

// Initialize Three.js scene when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ThreeScene();
});
