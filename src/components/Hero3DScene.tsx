import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Info, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface Hero3DSceneProps {
  onNodeClick?: (nodeName: string) => void;
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ onNodeClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTooltip, setActiveTooltip] = useState<{ text: string; sub: string; x: number; y: number } | null>(null);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<string | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [webGLFailed, setWebGLFailed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
    }

    const container = mountRef.current;
    const width = container.clientWidth || 540;
    const height = container.clientHeight || 460;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;

    try {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 1.8, 8.5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Clean container
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL init error, using fallback:', err);
      setWebGLFailed(true);
      return;
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const primaryLight = new THREE.DirectionalLight(0x1565d8, 2.4);
    primaryLight.position.set(5, 8, 6);
    scene.add(primaryLight);

    const accentLight = new THREE.PointLight(0x00b290, 3, 20);
    accentLight.position.set(-4, 3, 2);
    scene.add(accentLight);

    const orangeHighlight = new THREE.PointLight(0xf3705a, 2, 15);
    orangeHighlight.position.set(3, -2, 3);
    scene.add(orangeHighlight);

    // Group for mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Layered Glass Project Canvas (Floating 3D App Workspace)
    const boardGeo = new THREE.BoxGeometry(4.6, 3.2, 0.12);
    const boardMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a192f,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.88,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.set(0, 0, 0);
    worldGroup.add(board);

    // Subtle edge frame
    const frameGeo = new THREE.EdgesGeometry(boardGeo);
    const frameMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 });
    const frame = new THREE.LineSegments(frameGeo, frameMat);
    board.add(frame);

    // 2. Interactive Nodes representing AI Pipeline
    const interactiveMeshes: THREE.Mesh[] = [];

    // Node A: Input Prompt Node
    const inputNodeGeo = new THREE.SphereGeometry(0.42, 32, 32);
    const inputNodeMat = new THREE.MeshStandardMaterial({
      color: 0x1565d8,
      emissive: 0x0d47a1,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    });
    const inputNode = new THREE.Mesh(inputNodeGeo, inputNodeMat);
    inputNode.position.set(-1.6, 0.4, 0.5);
    inputNode.userData = {
      name: 'input',
      title: '1. User Input & Prompting',
      description: 'Clean prompt formulation and token embeddings handled without paid APIs.',
    };
    worldGroup.add(inputNode);
    interactiveMeshes.push(inputNode);

    // Node B: Neural Processing Core (Rotating icosahedron inside wireframe)
    const coreInnerGeo = new THREE.IcosahedronGeometry(0.55, 1);
    const coreInnerMat = new THREE.MeshStandardMaterial({
      color: 0x00b290,
      emissive: 0x00b290,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.7,
    });
    const coreInner = new THREE.Mesh(coreInnerGeo, coreInnerMat);
    coreInner.position.set(0, 0.1, 0.6);
    coreInner.userData = {
      name: 'core',
      title: '2. AI Reasoning Core',
      description: 'How the model evaluates context, reasons step-by-step, and generates reliable structured results.',
    };
    worldGroup.add(coreInner);
    interactiveMeshes.push(coreInner);

    const coreWireGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const coreWireMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true, transparent: true, opacity: 0.7 });
    const coreWire = new THREE.Mesh(coreWireGeo, coreWireMat);
    coreInner.add(coreWire);

    // Node C: Working AI Project Output Node
    const outputNodeGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const outputNodeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    });
    const outputNode = new THREE.Mesh(outputNodeGeo, outputNodeMat);
    outputNode.position.set(1.6, -0.3, 0.5);
    outputNode.userData = {
      name: 'output',
      title: '3. Tangible Working Project',
      description: 'A responsive full-stack AI mini-application running live in your browser.',
    };
    worldGroup.add(outputNode);
    interactiveMeshes.push(outputNode);

    // 3. Flowing Energy Connectors (Curve tubes between nodes)
    const curve1 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-1.6, 0.4, 0.5),
      new THREE.Vector3(-0.8, 1.2, 0.8),
      new THREE.Vector3(0, 0.1, 0.6)
    );
    const tube1Geo = new THREE.TubeGeometry(curve1, 30, 0.04, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });
    const tube1 = new THREE.Mesh(tube1Geo, tubeMat);
    worldGroup.add(tube1);

    const curve2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0.1, 0.6),
      new THREE.Vector3(0.8, 0.8, 0.8),
      new THREE.Vector3(1.6, -0.3, 0.5)
    );
    const tube2Geo = new THREE.TubeGeometry(curve2, 30, 0.04, 8, false);
    const tube2 = new THREE.Mesh(tube2Geo, tubeMat);
    worldGroup.add(tube2);

    // 4. Subtle Ambient Particle Cloud
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 7;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    // Mouse Parallax & Raycasting
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouseX = (x / width) * 2 - 1;
      mouseY = -(y / height) * 2 + 1;

      mouseVector.x = mouseX;
      mouseVector.y = mouseY;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const data = hit.userData;
        setActiveTooltip({
          text: data.title,
          sub: 'Click to inspect in detail',
          x,
          y,
        });
        container.style.cursor = 'pointer';
      } else {
        setActiveTooltip(null);
        container.style.cursor = 'default';
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const info = hit.userData.description;
        setSelectedNodeInfo(info);
        if (onNodeClick) onNodeClick(hit.userData.title);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 540;
      const newH = container.clientHeight || 460;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with low CPU overhead
    let clock = new THREE.Clock();
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Damped parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      worldGroup.rotation.y = targetX * 0.45;
      worldGroup.rotation.x = -targetY * 0.3;

      if (!isReducedMotion) {
        // Floating motion
        board.position.y = Math.sin(elapsedTime * 1.2) * 0.08;
        board.rotation.z = Math.sin(elapsedTime * 0.8) * 0.015;

        // Core rotation
        coreInner.rotation.x += delta * 0.5;
        coreInner.rotation.y += delta * 0.8;
        coreWire.rotation.y -= delta * 0.4;

        // Output rotation
        outputNode.rotation.y += delta * 0.6;
        outputNode.rotation.x = Math.sin(elapsedTime) * 0.2;

        // Node pulsations
        const pulse = 1 + Math.sin(elapsedTime * 3) * 0.06;
        inputNode.scale.set(pulse, pulse, pulse);

        // Particle subtle drift
        particles.rotation.y = elapsedTime * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('click', handleClick);
        if (renderer.domElement && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
    };
  }, [isReducedMotion]);

  if (webGLFailed) {
    return (
      <div className="w-full h-[440px] rounded-2xl bg-gradient-to-br from-[#0A192F] to-[#0A2540] border border-blue-900/40 p-6 flex flex-col justify-between text-white relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-400/30 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            2D Interactive Fallback Active
          </span>
          <span className="text-xs text-slate-400">WebGL Optimized</span>
        </div>
        <div className="grid grid-cols-3 gap-4 my-auto">
          <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/30 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg">1</div>
            <h4 className="font-semibold text-sm text-blue-200">Prompt Node</h4>
            <p className="text-xs text-slate-400 mt-1">Tokenization & context framing</p>
          </div>
          <div className="p-4 rounded-xl bg-teal-950/60 border border-teal-500/30 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-white shadow-lg">2</div>
            <h4 className="font-semibold text-sm text-teal-200">Neural Core</h4>
            <p className="text-xs text-slate-400 mt-1">Multi-step AI reasoning engine</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/30 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-900 shadow-lg">3</div>
            <h4 className="font-semibold text-sm text-amber-200">Live App</h4>
            <p className="text-xs text-slate-400 mt-1">Interactive student web project</p>
          </div>
        </div>
        <div className="text-xs text-slate-400 text-center">
          Building practical engineering projects in 60 minutes.
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[460px] md:h-[500px] flex items-center justify-center select-none">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full rounded-2xl overflow-hidden focus:outline-none"
        tabIndex={0}
        aria-label="Interactive 3D AI Project Workspace showing Prompt, Processing Core, and Working Output"
      />

      {/* Floating Explanatory Tooltip on Raycast Hover */}
      {activeTooltip && (
        <div
          className="absolute pointer-events-none z-30 px-3.5 py-2 rounded-xl bg-[#0A192F]/95 backdrop-blur-md border border-blue-400/50 text-white shadow-2xl transition-all duration-75"
          style={{
            left: `${Math.min(activeTooltip.x + 16, 380)}px`,
            top: `${Math.max(activeTooltip.y - 48, 10)}px`,
          }}
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            {activeTooltip.text}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">{activeTooltip.sub}</div>
        </div>
      )}

      {/* Node Click Modal / Inspector Card */}
      {selectedNodeInfo && (
        <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-xl bg-[#0A192F]/90 backdrop-blur-md border border-blue-500/40 text-white shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">Workshop Architecture Insight</h4>
              <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{selectedNodeInfo}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedNodeInfo(null)}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/60"
            aria-label="Close insight"
          >
            ✕
          </button>
        </div>
      )}

      {/* Performance & Accessibility Badge Controls */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-900/80 backdrop-blur-sm text-slate-200 border border-slate-700/60 flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Interactive 3D Pipeline
        </span>
        <button
          onClick={() => setIsReducedMotion((prev) => !prev)}
          className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/80 hover:bg-white text-slate-700 border border-slate-300 shadow-sm transition-colors flex items-center gap-1"
          title="Toggle smooth animation or reduced motion"
        >
          <Eye className="w-3 h-3 text-slate-500" />
          {isReducedMotion ? 'Motion: Off' : 'Motion: Smooth'}
        </button>
      </div>

      <div className="absolute bottom-3 right-3 z-10 text-[10px] text-slate-500 bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-200">
        Hover nodes & drag to tilt in 3D
      </div>
    </div>
  );
};
