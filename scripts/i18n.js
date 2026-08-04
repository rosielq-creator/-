import { SITE_CONTENT } from "./site-content.js";

const read = (object, path) => path.split(".").reduce((value, key) => value?.[key], object);

export function createLanguageController({ root = document, storageKey = "gt-language" } = {}) {
  let language = localStorage.getItem(storageKey) === "zh" ? "zh" : "en";
  const render = () => {
    root.documentElement.lang = language === "zh" ? "zh-Hans" : "en";
    root.querySelectorAll("[data-copy]").forEach((node) => {
      node.textContent = read(SITE_CONTENT[language], node.dataset.copy) || "";
    });
    root.querySelectorAll("[data-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
  };
  const setLanguage = (next) => {
    language = next === "zh" ? "zh" : "en";
    localStorage.setItem(storageKey, language);
    render();
  };
  root.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });
  render();
  return { get language() { return language; }, setLanguage };
}
