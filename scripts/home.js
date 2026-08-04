import { createLanguageController } from "./i18n.js";

createLanguageController();

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
if (!reducedMotion.matches) document.documentElement.classList.add("is-motion-ready");
