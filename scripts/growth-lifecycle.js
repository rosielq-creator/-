const clamp = (value) => Math.max(0, Math.min(1, value));

export function getLifecycleState(scrollPosition, stages) {
  if (!stages.length) return { stage: "seed", index: 0, local: 0, global: 0 };
  const first = stages[0];
  const last = stages.at(-1);
  const found = stages.findIndex((item) => scrollPosition < item.bottom);
  const index = found < 0 ? stages.length - 1 : found;
  const active = stages[index] || last;
  const local = clamp((scrollPosition - active.top) / Math.max(1, active.bottom - active.top));
  const global = clamp((scrollPosition - first.top) / Math.max(1, last.bottom - first.top));
  return { stage: active.name, index, local: Number(local.toFixed(4)), global: Number(global.toFixed(4)) };
}

export function mountGrowthLifecycle({ root = document, viewport = window } = {}) {
  const organism = root.querySelector("[data-growth-organism]");
  const sections = [...root.querySelectorAll("[data-growth-stage]")];
  if (!organism || !sections.length) return () => {};
  let frame = 0;
  const render = () => {
    frame = 0;
    const y = viewport.scrollY + viewport.innerHeight * 0.5;
    const stages = sections.map((section) => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + viewport.scrollY;
      return { name: section.dataset.growthStage, top, bottom: top + rect.height };
    });
    const state = getLifecycleState(y, stages);
    organism.dataset.stage = state.stage;
    organism.style.setProperty("--growth-local", state.local);
    organism.style.setProperty("--growth-global", state.global);
    root.documentElement.style.setProperty("--growth-progress", state.global);
  };
  const request = () => { if (!frame) frame = viewport.requestAnimationFrame(render); };
  viewport.addEventListener("scroll", request, { passive: true });
  viewport.addEventListener("resize", request, { passive: true });
  render();
  return () => {
    viewport.removeEventListener("scroll", request);
    viewport.removeEventListener("resize", request);
    if (frame) viewport.cancelAnimationFrame(frame);
  };
}
