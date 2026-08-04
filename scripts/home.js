import { createLanguageController } from "./i18n.js";

createLanguageController();

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
if (!reducedMotion.matches) {
  document.documentElement.classList.add("is-motion-ready");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in-view");
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12%", threshold: 0.12 });

  document.querySelectorAll("[data-motion-section], [data-motion-item]").forEach((node, index) => {
    node.style.setProperty("--motion-delay", `${Math.min(index % 4, 3) * 70}ms`);
    revealObserver.observe(node);
  });

  const motionSections = [...document.querySelectorAll("[data-motion-section]")];
  let motionFrame = 0;
  const updateMotion = () => {
    motionFrame = 0;
    motionSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height + innerHeight;
      const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / travel));
      section.style.setProperty("--section-progress", progress.toFixed(4));
    });
    document.querySelectorAll(".work-card").forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const offset = Math.max(-28, Math.min(28, (innerHeight * 0.5 - (rect.top + rect.height * 0.5)) * 0.035));
      card.style.setProperty("--media-shift", `${index % 2 ? -offset : offset}px`);
    });
  };
  const requestMotion = () => { if (!motionFrame) motionFrame = requestAnimationFrame(updateMotion); };
  addEventListener("scroll", requestMotion, { passive: true });
  addEventListener("resize", requestMotion, { passive: true });
  updateMotion();
} else {
  document.querySelectorAll("[data-motion-section], [data-motion-item]").forEach((node) => node.classList.add("is-in-view"));
}

const workVideos = [...document.querySelectorAll("[data-media-toggle]")];
workVideos.forEach((button) => {
  const video = button.querySelector("video");
  const label = button.querySelector("span");
  if (!video || !label) return;
  button.addEventListener("click", async () => {
    if (video.paused) {
      workVideos.forEach((other) => { if (other !== button) other.querySelector("video")?.pause(); });
      try { await video.play(); } catch { video.controls = true; }
    } else video.pause();
  });
  video.addEventListener("play", () => { label.textContent = "Pause"; button.setAttribute("aria-pressed", "true"); });
  video.addEventListener("pause", () => { label.textContent = "Play"; button.setAttribute("aria-pressed", "false"); });
});

if ("IntersectionObserver" in window) {
  const pauseObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) entry.target.querySelector("video")?.pause();
  }), { threshold: 0.1 });
  workVideos.forEach((button) => pauseObserver.observe(button));
}
