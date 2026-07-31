const artists = [
  {
    name: "Maya",
    role: "Luxury Fashion · Art",
    image: "assets/profiles/maya/pink-editorial.png",
    href: "maya.html",
    alt: "Maya, Greentomato featured AI luxury fashion and art artist",
    position: "center 24%"
  },
  {
    name: "Amber",
    role: "Music · Fashion · Creative Culture",
    image: "assets/profiles/amber/night-portrait.png",
    href: "amber.html",
    alt: "Amber, Greentomato featured AI music and fashion artist",
    position: "center 30%"
  },
  {
    name: "Ooona",
    role: "Beauty · Wellness · Digital Spirit",
    image: "assets/profiles/ooona/hero.png",
    href: "ooona.html",
    alt: "Ooona, Greentomato featured AI beauty and wellness artist",
    position: "center center"
  },
  {
    name: "Noah",
    role: "Film · Fashion · Culture",
    image: "assets/profiles/noah/black-portrait.png",
    href: "noah.html",
    alt: "Noah, Greentomato featured AI film and fashion artist",
    position: "center 28%"
  },
  {
    name: "Mario",
    role: "Lifestyle · Fashion · Sport",
    image: "assets/mario-portrait.png",
    href: "mario.html",
    alt: "Mario, Greentomato featured AI lifestyle and sport artist",
    position: "center center"
  }
];

const copy = {
  en: {
    navArtists: "Artists", navWork: "Work", navServices: "Services", navAbout: "About", navContact: "Contact",
    heroEyebrow: "Independent AI artist agency · Hong Kong",
    heroLineOne: "Meet our", heroLineTwo: "digital talents.",
    heroIntro: "Distinct digital personalities, original worlds and production built to move at the speed of culture.",
    exploreProfile: "Explore profile", viewRoster: "View all artists", featuredArtists: "Featured artists · 2026", scrollToWork: "Selected work",
    workTitleOne: "Selected work,", workTitleTwo: "made to be seen.",
    workIntro: "Browse published work by industry. Open a brand to see every project in one place.",
    totalViews: "Over 1.2 Million Views", hospitality: "Hospitality", retail: "Retail", entertainment: "Entertainment", fashion: "Fashion & Lifestyle",
    projectsFor: "Projects for", closeProjects: "Close projects", works: "Works", published: "Published",
    fullProduction: "Full video & image production by Greentomato",
    servicesTitleOne: "One team.", servicesTitleTwo: "New creative systems.",
    servicesIntro: "We unite character, direction, production and technology around the needs of each brand.",
    serviceVideo: "Concept, creative direction and AI-powered film production for campaigns and branded stories.",
    serviceHuman: "Distinct virtual personalities built for long-term brand worlds, content and audience connection.",
    serviceSocial: "Scalable creative systems for brand launches, social channels and always-on content.",
    labsCopy: "Experimental interactive experiences, agents and custom prototypes developed with selected partners.",
    discussExperiment: "Discuss an experiment",
    aboutTitleOne: "Characters are the", aboutTitleTwo: "new creative infrastructure.",
    aboutCopyOne: "Greentomato is a Hong Kong AI artist agency and production studio. We develop ownable digital personalities and the visual systems that let them perform across channels, markets and formats.",
    aboutCopyTwo: "Our work combines human creative direction with AI-native production—from a single campaign film to an artist built for years of storytelling.",
    meetRoster: "Meet the roster", processCharacter: "Identity, voice and world", processDirection: "Concept and art direction",
    processProduction: "Film, image and social", processContinuity: "Consistent, scalable output",
    contactTitleOne: "Bring us the brief.", contactTitleTwo: "We’ll build the world.",
    contactIntro: "Tell us what you need. You can inquire about any service—selecting an artist is optional.",
    formName: "Your name *", formCompany: "Company / brand *", formTimeline: "Target launch", formServices: "What can we help with? *",
    formBrief: "Project brief *", formBriefPlaceholder: "Objectives, audience, deliverables, budget and timing.",
    formNote: "WhatsApp delivery will be connected in the next phase. This preview stores no data.",
    sendInquiry: "Send inquiry", formSelectService: "Select at least one service.", formSuccess: "Thank you. The inquiry flow is ready; WhatsApp delivery will be connected next.",
    footerLine: "Next-generation AI artists and production for brands.",
    rosterEyebrow: "Greentomato artist roster · Hong Kong / Asia", rosterTitleOne: "Meet the minds", rosterTitleTwo: "inside the machine.",
    rosterIntro: "Distinct digital talents. One next-generation roster.",
    currentRoster: "CURRENT FLAGSHIP ARTISTS", moreArtists: "More artists are taking shape.",
    moreArtistsCopy: "The roster is designed to grow. New identities will appear here without changing the flagship five.",
    buildArtist: "Build an artist with us", rosterCtaOne: "Need an artist", rosterCtaTwo: "who does not exist yet?", startProject: "Start a project",
    searchArtists: "Search artists", gender: "Gender", location: "Location", language: "Language", talentType: "Talent type",
    allGenders: "All genders", allLocations: "All locations", allLanguages: "All languages", allTypes: "All talent types"
  },
  zh: {
    navArtists: "藝人", navWork: "作品", navServices: "服務", navAbout: "關於", navContact: "聯絡",
    heroEyebrow: "香港獨立 AI 藝人經紀公司",
    heroLineOne: "認識我們的", heroLineTwo: "數字藝人。",
    heroIntro: "鮮明的數字人個性、原創世界觀，以及能與文化同步前進的製作能力。",
    exploreProfile: "探索藝人檔案", viewRoster: "查看全部藝人", featuredArtists: "招牌藝人 · 2026", scrollToWork: "精選作品",
    workTitleOne: "精選作品，", workTitleTwo: "為被看見而製作。",
    workIntro: "按行業瀏覽已上線作品；展開品牌即可在同一位置查看旗下全部項目。",
    totalViews: "總觀看量超過 120 萬", hospitality: "酒店及款待", retail: "零售", entertainment: "娛樂", fashion: "時裝及生活",
    projectsFor: "為以下品牌製作", closeProjects: "收起作品", works: "項作品", published: "已上線",
    fullProduction: "全部影片及圖片由 Greentomato 製作",
    servicesTitleOne: "一個團隊。", servicesTitleTwo: "全新的創意系統。",
    servicesIntro: "我們圍繞品牌需求，整合人物、創意指導、製作與技術。",
    serviceVideo: "為品牌企劃與故事提供概念、創意指導及 AI 影片製作。",
    serviceHuman: "建立鮮明的虛擬人物，延伸為長期品牌世界、內容與受眾連結。",
    serviceSocial: "為品牌發佈、社交平台及持續內容建立可規模化的創意系統。",
    labsCopy: "與指定合作夥伴共同開發實驗性互動體驗、智能工具與客製原型。",
    discussExperiment: "討論實驗項目",
    aboutTitleOne: "角色就是", aboutTitleTwo: "新世代創意基礎設施。",
    aboutCopyOne: "Greentomato 是香港 AI 藝人經紀公司及製作工作室。我們創造可擁有的數字人個性，以及讓他們跨平台、市場與格式持續演出的視覺系統。",
    aboutCopyTwo: "我們把人類創意指導與 AI 原生製作結合——從一支 Campaign 影片，到能持續多年說故事的藝人。",
    meetRoster: "認識藝人陣容", processCharacter: "身份、聲音與世界觀", processDirection: "概念與藝術指導",
    processProduction: "影片、圖片與社交內容", processContinuity: "一致且可規模化的產出",
    contactTitleOne: "把 Brief 給我們。", contactTitleTwo: "我們建立整個世界。",
    contactIntro: "告訴我們你的需求。所有服務均可詢問，無需先選擇藝人。",
    formName: "你的姓名 *", formCompany: "公司／品牌 *", formTimeline: "預計推出時間", formServices: "需要哪些服務？*",
    formBrief: "項目說明 *", formBriefPlaceholder: "目標、受眾、交付內容、預算及時間。",
    formNote: "WhatsApp 發送會在下一階段接通；目前預覽不會儲存資料。",
    sendInquiry: "發送詢盤", formSelectService: "請至少選擇一項服務。", formSuccess: "謝謝。詢盤流程已準備好，下一階段將接通 WhatsApp。",
    footerLine: "為品牌提供新世代 AI 藝人與製作服務。",
    rosterEyebrow: "Greentomato 藝人陣容 · 香港／亞洲", rosterTitleOne: "認識機器之中", rosterTitleTwo: "獨一無二的靈魂。",
    rosterIntro: "獨具風格的數字人才，匯聚新世代陣容。",
    currentRoster: "目前招牌藝人", moreArtists: "更多藝人正在成形。",
    moreArtistsCopy: "這個陣容會持續成長；新身份將加入這裡，同時保留目前五位招牌藝人。",
    buildArtist: "與我們建立新藝人", rosterCtaOne: "需要一位", rosterCtaTwo: "尚未存在的藝人？", startProject: "開始項目",
    searchArtists: "搜尋藝人", gender: "性別", location: "地區", language: "語言", talentType: "藝人類型",
    allGenders: "所有性別", allLocations: "所有地區", allLanguages: "所有語言", allTypes: "所有藝人類型"
  }
};

copy["zh-hant"] = copy.zh;
const agencyTraditionalCharacters = "亞佈個們備儲內別創劃動務區問圍圖團場夥娛實將尋導從擁擇擬擴數於時會業樂標機檔準瀏為無獨產發盤眾礎紀結絡給統經線總繞續聯聲與興萬藝虛術裝裡製見規視覺覽觀計討設訴詢認語說請論謝識讓資這連進過選長開間關陣隊階靈項預類驗體鮮";
const agencySimplifiedCharacters = "亚布个们备储内别创划动务区问围图团场伙娱实将寻导从拥择拟扩数于时会业乐标机档准浏为无独产发盘众础纪结络给统经线总绕续联声与兴万艺虚术装里制见规视觉览观计讨设诉询认语说请论谢识让资这连进过选长开间关阵队阶灵项预类验体鲜";
const agencySimplifiedMap = Object.fromEntries([...agencyTraditionalCharacters].map((character, index) => [character, agencySimplifiedCharacters[index]]));
const toSimplified = (value) => value
  .replaceAll("獨具風格", "独具风格")
  .replaceAll("匯聚", "汇聚")
  .replaceAll("軟件", "软件")
  .replaceAll("客製", "定制")
  .replaceAll("說故事", "讲故事")
  .replaceAll("聯絡", "联系")
  .replaceAll("搜尋", "搜索")
  .replaceAll("詢盤", "咨询")
  .replaceAll("連結", "链接")
  .replace(/[^\x00-\x7F]/g, (character) => agencySimplifiedMap[character] || character);
copy["zh-hans"] = Object.fromEntries(Object.entries(copy.zh).map(([key, value]) => [
  key,
  toSimplified(value)
]));

const storedLanguage = localStorage.getItem("greentomato-language");
let language = storedLanguage === "zh" ? "zh-hant" : (copy[storedLanguage] ? storedLanguage : "en");

function applyLanguage() {
  document.documentElement.lang = language === "zh-hant" ? "zh-Hant" : language === "zh-hans" ? "zh-Hans" : "en";
  document.querySelectorAll("[data-copy]").forEach((element) => {
    const value = copy[language][element.dataset.copy];
    if (value) element.textContent = value;
  });
  document.querySelectorAll("[data-copy-placeholder]").forEach((element) => {
    const value = copy[language][element.dataset.copyPlaceholder];
    if (value) element.placeholder = value;
  });
  document.querySelectorAll("#languageSwitcher [data-language]").forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  localStorage.setItem("greentomato-language", language);
}

document.querySelectorAll("#languageSwitcher [data-language]").forEach((button) => {
  button.addEventListener("click", () => {
    language = button.dataset.language;
    applyLanguage();
    renderBrandWork();
  });
});
applyLanguage();

const header = document.querySelector("#siteHeader");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const menuButton = document.querySelector("#menuToggle");
const mobileMenu = document.querySelector("#mobileMenu");
function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  menuButton?.setAttribute("aria-expanded", String(open));
  if (mobileMenu) mobileMenu.inert = !open;
}
menuButton?.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

const image = document.querySelector("#heroArtistImage");
const name = document.querySelector("#artistName");
const role = document.querySelector("#artistRole");
const number = document.querySelector("#artistNumber");
const profileLink = document.querySelector("#heroProfileLink");
const artistStage = document.querySelector("#artistStage");
const tabs = [...document.querySelectorAll(".artist-tab")];
let activeArtist = 0;

// Preload the full homepage roster so desktop hover changes are immediate.
artists.forEach((artist) => {
  const preload = new Image();
  preload.src = artist.image;
});

function setArtist(index, focusTab = false) {
  if (!image || index === activeArtist && image.dataset.ready) return;
  const artist = artists[index];
  activeArtist = index;
  image.src = artist.image;
  image.alt = artist.alt;
  image.style.objectPosition = artist.position;
  name.textContent = artist.name;
  role.textContent = artist.role;
  number.textContent = String(index + 1).padStart(2, "0");
  profileLink.href = artist.href;
  artistStage.href = artist.href;
  artistStage.setAttribute("aria-label", `View ${artist.name} profile`);
  image.dataset.ready = "true";
  tabs.forEach((tab, tabIndex) => {
    const active = tabIndex === index;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  if (focusTab) tabs[index]?.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => setArtist(index));
  tab.addEventListener("mouseenter", () => {
    if (matchMedia("(hover: hover) and (pointer: fine)").matches) setArtist(index);
  });
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
    setArtist((index + direction + artists.length) % artists.length, true);
  });
});
if (image) image.dataset.ready = "true";

let touchStart = 0;
document.querySelector("#artistStage")?.addEventListener("touchstart", (event) => {
  touchStart = event.changedTouches[0].clientX;
}, { passive: true });
document.querySelector("#artistStage")?.addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].clientX - touchStart;
  if (Math.abs(delta) > 45) setArtist((activeArtist + (delta < 0 ? 1 : -1) + artists.length) % artists.length);
}, { passive: true });

const workBrands = [
  {
    id: "mgm", name: "Macau MGM", category: "hospitality", industry: "Hospitality", year: "2026",
    cover: "assets/work/mgm-01-poster.jpg",
    projects: [
      ["MGM Film 01", "assets/work/web-video/mgm-01.web.mp4", "assets/work/mgm-01-poster.jpg"],
      ["MGM Film 02", "assets/work/web-video/mgm-02.web.mp4", "assets/work/mgm-02-poster.jpg"],
      ["MGM Film 03", "assets/work/web-video/mgm-03.web.mp4", "assets/work/mgm-03-poster.jpg"]
    ]
  },
  {
    id: "peninsula", name: "The Peninsula Hong Kong", category: "hospitality", industry: "Luxury Hospitality", year: "2026",
    cover: "assets/work/peninsula/peninsula-fathers-day-key-visual.jpg",
    projects: [["Father's Day", "assets/work/web-video/peninsula.web.mp4", "assets/work/peninsula/peninsula-fathers-day-key-visual.jpg"]]
  },
  {
    id: "parknshop", name: "PARKnSHOP", category: "retail", industry: "Retail", year: "2026",
    cover: "assets/work/parknshop/parknshop-weekly-offer-cover.jpg",
    projects: [["Weekly Offer", "assets/work/web-video/parknshop.web.mp4", "assets/work/parknshop/parknshop-weekly-offer-cover.jpg"]]
  },
  {
    id: "octopus", name: "Octopus", category: "retail", industry: "Urban Lifestyle", year: "2026",
    cover: "assets/work/octopus-cover.jpg",
    projects: [["Octopus Film", "assets/work/web-video/octopus.web.mp4", "assets/work/octopus-cover.jpg"]]
  },
  {
    id: "chillgood", name: "ChillGOOD × TV章魚燒", category: "entertainment", industry: "Entertainment", year: "2026",
    cover: "assets/work/takoyaki-poster.jpg",
    projects: [["Music Video", "assets/work/web-video/takoyaki.web.mp4", "assets/work/takoyaki-poster.jpg"]]
  },
  {
    id: "grams", name: "GRAMS", category: "fashion", industry: "Fashion & Lifestyle", year: "2026",
    cover: "assets/work/grams-color.jpg",
    projects: [
      ["Color", "assets/work/web-video/grams-color.web.mp4", "assets/work/grams-color.jpg"],
      ["Black & White", "assets/work/web-video/grams-bw.web.mp4", "assets/work/grams-color.jpg"]
    ]
  },
  {
    id: "koisea", name: "KOISEA", category: "fashion", industry: "Fashion & Lifestyle", year: "2026",
    cover: "assets/work/koisea.png",
    projects: [
      ["Landscape Cut", "assets/work/web-video/koisea-landscape.web.mp4", "assets/work/koisea.png"],
      ["Underground Cut", "assets/work/web-video/koisea-underground.web.mp4", "assets/work/koisea-underground.jpg"]
    ]
  }
];

const workCategoryKeys = ["hospitality", "retail", "entertainment", "fashion"];
let activeWorkCategory = "hospitality";
let openWorkBrand = null;

function renderBrandWork() {
  const tabsRoot = document.querySelector("#workCategories");
  const track = document.querySelector("#curvedWork");
  const detail = document.querySelector("#brandProjects");
  if (!tabsRoot || !track || !detail) return;

  track.className = "brand-track";
  tabsRoot.innerHTML = workCategoryKeys.map((key) => `
    <button type="button" class="${key === activeWorkCategory ? "is-active" : ""}" data-work-category="${key}" aria-pressed="${key === activeWorkCategory}">
      ${copy[language][key]}
    </button>
  `).join("");

  tabsRoot.querySelectorAll("[data-work-category]").forEach((button) => button.addEventListener("click", () => {
    activeWorkCategory = button.dataset.workCategory;
    openWorkBrand = null;
    detail.hidden = true;
    renderBrandWork();
  }));

  const brands = workBrands.filter((brand) => brand.category === activeWorkCategory);
  track.innerHTML = brands.map((brand) => `
    <button class="brand-card" type="button" data-work-brand="${brand.id}" aria-expanded="${openWorkBrand === brand.id}">
      <figure><img src="${brand.cover}" alt="${brand.name}" loading="lazy"></figure>
      <div class="brand-card-meta">
        <div><h3>${brand.name}</h3><p>${brand.industry} · ${brand.year}</p></div>
        <small>${brand.projects.length} ${copy[language].works} ↘</small>
      </div>
    </button>
  `).join("");

  track.querySelectorAll("[data-work-brand]").forEach((button) => button.addEventListener("click", () => {
    const id = button.dataset.workBrand;
    openWorkBrand = openWorkBrand === id ? null : id;
    if (!openWorkBrand) {
      detail.hidden = true;
      renderBrandWork();
      return;
    }

    const brand = workBrands.find((item) => item.id === id);
    detail.hidden = false;
    detail.innerHTML = `
      <header class="brand-projects-head">
        <div><p>${copy[language].projectsFor}</p><h3>${brand.name}</h3></div>
        <button type="button" data-close-brand>${copy[language].closeProjects} ×</button>
      </header>
      <div class="project-grid">
        ${brand.projects.map(([title, src, poster], index) => `
          <article class="project-item">
            <video muted loop playsinline controls preload="${index === 0 ? "auto" : "none"}" poster="${poster}">
              <source src="${src}" type="video/mp4">
            </video>
            <p>${title} · ${copy[language].published}</p>
          </article>
        `).join("")}
      </div>
    `;
    detail.querySelector("[data-close-brand]")?.addEventListener("click", () => {
      detail.querySelectorAll("video").forEach((video) => {
        video.pause();
        video.removeAttribute("src");
        video.querySelectorAll("source").forEach((source) => source.removeAttribute("src"));
        video.load();
      });
      openWorkBrand = null;
      detail.hidden = true;
      renderBrandWork();
    });
    const projectVideos = [...detail.querySelectorAll("video")];
    projectVideos.forEach((video) => {
      const prepareVideo = () => {
        if (video.preload === "auto") return;
        video.preload = "auto";
        video.load();
      };
      video.addEventListener("pointerenter", prepareVideo, { once: true, passive: true });
      video.addEventListener("touchstart", prepareVideo, { once: true, passive: true });
      video.addEventListener("focus", prepareVideo, { once: true });
      video.addEventListener("play", () => {
        projectVideos.forEach((other) => {
          if (other !== video) other.pause();
        });
      });
    });
    renderBrandWork();
    requestAnimationFrame(() => detail.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest"
    }));
  }));
}

renderBrandWork();

const workCards = [...document.querySelectorAll("[data-work]")];
const workVideos = workCards.map((card) => card.querySelector("video")).filter(Boolean);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
let activeWorkVideo = null;

function syncVideoControls(video) {
  const media = video.closest(".case-media");
  const play = media?.querySelector(".media-play");
  const mute = media?.querySelector(".media-mute");
  if (play) {
    play.textContent = video.paused ? "▶" : "Ⅱ";
    play.setAttribute("aria-label", video.paused ? "Play preview" : "Pause preview");
  }
  if (mute) {
    mute.textContent = video.muted ? "MUTE" : "SOUND ON";
    mute.setAttribute("aria-label", video.muted ? "Turn sound on" : "Mute video");
  }
}

function playPreview(video) {
  workVideos.forEach((other) => {
    if (other !== video) {
      other.pause();
      other.muted = true;
      syncVideoControls(other);
    }
  });
  activeWorkVideo = video;
  video.muted = true;
  video.play().catch(() => {});
  syncVideoControls(video);
}

workCards.forEach((card) => {
  const media = card.querySelector(".case-media");
  const video = media?.querySelector("video");
  const play = media?.querySelector(".media-play");
  const mute = media?.querySelector(".media-mute");
  const fullscreen = media?.querySelector(".media-fullscreen");
  if (!media || !video) return;

  play?.addEventListener("click", () => {
    if (video.paused) {
      workVideos.forEach((other) => {
        if (other !== video) other.pause();
      });
      video.play().catch(() => {});
    } else {
      video.pause();
    }
    syncVideoControls(video);
  });

  mute?.addEventListener("click", () => {
    workVideos.forEach((other) => {
      if (other !== video) {
        other.muted = true;
        syncVideoControls(other);
      }
    });
    video.muted = !video.muted;
    if (video.paused) video.play().catch(() => {});
    syncVideoControls(video);
  });

  fullscreen?.addEventListener("click", async () => {
    try {
      if (video.requestFullscreen) await video.requestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
      else if (media.requestFullscreen) await media.requestFullscreen();
    } catch {
      // Fullscreen availability is controlled by the browser/device.
    }
  });

  video.addEventListener("play", () => syncVideoControls(video));
  video.addEventListener("pause", () => syncVideoControls(video));
  video.addEventListener("volumechange", () => syncVideoControls(video));
  syncVideoControls(video);
});

if (workCards.length) {
  const previewObserver = new IntersectionObserver((entries) => {
    if (reduceMotion.matches) return;
    const centered = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (centered?.intersectionRatio >= 0.52) {
      const video = centered.target.querySelector("video");
      if (video && video !== activeWorkVideo) playPreview(video);
    }
  }, { threshold: [0.25, 0.52, 0.72] });
  workCards.forEach((card) => previewObserver.observe(card));
}

let workArcFrame = 0;
function updateWorkArc() {
  workArcFrame = 0;
  if (!workCards.length || reduceMotion.matches) return;
  const viewportCenter = window.innerHeight * 0.5;
  let closestCard = null;
  let closestDistance = Infinity;
  const mobile = innerWidth <= 800;

  workCards.forEach((card, index) => {
    const bounds = card.getBoundingClientRect();
    const center = bounds.top + bounds.height * 0.5;
    const normalized = Math.max(-1.35, Math.min(1.35, (center - viewportCenter) / Math.max(innerHeight, 1)));
    const distance = Math.abs(normalized);
    const rotate = normalized * (mobile ? -4.5 : -13);
    const depth = mobile ? 0 : -distance * 150;
    const scale = 1 - Math.min(distance * (mobile ? 0.035 : 0.08), 0.1);
    const yaw = mobile ? 0 : (index % 2 ? -1 : 1) * distance * 2.4;
    card.style.setProperty("--arc-rotate", `${rotate.toFixed(2)}deg`);
    card.style.setProperty("--arc-z", `${depth.toFixed(1)}px`);
    card.style.setProperty("--arc-scale", scale.toFixed(3));
    card.style.setProperty("--arc-y", `${yaw.toFixed(2)}deg`);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = card;
    }
  });

  workCards.forEach((card) => card.classList.toggle("is-center", card === closestCard && closestDistance < 0.42));
}

function requestWorkArc() {
  if (!workArcFrame) workArcFrame = requestAnimationFrame(updateWorkArc);
}

window.addEventListener("scroll", requestWorkArc, { passive: true });
window.addEventListener("resize", requestWorkArc, { passive: true });
reduceMotion.addEventListener?.("change", requestWorkArc);
updateWorkArc();

const artistStageTilt = document.querySelector("#artistStage");
if (artistStageTilt && !reduceMotion.matches && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  artistStageTilt.addEventListener("pointermove", (event) => {
    const bounds = artistStageTilt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    artistStageTilt.style.transform = `perspective(1200px) rotateY(${(x * 5).toFixed(2)}deg) rotateX(${(-y * 3).toFixed(2)}deg)`;
  }, { passive: true });
  artistStageTilt.addEventListener("pointerleave", () => {
    artistStageTilt.style.transform = "";
  });
}

const form = document.querySelector("#projectForm");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector("#formStatus");
  const checked = form.querySelectorAll('input[name="services"]:checked');
  if (!checked.length) {
    status.textContent = copy[language].formSelectService;
    form.querySelector(".service-options input")?.focus();
    return;
  }
  status.textContent = copy[language].formSuccess;
});

function initSignalField() {
  const canvas = document.querySelector("#signalField");
  if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const context = canvas.getContext("2d");
  const pointer = { x: 0.72, y: 0.44 };
  let width = 0;
  let height = 0;
  let frame = 0;
  let raf = 0;
  let visible = true;

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function draw() {
    if (!visible) return;
    context.clearRect(0, 0, width, height);
    const centerX = pointer.x * width;
    const centerY = pointer.y * height;
    for (let ring = 0; ring < 5; ring += 1) {
      const radius = 90 + ring * 84 + Math.sin(frame * 0.008 + ring) * 12;
      context.beginPath();
      context.ellipse(centerX, centerY, radius * 1.35, radius * 0.56, -0.24, 0, Math.PI * 2);
      context.strokeStyle = `rgba(91, 101, 116, ${0.16 - ring * 0.024})`;
      context.lineWidth = 1;
      context.stroke();
    }
    for (let point = 0; point < 34; point += 1) {
      const angle = point * 2.399 + frame * 0.00045;
      const radius = 58 + (point % 9) * 48;
      const x = centerX + Math.cos(angle) * radius * 1.45;
      const y = centerY + Math.sin(angle) * radius * 0.58;
      context.fillStyle = point % 5 === 0 ? "rgba(102,112,126,.58)" : "rgba(41,40,37,.2)";
      context.fillRect(x, y, point % 5 === 0 ? 2 : 1, point % 5 === 0 ? 2 : 1);
    }
    frame += 1;
    raf = requestAnimationFrame(draw);
  }

  const hero = canvas.closest(".hero");
  hero?.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    pointer.x += ((event.clientX - bounds.left) / bounds.width - pointer.x) * 0.14;
    pointer.y += ((event.clientY - bounds.top) / bounds.height - pointer.y) * 0.14;
  }, { passive: true });
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) draw(); else cancelAnimationFrame(raf);
  });
  observer.observe(canvas);
  window.addEventListener("resize", resize, { passive: true });
  resize();
  draw();
}
initSignalField();

const artistSearch = document.querySelector("#artistSearch");
const artistFilters = [...document.querySelectorAll("[data-artist-filter]")];
const rosterCards = [...document.querySelectorAll("[data-artist-card]")];
const rosterGrid = document.querySelector(".artists-page .roster-grid");
const rosterEmpty = document.querySelector("#rosterEmpty");

function filterArtistRoster() {
  if (!rosterCards.length) return;
  const query = artistSearch?.value.trim().toLowerCase() || "";
  let visible = 0;
  rosterCards.forEach((card) => {
    const matchesSearch = !query || card.dataset.name.includes(query);
    const matchesFilters = artistFilters.every((select) => {
      const value = select.value.toLowerCase();
      return !value || card.dataset[select.dataset.artistFilter]?.includes(value);
    });
    const show = matchesSearch && matchesFilters;
    card.hidden = !show;
    if (show) visible += 1;
  });
  const isEmpty = visible === 0;
  if (rosterGrid) {
    const cardCount = visible + (isEmpty ? 0 : 1);
    const columnCount = cardCount > 0 && cardCount % 4 === 0 ? 4
      : cardCount > 0 && cardCount % 3 === 0 ? 3
      : Math.min(4, Math.max(2, cardCount));
    rosterGrid.style.setProperty("--roster-columns", String(columnCount));
  }
  rosterGrid?.classList.toggle("is-filter-empty", isEmpty);
  if (rosterEmpty) rosterEmpty.hidden = !isEmpty;
}

artistSearch?.addEventListener("input", filterArtistRoster);
artistFilters.forEach((select) => select.addEventListener("change", filterArtistRoster));

function resetArtistRoster() {
  if (artistSearch) artistSearch.value = "";
  artistFilters.forEach((select) => {
    select.selectedIndex = 0;
    select.value = "";
  });
  filterArtistRoster();
  artistSearch?.focus();
}

document.querySelector("#clearArtistFilters")?.addEventListener("click", (event) => {
  event.preventDefault();
  resetArtistRoster();
});
filterArtistRoster();
