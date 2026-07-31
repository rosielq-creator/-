import { artists, brands, i18n, services } from "./data.js?v=20260728-8";

const page = document.body.dataset.page;
let language = "en";
let openBrandId = null;

const copy = (key) => i18n[language]?.[key] || i18n.en[key] || key;
const profileHref = (id) => `profile.html?artist=${encodeURIComponent(id)}`;

function renderHeader() {
  const root = document.querySelector("[data-header]");
  if (!root) return;
  const homePrefix = page === "home" ? "" : "index.html";
  root.innerHTML = `
    <div class="header-inner">
      <a class="logo" href="index.html" aria-label="GreenTomato home">
        <img src="assets/brand/greentomato-official.svg" alt="GreenTomato">
      </a>
      <nav class="main-nav" aria-label="Primary navigation">
        <a href="artists.html" data-i18n="navArtists"></a>
        <a href="${homePrefix}#work" data-i18n="navWork"></a>
        <a href="${homePrefix}#services" data-i18n="navServices"></a>
        <a href="${homePrefix}#about" data-i18n="navAbout"></a>
        <a href="${homePrefix}#contact" data-i18n="navContact"></a>
      </nav>
      <div class="language-menu">
        <button class="language-button" type="button" aria-expanded="false" aria-controls="languageOptions">EN / 中文</button>
        <div class="language-options" id="languageOptions" hidden>
          <button type="button" data-language="en">English</button>
          <button type="button" data-language="zh-hant">繁體中文</button>
          <button type="button" data-language="zh-hans">简体中文</button>
        </div>
      </div>
      <button class="menu-button" type="button" aria-expanded="false" aria-label="Open menu">MENU</button>
      <nav class="mobile-nav" aria-label="Mobile navigation" aria-hidden="true" inert>
        <a href="artists.html" data-i18n="navArtists"></a>
        <a href="${homePrefix}#work" data-i18n="navWork"></a>
        <a href="${homePrefix}#services" data-i18n="navServices"></a>
        <a href="${homePrefix}#about" data-i18n="navAbout"></a>
        <a href="${homePrefix}#contact" data-i18n="navContact"></a>
      </nav>
    </div>`;

  const languageButton = root.querySelector(".language-button");
  const options = root.querySelector(".language-options");
  languageButton.addEventListener("click", () => {
    const willOpen = options.hidden;
    options.hidden = !willOpen;
    languageButton.setAttribute("aria-expanded", String(willOpen));
  });
  options.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => {
    language = button.dataset.language;
    options.hidden = true;
    languageButton.setAttribute("aria-expanded", "false");
    applyLanguage();
  }));
  const menuButton = root.querySelector(".menu-button");
  const mobileNav = root.querySelector(".mobile-nav");
  menuButton.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "CLOSE" : "MENU";
    mobileNav.inert = !open;
    mobileNav.setAttribute("aria-hidden", String(!open));
  });
  mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "MENU";
    mobileNav.inert = true;
    mobileNav.setAttribute("aria-hidden", "true");
  }));
}

function renderFooter() {
  const footer = document.querySelector("[data-footer]");
  if (!footer) return;
  footer.innerHTML = `<a class="footer-logo" href="index.html" aria-label="GreenTomato home"><img src="assets/brand/greentomato-official.svg" alt="GreenTomato"></a><p data-i18n="footerLine"></p><p>© 2026 / PREVIEW</p>`;
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.body.dataset.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = copy(element.dataset.i18n);
    if (value) element.textContent = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = copy(element.dataset.i18nPlaceholder);
  });
  renderDynamicPage();
}

function artistCard(artist) {
  return `
    <a class="poster-card" href="${profileHref(artist.id)}" data-artist-card="${artist.id}">
      <figure><img src="${artist.poster}" alt="${artist.name}, GTAI AI talent" loading="lazy"></figure>
      <div class="poster-card-meta"><div><h3>${artist.name}</h3><p>${artist.role}</p></div><b>↗</b></div>
    </a>`;
}

function renderStage() {
  const stage = document.querySelector("#turntableStage");
  if (!stage || stage.childElementCount) return;
  artists.forEach((artist, index) => {
    const button = document.createElement("button");
    button.className = "stage-person";
    button.type = "button";
    button.dataset.index = String(index);
    button.innerHTML = `<figure><img src="${artist.stage}" alt="${artist.name}"></figure><span>${artist.name}</span>`;
    button.addEventListener("click", () => {
      const activeIndex = Number(stage.dataset.active || 0);
      if (activeIndex === index) location.href = profileHref(artist.id);
      else setStageActive(index);
    });
    stage.append(button);
  });
  setStageActive(0);
}

function setStageActive(activeIndex) {
  const stage = document.querySelector("#turntableStage");
  if (!stage) return;
  stage.dataset.active = String(activeIndex);
  const total = artists.length;
  stage.querySelectorAll(".stage-person").forEach((person, index) => {
    let relative = (index - activeIndex + total) % total;
    if (relative > total / 2) relative -= total;
    const distance = Math.abs(relative);
    const compact = matchMedia("(max-width: 640px)").matches;
    person.style.setProperty("--x", `${relative * (compact ? 31 : 19)}vw`);
    person.style.setProperty("--scale", String(distance === 0 ? 1 : distance === 1 ? .82 : .68));
    person.style.setProperty("--opacity", String(distance === 0 ? 1 : distance === 1 ? .84 : .58));
    person.style.setProperty("--z", String(10 - distance));
    person.dataset.active = String(relative === 0);
    person.dataset.mobileHidden = String(compact && distance > 1);
    person.setAttribute("aria-label", relative === 0 ? `View ${artists[index].name} profile` : `Bring ${artists[index].name} to centre`);
  });
  const artist = artists[activeIndex];
  document.querySelector("#stageName").textContent = artist.name;
  document.querySelector("#stageRole").textContent = artist.role;
}

function renderHomeRoster() {
  const roster = document.querySelector("#homeRoster");
  if (roster) roster.innerHTML = artists.map(artistCard).join("");
}

function renderServices() {
  const list = document.querySelector("#servicesList");
  if (!list || list.childElementCount) return;
  list.innerHTML = services.map(([number, title, description, tags]) => `
    <article class="service-row"><span>${number}</span><h3>${title}</h3><p>${description}</p><b>${tags}</b></article>
  `).join("");
}

const categoryKeys = ["hospitality", "retail", "entertainment", "fashion"];
let activeCategory = "hospitality";

function renderWork() {
  const tabs = document.querySelector("#workTabs");
  const track = document.querySelector("#brandTrack");
  if (!tabs || !track) return;
  tabs.innerHTML = categoryKeys.map((key) => `
    <button type="button" class="${key === activeCategory ? "is-active" : ""}" data-category="${key}" aria-pressed="${key === activeCategory}">${copy(key)}</button>
  `).join("");
  tabs.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    openBrandId = null;
    const detail = document.querySelector("#brandDetail");
    detail.hidden = true;
    renderWork();
  }));
  const matches = brands.filter((brand) => brand.category === activeCategory);
  track.innerHTML = matches.map((brand) => `
    <button class="brand-card" type="button" data-brand="${brand.id}" aria-expanded="${openBrandId === brand.id}">
      <figure><img src="${brand.cover}" alt="${brand.name}" loading="lazy"></figure>
      <div class="brand-card-meta">
        <div><h3>${brand.name}</h3><p>${brand.industry} · ${brand.year}</p></div>
        <small>${brand.projects.length} ${copy("workCount")} ↘</small>
      </div>
    </button>`).join("");
  track.querySelectorAll("[data-brand]").forEach((button) => button.addEventListener("click", () => openBrand(button.dataset.brand)));
}

function openBrand(id) {
  const brand = brands.find((item) => item.id === id);
  const detail = document.querySelector("#brandDetail");
  if (!brand || !detail) return;
  openBrandId = openBrandId === id ? null : id;
  if (!openBrandId) {
    detail.hidden = true;
    renderWork();
    return;
  }
  detail.hidden = false;
  detail.innerHTML = `
    <header class="brand-detail-head">
      <div><p class="section-index">${copy("projectsFor")}</p><h3>${brand.name}</h3></div>
      <button class="brand-close" type="button">${copy("closeProjects")} ×</button>
    </header>
    <div class="project-mosaic">
      ${brand.projects.map((project) => `
        <article class="project-piece">
          <video muted loop playsinline autoplay controls preload="metadata" poster="${project.poster}">
            <source src="${project.src}" type="video/mp4">
          </video>
          <p>${project.title} · ${copy("published")}</p>
        </article>`).join("")}
    </div>`;
  detail.querySelector(".brand-close").addEventListener("click", () => openBrand(id));
  observeVideos(detail);
  renderWork();
  requestAnimationFrame(() => detail.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }));
}

function observeVideos(root = document) {
  const videos = root.querySelectorAll("video[autoplay]");
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.play().catch(() => {});
    else entry.target.pause();
  }), { threshold: .25 });
  videos.forEach((video) => observer.observe(video));
}

function uniqueValues(key) {
  return [...new Set(artists.flatMap((artist) => Array.isArray(artist[key]) ? artist[key] : [artist[key]]).filter(Boolean))].sort();
}

function renderArtistFilters() {
  const root = document.querySelector("#artistFilters");
  if (!root || root.childElementCount) return;
  const definitions = [
    ["gender", "gender", uniqueValues("gender")],
    ["location", "location", uniqueValues("locations")],
    ["language", "language", uniqueValues("languages")],
    ["type", "talentType", uniqueValues("types")]
  ];
  root.innerHTML = definitions.map(([name, label, values]) => `
    <label class="filter-select"><span class="sr-only">${copy(label)}</span>
      <select data-filter="${name}">
        <option value="">${copy(label)} · ${copy("all")}</option>
        ${values.map((value) => `<option value="${value}">${value}</option>`).join("")}
      </select>
    </label>`).join("");
  root.querySelectorAll("select").forEach((select) => select.addEventListener("change", renderArtistRoster));
}

function renderArtistRoster() {
  const root = document.querySelector("#artistRoster");
  if (!root) return;
  const query = (document.querySelector("#artistSearch")?.value || "").trim().toLowerCase();
  const selected = Object.fromEntries([...document.querySelectorAll("[data-filter]")].map((select) => [select.dataset.filter, select.value]));
  const matches = artists.filter((artist) => {
    const haystack = `${artist.name} ${artist.role} ${artist.locations.join(" ")} ${artist.languages.join(" ")} ${artist.types.join(" ")}`.toLowerCase();
    return (!query || haystack.includes(query))
      && (!selected.gender || artist.gender === selected.gender)
      && (!selected.location || artist.locations.includes(selected.location))
      && (!selected.language || artist.languages.includes(selected.language))
      && (!selected.type || artist.types.includes(selected.type));
  });
  root.innerHTML = matches.map(artistCard).join("");
  document.querySelector("#emptyState").hidden = matches.length > 0;
}

function initArtists() {
  renderArtistFilters();
  renderArtistRoster();
  document.querySelector("#artistSearch")?.addEventListener("input", renderArtistRoster);
  document.querySelector("#clearFilters")?.addEventListener("click", () => {
    document.querySelector("#artistSearch").value = "";
    document.querySelectorAll("[data-filter]").forEach((select) => { select.value = ""; });
    renderArtistRoster();
  });
}

function profileFact(labelKey, value) {
  return value ? `<div><dt>${copy(labelKey)}</dt><dd>${value}</dd></div>` : "";
}

function initProfile() {
  if (page !== "profile") return;
  const id = new URLSearchParams(location.search).get("artist") || "maya";
  const artist = artists.find((item) => item.id === id) || artists[0];
  document.title = `${artist.name} — GTAI`;
  document.querySelector("#profileName").textContent = artist.name;
  document.querySelector("#profileRole").textContent = artist.role;
  document.querySelector("#profileFollowers").textContent = artist.followers;
  const hero = document.querySelector("#profileHeroImage");
  hero.src = artist.angles?.[0] || artist.hero;
  hero.alt = `${artist.name} full-length profile placeholder`;
  const bio = language === "zh-hant" ? artist.bioHant : language === "zh-hans" ? artist.bioHans : artist.bio;
  document.querySelector("#profileBio").textContent = bio;
  document.querySelector("#sourceArtist").value = artist.name;
  document.querySelector("#profileFacts").innerHTML = [
    profileFact("height", artist.height), profileFact("weight", artist.weight),
    profileFact("measurements", artist.measurements), profileFact("shoe", artist.shoe),
    profileFact("base", artist.base), profileFact("languages", artist.languages.join(" / ")),
    profileFact("nationality", artist.nationality), profileFact("birthday", artist.birthday),
    profileFact("zodiac", artist.zodiac), profileFact("type", artist.role)
  ].join("");
  const gallery = document.querySelector("#profileGallery");
  gallery.innerHTML = artist.gallery.map((src, index) => `
    <button class="gallery-item" type="button" aria-label="Expand ${artist.name} image ${index + 1}">
      <img src="${src}" alt="${artist.name} editorial image ${index + 1}" loading="${index < 2 ? "eager" : "lazy"}">
    </button>`).join("");
  gallery.querySelectorAll(".gallery-item").forEach((item) => item.addEventListener("click", () => {
    const opening = !item.classList.contains("is-expanded");
    gallery.querySelectorAll(".is-expanded").forEach((other) => other.classList.remove("is-expanded"));
    item.classList.toggle("is-expanded", opening);
    if (opening) requestAnimationFrame(() => item.scrollIntoView({ behavior: "smooth", block: "center" }));
  }));
  document.querySelector("#platformList").innerHTML = artist.platforms.map((platform) => {
    const tag = platform.href ? "a" : "article";
    const attrs = platform.href ? ` href="${platform.href}" target="_blank" rel="noreferrer"` : "";
    const preview = platform.preview
      ? `<figure class="platform-preview"><img src="${platform.preview}" alt="${artist.name} ${platform.name} profile" loading="lazy"></figure>`
      : "";
    return `<${tag} class="platform-row${platform.preview ? " has-preview" : ""}"${attrs}>
      ${preview}
      <div class="platform-copy"><h3>${platform.name}${platform.href ? " ↗" : ""}</h3><small>${copy("currentFollowers")}</small></div>
      <strong>${platform.count}</strong>
    </${tag}>`;
  }).join("");
  renderSocialAnalytics(artist);
  initAngleSwitcher(artist, hero);
}

function renderSocialAnalytics(artist) {
  const root = document.querySelector("#platformAnalytics");
  const analytics = artist.socialAnalytics;
  if (!root || !analytics) {
    if (root) root.innerHTML = "";
    return;
  }
  const metrics = analytics.metrics.map((metric) => `
    <article class="signal-metric">
      <span>${copy(metric.label)}</span>
      <strong>${metric.value}</strong>
      <small>${metric.note ? copy(metric.note) : copy("last30Days")}</small>
    </article>`).join("");
  const content = analytics.topContent;
  const stats = content.stats.map((stat) => `
    <div><span>${copy(stat.label)}</span><strong>${stat.value}</strong></div>`).join("");
  const contentVisual = content.cover
    ? `<figure><img src="${content.cover}" alt="${artist.name} top-performing Xiaohongshu content"></figure>`
    : "";
  root.innerHTML = `
    <div class="analytics-period">
      <div><span>${copy("last30Days")}</span><small>${analytics.period}</small></div>
      <p>${copy("updated")} ${analytics.updated}</p>
    </div>
    <div class="signal-metrics-grid">${metrics}</div>
    <section class="top-content-feature">
      <div class="top-content-heading">
        <p>${copy("topPerformingContent")}</p>
        <h3>${copy("mostEngaged")}</h3>
      </div>
      <article class="top-content-card${content.cover ? "" : " no-image"}">
        ${contentVisual}
        <div class="top-content-body">
          <div class="top-content-meta"><span>${content.platform} ↗</span><span>${content.date}</span></div>
          <div class="top-content-stats">${stats}</div>
          <div class="engagement-rate"><span>${copy("engagementRate")}</span><strong>${content.engagementRate}</strong><small>${copy("byViews")}</small></div>
          <a class="text-link" href="${content.href}" target="_blank" rel="noreferrer">${copy("openOriginalPost")}</a>
        </div>
      </article>
    </section>`;
}

function initAngleSwitcher(artist, hero) {
  const buttons = [...document.querySelectorAll("[data-angle]")];
  const dots = [...document.querySelectorAll(".angle-dots i")];
  const angles = artist.angles || [artist.hero, artist.hero, artist.hero];
  let active = 0;
  const activate = (index) => {
    active = (index + buttons.length) % buttons.length;
    hero.src = angles[active] || artist.hero;
    hero.alt = `${artist.name} ${buttons[active].dataset.angle} view`;
    buttons.forEach((button, buttonIndex) => button.classList.toggle("is-active", buttonIndex === active));
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === active));
  };
  buttons.forEach((button, index) => button.addEventListener("click", () => activate(index)));
  const area = document.querySelector(".digital-human");
  let startX = 0;
  area?.addEventListener("touchstart", (event) => { startX = event.touches[0].clientX; }, { passive: true });
  area?.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - startX;
    if (Math.abs(distance) > 45) activate(active + (distance < 0 ? 1 : -1));
  }, { passive: true });
}

function initInquiryForms() {
  document.querySelectorAll("[data-inquiry-form]").forEach((form) => form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (!form.reportValidity()) {
      status.textContent = copy("formError");
      return;
    }
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Submission failed");
      status.textContent = copy("success");
      form.reset();
      if (page === "profile") document.querySelector("#sourceArtist").value = payload.sourceArtist || "";
    } catch {
      status.textContent = location.protocol === "file:" || location.hostname.includes("github.io")
        ? `${copy("success")} (Preview mode)`
        : "The form could not be sent. Please try again.";
    } finally {
      button.disabled = false;
    }
  }));
}

function renderDynamicPage() {
  if (page === "home") {
    renderWork();
  } else if (page === "artists") {
    if (document.querySelector("#artistFilters")?.childElementCount) {
      const current = Object.fromEntries([...document.querySelectorAll("[data-filter]")].map((select) => [select.dataset.filter, select.value]));
      document.querySelector("#artistFilters").innerHTML = "";
      renderArtistFilters();
      Object.entries(current).forEach(([key, value]) => {
        const select = document.querySelector(`[data-filter="${key}"]`);
        if (select) select.value = value;
      });
      renderArtistRoster();
    }
  } else if (page === "profile") {
    initProfile();
  }
}

renderHeader();
renderFooter();
if (page === "home") {
  renderStage();
  renderHomeRoster();
  renderServices();
  renderWork();
  addEventListener("resize", () => setStageActive(Number(document.querySelector("#turntableStage")?.dataset.active || 0)), { passive: true });
}
if (page === "artists") initArtists();
if (page === "profile") initProfile();
initInquiryForms();
applyLanguage();
observeVideos();
