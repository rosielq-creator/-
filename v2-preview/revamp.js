import { artists as sourceArtists, brands as sourceBrands } from "./data.js";

const artistOrder = ["amber", "mario", "maya", "noah", "ooona"];
const artists = artistOrder.map((id) => sourceArtists.find((artist) => artist.id === id)).filter(Boolean);
const brands = sourceBrands.map((brand) => {
  if (brand.id !== "grams") return brand;
  return {
    ...brand,
    projects: brand.projects.map((project) => project.title === "Black & White"
      ? { ...project, poster: "assets/work/grams-bw-poster.jpg" }
      : project)
  };
});

const services = [
  {
    number: "01",
    title: "AI Video Production",
    copy: "Concept, creative direction and AI-powered film production for campaigns and branded stories."
  },
  {
    number: "02",
    title: "Digital Human Creation",
    copy: "Original AI artists with distinctive identities, visual worlds and long-term content potential."
  },
  {
    number: "03",
    title: "AI Campaign & Social",
    copy: "Scalable films and photography for launches, campaign systems and always-on social content."
  },
  {
    number: "04",
    title: "AI-Powered Devices & Live Digital Humans",
    copy: "AI integrated with physical devices and live settings—from delivery and bartending machines to real-time digital humans for meetings and events."
  }
];

const categoryLabels = {
  hospitality: "Hospitality",
  retail: "Retail",
  entertainment: "Entertainment",
  fashion: "Fashion & Lifestyle"
};

const projectCopy = {
  mgm: "Video and image generation by GTAI.",
  octopus: "Video and image generation by GTAI.",
  grams: "Video and image generation by GTAI.",
  koisea: "Video and image generation by GTAI."
};

const roleLabels = {
  maya: "AI Artist · Luxury Fashion / Art",
  amber: "AI Artist · Music Producer / Fashion",
  mario: "AI Artist · Lifestyle / Fashion / Sport",
  noah: "AI Artist · Film / Fashion / Photography",
  ooona: "AI Artist · Beauty / Wellness"
};

const titleLine = {
  maya: "Quietly precise. Visually assured.",
  amber: "Sound, style and city rhythm.",
  mario: "Everyday culture, seen differently.",
  noah: "A cinematic eye on modern life.",
  ooona: "Wellness with a lighter point of view."
};

let activeVideo = null;

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function currentPageHref(fragment) {
  return document.body.dataset.page === "home" ? fragment : `index.html${fragment}`;
}

function renderHeader() {
  const target = document.querySelector("[data-header]");
  if (!target) return;
  target.innerHTML = `
    <div class="header-inner">
      <a class="brand-mark" href="index.html" aria-label="GreenTomato home">
        <img src="assets/brand/greentomato-official.svg" alt="GreenTomato">
      </a>
      <nav class="desktop-nav" aria-label="Primary">
        <a href="artists.html">Artists</a>
        <a href="work.html">Work</a>
        <a href="${currentPageHref("#services")}">Services</a>
        <a href="${currentPageHref("#about")}">About</a>
        <a href="${currentPageHref("#contact")}">Contact</a>
        <a class="company-link" href="https://gtomato.com/" target="_blank" rel="noopener noreferrer">Company</a>
        <div class="language-switcher">
          <button type="button" aria-expanded="false" data-language-trigger>English ↓</button>
          <div class="language-menu" data-language-menu hidden>
            <button type="button" data-language="en">English</button>
            <button type="button" data-language="zh-hant">繁體中文</button>
            <button type="button" data-language="zh-hans">简体中文</button>
          </div>
        </div>
      </nav>
      <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-menu-toggle>
        <span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" data-mobile-menu>
      <nav aria-label="Mobile">
        <div class="mobile-artists">
          <button type="button" aria-expanded="false" data-mobile-artists>Artists +</button>
          <div class="mobile-artists__list" hidden>
            ${artists.map((artist) => `<a href="profile.html?artist=${artist.id}">${artist.name}</a>`).join("")}
          </div>
        </div>
        <a href="work.html">Work</a>
        <a href="${currentPageHref("#services")}">Services</a>
        <a href="${currentPageHref("#about")}">About</a>
        <a href="${currentPageHref("#contact")}">Contact</a>
        <a href="https://gtomato.com/" target="_blank" rel="noopener noreferrer">Company ↗</a>
        <div class="mobile-artists">
          <button type="button" aria-expanded="false" data-mobile-language>English +</button>
          <div class="mobile-artists__list" hidden>
            <button type="button" data-language="en">English</button>
            <button type="button" data-language="zh-hant">繁體中文</button>
            <button type="button" data-language="zh-hans">简体中文</button>
          </div>
        </div>
      </nav>
    </div>
  `;

  const languageTrigger = target.querySelector("[data-language-trigger]");
  const languageMenu = target.querySelector("[data-language-menu]");
  languageTrigger?.addEventListener("click", () => {
    const willOpen = languageMenu.hidden;
    languageMenu.hidden = !willOpen;
    languageTrigger.setAttribute("aria-expanded", String(willOpen));
  });

  target.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      localStorage.setItem("gtai-language", language);
      languageMenu.hidden = true;
      if (language !== "en") {
        window.alert("The approved English prototype is shown first. Full Traditional and Simplified Chinese copy follows after design approval.");
      }
    });
  });

  const menuToggle = target.querySelector("[data-menu-toggle]");
  const mobileMenu = target.querySelector("[data-mobile-menu]");
  menuToggle?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  const disclosurePairs = [
    ["[data-mobile-artists]", ".mobile-artists__list"],
    ["[data-mobile-language]", ".mobile-artists__list"]
  ];
  disclosurePairs.forEach(([triggerSelector]) => {
    const trigger = target.querySelector(triggerSelector);
    const list = trigger?.parentElement.querySelector(".mobile-artists__list");
    trigger?.addEventListener("click", () => {
      const willOpen = list.hidden;
      list.hidden = !willOpen;
      trigger.setAttribute("aria-expanded", String(willOpen));
    });
  });

  let lastScroll = window.scrollY;
  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    target.classList.toggle("is-hidden", current > lastScroll && current > 140 && !document.body.classList.contains("menu-open"));
    lastScroll = current;
  }, { passive: true });
}

function renderFooter() {
  const target = document.querySelector("[data-footer]");
  if (!target) return;
  target.innerHTML = `
    <div class="footer-inner">
      <a href="index.html"><img src="assets/brand/greentomato-official.svg" alt="GreenTomato"></a>
      <div class="footer-links">
        <a href="https://www.instagram.com/greentomatolimited/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        <a href="https://www.xiaohongshu.com/user/profile/690b116f000000003702cc79" target="_blank" rel="noopener noreferrer">Xiaohongshu ↗</a>
      </div>
      <span>© 2026 GreenTomato</span>
    </div>
  `;
}

function setupArtistStage() {
  const stage = document.querySelector("[data-artist-stage]");
  if (!stage) return;
  let activeIndex = Math.max(0, artists.findIndex((artist) => artist.id === "maya"));
  let pointerStart = null;

  stage.innerHTML = artists.map((artist, index) => `
    <article class="stage-slide${index === activeIndex ? " is-active" : ""}" data-stage-slide="${index}">
      <figure><img src="${artist.stage}" alt="${escapeHTML(artist.name)}, ${escapeHTML(artist.role)}" ${index === activeIndex ? 'fetchpriority="high"' : 'loading="lazy"'}></figure>
      <div class="stage-slide__copy">
        <p class="micro-label">${escapeHTML(roleLabels[artist.id])}</p>
        <h2>${escapeHTML(artist.name)}</h2>
        <p>${escapeHTML(titleLine[artist.id])}</p>
        <a href="profile.html?artist=${artist.id}">View profile <span>↗</span></a>
      </div>
    </article>
  `).join("");

  const current = document.querySelector("[data-stage-current]");
  const slides = [...stage.querySelectorAll("[data-stage-slide]")];
  const update = (nextIndex, direction = 1) => {
    const normalized = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === normalized);
      slide.classList.toggle("is-before", index === activeIndex && direction > 0);
    });
    activeIndex = normalized;
    if (current) current.textContent = String(activeIndex + 1).padStart(2, "0");
  };

  document.querySelector("[data-stage-prev]")?.addEventListener("click", () => update(activeIndex - 1, -1));
  document.querySelector("[data-stage-next]")?.addEventListener("click", () => update(activeIndex + 1, 1));
  stage.addEventListener("pointerdown", (event) => { pointerStart = event.clientX; });
  stage.addEventListener("pointerup", (event) => {
    if (pointerStart === null) return;
    const delta = event.clientX - pointerStart;
    if (Math.abs(delta) > 48) update(activeIndex + (delta < 0 ? 1 : -1), delta < 0 ? 1 : -1);
    pointerStart = null;
  });
}

function workCard(brand, project) {
  return `
    <article class="work-card" data-category="${brand.category}" data-brand="${brand.id}">
      <div class="work-card__media">
        <video preload="metadata" poster="${project.poster}" playsinline src="${project.src}" aria-label="${escapeHTML(brand.name)} video"></video>
        <div class="video-controls is-idle">
          <button class="video-main-control" type="button" aria-label="Play video" data-video-toggle>▶</button>
          <div class="video-secondary">
            <button type="button" aria-label="Mute video" data-video-mute>⌁</button>
            <button type="button" aria-label="View fullscreen" data-video-fullscreen>⛶</button>
          </div>
        </div>
      </div>
      <div class="work-card__info">
        <div class="client-wordmark" aria-label="${escapeHTML(brand.name)} logo">${escapeHTML(brand.name)}</div>
        <div class="work-card__copy">
          <h3>${escapeHTML(project.title)}</h3>
          <p>${escapeHTML(projectCopy[brand.id] || "AI-native film and photography produced for the brand.")}</p>
        </div>
        <a href="case.html?brand=${brand.id}">View case ↗</a>
      </div>
    </article>
  `;
}

function attachVideoControls(root = document) {
  root.querySelectorAll(".work-card__media, .case-media").forEach((media) => {
    const video = media.querySelector("video");
    const controls = media.querySelector(".video-controls");
    const toggle = media.querySelector("[data-video-toggle]");
    const mute = media.querySelector("[data-video-mute]");
    const fullscreen = media.querySelector("[data-video-fullscreen]");
    if (!video || !controls || !toggle) return;

    let hideTimer;
    const showTemporarily = () => {
      controls.classList.add("is-visible");
      window.clearTimeout(hideTimer);
      if (!video.paused) hideTimer = window.setTimeout(() => controls.classList.remove("is-visible"), 1500);
    };

    const update = () => {
      toggle.textContent = video.paused ? "▶" : "Ⅱ";
      toggle.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
      controls.classList.toggle("is-idle", video.paused);
      if (!video.paused) showTemporarily();
    };

    toggle.addEventListener("click", async () => {
      if (video.paused) {
        if (activeVideo && activeVideo !== video) activeVideo.pause();
        activeVideo = video;
        await video.play();
      } else {
        video.pause();
      }
      update();
    });
    mute?.addEventListener("click", () => {
      video.muted = !video.muted;
      mute.textContent = video.muted ? "×" : "⌁";
      mute.setAttribute("aria-label", video.muted ? "Unmute video" : "Mute video");
      showTemporarily();
    });
    fullscreen?.addEventListener("click", () => video.requestFullscreen?.());
    media.addEventListener("pointermove", showTemporarily);
    media.addEventListener("pointerleave", () => {
      if (!video.paused) controls.classList.remove("is-visible");
    });
    video.addEventListener("play", update);
    video.addEventListener("pause", update);
    video.addEventListener("ended", update);
  });
}

function setupWorkCollection({ index = false } = {}) {
  const tabs = document.querySelector("[data-work-tabs]");
  const rail = document.querySelector(index ? "[data-work-index]" : "[data-work-rail]");
  if (!tabs || !rail) return;

  const categories = Object.keys(categoryLabels);
  let activeCategory = categories[0];
  tabs.innerHTML = categories.map((category, tabIndex) =>
    `<button type="button" class="${tabIndex === 0 ? "is-active" : ""}" data-work-category="${category}">${categoryLabels[category]}</button>`
  ).join("");

  const render = () => {
    const filtered = brands.filter((brand) => brand.category === activeCategory);
    const pieces = filtered.flatMap((brand) => brand.projects.map((project) => ({ brand, project })));
    rail.innerHTML = pieces.length
      ? pieces.map(({ brand, project }) => workCard(brand, project)).join("")
      : `<p class="empty-state">No published work in this category yet.</p>`;
    attachVideoControls(rail);
    if (!index) updateRailArrows();
  };

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-work-category]");
    if (!button) return;
    activeCategory = button.dataset.workCategory;
    tabs.querySelectorAll("button").forEach((item) => item.classList.toggle("is-active", item === button));
    rail.animate([{ opacity: .2 }, { opacity: 1 }], { duration: 260, easing: "ease-out" });
    render();
  });

  const prev = document.querySelector("[data-rail-prev]");
  const next = document.querySelector("[data-rail-next]");
  function updateRailArrows() {
    if (!prev || !next) return;
    window.requestAnimationFrame(() => {
      prev.hidden = rail.scrollLeft < 8;
      next.hidden = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
    });
  }
  prev?.addEventListener("click", () => rail.scrollBy({ left: -rail.clientWidth * .88, behavior: "smooth" }));
  next?.addEventListener("click", () => rail.scrollBy({ left: rail.clientWidth * .88, behavior: "smooth" }));
  rail.addEventListener("scroll", updateRailArrows, { passive: true });
  window.addEventListener("resize", updateRailArrows);
  render();
}

function setupServices() {
  const list = document.querySelector("[data-service-list]");
  if (!list) return;
  list.innerHTML = services.map((service, index) => `
    <article class="service-item">
      <small>${service.number}</small>
      <h3>${escapeHTML(service.title)}</h3>
      <p>${escapeHTML(service.copy)}</p>
    </article>
  `).join("");
}

function setupInquiryForms() {
  document.querySelectorAll("[data-inquiry-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const contact = String(data.get("contact") || "").trim();
      const status = form.querySelector(".form-status");
      if (!name || !contact) {
        status.textContent = "Please add your name and an email or WhatsApp number.";
        return;
      }
      form.innerHTML = `
        <div class="form-success field-wide" role="status">
          <h3>Thank you, ${escapeHTML(name)}.</h3>
          <p>Your inquiry is ready for the preview workflow. Production email delivery will be connected after approval.</p>
        </div>
      `;
    });
  });
}

function filterValues(key) {
  const values = new Set();
  artists.forEach((artist) => {
    if (key === "gender") values.add(artist.gender);
    if (key === "country") artist.locations.forEach((value) => values.add(value));
    if (key === "language") artist.languages.forEach((value) => values.add(value));
    if (key === "creative") artist.types.forEach((value) => values.add(value));
  });
  return [...values].sort();
}

function setupArtistDirectory() {
  const bar = document.querySelector("[data-filter-bar]");
  const directory = document.querySelector("[data-artist-directory]");
  if (!bar || !directory) return;
  const filters = { gender: "All", country: "All", language: "All", creative: "All" };
  const labels = { gender: "Gender", country: "Country", language: "Language", creative: "Creative Talent" };

  bar.innerHTML = Object.keys(labels).map((key) => `
    <div class="filter-group">
      <button type="button" aria-expanded="false" data-filter-trigger="${key}">${labels[key]}</button>
      <div class="filter-menu" data-filter-menu="${key}" hidden>
        <button type="button" class="is-active" data-filter-value="All">All</button>
        ${filterValues(key).map((value) => `<button type="button" data-filter-value="${escapeHTML(value)}">${escapeHTML(value)}</button>`).join("")}
      </div>
    </div>
  `).join("");

  const render = () => {
    const filtered = artists.filter((artist) => {
      if (filters.gender !== "All" && artist.gender !== filters.gender) return false;
      if (filters.country !== "All" && !artist.locations.includes(filters.country)) return false;
      if (filters.language !== "All" && !artist.languages.includes(filters.language)) return false;
      if (filters.creative !== "All" && !artist.types.includes(filters.creative)) return false;
      return true;
    });
    directory.innerHTML = filtered.map((artist) => `
      <a class="directory-card" href="profile.html?artist=${artist.id}">
        <figure>
          <img src="${artist.poster}" alt="${escapeHTML(artist.name)}, ${escapeHTML(artist.role)}">
          <div class="directory-overlay">
            <dl>
              <div><dt>Country</dt><dd>${escapeHTML(artist.locations.join(" / "))}</dd></div>
              <div><dt>Language</dt><dd>${escapeHTML(artist.languages.join(" / "))}</dd></div>
              <div><dt>Gender</dt><dd>${escapeHTML(artist.gender)}</dd></div>
              <div><dt>Role</dt><dd>${escapeHTML(artist.role)}</dd></div>
            </dl>
            <div class="talent-tags">${artist.types.slice(0, 4).map((type) => `<span>${escapeHTML(type)}</span>`).join("")}</div>
          </div>
        </figure>
        <div class="directory-card__title">
          <h2>${escapeHTML(artist.name)}</h2>
          <p>${escapeHTML(artist.role)}</p>
        </div>
      </a>
    `).join("");
    document.querySelector("[data-empty-state]").hidden = filtered.length > 0;
  };

  bar.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-filter-trigger]");
    const valueButton = event.target.closest("[data-filter-value]");
    if (trigger) {
      const menu = bar.querySelector(`[data-filter-menu="${trigger.dataset.filterTrigger}"]`);
      const willOpen = menu.hidden;
      bar.querySelectorAll("[data-filter-menu]").forEach((item) => { item.hidden = true; });
      menu.hidden = !willOpen;
      trigger.setAttribute("aria-expanded", String(willOpen));
      return;
    }
    if (valueButton) {
      const menu = valueButton.closest("[data-filter-menu]");
      const key = menu.dataset.filterMenu;
      filters[key] = valueButton.dataset.filterValue;
      menu.querySelectorAll("button").forEach((button) => button.classList.toggle("is-active", button === valueButton));
      const triggerButton = bar.querySelector(`[data-filter-trigger="${key}"]`);
      triggerButton.textContent = filters[key] === "All" ? labels[key] : `${labels[key]} · ${filters[key]}`;
      menu.hidden = true;
      render();
    }
  });
  document.addEventListener("click", (event) => {
    if (!bar.contains(event.target)) bar.querySelectorAll("[data-filter-menu]").forEach((menu) => { menu.hidden = true; });
  });
  render();
}

function renderProfile() {
  const root = document.querySelector("[data-profile-root]");
  if (!root) return;
  const id = new URLSearchParams(window.location.search).get("artist") || "maya";
  const artist = artists.find((item) => item.id === id) || artists.find((item) => item.id === "maya");
  document.title = `${artist.name} — GreenTomato`;

  const verifiedGallery = artist.id === "maya"
    ? artist.gallery.slice(0, 4)
    : artist.gallery.slice(0, 8);
  const platforms = artist.platforms || [];
  const platformTotal = artist.followers || "—";

  root.innerHTML = `
    <section class="profile-shell profile-hero">
      <a class="back-link" href="artists.html">← All artists</a>
      <div class="profile-hero__grid">
        <figure class="profile-portrait"><img src="${artist.hero}" alt="${escapeHTML(artist.name)} portrait"></figure>
        <div class="profile-copy">
          <p class="micro-label">${escapeHTML(roleLabels[artist.id])}</p>
          <h1>${escapeHTML(artist.name)}</h1>
          <p class="profile-copy__bio">${escapeHTML(artist.bio)}</p>
          <dl class="profile-facts">
            <div><dt>Country / Base</dt><dd>${escapeHTML(artist.base || artist.locations.join(" / "))}</dd></div>
            <div><dt>Languages</dt><dd>${escapeHTML(artist.languages.join(" / "))}</dd></div>
            <div><dt>Gender</dt><dd>${escapeHTML(artist.gender)}</dd></div>
            <div><dt>Creative role</dt><dd>${escapeHTML(artist.role)}</dd></div>
            <div><dt>Height</dt><dd>${escapeHTML(artist.height || "On request")}</dd></div>
            <div><dt>Creative talents</dt><dd>${escapeHTML(artist.types.join(" / "))}</dd></div>
          </dl>
          <a class="profile-cta" href="#profile-contact">Start a collaboration <span>↓</span></a>
        </div>
      </div>
    </section>

    <section class="profile-shell profile-section" aria-labelledby="platformTitle">
      <header class="profile-section__head">
        <p class="micro-label">01 / PLATFORM INSIGHTS</p>
        <h2 id="platformTitle">Public milestones,<br><em>kept in context.</em></h2>
      </header>
      <div class="platform-rail">
        <div><small>Combined following</small><strong>${escapeHTML(platformTotal)}</strong></div>
        <div><small>Active platforms</small><strong>${String(platforms.length).padStart(2, "0")}</strong></div>
        <div><small>Last verified</small><strong>Jul 2026</strong></div>
      </div>
    </section>

    <section class="profile-shell profile-section" aria-labelledby="galleryTitle">
      <header class="profile-section__head">
        <p class="micro-label">02 / EDITORIAL GALLERY</p>
        <h2 id="galleryTitle">Selected<br><em>images.</em></h2>
      </header>
      <div class="gallery-grid">
        ${verifiedGallery.map((image, index) => `<figure><img src="${image}" alt="${escapeHTML(artist.name)} editorial image ${index + 1}" loading="lazy"></figure>`).join("")}
      </div>
      ${artist.id === "maya" ? '<p class="gallery-note">Four current images shown. Additional Maya imagery requires approval before it enters the design.</p>' : ""}
    </section>

    <section class="contact-block" id="profile-contact">
      <div class="profile-shell contact-layout">
        <div>
          <p class="micro-label">03 / CONTACT</p>
          <h2>Work with<br><em>${escapeHTML(artist.name)}.</em></h2>
          <p>Share the brand, format and ambition. We will reply with the right creative approach.</p>
        </div>
        <form class="compact-form" data-inquiry-form novalidate>
          <label><span>Name *</span><input name="name" autocomplete="name" required></label>
          <label><span>Company</span><input name="company" autocomplete="organization"></label>
          <label class="field-wide"><span>Email or WhatsApp *</span><input name="contact" autocomplete="email" required></label>
          <label class="field-wide"><span>Project brief</span><textarea name="request" rows="3">I would like to discuss a collaboration with ${escapeHTML(artist.name)}.</textarea></label>
          <button class="submit-button field-wide" type="submit">Send inquiry <span>↗</span></button>
          <p class="form-status field-wide" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;
  setupInquiryForms();
}

function renderCase() {
  const root = document.querySelector("[data-case-root]");
  if (!root) return;
  const id = new URLSearchParams(window.location.search).get("brand") || "mgm";
  const brand = brands.find((item) => item.id === id) || brands[0];
  document.title = `${brand.name} — GreenTomato Work`;
  const projects = brand.projects.slice(0, 2);
  const single = projects.length === 1;

  root.innerHTML = `
    <article class="case-page">
      <section class="section-shell case-hero">
        <a class="back-link" href="work.html">← All work</a>
        <div class="case-hero__grid">
          <figure class="case-cover"><img src="${brand.cover}" alt="${escapeHTML(brand.name)} project cover"></figure>
          <div class="case-info">
            <p class="micro-label">${escapeHTML(brand.industry)} / ${escapeHTML(brand.year)}</p>
            <h1>${escapeHTML(brand.name)}</h1>
            <p>${escapeHTML(projectCopy[brand.id] || "AI-native film and photography produced for the brand.")}</p>
            <dl class="case-meta">
              <div><dt>Client</dt><dd>${escapeHTML(brand.name)}</dd></div>
              <div><dt>GreenTomato role</dt><dd>End-to-end AI video and photography generation</dd></div>
              <div><dt>Deliverables</dt><dd>${projects.length} published video${projects.length > 1 ? "s" : ""}</dd></div>
              <div><dt>Year</dt><dd>${escapeHTML(brand.year)}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section class="section-shell case-media-section">
        <div class="case-media-grid${single ? " is-single" : ""}">
          ${projects.map((project) => `
            <figure class="case-media">
              <video preload="metadata" poster="${project.poster}" playsinline src="${project.src}" aria-label="${escapeHTML(project.title)}"></video>
              <div class="video-controls is-idle">
                <button class="video-main-control" type="button" aria-label="Play video" data-video-toggle>▶</button>
                <div class="video-secondary">
                  <button type="button" aria-label="Mute video" data-video-mute>⌁</button>
                  <button type="button" aria-label="View fullscreen" data-video-fullscreen>⛶</button>
                </div>
              </div>
            </figure>
          `).join("")}
          ${single ? `
            <div class="case-media-copy">
              <p class="micro-label">PUBLISHED FILM / 01</p>
              <h2>${escapeHTML(projects[0].title)}</h2>
              <p>The case stays intentionally concise: one film, clear project context and a direct route to the next piece of work.</p>
            </div>
          ` : ""}
        </div>
      </section>

      <section class="section-shell case-return">
        <a href="work.html">← Return to all work</a>
      </section>
    </article>
  `;
  attachVideoControls(root);
}

renderHeader();
renderFooter();
setupArtistStage();
setupWorkCollection();
setupWorkCollection({ index: true });
setupServices();
setupArtistDirectory();
renderProfile();
renderCase();
setupInquiryForms();
