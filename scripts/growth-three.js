import * as THREE from "./vendor/three.module.js";

const STAGES = ["seed", "sprout", "branches", "bloom", "crystal", "seed-return"];
const COMPOSITIONS = {
  seed: { x: 0.29, y: 0.03, scale: 0.61, rotation: -0.08 },
  sprout: { x: 0.24, y: 0.02, scale: 0.79, rotation: 0.02 },
  branches: { x: 0.27, y: -0.01, scale: 0.87, rotation: -0.015 },
  bloom: { x: 0.18, y: 0.01, scale: 1.05, rotation: 0.025 },
  crystal: { x: 0.27, y: -0.01, scale: 0.77, rotation: -0.02 },
  "seed-return": { x: 0.31, y: 0.01, scale: 0.65, rotation: 0.055 }
};

const clamp = (value) => Math.max(0, Math.min(1, value));
const ease = (value) => 1 - Math.pow(1 - clamp(value), 3);

export function mountGrowthThree({ root = document } = {}) {
  const canvas = root.querySelector("[data-growth-webgl]");
  if (!canvas || !window.WebGLRenderingContext) return () => {};

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 4;
  const loader = new THREE.TextureLoader();
  const meshes = new Map();

  STAGES.forEach((name, index) => {
    const assetName = name === "bloom" ? "bloom-alpha" : name;
    const texture = loader.load(`assets/growth/hd/${assetName}.png`, requestRender);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const material = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: texture },
        opacity: { value: index === 0 ? 1 : 0 },
        whiteKey: { value: name === "seed-return" ? 1 : 0 },
        brightness: { value: name === "bloom" ? 2.15 : name === "seed-return" ? 1.75 : 1.18 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float opacity;
        uniform float whiteKey;
        uniform float brightness;
        varying vec2 vUv;
        void main() {
          vec4 texel = texture2D(map, vUv);
          vec3 color = texel.rgb;
          float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
          float blackKeyAlpha = smoothstep(0.018, 0.12, luminance);
          float whiteDistance = 1.0 - min(min(color.r, color.g), color.b);
          float whiteKeyAlpha = smoothstep(0.018, 0.15, whiteDistance);
          float alpha = mix(blackKeyAlpha, whiteKeyAlpha, whiteKey) * texel.a * opacity;
          if (alpha < 0.008) discard;
          gl_FragColor = vec4(min(color * brightness, vec3(1.0)), alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.888), material);
    mesh.renderOrder = index;
    scene.add(mesh);
    meshes.set(name, mesh);
  });

  let state = { stage: "seed", index: 0, local: 0, global: 0 };
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;

  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    camera.left = -width / height;
    camera.right = width / height;
    camera.top = 1;
    camera.bottom = -1;
    camera.updateProjectionMatrix();
    requestRender();
  }

  function applyComposition(mesh, composition, progress, active) {
    const viewportAspect = Math.max(1, canvas.clientWidth / canvas.clientHeight);
    const scale = composition.scale * (1 + (active ? Math.sin(progress * Math.PI) * 0.035 : 0));
    mesh.scale.set(scale * viewportAspect, scale, 1);
    mesh.position.set(composition.x * viewportAspect + pointerX * 0.025, composition.y + pointerY * 0.018, 0);
    mesh.rotation.z = composition.rotation + pointerX * 0.012;
  }

  function render() {
    frame = 0;
    const transition = ease(clamp((state.local - 0.66) / 0.34));
    const nextIndex = Math.min(STAGES.length - 1, state.index + 1);
    meshes.forEach((mesh, name) => {
      const index = STAGES.indexOf(name);
      mesh.material.uniforms.opacity.value = index === state.index ? 1 - transition : index === nextIndex ? transition : 0;
      applyComposition(mesh, COMPOSITIONS[name], state.local, index === state.index);
    });
    renderer.render(scene, camera);
  }

  function requestRender() {
    if (!frame) frame = requestAnimationFrame(render);
  }

  function onGrowth(event) {
    state = event.detail;
    requestRender();
  }

  function onPointer(event) {
    pointerX = event.clientX / innerWidth - 0.5;
    pointerY = event.clientY / innerHeight - 0.5;
    requestRender();
  }

  root.addEventListener("gt:growth", onGrowth);
  window.addEventListener("resize", resize, { passive: true });
  if (matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
    window.addEventListener("pointermove", onPointer, { passive: true });
  }
  resize();

  return () => {
    root.removeEventListener("gt:growth", onGrowth);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointer);
    meshes.forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.map?.dispose();
      mesh.material.dispose();
    });
    renderer.dispose();
  };
}
