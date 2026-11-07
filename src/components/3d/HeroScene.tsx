import React, { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

export const HeroScene: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    renderer.setSize(width, height);
    // Cap pixel ratio to 1.5 for optimal performance and crispness
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    const emeraldRimLight = new THREE.PointLight(0x00C853, 5.0, 25);
    emeraldRimLight.position.set(-5, -2, 4);
    scene.add(emeraldRimLight);

    const topSoftLight = new THREE.PointLight(0xffffff, 2.0, 20);
    topSoftLight.position.set(4, 5, 3);
    scene.add(topSoftLight);

    // Track all disposables for cleanup
    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

    // ==========================================
    // FLOATING 3D CINEMA LENS (HIGH CONTRAST ON WHITE)
    // ==========================================
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Outer Anamorphic Lens Barrel (Deep Anodized Black Aluminum)
    const barrelGeo = new THREE.CylinderGeometry(1.65, 1.85, 1.55, 48, 1, true);
    const barrelMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.95,
      roughness: 0.18,
      side: THREE.DoubleSide
    });
    disposables.push(barrelGeo, barrelMat);
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.rotation.x = Math.PI / 2;
    masterGroup.add(barrel);

    // Signature Electric Emerald Accent Bezel
    const accentBezelGeo = new THREE.TorusGeometry(1.78, 0.05, 16, 48);
    const accentBezelMat = new THREE.MeshStandardMaterial({
      color: 0x00C853,
      emissive: 0x00C853,
      emissiveIntensity: 0.95,
      roughness: 0.2,
      metalness: 0.8
    });
    disposables.push(accentBezelGeo, accentBezelMat);
    const accentBezel = new THREE.Mesh(accentBezelGeo, accentBezelMat);
    accentBezel.position.z = 0.78;
    masterGroup.add(accentBezel);

    // Knurled Focus Ring (Silver-Titanium Ribbed)
    const focusRingGeo = new THREE.CylinderGeometry(1.73, 1.73, 0.42, 48);
    const focusRingMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.9,
      roughness: 0.3
    });
    disposables.push(focusRingGeo, focusRingMat);
    const focusRing = new THREE.Mesh(focusRingGeo, focusRingMat);
    focusRing.rotation.x = Math.PI / 2;
    focusRing.position.z = -0.18;
    masterGroup.add(focusRing);

    // Optical Glass Front Lens Element (Reflective Curve)
    const glassGeo = new THREE.SphereGeometry(1.55, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.32);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x011a0b,
      transmission: 0.93,
      opacity: 1,
      transparent: true,
      roughness: 0.04,
      metalness: 0.05,
      ior: 1.55,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });
    disposables.push(glassGeo, glassMat);
    const opticalLens = new THREE.Mesh(glassGeo, glassMat);
    opticalLens.position.z = 0.3;
    masterGroup.add(opticalLens);

    // Inner Glowing Aperture Iris Blades
    const apertureIrisGroup = new THREE.Group();
    masterGroup.add(apertureIrisGroup);
    apertureIrisGroup.position.z = -0.15;

    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, 0);
    bladeShape.lineTo(0.75, 0.3);
    bladeShape.lineTo(0.7, 0.65);
    bladeShape.lineTo(-0.1, 0.45);
    bladeShape.closePath();

    const bladeGeo = new THREE.ShapeGeometry(bladeShape);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      metalness: 0.9,
      roughness: 0.3,
      side: THREE.DoubleSide
    });
    disposables.push(bladeGeo, bladeMat);

    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2;
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.position.set(Math.cos(angle) * 0.46, Math.sin(angle) * 0.46, 0);
      blade.rotation.z = angle + 0.35;
      apertureIrisGroup.add(blade);
    }

    // Outer Floating Emerald Orbit Ring
    const haloGeo = new THREE.TorusGeometry(2.65, 0.025, 12, 64);
    const haloMat = new THREE.MeshPhysicalMaterial({
      color: 0x00C853,
      transmission: 0.8,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.2
    });
    disposables.push(haloGeo, haloMat);
    const haloRing = new THREE.Mesh(haloGeo, haloMat);
    haloRing.rotation.x = Math.PI / 3;
    masterGroup.add(haloRing);

    // Secondary Chrome Orbit Ring
    const haloGeo2 = new THREE.TorusGeometry(3.2, 0.015, 12, 64);
    const haloMat2 = new THREE.MeshBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.25
    });
    disposables.push(haloGeo2, haloMat2);
    const haloRing2 = new THREE.Mesh(haloGeo2, haloMat2);
    haloRing2.rotation.y = Math.PI / 4;
    masterGroup.add(haloRing2);

    // Floating Green Prismatic Bokeh
    const particleCount = 80; // Optimized particle count
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x00C853,
      transparent: true,
      opacity: 0.6,
      blending: THREE.NormalBlending
    });
    disposables.push(particleGeo, particleMat);
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Tracking - CACHED rect to avoid layout thrashing!
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let cachedRect = container.getBoundingClientRect();

    const handleMouseMove = (e: MouseEvent) => {
      if (!cachedRect.width || !cachedRect.height) return;
      const x = ((e.clientX - cachedRect.left) / cachedRect.width) * 2 - 1;
      const y = -(((e.clientY - cachedRect.top) / cachedRect.height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number = 0;
    let isVisible = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return; // Pause rendering completely when off-screen!

      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      const motionFactor = prefersReducedMotion ? 0.2 : 1;

      masterGroup.rotation.y = mouseX * 0.7 + Math.sin(elapsed * 0.3 * motionFactor) * 0.08;
      masterGroup.rotation.x = -mouseY * 0.7 + Math.cos(elapsed * 0.4 * motionFactor) * 0.06;
      masterGroup.position.y = Math.sin(elapsed * 0.6 * motionFactor) * 0.1;

      haloRing.rotation.z = elapsed * 0.1 * motionFactor;
      haloRing2.rotation.z = -elapsed * 0.08 * motionFactor;
      apertureIrisGroup.rotation.z = Math.sin(elapsed * 0.4 * motionFactor) * 0.15;
      particles.rotation.y = elapsed * 0.02 * motionFactor;

      renderer.render(scene, camera);
    };

    // IntersectionObserver to pause loop when scrolled away
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;

        if (isVisible && !wasVisible) {
          cachedRect = container.getBoundingClientRect();
          animationFrameId = requestAnimationFrame(animate);
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    // Initial start
    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      cachedRect = container.getBoundingClientRect();
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Memory cleanup
      disposables.forEach((item) => item.dispose());
      scene.clear();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[580px] select-none flex items-center justify-center">
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Badge on White */}
      <div className="absolute top-5 right-5 pointer-events-none flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-black/10 text-xs font-semibold text-neutral-800 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
        <span className="tracking-widest uppercase text-[10px]">3D Cinema Rig</span>
      </div>

      <div className="absolute bottom-5 left-5 pointer-events-none text-left">
        <div className="text-[10px] tracking-widest text-neutral-500 uppercase font-bold">
          Studio Precision
        </div>
        <div className="text-neutral-900 text-xs font-extrabold tracking-wide">
          Optical Cinema & Digital Craft
        </div>
      </div>
    </div>
  );
});

HeroScene.displayName = 'HeroScene';
