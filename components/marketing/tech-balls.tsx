"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Decal, useTexture } from "@react-three/drei";
import * as THREE from "three";

/**
 * Interactive 3-D technology badges. A SINGLE WebGL scene (one orthographic
 * canvas) renders a faceted low-poly sphere per technology, laid out in a grid
 * and decalled with the tech logo. Grab any ball to spin it; idle balls rotate
 * gently. One canvas + one Suspense (all textures preloaded) avoids the
 * per-view scissor/scroll conflicts and missing-decal timing of drei <View>.
 * A static <img> grid is the no-JS / no-WebGL / SEO fallback.
 */

const TECHS: [string, string][] = [
  ["HTML5", "html5"], ["CSS3", "css3"], ["JavaScript", "javascript"], ["TypeScript", "typescript"],
  ["React", "react"], ["Next.js", "nextjs"], ["Tailwind CSS", "tailwindcss"], ["Node.js", "nodejs"],
  ["PHP", "php"], ["Laravel", "laravel"], ["Rust", "rust"], ["PostgreSQL", "postgresql"],
  ["MySQL", "mysql"], ["MongoDB", "mongodb"], ["WordPress", "wordpress"], ["Shopify", "shopify"],
  ["Docker", "docker"], ["Linux", "linux"], ["Cloudflare", "cloudflare"], ["Vercel", "vercel"],
  ["Git", "git"], ["GitHub", "github"], ["Solana", "solana"], ["Figma", "figma"],
];

const FOOTPRINT = 118; // px per ball cell (≈ 76px ball + gap)
const ZOOM = 38; // ortho zoom → ball diameter ≈ 2 * ZOOM = 76px
const SPACING = FOOTPRINT / ZOOM; // world units between ball centres

function Ball({ position, tex, reduced }: { position: [number, number, number]; tex: THREE.Texture; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });

  const onMove = useCallback((e: PointerEvent) => {
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    const m = ref.current;
    if (m) { m.rotation.y += dx * 0.01; m.rotation.x += dy * 0.01; }
    vel.current = { x: dy * 0.01, y: dx * 0.01 };
  }, []);

  const onUp = useCallback(() => {
    dragging.current = false;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    document.body.style.cursor = "";
  }, [onMove]);

  const onDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    vel.current = { x: 0, y: 0 };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    document.body.style.cursor = "grabbing";
  }, [onMove, onUp]);

  useEffect(() => () => { // cleanup if unmounted mid-drag
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  }, [onMove, onUp]);

  useFrame((_, delta) => {
    const m = ref.current;
    if (!m || dragging.current) return;
    vel.current.x *= 0.95;
    vel.current.y *= 0.95;
    m.rotation.x += vel.current.x;
    m.rotation.y += vel.current.y + (reduced ? 0 : delta * 0.25);
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerDown={onDown}
      onPointerOver={() => { if (!dragging.current) document.body.style.cursor = "grab"; }}
      onPointerOut={() => { if (!dragging.current) document.body.style.cursor = ""; }}
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#edeef3" flatShading roughness={0.45} metalness={0.05} />
      <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1.3}>
        <meshBasicMaterial map={tex} transparent polygonOffset polygonOffsetFactor={-12} toneMapped={false} />
      </Decal>
    </mesh>
  );
}

function Balls({ cols, reduced }: { cols: number; reduced: boolean }) {
  const textures = useTexture(TECHS.map(([, slug]) => `/tech/${slug}.png`)) as THREE.Texture[];
  textures.forEach((t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; });
  const rows = Math.ceil(TECHS.length / cols);
  return (
    <group>
      {TECHS.map(([, slug], i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const inRow = Math.min(cols, TECHS.length - row * cols); // centre each row
        const x = (col - (inRow - 1) / 2) * SPACING;
        const y = ((rows - 1) / 2 - row) * SPACING;
        return <Ball key={slug} position={[x, y, 0]} tex={textures[i]} reduced={reduced} />;
      })}
    </group>
  );
}

export default function TechBalls() {
  const wrap = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(6);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
    setMounted(true);
    const el = wrap.current;
    if (!el) return;
    const update = () => setCols(Math.max(3, Math.min(8, Math.floor(el.clientWidth / FOOTPRINT))));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rows = Math.ceil(TECHS.length / cols);
  const height = rows * FOOTPRINT + 8;

  return (
    <div ref={wrap} className="tb-wrap" style={{ height }}>
      <div className="tb-fallback" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, opacity: ready ? 0 : 1 }}>
        {TECHS.map(([name, slug]) => (
          <span key={slug} className="tb-fcell" title={name}>
            <img src={`/tech/${slug}.png`} alt={name} width={58} height={58} loading="lazy" decoding="async" />
          </span>
        ))}
      </div>

      {mounted && (
        <Canvas
          orthographic
          camera={{ zoom: ZOOM, position: [0, 0, 10], near: 0.1, far: 100 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ position: "absolute", inset: 0, zIndex: 2 }}
          onCreated={() => setReady(true)}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[5, 6, 8]} intensity={1.4} />
          <directionalLight position={[-6, -3, 2]} intensity={0.45} color="#bcd4ff" />
          <Suspense fallback={null}>
            <Balls cols={cols} reduced={reduced} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
