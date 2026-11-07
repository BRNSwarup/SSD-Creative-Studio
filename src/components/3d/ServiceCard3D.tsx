import React, { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

interface ServiceCard3DProps {
  type: 'camera' | 'network' | 'prism' | 'code';
}

export const ServiceCard3D: React.FC<ServiceCard3DProps> = memo(({ type }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return;
    }

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 220;

    renderer.setSize(width, height);
    // Optimized pixel ratio for small preview cards
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.z = 5;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0x00E871, 3.5, 10);
    pointLight.position.set(2, 3, 3);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(0xffffff, 1.5, 10);
    backLight.position.set(-2, -2, -2);
    scene.add(backLight);

    const group = new THREE.Group();
    scene.add(group);

    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

    // Build specific 3D geometry based on type
    let updateFn: (elapsed: number) => void;

    if (type === 'camera') {
      const lensGeo = new THREE.CylinderGeometry(1.2, 1.35, 1.2, 24);
      const lensMat = new THREE.MeshStandardMaterial({
        color: 0x16191f,
        metalness: 0.85,
        roughness: 0.2
      });
      disposables.push(lensGeo, lensMat);
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.rotation.x = Math.PI / 2;
      group.add(lens);

      const ringGeo = new THREE.TorusGeometry(1.36, 0.05, 12, 36);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x00E871 });
      disposables.push(ringGeo, ringMat);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = 0.6;
      group.add(ring);

      const glassGeo = new THREE.SphereGeometry(1.15, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.35);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x003d1c,
        transmission: 0.9,
        transparent: true,
        roughness: 0.05,
        reflectivity: 0.9
      });
      disposables.push(glassGeo, glassMat);
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.z = 0.3;
      group.add(glass);

      updateFn = (elapsed) => {
        group.rotation.y = elapsed * 0.7;
        group.rotation.x = Math.sin(elapsed * 0.6) * 0.25;
      };
    } else if (type === 'network') {
      const coreGeo = new THREE.IcosahedronGeometry(0.85, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x050505,
        wireframe: true
      });
      disposables.push(coreGeo, coreMat);
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      const innerSphereGeo = new THREE.SphereGeometry(0.5, 16, 16);
      const innerSphereMat = new THREE.MeshBasicMaterial({ color: 0x00E871 });
      disposables.push(innerSphereGeo, innerSphereMat);
      const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
      group.add(innerSphere);

      const nodeCount = 6;
      const orbitalNodes: THREE.Mesh[] = [];
      const nodeGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const nodeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8 });
      disposables.push(nodeGeo, nodeMat);

      for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        group.add(node);
        orbitalNodes.push(node);
      }

      updateFn = (elapsed) => {
        group.rotation.y = elapsed * 0.5;
        for (let idx = 0; idx < nodeCount; idx++) {
          const angle = elapsed * 1.2 + (idx * Math.PI * 2) / nodeCount;
          const radius = 1.45 + Math.sin(elapsed * 2 + idx) * 0.2;
          orbitalNodes[idx].position.x = Math.cos(angle) * radius;
          orbitalNodes[idx].position.z = Math.sin(angle) * radius;
          orbitalNodes[idx].position.y = Math.sin(angle * 2) * 0.4;
        }
      };
    } else if (type === 'prism') {
      const prismGeo = new THREE.OctahedronGeometry(1.25, 0);
      const prismMat = new THREE.MeshPhysicalMaterial({
        color: 0x00E871,
        emissive: 0x003318,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.8,
        transparent: true,
        reflectivity: 0.85,
      });
      disposables.push(prismGeo, prismMat);
      const prism = new THREE.Mesh(prismGeo, prismMat);
      group.add(prism);

      const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
      disposables.push(wireMat);
      const wireMesh = new THREE.Mesh(prismGeo, wireMat);
      wireMesh.scale.set(1.05, 1.05, 1.05);
      group.add(wireMesh);

      updateFn = (elapsed) => {
        group.rotation.x = elapsed * 0.6;
        group.rotation.y = elapsed * 0.8;
      };
    } else {
      const boxGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
      const boxMat = new THREE.MeshStandardMaterial({
        color: 0x0c0f14,
        metalness: 0.9,
        roughness: 0.2
      });
      disposables.push(boxGeo, boxMat);
      const box = new THREE.Mesh(boxGeo, boxMat);
      group.add(box);

      const wireGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00E871,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });
      disposables.push(wireGeo, wireMat);
      const wire = new THREE.Mesh(wireGeo, wireMat);
      group.add(wire);

      const ringGeo = new THREE.TorusGeometry(1.8, 0.03, 12, 36);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 });
      disposables.push(ringGeo, ringMat);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      group.add(ring);

      updateFn = (elapsed) => {
        box.rotation.y = elapsed * 0.5;
        box.rotation.x = elapsed * 0.3;
        wire.rotation.y = -elapsed * 0.4;
        wire.rotation.z = elapsed * 0.2;
        ring.rotation.x = elapsed * 0.7;
      };
    }

    let reqId: number = 0;
    let isVisible = false;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      if (updateFn) updateFn(elapsed);
      renderer.render(scene, camera);
    };

    // IntersectionObserver to ONLY render when card is visible in viewport!
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;

        if (isVisible && !wasVisible) {
          reqId = requestAnimationFrame(animate);
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(reqId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(reqId);

      disposables.forEach((item) => item.dispose());
      scene.clear();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type]);

  return (
    <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-white/5 group-hover:border-brand-green/30 transition-colors duration-300">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-2 right-2 text-[10px] font-mono-code text-brand-green/60 uppercase">
        3D Interactive Model
      </div>
    </div>
  );
});

ServiceCard3D.displayName = 'ServiceCard3D';
