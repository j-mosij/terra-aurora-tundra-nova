import { n as GOLDEN_ANGLE } from "./routes-DCXhEdiZ.mjs";
import { A as Vector3, C as Raycaster, D as Timer, E as SphereGeometry, O as TorusGeometry, S as PointsMaterial, T as Scene, _ as MeshStandardMaterial, a as CircleGeometry, b as PointLight, c as Fog, d as InstancedMesh, f as Line, g as MeshBasicMaterial, h as Mesh, i as BufferGeometry, k as Vector2, l as Group, m as LineSegments, n as WebGLRenderer, o as Color, p as LineBasicMaterial, r as BufferAttribute, s as DirectionalLight, t as OrbitControls, u as HemisphereLight, v as Object3D, w as SRGBColorSpace, x as Points, y as PerspectiveCamera } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stage-Bu24Y4Ia.js
var MAX_FACETS = 24;
var VERTS_PER_FACET = 12;
var LINE_VERTS_PER_FACET = 16;
function waist(radius, fold) {
	if (fold >= 0) return radius * (1 - fold * .32);
	return radius * (1 + -fold * .18);
}
function writeV(pos, col, p, theta, rad, y, color) {
	pos[p] = Math.cos(theta) * rad;
	pos[p + 1] = y;
	pos[p + 2] = Math.sin(theta) * rad;
	col[p] = color.r;
	col[p + 1] = color.g;
	col[p + 2] = color.b;
	return p + 3;
}
function mountStage(canvas, onCycle) {
	const renderer = new WebGLRenderer({
		canvas,
		antialias: true,
		alpha: false
	});
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
	renderer.setClearColor(789771, 1);
	renderer.outputColorSpace = SRGBColorSpace;
	renderer.toneMapping = 4;
	renderer.toneMappingExposure = 1.05;
	const scene = new Scene();
	scene.fog = new Fog(789771, 9, 18);
	const camera = new PerspectiveCamera(40, 1, .1, 40);
	camera.position.set(2.6, 1.45, 6.2);
	const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;
	controls.dampingFactor = .08;
	controls.enablePan = false;
	controls.rotateSpeed = .7;
	controls.zoomSpeed = .8;
	controls.minDistance = 3.2;
	controls.maxDistance = 14;
	controls.minPolarAngle = .2;
	controls.maxPolarAngle = Math.PI * .92;
	controls.target.set(0, .35, 0);
	controls.update();
	scene.add(new HemisphereLight(15985367, 789771, .7));
	const key = new DirectionalLight(14721610, 1.6);
	key.position.set(4.5, 6, 3);
	scene.add(key);
	const rim = new DirectionalLight(4173728, .45);
	rim.position.set(-4, 2.2, -3);
	scene.add(rim);
	const core = new PointLight(14721610, 6, 7, 2);
	core.position.set(0, -.95, 0);
	scene.add(core);
	const disposables = [];
	const track = (item) => {
		disposables.push(item);
		return item;
	};
	const disk = new Group();
	scene.add(disk);
	const bed = new Mesh(track(new CircleGeometry(1.85, 72)), track(new MeshStandardMaterial({
		color: 1184527,
		roughness: 1,
		metalness: 0
	})));
	bed.rotation.x = -Math.PI / 2;
	bed.position.y = -1.06;
	disk.add(bed);
	const hole = new Mesh(track(new CircleGeometry(.3, 40)), track(new MeshBasicMaterial({ color: 328964 })));
	hole.rotation.x = -Math.PI / 2;
	hole.position.y = -1.02;
	disk.add(hole);
	const torus = new Mesh(track(new TorusGeometry(.42, .032, 16, 80)), track(new MeshStandardMaterial({
		color: 1709068,
		emissive: 14721610,
		emissiveIntensity: .65,
		metalness: .55,
		roughness: .28
	})));
	torus.rotation.x = Math.PI / 2;
	torus.position.y = -1.02;
	disk.add(torus);
	const SEEDS = 160;
	const seedMesh = new InstancedMesh(track(new SphereGeometry(.028, 8, 6)), track(new MeshStandardMaterial({
		color: 16777215,
		roughness: .42,
		metalness: .18
	})), SEEDS);
	const dummy = new Object3D();
	const paper = new Color(15985367);
	const gold = new Color(14721610);
	const fib = /* @__PURE__ */ new Set([
		1,
		2,
		3,
		5,
		8,
		13,
		21,
		34,
		55,
		89,
		144,
		233
	]);
	let placed = 0;
	for (let i = 1; placed < SEEDS && i < 600; i++) {
		const r = .052 * Math.sqrt(i);
		if (r < .4) continue;
		const th = i * GOLDEN_ANGLE;
		dummy.position.set(Math.cos(th) * r, -1, Math.sin(th) * r);
		dummy.scale.set(1, .32, 1);
		dummy.rotation.set(0, th, 0);
		dummy.updateMatrix();
		seedMesh.setMatrixAt(placed, dummy.matrix);
		seedMesh.setColorAt(placed, fib.has(i) ? gold : paper);
		placed += 1;
	}
	seedMesh.count = placed;
	if (seedMesh.instanceColor) seedMesh.instanceColor.needsUpdate = true;
	disk.add(seedMesh);
	const paraMat = track(new LineBasicMaterial({
		color: 14721610,
		transparent: true,
		opacity: .55
	}));
	for (const step of [8, 13]) {
		const pts = [];
		for (let i = step; i < 220; i += step) {
			const r = .052 * Math.sqrt(i);
			if (r < .4) continue;
			const th = i * GOLDEN_ANGLE;
			pts.push(new Vector3(Math.cos(th) * r, -.99, Math.sin(th) * r));
		}
		disk.add(new Line(track(new BufferGeometry().setFromPoints(pts)), paraMat));
	}
	const nodeGeo = track(new SphereGeometry(.04, 12, 10));
	const nodeMat = track(new MeshBasicMaterial({ color: 15985367 }));
	for (let k = 0; k < 5; k++) {
		const i = 70 + k * 26;
		const r = .052 * Math.sqrt(i);
		const th = i * GOLDEN_ANGLE;
		const node = new Mesh(nodeGeo, nodeMat);
		node.position.set(Math.cos(th) * r, -.98, Math.sin(th) * r);
		disk.add(node);
	}
	const sprayCount = 420;
	const sprayPos = new Float32Array(sprayCount * 3);
	const sprayVel = new Float32Array(sprayCount * 3);
	const sprayLife = new Float32Array(sprayCount);
	const respawn = (i) => {
		const a = Math.random() * Math.PI * 2;
		const r = 1.35 + Math.random() * .25;
		sprayPos[i * 3] = Math.cos(a) * r;
		sprayPos[i * 3 + 1] = -.85 + Math.random() * .2;
		sprayPos[i * 3 + 2] = Math.sin(a) * r;
		sprayVel[i * 3] = Math.cos(a) * (.18 + Math.random() * .28);
		sprayVel[i * 3 + 1] = .28 + Math.random() * .5;
		sprayVel[i * 3 + 2] = Math.sin(a) * (.18 + Math.random() * .28);
		sprayLife[i] = Math.random() * 2.6;
	};
	for (let i = 0; i < sprayCount; i++) respawn(i);
	const sprayGeo = track(new BufferGeometry());
	sprayGeo.setAttribute("position", new BufferAttribute(sprayPos, 3));
	const spray = new Points(sprayGeo, track(new PointsMaterial({
		color: 15985367,
		size: .032,
		transparent: true,
		opacity: .55,
		depthWrite: false,
		sizeAttenuation: true
	})));
	scene.add(spray);
	const facetPos = /* @__PURE__ */ new Float32Array(864);
	const facetCol = /* @__PURE__ */ new Float32Array(864);
	const facetGeo = track(new BufferGeometry());
	facetGeo.setAttribute("position", new BufferAttribute(facetPos, 3));
	facetGeo.setAttribute("color", new BufferAttribute(facetCol, 3));
	facetGeo.setDrawRange(0, 0);
	const facetMesh = new Mesh(facetGeo, track(new MeshStandardMaterial({
		vertexColors: true,
		roughness: .58,
		metalness: .12,
		flatShading: true,
		side: 2,
		emissive: 2760980,
		emissiveIntensity: .35
	})));
	scene.add(facetMesh);
	const linePos = /* @__PURE__ */ new Float32Array(1152);
	const lineCol = /* @__PURE__ */ new Float32Array(1152);
	const lineGeo = track(new BufferGeometry());
	lineGeo.setAttribute("position", new BufferAttribute(linePos, 3));
	lineGeo.setAttribute("color", new BufferAttribute(lineCol, 3));
	lineGeo.setDrawRange(0, 0);
	const lines = new LineSegments(lineGeo, track(new LineBasicMaterial({
		vertexColors: true,
		transparent: true,
		opacity: .8
	})));
	scene.add(lines);
	const cMatch = new Color(4173728);
	const cMount = new Color(14721610);
	const cFlat = new Color(15985367);
	const cVal = new Color(15985367).multiplyScalar(.42);
	const logical = new Float32Array(MAX_FACETS);
	const shown = new Float32Array(MAX_FACETS);
	const goal = new Float32Array(MAX_FACETS);
	let moduleN = 3;
	let framed = -1;
	const timer = new Timer();
	timer.connect(document);
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const raycaster = new Raycaster();
	const pointer = new Vector2();
	const rebuild = () => {
		const H = .56;
		const base = -.35 - (moduleN - 1) * .5900000000000001 * .12;
		let fp = 0;
		let lp = 0;
		for (let m = 0; m < moduleN; m++) {
			const t = moduleN === 1 ? .5 : m / (moduleN - 1);
			const radius = (.52 + Math.sin(Math.PI * t) * .72) * (moduleN === 1 ? 1 : 1 - t * .28);
			const y = base + m * .5900000000000001;
			const twist = m * GOLDEN_ANGLE;
			for (let s = 0; s < 3; s++) {
				const idx = m * 3 + s;
				const fold = shown[idx];
				const color = logical[idx] === goal[idx] ? cMatch : fold > .35 ? cMount : fold < -.35 ? cVal : cFlat;
				const a0 = twist + s * (Math.PI * 2 / 3);
				const a1 = a0 + Math.PI * 2 / 3;
				const am = (a0 + a1) / 2;
				const wr = waist(radius, fold);
				const tri = (th, rad, yy) => {
					fp = writeV(facetPos, facetCol, fp, th, rad, yy, color);
				};
				const A = () => tri(a0, radius, y);
				const B = () => tri(a1, radius, y);
				const C = () => tri(a1, radius, y + H);
				const D = () => tri(a0, radius, y + H);
				const M = () => tri(am, wr, y + H / 2);
				A();
				B();
				M();
				B();
				C();
				M();
				C();
				D();
				M();
				D();
				A();
				M();
				const seg = (th, rad, yy) => {
					lp = writeV(linePos, lineCol, lp, th, rad, yy, color);
				};
				const pairs = [
					[
						a0,
						radius,
						y
					],
					[
						a1,
						radius,
						y
					],
					[
						a1,
						radius,
						y
					],
					[
						a1,
						radius,
						y + H
					],
					[
						a1,
						radius,
						y + H
					],
					[
						a0,
						radius,
						y + H
					],
					[
						a0,
						radius,
						y + H
					],
					[
						a0,
						radius,
						y
					],
					[
						a0,
						radius,
						y
					],
					[
						am,
						wr,
						y + H / 2
					],
					[
						a1,
						radius,
						y
					],
					[
						am,
						wr,
						y + H / 2
					],
					[
						a1,
						radius,
						y + H
					],
					[
						am,
						wr,
						y + H / 2
					],
					[
						a0,
						radius,
						y + H
					],
					[
						am,
						wr,
						y + H / 2
					]
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
	const onDown = (event) => {
		if (event.pointerType === "mouse" && event.button !== 0) return;
		down = true;
		sx = event.clientX;
		sy = event.clientY;
	};
	const onUp = (event) => {
		if (!down) return;
		down = false;
		if (event.target !== canvas) return;
		const dx = event.clientX - sx;
		const dy = event.clientY - sy;
		if (dx * dx + dy * dy > 25) return;
		const rect = canvas.getBoundingClientRect();
		pointer.x = (event.clientX - rect.left) / rect.width * 2 - 1;
		pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
		raycaster.setFromCamera(pointer, camera);
		const face = raycaster.intersectObject(facetMesh, false)[0]?.faceIndex;
		if (face == null) return;
		const facet = Math.floor(face / 4);
		if (facet < 0 || facet >= moduleN * 3) return;
		onCycle(Math.floor(facet / 3), facet % 3);
	};
	canvas.addEventListener("pointerdown", onDown);
	window.addEventListener("pointerup", onUp);
	renderer.setAnimationLoop((timestamp) => {
		timer.update(timestamp);
		const dt = Math.min(timer.getDelta(), .1);
		const ease = 1 - Math.exp(-dt * 8);
		for (let i = 0; i < moduleN * 3; i++) shown[i] += (logical[i] - shown[i]) * ease;
		rebuild();
		if (!reduce) disk.rotation.y += dt * .08;
		const sprayAttr = sprayGeo.attributes.position;
		for (let i = 0; i < sprayCount; i++) {
			sprayLife[i] += dt * (reduce ? .2 : 1);
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
				const dist = 5.1 + moduleN * .38;
				camera.position.set(dist * .42, 1.15 + moduleN * .04, dist);
				controls.target.set(0, .25, 0);
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
		}
	};
}
//#endregion
export { mountStage };
