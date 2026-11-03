import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GOLDEN_ANGLE } from "./constants";

const MAX_FACETS = 24;
const VERTS_PER_FACET = 12;
const LINE_VERTS_PER_FACET = 16;

export type StageHandle = {
  setFolds: (folds: readonly number[], target: readonly number[], modules: number) => void;
  dispose: () => void;
};

function waist(radius: number, fold: number): number {
  if (fold >= 0) return radius * (1 - fold * 0.32);
  return radius * (1 + -fold * 0.18);
}

function writeV(
  pos: Float32Array,
  col: Float32Array,
  p: number,
  theta: number,
  rad: number,
  y: number,
  color: THREE.Color,
): number {
  pos[p] = Math.cos(theta) * rad;
  pos[p + 1] = y;
  pos[p + 2] = Math.sin(theta) * rad;
  col[p] = color.r;
  col[p + 1] = color.g;
  col[p + 2] = color.b;
  return p + 3;
}

export function mountStage(
  canvas: HTMLCanvasElement,
  onCycle: (module: number, crease: number) => void,
): StageHandle {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x0c0d0b, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0c0d0b, 9, 18);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 40);
  camera.position.set(2.6, 1.45, 6.2);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.rotateSpeed = 0.7;
  controls.zoomSpeed = 0.8;
  controls.minDistance = 3.2;
  controls.maxDistance = 14;
  controls.minPolarAngle = 0.2;
  controls.maxPolarAngle = Math.PI * 0.92;
  controls.target.set(0, 0.35, 0);
  controls.update();

  scene.add(new THREE.HemisphereLight(0xf3ead7, 0x0c0d0b, 0.7));
  const key = new THREE.DirectionalLight(0xe0a24a, 1.6);
  key.position.set(4.5, 6, 3);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x3fafa0, 0.45);
  rim.position.set(-4, 2.2, -3);
  scene.add(rim);
  const core = new THREE.PointLight(0xe0a24a, 6, 7, 2);
  core.position.set(0, -0.95, 0);
  scene.add(core);

  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(item: T): T => {
    disposables.push(item);
    return item;
  };

  const disk = new THREE.Group();
  scene.add(disk);
  const bed = new THREE.Mesh(
    track(new THREE.CircleGeometry(1.85, 72)),
    track(new THREE.MeshStandardMaterial({ color: 0x12130f, roughness: 1, metalness: 0 })),
  );
  bed.rotation.x = -Math.PI / 2;
  bed.position.y = -1.06;
  disk.add(bed);

  const hole = new THREE.Mesh(
    track(new THREE.CircleGeometry(0.3, 40)),
    track(new THREE.MeshBasicMaterial({ color: 0x050504 })),
  );
  hole.rotation.x = -Math.PI / 2;
  hole.position.y = -1.02;
  disk.add(hole);

  const torus = new THREE.Mesh(
    track(new THREE.TorusGeometry(0.42, 0.032, 16, 80)),
    track(
      new THREE.MeshStandardMaterial({
        color: 0x1a140c,
        emissive: 0xe0a24a,
        emissiveIntensity: 0.65,
        metalness: 0.55,
        roughness: 0.28,
      }),
    ),
  );
  torus.rotation.x = Math.PI / 2;
  torus.position.y = -1.02;
  disk.add(torus);

  const SEEDS = 160;
  const seedMesh = new THREE.InstancedMesh(
    track(new THREE.SphereGeometry(0.028, 8, 6)),
    track(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.42, metalness: 0.18 })),
    SEEDS,
  );
  const dummy = new THREE.Object3D();
  const paper = new THREE.Color(0xf3ead7);
  const gold = new THREE.Color(0xe0a24a);
  const fib = new Set([1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]);
  let placed = 0;
  for (let i = 1; placed < SEEDS && i < 600; i++) {
    const r = 0.052 * Math.sqrt(i);
    if (r < 0.4) continue;
    const th = i * GOLDEN_ANGLE;
    dummy.position.set(Math.cos(th) * r, -1.0, Math.sin(th) * r);
    dummy.scale.set(1, 0.32, 1);
    dummy.rotation.set(0, th, 0);
    dummy.updateMatrix();
    seedMesh.setMatrixAt(placed, dummy.matrix);
    seedMesh.setColorAt(placed, fib.has(i) ? gold : paper);
    placed += 1;
  }
  seedMesh.count = placed;
  if (seedMesh.instanceColor) seedMesh.instanceColor.needsUpdate = true;
  disk.add(seedMesh);

  const paraMat = track(new THREE.LineBasicMaterial({ color: 0xe0a24a, transparent: true, opacity: 0.55 }));
  for (const step of [8, 13]) {
    const pts: THREE.Vector3[] = [];
    for (let i = step; i < 220; i += step) {
      const r = 0.052 * Math.sqrt(i);
      if (r < 0.4) continue;
      const th = i * GOLDEN_ANGLE;
      pts.push(new THREE.Vector3(Math.cos(th) * r, -0.99, Math.sin(th) * r));
    }
    disk.add(new THREE.Line(track(new THREE.BufferGeometry().setFromPoints(pts)), paraMat));
  }

  const nodeGeo = track(new THREE.SphereGeometry(0.04, 12, 10));
  const nodeMat = track(new THREE.MeshBasicMaterial({ color: 0xf3ead7 }));
  for (let k = 0; k < 5; k++) {
    const i = 70 + k * 26;
    const r = 0.052 * Math.sqrt(i);
    const th = i * GOLDEN_ANGLE;
    const node = new THREE.Mesh(nodeGeo, nodeMat);
    node.position.set(Math.cos(th) * r, -0.98, Math.sin(th) * r);
    disk.add(node);
  }

  const sprayCount = 420;
  const sprayPos = new Float32Array(sprayCount * 3);
  const sprayVel = new Float32Array(sprayCount * 3);
  const sprayLife = new Float32Array(sprayCount);
  const respawn = (i: number) => {
    const a = Math.random() * Math.PI * 2;
    const r = 1.35 + Math.random() * 0.25;
    sprayPos[i * 3] = Math.cos(a) * r;
    sprayPos[i * 3 + 1] = -0.85 + Math.random() * 0.2;
    sprayPos[i * 3 + 2] = Math.sin(a) * r;
    sprayVel[i * 3] = Math.cos(a) * (0.18 + Math.random() * 0.28);
    sprayVel[i * 3 + 1] = 0.28 + Math.random() * 0.5;
    sprayVel[i * 3 + 2] = Math.sin(a) * (0.18 + Math.random() * 0.28);
    sprayLife[i] = Math.random() * 2.6;
  };
  for (let i = 0; i < sprayCount; i++) respawn(i);
  const sprayGeo = track(new THREE.BufferGeometry());
  sprayGeo.setAttribute("position", new THREE.BufferAttribute(sprayPos, 3));
  const spray = new THREE.Points(
    sprayGeo,
    track(
      new THREE.PointsMaterial({
        color: 0xf3ead7,
        size: 0.032,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    ),
  );
  scene.add(spray);

  const facetPos = new Float32Array(MAX_FACETS * VERTS_PER_FACET * 3);
  const facetCol = new Float32Array(MAX_FACETS * VERTS_PER_FACET * 3);
  const facetGeo = track(new THREE.BufferGeometry());
  facetGeo.setAttribute("position", new THREE.BufferAttribute(facetPos, 3));
  facetGeo.setAttribute("color", new THREE.BufferAttribute(facetCol, 3));
  facetGeo.setDrawRange(0, 0);
  const facetMesh = new THREE.Mesh(
    facetGeo,
    track(
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.58,
        metalness: 0.12,
        flatShading: true,
        side: THREE.DoubleSide,
        emissive: 0x2a2114,
        emissiveIntensity: 0.35,
      }),
    ),
  );
  scene.add(facetMesh);

  const linePos = new Float32Array(MAX_FACETS * LINE_VERTS_PER_FACET * 3);
  const lineCol = new Float32Array(MAX_FACETS * LINE_VERTS_PER_FACET * 3);
  const lineGeo = track(new THREE.BufferGeometry());
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
  lineGeo.setAttribute("color", new THREE.BufferAttribute(lineCol, 3));
  lineGeo.setDrawRange(0, 0);
  const lines = new THREE.LineSegments(
    lineGeo,
    track(new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.8 })),
  );
  scene.add(lines);

  const cMatch = new THREE.Color(0x3fafa0);
  const cMount = new THREE.Color(0xe0a24a);
  const cFlat = new THREE.Color(0xf3ead7);
  const cVal = new THREE.Color(0xf3ead7).multiplyScalar(0.42);
  const logical = new Float32Array(MAX_FACETS);
  const shown = new Float32Array(MAX_FACETS);
  const goal = new Float32Array(MAX_FACETS);
  let moduleN = 3;
  let framed = -1;

  const timer = new THREE.Timer();
  timer.connect(document);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const rebuild = () => {
    const H = 0.56;
    const gap = 0.03;
    const span = (moduleN - 1) * (H + gap);
    const base = -0.35 - span * 0.12;
    let fp = 0;
    let lp = 0;
    for (let m = 0; m < moduleN; m++) {
      const t = moduleN === 1 ? 0.5 : m / (moduleN - 1);
      const radius = (0.52 + Math.sin(Math.PI * t) * 0.72) * (moduleN === 1 ? 1 : 1 - t * 0.28);
      const y = base + m * (H + gap);
      const twist = m * GOLDEN_ANGLE;
      for (let s = 0; s < 3; s++) {
        const idx = m * 3 + s;
        const fold = shown[idx];
        const color = logical[idx] === goal[idx] ? cMatch : fold > 0.35 ? cMount : fold < -0.35 ? cVal : cFlat;
        const a0 = twist + s * ((Math.PI * 2) / 3);
        const a1 = a0 + (Math.PI * 2) / 3;
        const am = (a0 + a1) / 2;
        const wr = waist(radius, fold);
        const tri = (th: number, rad: number, yy: number) => {
          fp = writeV(facetPos, facetCol, fp, th, rad, yy, color);
        };
        const A = () => tri(a0, radius, y);
        const B = () => tri(a1, radius, y);
        const C = () => tri(a1, radius, y + H);
        const D = () => tri(a0, radius, y + H);
        const M = () => tri(am, wr, y + H / 2);
        A(); B(); M();
        B(); C(); M();
        C(); D(); M();
        D(); A(); M();
        const seg = (th: number, rad: number, yy: number) => {
          lp = writeV(linePos, lineCol, lp, th, rad, yy, color);
        };
        const pairs: Array<[number, number, number]> = [
          [a0, radius, y],
          [a1, radius, y],
          [a1, radius, y],
          [a1, radius, y + H],
          [a1, radius, y + H],
          [a0, radius, y + H],
          [a0, radius, y + H],
          [a0, radius, y],
          [a0, radius, y],
          [am, wr, y + H / 2],
          [a1, radius, y],
          [am, wr, y + H / 2],
          [a1, radius, y + H],
          [am, wr, y + H / 2],
          [a0, radius, y + H],
          [am, wr, y + H / 2],
        ];
        for (const [th, rad, yy] of pairs) seg(th, rad, yy);
      }
    }
    facetGeo.setDrawRange(0, moduleN * 3 * VERTS_PER_FACET);
    lineGeo.setDrawRange(0, moduleN * 3 * LINE_VERTS_PER_FACET);
    facetGeo.attributes.position.needsUpdate = true;
    facetGeo.attributes.color.needsUpdate = true;
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
    facetGeo.computeVertexNormals();
  };

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w < 2 || h < 2) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  let down = false;
  let sx = 0;
  let sy = 0;
  const onDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    down = true;
    sx = event.clientX;
    sy = event.clientY;
  };
  const onUp = (event: PointerEvent) => {
    if (!down) return;
    down = false;
    if (event.target !== canvas) return;
    const dx = event.clientX - sx;
    const dy = event.clientY - sy;
    if (dx * dx + dy * dy > 25) return;
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(facetMesh, false);
    const face = hits[0]?.faceIndex;
    if (face == null) return;
    const facet = Math.floor(face / 4);
    if (facet < 0 || facet >= moduleN * 3) return;
    onCycle(Math.floor(facet / 3), facet % 3);
  };
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointerup", onUp);

  renderer.setAnimationLoop((timestamp) => {
    timer.update(timestamp);
    const dt = Math.min(timer.getDelta(), 0.1);
    const ease = 1 - Math.exp(-dt * 8);
    for (let i = 0; i < moduleN * 3; i++) shown[i] += (logical[i] - shown[i]) * ease;
    rebuild();
    if (!reduce) disk.rotation.y += dt * 0.08;
    const sprayAttr = sprayGeo.attributes.position;
    for (let i = 0; i < sprayCount; i++) {
      sprayLife[i] += dt * (reduce ? 0.2 : 1);
      if (sprayLife[i] > 2.8) respawn(i);
      sprayPos[i * 3] += sprayVel[i * 3] * dt;
      sprayPos[i * 3 + 1] += sprayVel[i * 3 + 1] * dt;
      sprayPos[i * 3 + 2] += sprayVel[i * 3 + 2] * dt;
    }
    sprayAttr.needsUpdate = true;
    controls.update();
    renderer.render(scene, camera);
  });

  return {
    setFolds(folds, target, modules) {
      moduleN = Math.max(1, Math.min(8, modules));
      for (let i = 0; i < MAX_FACETS; i++) {
        logical[i] = folds[i] ?? 0;
        goal[i] = target[i] ?? 99;
      }
      if (framed !== moduleN) {
        framed = moduleN;
        const dist = 5.1 + moduleN * 0.38;
        camera.position.set(dist * 0.42, 1.15 + moduleN * 0.04, dist);
        controls.target.set(0, 0.25, 0);
        controls.update();
      }
    },
    dispose() {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      controls.dispose();
      timer.disconnect();
      timer.dispose();
      for (const item of disposables) item.dispose();
      renderer.dispose();
    },
  };
}
