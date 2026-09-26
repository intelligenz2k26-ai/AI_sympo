/**
 * INTELLI-GENZ-2K26 - ULTRA-PREMIUM PROFESSIONAL AI AMBIENT UNIVERSE
 * Crafted with AAA-tier conference aesthetics (Linear / Apple Intelligence / Vercel style):
 * 
 * 1. Interactive Cursor Spotlight Aura & Energy Comet Trail
 * 2. Click-to-Pulse Neural Synaptic Shockwaves (Sends shockwaves through network)
 * 3. 3D Rotating Quantum Wireframe Core (Tesseract/Icosahedron rotating with mouse parallax)
 * 4. High-Speed Synaptic Photon Packets & Energetic Electric Sparks
 * 5. Floating Quantum Ember Dust Particles with Depth-of-Field Blur
 * 6. Smooth Elastic Gravity Physics on Cursor Movement
 * 7. Minimalist Holographic AI Operators (∇L, θ, QKᵀ, softmax)
 * 100% Non-intrusive, Content & Text Safe.
 */

(function () {
  'use strict';

  // Inject or retrieve canvas
  let canvas = document.getElementById('aiBgCanvas3d');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'aiBgCanvas3d';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.94';
    canvas.style.display = 'block';

    if (document.body.firstChild) {
      document.body.insertBefore(canvas, document.body.firstChild);
    } else {
      document.body.appendChild(canvas);
    }
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  // Mouse kinetics & Trail State
  const mouse = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2,
    vx: 0,
    vy: 0,
    radius: 190,
    isHovering: false,
    trail: []
  };

  // Shockwaves generated on click or fast mouse swipe
  const shockwaves = [];

  window.addEventListener('mousemove', (e) => {
    const prevTargetX = mouse.targetX;
    const prevTargetY = mouse.targetY;

    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.isHovering = true;

    // Add to interactive comet trail
    mouse.trail.push({
      x: e.clientX,
      y: e.clientY,
      age: 0,
      maxAge: 16
    });
    if (mouse.trail.length > 20) mouse.trail.shift();

    // Fast mouse swipe spawns a mini energy ripple
    const speed = Math.hypot(e.clientX - prevTargetX, e.clientY - prevTargetY);
    if (speed > 55 && Math.random() < 0.25) {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 180,
        opacity: 0.5,
        color: Math.random() > 0.5 ? '#00f0ff' : '#00ff66'
      });
    }
  });

  // Click generates full neural ripple shockwave
  window.addEventListener('click', (e) => {
    shockwaves.push({
      x: e.clientX,
      y: e.clientY,
      radius: 5,
      maxRadius: Math.max(width, height) * 0.45,
      opacity: 0.85,
      color: '#00f0ff'
    });
    shockwaves.push({
      x: e.clientX,
      y: e.clientY,
      radius: 5,
      maxRadius: Math.max(width, height) * 0.35,
      opacity: 0.75,
      color: '#00ff66'
    });
  });

  window.addEventListener('mouseleave', () => {
    mouse.isHovering = false;
    mouse.targetX = width / 2;
    mouse.targetY = height / 2;
    mouse.trail = [];
  });

  // =========================================================================
  // 1. SLEEK 3D NEURAL CONSTELATION NODES
  // =========================================================================
  const NODE_COUNT = Math.min(Math.floor((width * height) / 10500), 115);
  const nodes = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 400 - 200,
      vx: (Math.random() - 0.5) * 0.48,
      vy: (Math.random() - 0.5) * 0.48,
      baseRadius: 1.6 + Math.random() * 2.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.035,
      isCyan: Math.random() > 0.45,
      energyCharge: 0
    });
  }

  // =========================================================================
  // 2. SYNAPTIC PHOTON DATA PACKETS
  // =========================================================================
  const pulses = [];
  function createPulse(n1, n2) {
    if (pulses.length > 35) return;
    pulses.push({
      from: n1,
      to: n2,
      progress: 0,
      speed: 0.022 + Math.random() * 0.035,
      color: Math.random() > 0.5 ? '#00f0ff' : '#00ff66'
    });
  }

  // =========================================================================
  // 3. 3D FLOATING QUANTUM EMBER DUST PARTICLES
  // =========================================================================
  const embers = [];
  const EMBER_COUNT = 38;

  for (let i = 0; i < EMBER_COUNT; i++) {
    embers.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.8 + Math.random() * 2.4,
      vy: -0.3 - Math.random() * 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      alpha: 0.2 + Math.random() * 0.6,
      flicker: Math.random() * Math.PI * 2,
      isCyan: Math.random() > 0.5
    });
  }

  // =========================================================================
  // 4. 3D HOLOGRAPHIC QUANTUM CORE (ROTATING WIREFRAME TESSERACT)
  // =========================================================================
  const cubeVertices = [
    { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
    { x: 1, y: 1, z: -1 },   { x: -1, y: 1, z: -1 },
    { x: -1, y: -1, z: 1 },  { x: 1, y: -1, z: 1 },
    { x: 1, y: 1, z: 1 },    { x: -1, y: 1, z: 1 }
  ];

  const cubeEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // back face
    [4, 5], [5, 6], [6, 7], [7, 4], // front face
    [0, 4], [1, 5], [2, 6], [3, 7]  // connecting edges
  ];

  // 3D Math helpers
  function rotateX(y, z, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return { y: y * cos - z * sin, z: y * sin + z * cos };
  }

  function rotateY(x, z, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return { x: x * cos - z * sin, z: x * sin + z * cos };
  }

  function rotateZ(x, y, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return { x: x * cos - y * sin, y: x * sin + y * cos };
  }

  // =========================================================================
  // 5. MINIMALIST FLOATING AI MATHEMATICAL TOKENS
  // =========================================================================
  const aiTokens = [
    '∇L(θ)',
    'softmax(QKᵀ/√d)',
    'E[log P(x)]',
    'AdamW',
    'σ(W·x+b)',
    'λ_reg=1e-4',
    'dim=1024',
    'f(x)=max(0,x)',
    'h_t=tanh(·)',
    'L_G+λL_reg',
    '∂L/∂W',
    'Attention(Q,K,V)'
  ];

  const floatingTokens = [];
  for (let i = 0; i < 11; i++) {
    floatingTokens.push({
      text: aiTokens[i % aiTokens.length],
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -0.2 - Math.random() * 0.28,
      opacity: 0.14 + Math.random() * 0.16,
      size: 10 + Math.floor(Math.random() * 3),
      isCyan: Math.random() > 0.5
    });
  }

  // =========================================================================
  // 6. MAIN ANIMATION & RENDERING LOOP
  // =========================================================================
  let lastTime = performance.now();
  let ambientTime = 0;
  let cubeRot = 0;

  function render(time) {
    const dt = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;
    ambientTime += dt * 0.6;
    cubeRot += dt * 0.45;

    // Smooth spring physics for mouse cursor
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    ctx.clearRect(0, 0, width, height);

    // -----------------------------------------------------------------------
    // A. Ambient Volumetric Luminous Nebulae (Electric Cyan & Neon Emerald)
    // -----------------------------------------------------------------------
    const g1X = width * 0.25 + Math.sin(ambientTime * 0.7) * 90;
    const g1Y = height * 0.22 + Math.cos(ambientTime * 0.6) * 70;
    const grad1 = ctx.createRadialGradient(g1X, g1Y, 15, g1X, g1Y, Math.max(width, height) * 0.48);
    grad1.addColorStop(0, 'rgba(0, 240, 255, 0.075)');
    grad1.addColorStop(0.5, 'rgba(0, 240, 255, 0.02)');
    grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);

    const g2X = width * 0.78 + Math.cos(ambientTime * 0.5) * 90;
    const g2Y = height * 0.76 + Math.sin(ambientTime * 0.6) * 70;
    const grad2 = ctx.createRadialGradient(g2X, g2Y, 15, g2X, g2Y, Math.max(width, height) * 0.45);
    grad2.addColorStop(0, 'rgba(0, 255, 102, 0.065)');
    grad2.addColorStop(0.5, 'rgba(0, 255, 102, 0.018)');
    grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, width, height);

    // -----------------------------------------------------------------------
    // B. Interactive Cursor Spotlight / Flashlight Aura
    // -----------------------------------------------------------------------
    if (mouse.isHovering) {
      const mouseGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 220
      );
      mouseGrad.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
      mouseGrad.addColorStop(0.5, 'rgba(0, 255, 102, 0.04)');
      mouseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = mouseGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2);
      ctx.fill();
    }

    // -----------------------------------------------------------------------
    // C. Interactive Cursor Comet Energy Trail
    // -----------------------------------------------------------------------
    ctx.save();
    for (let i = mouse.trail.length - 1; i >= 0; i--) {
      const pt = mouse.trail[i];
      pt.age += dt * 30;
      if (pt.age >= pt.maxAge) {
        mouse.trail.splice(i, 1);
        continue;
      }
      const trailAlpha = (1 - pt.age / pt.maxAge) * 0.4;
      const trailRadius = (1 - pt.age / pt.maxAge) * 4.5;
      ctx.fillStyle = `rgba(0, 240, 255, ${trailAlpha})`;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, trailRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // -----------------------------------------------------------------------
    // D. Expanding Neural Synaptic Shockwaves (Click & Kinetic Ripples)
    // -----------------------------------------------------------------------
    ctx.save();
    for (let swIdx = shockwaves.length - 1; swIdx >= 0; swIdx--) {
      const sw = shockwaves[swIdx];
      sw.radius += (sw.maxRadius - sw.radius) * 0.08 + 3.5;
      sw.opacity *= 0.94;

      if (sw.opacity < 0.02 || sw.radius >= sw.maxRadius) {
        shockwaves.splice(swIdx, 1);
        continue;
      }

      ctx.strokeStyle = sw.color;
      ctx.shadowColor = sw.color;
      ctx.shadowBlur = 10;
      ctx.lineWidth = Math.max(1, 2.5 * sw.opacity);
      ctx.globalAlpha = sw.opacity;
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.stroke();

      // Energize nodes crossed by the shockwave
      nodes.forEach(n => {
        const d = Math.hypot(n.x - sw.x, n.y - sw.y);
        if (Math.abs(d - sw.radius) < 22) {
          n.energyCharge = Math.min(n.energyCharge + 0.5, 1);
        }
      });
    }
    ctx.restore();

    // -----------------------------------------------------------------------
    // E. 3D Rotating Quantum Wireframe Core (Holographic Tesseract)
    // -----------------------------------------------------------------------
    ctx.save();
    // Positioned in top-right or center background with gentle mouse parallax
    const cubeCenterX = width * 0.82 + (mouse.x - width / 2) * 0.06;
    const cubeCenterY = height * 0.28 + (mouse.y - height / 2) * 0.06;
    const cubeSize = 58;

    const rotAngY = cubeRot + (mouse.x / width) * 0.8;
    const rotAngX = cubeRot * 0.6 + (mouse.y / height) * 0.8;
    const rotAngZ = cubeRot * 0.3;

    const projectedCube = cubeVertices.map(v => {
      let r = rotateY(v.x * cubeSize, v.z * cubeSize, rotAngY);
      r = rotateX(v.y * cubeSize, r.z, rotAngX);
      const rz = rotateZ(r.x, r.y, rotAngZ);
      const depth = r.z + 320;
      const scale = 320 / Math.max(depth, 10);
      return {
        x: cubeCenterX + rz.x * scale,
        y: cubeCenterY + rz.y * scale,
        scale: scale,
        z: r.z
      };
    });

    // Draw cube edges
    ctx.lineWidth = 1;
    cubeEdges.forEach(edge => {
      const p1 = projectedCube[edge[0]];
      const p2 = projectedCube[edge[1]];
      const avgZ = (p1.z + p2.z) / 2;
      const alpha = Math.min(0.42, Math.max(0.1, 0.3 + avgZ * 0.002));

      ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });

    // Draw cube vertices
    projectedCube.forEach(p => {
      ctx.fillStyle = 'rgba(0, 255, 102, 0.6)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
      ctx.fill();
    });

    // Outer faint HUD ring around quantum core
    ctx.strokeStyle = 'rgba(0, 255, 102, 0.22)';
    ctx.setLineDash([8, 6, 2, 6]);
    ctx.beginPath();
    ctx.arc(cubeCenterX, cubeCenterY, cubeSize * 1.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(0, 240, 255, 0.55)';
    ctx.font = '8px "Share Tech Mono", monospace';
    ctx.fillText('QUANTUM MATRIX // SYNCED', cubeCenterX - 55, cubeCenterY + cubeSize * 1.8);
    ctx.restore();

    // -----------------------------------------------------------------------
    // F. Floating Quantum Ember Dust Particles
    // -----------------------------------------------------------------------
    ctx.save();
    embers.forEach(emb => {
      emb.y += emb.vy;
      emb.x += emb.vx;
      emb.flicker += dt * 3;

      if (emb.y < -10) emb.y = height + 10;
      if (emb.x < -10) emb.x = width + 10;
      if (emb.x > width + 10) emb.x = -10;

      const shimmer = emb.alpha * (0.7 + 0.3 * Math.sin(emb.flicker));
      ctx.fillStyle = emb.isCyan
        ? `rgba(0, 240, 255, ${shimmer})`
        : `rgba(0, 255, 102, ${shimmer})`;
      ctx.beginPath();
      ctx.arc(emb.x, emb.y, emb.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // -----------------------------------------------------------------------
    // G. Floating AI Mathematical Tokens (Subtle & Elegant)
    // -----------------------------------------------------------------------
    ctx.save();
    floatingTokens.forEach(tok => {
      tok.x += tok.vx;
      tok.y += tok.vy;

      if (tok.y < -30) tok.y = height + 30;
      if (tok.x < -40) tok.x = width + 40;
      if (tok.x > width + 40) tok.x = -40;

      const dx = tok.x - mouse.x;
      const dy = tok.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 150) {
        const force = (1 - dist / 150) * 1.8;
        tok.x += (dx / dist) * force;
        tok.y += (dy / dist) * force;
      }

      ctx.font = `${tok.size}px "Share Tech Mono", monospace`;
      ctx.fillStyle = tok.isCyan
        ? `rgba(0, 240, 255, ${tok.opacity})`
        : `rgba(0, 255, 102, ${tok.opacity})`;
      ctx.fillText(tok.text, tok.x, tok.y);
    });
    ctx.restore();

    // -----------------------------------------------------------------------
    // H. Update Neural Nodes & Cursor Elastic Physics
    // -----------------------------------------------------------------------
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.pulse += n.pulseSpeed;
      n.energyCharge = Math.max(0, n.energyCharge - dt * 0.8);

      n.x += n.vx;
      n.y += n.vy;

      if (n.x < -20) n.x = width + 20;
      if (n.x > width + 20) n.x = -20;
      if (n.y < -20) n.y = height + 20;
      if (n.y > height + 20) n.y = -20;

      // Mouse Proximity Elastic Pull
      const dx = mouse.x - n.x;
      const dy = mouse.y - n.y;
      const dist = Math.hypot(dx, dy);

      if (dist < mouse.radius && mouse.isHovering) {
        const factor = (1 - dist / mouse.radius);
        n.x += (dx / dist) * factor * 1.8;
        n.y += (dy / dist) * factor * 1.8;
      }
    }

    // -----------------------------------------------------------------------
    // I. Render Synapses (Fine, Luminous Interconnection Filaments)
    // -----------------------------------------------------------------------
    const MAX_CONNECT_DIST = 145;

    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < MAX_CONNECT_DIST) {
          const baseAlpha = (1 - dist / MAX_CONNECT_DIST) * 0.28;
          const boost = Math.max(n1.energyCharge, n2.energyCharge) * 0.5;
          const alpha = Math.min(0.85, baseAlpha + boost);

          ctx.strokeStyle = n1.isCyan
            ? `rgba(0, 240, 255, ${alpha})`
            : `rgba(0, 255, 102, ${alpha})`;
          ctx.lineWidth = boost > 0.2 ? 1.4 : 0.8;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();

          // Occasionally spawn a high-speed photon pulse
          if (Math.random() < 0.0008 || (boost > 0.3 && Math.random() < 0.02)) {
            createPulse(n1, n2);
          }
        }
      }
    }

    // -----------------------------------------------------------------------
    // J. Render Synaptic Photon Pulses
    // -----------------------------------------------------------------------
    for (let pIdx = pulses.length - 1; pIdx >= 0; pIdx--) {
      const p = pulses[pIdx];
      p.progress += p.speed;

      if (p.progress >= 1) {
        pulses.splice(pIdx, 1);
        continue;
      }

      const px = p.from.x + (p.to.x - p.from.x) * p.progress;
      const py = p.from.y + (p.to.y - p.from.y) * p.progress;

      ctx.save();
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(px, py, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // -----------------------------------------------------------------------
    // K. Render Neural Nodes (Glowing Points of Intelligence)
    // -----------------------------------------------------------------------
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const distToMouse = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      const isClose = distToMouse < 110;

      const pulseWave = 0.7 + 0.3 * Math.sin(n.pulse);
      const currentRadius = (n.baseRadius * pulseWave) + (isClose ? 1.8 : 0) + (n.energyCharge * 2);

      const colorCore = (isClose || n.energyCharge > 0.4)
        ? '#ffffff'
        : (n.isCyan ? 'rgba(0, 240, 255, 0.88)' : 'rgba(0, 255, 102, 0.88)');

      const colorGlow = n.isCyan ? 'rgba(0, 240, 255, 0.28)' : 'rgba(0, 255, 102, 0.28)';

      // Outer luminous aura
      ctx.fillStyle = colorGlow;
      ctx.beginPath();
      ctx.arc(n.x, n.y, currentRadius * 2.3, 0, Math.PI * 2);
      ctx.fill();

      // Sharp central node core
      ctx.fillStyle = colorCore;
      ctx.beginPath();
      ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();
