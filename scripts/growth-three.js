import * as THREE from "./vendor/three.module.js";

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D map;
  uniform float backgroundKey;
  varying vec2 vUv;
  void main() {
    vec4 texel = texture2D(map, vUv);
    float luminance = dot(texel.rgb, vec3(0.2126, 0.7152, 0.0722));
    float blackAlpha = smoothstep(0.08, 0.20, luminance);
    float whiteAlpha = smoothstep(0.20, 0.38, 1.0 - luminance);
    float alpha = mix(blackAlpha, whiteAlpha, backgroundKey) * texel.a;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(texel.rgb, alpha);
  }
`;

export async function mountGrowthThree({ root = document } = {}) {
  const canvas = root.querySelector("[data-growth-webgl]");
  if (!canvas || !window.WebGLRenderingContext) return () => {};

  const response = await fetch("data/plant-composition-v2.json");
  if (!response.ok) throw new Error(`Plant composition unavailable: ${response.status}`);
  const composition = await response.json();
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, innerWidth, 0, innerHeight, -10, 10);
  camera.position.z = 2;
  const loader = new THREE.TextureLoader();
  const meshes = new Map();
  let frame = 0;

  const requestRender = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  for (const [index, plant] of composition.plants.entries()) {
    const texture = loader.load(plant.source, requestRender);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    const material = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: texture },
        backgroundKey: { value: plant.background[0] > 0.5 ? 1 : 0 }
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      toneMapped: false
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    mesh.renderOrder = index;
    scene.add(mesh);
    meshes.set(plant.id, mesh);
  }

  function layout() {
    const viewportWidth = canvas.clientWidth;
    const mode = viewportWidth <= 800 ? "mobile" : "desktop";
    const baseWidth = composition[mode].width;
    const scale = viewportWidth / baseWidth;
    for (const [id, mesh] of meshes) {
      const box = composition[mode].placements[id];
      const width = box.width * scale;
      const height = box.height * scale;
      mesh.scale.set(width, height, 1);
      mesh.position.set((box.x + box.width / 2) * scale, -(box.y + box.height / 2) * scale, 0);
    }
  }

  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.left = 0;
    camera.right = width;
    camera.top = 0;
    camera.bottom = -height;
    camera.updateProjectionMatrix();
    layout();
    requestRender();
  }

  function render() {
    frame = 0;
    camera.position.y = -window.scrollY;
    renderer.render(scene, camera);
  }

  const onScroll = () => requestRender();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  resize();

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", resize);
    meshes.forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.uniforms.map.value.dispose();
      mesh.material.dispose();
    });
    renderer.dispose();
  };
}
