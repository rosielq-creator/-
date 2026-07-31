const page = document.body.dataset.page;
const isProfile = page === "profile";

const translations = {
  en: {
    tagline: "Next-Generation AI Talents",
    home: "Home",
    talents: "Talents",
    companyNav: "Company",
    servicesNav: "Services",
    artistsNav: "Artists",
    allArtists: "All artists",
    workNav: "Work",
    crewNav: "Crew",
    crewHeadline: "Meet the crew.<br><em>Profiles coming next.</em>",
    crewIntro: "The crew directory is ready for approved names, roles, portraits and biographies.",
    profileSlogan: "IMAGINED WITH AI. MADE TO MOVE PEOPLE.",
    homeLineOne: "AI PRODUCTION",
    homeLineTwo: "",
    homeManifesto: "An independent roster of AI talents built for fashion, culture and the next visual era.",
    meetTalents: "Meet the artists",
    servicesHeadline: "Ideas become<br><em>living worlds.</em>",
    servicesIntro: "From AI film and digital humans to always-on social content, we unite creative direction, production and technology in one team.",
    serviceVideo: "Concept, art direction and AI-powered film production for campaigns and branded stories.",
    serviceHuman: "Distinctive virtual personalities designed for long-term brand worlds, content and engagement.",
    serviceSocial: "Scalable creative systems for launch campaigns, social channels and continuous content.",
    serviceIntegration: "Persona, voice, agentic tools and tailored software, hardware or data connections.",
    clientsPartners: "Clients & partners",
    projectsDelivered: "Projects delivered",
    professionals: "Professionals",
    awards: "Awards",
    workHeadline: "Built with brands.<br><em>Made for culture.</em>",
    workIntro: "A selection of brands and creative partnerships featured across the GreenTomato company portfolio.",
    workDisclaimer: "Project imagery and detailed credits will be added after final approval.",
    account: "Account",
    password: "Password",
    enter: "Enter GTAI",
    soundNote: "Sound experience begins after entry",
    invalidLogin: "Account or password is incorrect.",
    marioLine: "Soft-luxury city life through a photographer's eye.",
    noahLine: "Contemporary style with an understated cinematic edge.",
    ooonaLine: "Soft-focus beauty, wellness and a playful digital spirit.",
    placeholderLine: "Official visual pending approval.",
    viewProfile: "View Profile",
    comingSoon: "Profile in progress",
    marioRole: "AI Talent · Photographer · Lifestyle Creator",
    discover: "Discover profile",
    introduction: "Introduction",
    marioHeadline: "A life in motion,<br><em>framed with intention.</em>",
    marioBio: "Mario is a Chinese lifestyle creator and independent photographer. His world moves between city streets, sport, travel and the quiet details of everyday life—always warm, clean and naturally composed.",
    base: "Base",
    height: "Height",
    focus: "Focus",
    platforms: "Platforms",
    guangdongChina: "Guangdong, China",
    marioFocusValue: "Lifestyle / Fashion / Sport / Travel",
    socialData: "Social data",
    signalHeadline: "Audience signal,<br><em>made legible.</em>",
    sampleNote: "Prototype data — not live metrics",
    marioDataNote: "Public profile counts + creator analytics · Updated 2026.07.22",
    followers: "Followers",
    currentFollowers: "Current followers",
    xiaohongshuLabel: "Xiaohongshu ↗",
    last30Days: "Last 30 days",
    impressions: "Impressions",
    views: "Views",
    engagements: "Engagements",
    likesCommentsSavesShares: "Likes + comments + saves + shares",
    netGrowth: "Net growth",
    topPerformingContent: "Top performing content",
    mostEngaged: "Most engaged.",
    openOriginalPost: "Open original post ↗",
    likes: "Likes",
    comments: "Comments",
    saves: "Saves",
    shares: "Shares",
    engagementRate: "Engagement rate",
    byViews: "By views",
    engagement: "Engagement",
    audience: "Top audience",
    growth: "90D growth",
    pendingSync: "Pending sync",
    selectedWork: "Selected work",
    portfolioHeadline: "Selected frames<br><em>& collaborations.</em>",
    booking: "Booking inquiry",
    workTogether: "Let's build<br><em>what comes next.</em>",
    inquiryCopy: "Tell us about your campaign, timeline and intended collaboration. This prototype simulates submission only.",
    contactName: "Contact name",
    company: "Company / Brand",
    collaborationType: "Collaboration type",
    budget: "Budget range",
    timeline: "Timeline",
    briefLink: "Cloud brief link",
    projectBrief: "Project brief",
    consent: "By submitting, you agree that your information may be used for business contact.",
    sendInquiry: "Send inquiry",
    inquirySent: "Prototype received. No real message was sent."
  },
  zh: {
    tagline: "新世代 AI 藝人",
    home: "首頁",
    talents: "藝人",
    companyNav: "公司",
    servicesNav: "服務",
    artistsNav: "藝人",
    allArtists: "所有藝人",
    workNav: "作品",
    crewNav: "團隊",
    crewHeadline: "認識幕後團隊。<br><em>成員檔案即將登場。</em>",
    crewIntro: "團隊名錄已準備好加入經確認的姓名、職位、照片與簡介。",
    profileSlogan: "由 AI 構想，為打動人而生。",
    homeLineOne: "AI PRODUCTION",
    homeLineTwo: "",
    homeManifesto: "一組面向時尚、文化與下一個視覺時代的獨立 AI 藝人陣容。",
    meetTalents: "探索藝人陣容",
    servicesHeadline: "讓創意成為<br><em>鮮活世界。</em>",
    servicesIntro: "從 AI 影片、數字人到持續運作的社交內容，我們以一個團隊整合創意指導、製作與技術。",
    serviceVideo: "為品牌企劃與故事提供概念、藝術指導及 AI 影片製作。",
    serviceHuman: "建立鮮明的虛擬人物，延伸為品牌世界、長期內容及互動體驗。",
    serviceSocial: "為品牌發佈、社交平台及持續內容建立可規模化的創意系統。",
    serviceIntegration: "整合人物設定、聲音、智能工具，以及客製軟件、硬件與數據連接。",
    clientsPartners: "客戶與合作夥伴",
    projectsDelivered: "完成項目",
    professionals: "專業團隊",
    awards: "獎項",
    workHeadline: "與品牌共創，<br><em>為文化而生。</em>",
    workIntro: "精選 GreenTomato 公司作品集中涵蓋的品牌與創意合作。",
    workDisclaimer: "項目圖片及詳細製作名單將於最終確認後加入。",
    account: "帳號",
    password: "密碼",
    enter: "進入 GTAI",
    soundNote: "進入後啟動有聲體驗",
    invalidLogin: "帳號或密碼不正確。",
    marioLine: "以攝影師視角記錄輕奢城市生活。",
    noahLine: "低調電影感中的當代時尚表達。",
    ooonaLine: "柔焦美學、健康生活與俏皮數位氣質。",
    placeholderLine: "正式視覺仍待確認。",
    viewProfile: "查看檔案",
    comingSoon: "檔案製作中",
    marioRole: "AI 藝人 · 攝影師 · 生活風格創作者",
    discover: "探索藝人檔案",
    introduction: "個人簡介",
    marioHeadline: "生活持續流動，<br><em>每一幕都有意義。</em>",
    marioBio: "Mario 是中國生活風格創作者與獨立攝影師。他的世界穿梭於城市、運動、旅行與日常細節之間；畫面始終溫暖、乾淨而自然。",
    base: "常駐地",
    height: "身高",
    focus: "內容領域",
    platforms: "平台",
    guangdongChina: "中國廣東",
    marioFocusValue: "生活風格／時尚／運動／旅遊",
    socialData: "社交數據",
    signalHeadline: "讓受眾訊號，<br><em>變得清晰可讀。</em>",
    sampleNote: "原型資料 — 非即時數據",
    marioDataNote: "公開帳號粉絲數＋創作者後台數據 · 更新於 2026.07.22",
    followers: "粉絲數",
    currentFollowers: "目前粉絲數",
    xiaohongshuLabel: "小紅書 ↗",
    last30Days: "最近 30 天",
    impressions: "曝光",
    views: "觀看",
    engagements: "互動總數",
    likesCommentsSavesShares: "讚好＋評論＋收藏＋分享",
    netGrowth: "淨增粉",
    topPerformingContent: "熱門內容",
    mostEngaged: "最高互動內容。",
    openOriginalPost: "查看原帖 ↗",
    likes: "讚好",
    comments: "評論",
    saves: "收藏",
    shares: "分享",
    engagementRate: "互動率",
    byViews: "按觀看量計算",
    engagement: "互動率",
    audience: "主要受眾",
    growth: "90 日增長",
    pendingSync: "等待同步",
    selectedWork: "精選作品",
    portfolioHeadline: "精選影像<br><em>與合作項目。</em>",
    booking: "商務詢盤",
    workTogether: "一起創造<br><em>下一個可能。</em>",
    inquiryCopy: "告訴我們你的企劃、時程與合作方式。本原型僅模擬提交流程。",
    contactName: "聯絡人姓名",
    company: "公司／品牌",
    collaborationType: "合作類型",
    budget: "預算範圍",
    timeline: "合作時程",
    briefLink: "雲端 Brief 連結",
    projectBrief: "項目說明",
    consent: "提交即代表你同意資料可用於商務聯絡。",
    sendInquiry: "發送詢盤",
    inquirySent: "原型已接收，未實際發送訊息。"
  }
};

const richTextKeys = new Set(["marioHeadline", "signalHeadline", "portfolioHeadline", "workTogether", "servicesHeadline", "workHeadline", "crewHeadline"]);
let language = localStorage.getItem("gtai-language") || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");

function applyLanguage() {
  document.documentElement.lang = language === "zh" ? "zh-Hant" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = translations[language][key];
    if (!value) return;
    if (richTextKeys.has(key)) element.innerHTML = value;
    else element.textContent = value;
  });
  const languageButton = document.querySelector("#langToggle");
  if (languageButton) languageButton.textContent = language === "en" ? "繁" : "EN";
  localStorage.setItem("gtai-language", language);
  updateSoundUI();
  window.dispatchEvent(new CustomEvent("gtai:languagechange", { detail: { language } }));
}

document.querySelector("#langToggle")?.addEventListener("click", () => {
  language = language === "en" ? "zh" : "en";
  applyLanguage();
});

/* Real music files replace the old Web Audio oscillator prototype. */
const soundTracks = [
  { name: "CITY IN THE RAIN", artist: "SP&AI MUSIC", src: "assets/audio/city-in-the-rain.mp3" },
  { name: "ART OF SILENCE", artist: "UNIQ", src: "assets/audio/art-of-silence.mp3" },
  { name: "HYPNOTIC AMBIENT", artist: "MUSICLM", src: "assets/audio/hypnotic-ambient.mp3" }
];
let ambientAudio;
let soundOn = sessionStorage.getItem("gtai-sound") !== "off";
let trackIndex = Number(sessionStorage.getItem("gtai-track"));
if (!Number.isInteger(trackIndex) || trackIndex < 0 || trackIndex >= soundTracks.length) {
  trackIndex = Math.floor(Math.random() * soundTracks.length);
  sessionStorage.setItem("gtai-track", String(trackIndex));
}

function startAmbient() {
  if (!soundOn) return;
  if (!ambientAudio) {
    ambientAudio = new Audio(soundTracks[trackIndex].src);
    ambientAudio.loop = true;
    ambientAudio.preload = "metadata";
    ambientAudio.volume = 0.16;
    const savedTime = Number(sessionStorage.getItem("gtai-track-time"));
    if (Number.isFinite(savedTime) && savedTime > 0) {
      ambientAudio.addEventListener("loadedmetadata", () => {
        ambientAudio.currentTime = savedTime % Math.max(ambientAudio.duration, 1);
      }, { once: true });
    }
  }
  ambientAudio.play().catch(() => {
    soundOn = false;
    sessionStorage.setItem("gtai-sound", "off");
    updateSoundUI();
  });
  updateSoundUI();
}

function stopAmbient() {
  ambientAudio?.pause();
  updateSoundUI();
}

function updateSoundUI() {
  const button = document.querySelector("#soundToggle");
  const label = document.querySelector("#soundLabel");
  if (!button || !label) return;
  button.classList.toggle("is-muted", !soundOn);
  button.setAttribute("aria-label", soundOn ? "Mute sound" : "Play sound");
  label.textContent = soundOn ? "SOUND ON" : "SOUND OFF";
  const trackLabel = document.querySelector("#trackLabel");
  if (trackLabel) {
    const track = soundTracks[trackIndex];
    trackLabel.textContent = `TRACK 0${trackIndex + 1} / ${track.name} · ${track.artist}`;
  }
}

window.addEventListener("pagehide", () => {
  if (ambientAudio) sessionStorage.setItem("gtai-track-time", String(ambientAudio.currentTime));
});

document.querySelector("#soundToggle")?.addEventListener("click", () => {
  soundOn = !soundOn;
  sessionStorage.setItem("gtai-sound", soundOn ? "on" : "off");
  if (soundOn) startAmbient(); else stopAmbient();
});

/* Prototype gate. This is intentionally client-side and not production security. */
const gate = document.querySelector("#gate");
const siteShell = document.querySelector("#siteShell");
const unlocked = sessionStorage.getItem("gtai-preview") === "unlocked";
let crystalStarted = false;
let kineticStarted = false;

/* Mario uses a small articulated canvas rig so his racket arm swings independently. */
function initMarioTennisRig() {
  if (page !== "home") return;
  const canvas = document.querySelector(".mario-tennis-canvas");
  const rig = canvas?.closest(".mario-tennis-rig");
  const source = canvas?.dataset.source;
  if (!canvas || !rig || !source) return;

  const context = canvas.getContext("2d");
  const image = new Image();
  image.decoding = "async";
  image.src = source;
  image.onload = () => {
    const sourceWidth = image.naturalWidth;
    const sourceHeight = image.naturalHeight;
    const scaleX = canvas.width / sourceWidth;
    const scaleY = canvas.height / sourceHeight;
    const bodyLayer = document.createElement("canvas");
    const armLayer = document.createElement("canvas");
    bodyLayer.width = armLayer.width = canvas.width;
    bodyLayer.height = armLayer.height = canvas.height;
    const body = bodyLayer.getContext("2d");
    const arm = armLayer.getContext("2d");

    const traceArm = (target) => {
      target.beginPath();
      target.moveTo(36 * scaleX, 188 * scaleY);
      target.lineTo(298 * scaleX, 176 * scaleY);
      target.lineTo(430 * scaleX, 328 * scaleY);
      target.lineTo(545 * scaleX, 366 * scaleY);
      target.lineTo(610 * scaleX, 455 * scaleY);
      target.lineTo(558 * scaleX, 535 * scaleY);
      target.lineTo(432 * scaleX, 510 * scaleY);
      target.lineTo(286 * scaleX, 474 * scaleY);
      target.lineTo(40 * scaleX, 505 * scaleY);
      target.closePath();
    };

    body.drawImage(image, 0, 0, canvas.width, canvas.height);
    body.globalCompositeOperation = "destination-out";
    traceArm(body);
    body.fill();
    body.beginPath();
    body.arc(218 * scaleX, 419 * scaleY, 54 * scaleX, 0, Math.PI * 2);
    body.fill();

    traceArm(arm);
    arm.clip();
    arm.drawImage(image, 0, 0, canvas.width, canvas.height);
    arm.globalCompositeOperation = "destination-out";
    arm.beginPath();
    arm.arc(218 * scaleX, 419 * scaleY, 54 * scaleX, 0, Math.PI * 2);
    arm.fill();

    const pivotX = 462 * scaleX;
    const pivotY = 382 * scaleY;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = 2200;
    let frame;

    const ease = (value) => value < .5
      ? 4 * value * value * value
      : 1 - Math.pow(-2 * value + 2, 3) / 2;

    function swingAngle(progress) {
      if (progress < .32) return -12;
      if (progress < .48) return -12 + 31 * ease((progress - .32) / .16);
      if (progress < .62) return 19 - 5 * ease((progress - .48) / .14);
      return 14 - 26 * ease((progress - .62) / .38);
    }

    function drawBall(progress) {
      let x;
      let y;
      let opacity = 1;
      if (progress < .48) {
        const inbound = Math.max(0, (progress - .18) / .3);
        x = (45 + 173 * inbound) * scaleX;
        y = (360 + 59 * inbound) * scaleY;
        opacity = Math.min(1, inbound * 3);
      } else {
        const outbound = (progress - .48) / .52;
        x = (218 - 330 * outbound) * scaleX;
        y = (419 - 210 * outbound - 90 * outbound * (1 - outbound)) * scaleY;
        opacity = Math.min(1, (1 - outbound) * 2.4);
      }
      if (opacity <= 0) return;
      context.save();
      context.globalAlpha = opacity;
      const radius = 22 * scaleX;
      const gradient = context.createRadialGradient(x - radius * .35, y - radius * .4, 2, x, y, radius);
      gradient.addColorStop(0, "#ffffb8");
      gradient.addColorStop(.38, "#edff35");
      gradient.addColorStop(1, "#b5cf00");
      context.fillStyle = gradient;
      context.shadowColor = "rgba(144, 177, 0, .35)";
      context.shadowBlur = 12;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    function draw(timestamp = 0) {
      const progress = reducedMotion ? .48 : (timestamp % duration) / duration;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bodyLayer, 0, 0);
      context.save();
      context.translate(pivotX, pivotY);
      context.rotate(swingAngle(progress) * Math.PI / 180);
      context.translate(-pivotX, -pivotY);
      context.drawImage(armLayer, 0, 0);
      context.restore();
      drawBall(progress);

      if (progress > .455 && progress < .525) {
        const pulse = 1 - Math.abs(progress - .49) / .035;
        context.save();
        context.globalAlpha = Math.max(0, pulse) * .72;
        context.strokeStyle = "#0a9b59";
        context.lineWidth = 3 * scaleX;
        context.beginPath();
        context.arc(218 * scaleX, 419 * scaleY, (35 + 26 * pulse) * scaleX, -.9, .9);
        context.stroke();
        context.restore();
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    }

    rig.classList.add("is-ready");
    draw();
    window.addEventListener("pagehide", () => cancelAnimationFrame(frame), { once: true });
  };
}

/* Lightweight rigid-body type: pieces fall into place, collide, and yield to the cursor. */
function initKineticType() {
  if (kineticStarted || page !== "home") return;
  const field = document.querySelector("#kineticType");
  const hero = field?.closest(".home-experience");
  const pieces = [...field?.querySelectorAll(".kinetic-piece") || []];
  if (!field || !hero || !pieces.length) return;
  kineticStarted = true;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let bounds = field.getBoundingClientRect();
  const pointer = { x: -1000, y: -1000, active: false };
  const positionRatio = (element, axis, fallback) => {
    const mobileKey = `mobile${axis.toUpperCase()}`;
    const value = window.innerWidth <= 520 ? element.dataset[mobileKey] : null;
    return Number(value || element.dataset[axis] || fallback);
  };
  const states = pieces.map((element, index) => ({
    element,
    x: bounds.width * positionRatio(element, "x", .5),
    y: reduceMotion ? bounds.height * positionRatio(element, "y", .5) : -90 - index * 34,
    anchorX: bounds.width * positionRatio(element, "x", .5),
    floorY: bounds.height * positionRatio(element, "y", .5),
    vx: (index % 2 ? -1 : 1) * (.35 + index * .04),
    vy: 0,
    radius: Math.max(element.offsetWidth, element.offsetHeight) * .48,
    rotation: -18 + index * 11,
    spin: (index % 2 ? -1 : 1) * .22
  }));

  function place(state) {
    state.element.style.transform = `translate3d(${state.x - state.element.offsetWidth / 2}px, ${state.y - state.element.offsetHeight / 2}px, 0) rotate(${state.rotation}deg)`;
  }

  states.forEach(place);
  if (reduceMotion) return;

  function resize() {
    bounds = field.getBoundingClientRect();
    states.forEach((state) => {
      state.anchorX = bounds.width * positionRatio(state.element, "x", .5);
      state.floorY = bounds.height * positionRatio(state.element, "y", .5);
      state.radius = Math.max(state.element.offsetWidth, state.element.offsetHeight) * .48;
    });
  }

  hero.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
    pointer.active = true;
  }, { passive: true });
  hero.addEventListener("pointerleave", () => { pointer.active = false; });
  window.addEventListener("resize", resize, { passive: true });

  let frame;
  let previous = performance.now();
  function tick(now) {
    frame = requestAnimationFrame(tick);
    if (document.hidden || hero.classList.contains("is-hidden")) return;
    const step = Math.min((now - previous) / 16.67, 1.7);
    previous = now;

    states.forEach((state) => {
      state.vx += (state.anchorX - state.x) * .0018 * step;
      state.vy += .19 * step;

      if (pointer.active) {
        const dx = state.x - pointer.x;
        const dy = state.y - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        const reach = 145 + state.radius;
        if (distance < reach) {
          const force = (1 - distance / reach) * .82 * step;
          state.vx += dx / distance * force;
          state.vy += dy / distance * force;
          state.spin += dx * .0012;
        }
      }

      state.x += state.vx * step;
      state.y += state.vy * step;
      state.rotation += state.spin * step;
      state.vx *= .985;
      state.spin *= .992;
      state.vx = Math.max(-11, Math.min(11, state.vx));
      state.vy = Math.max(-11, Math.min(11, state.vy));

      if (state.y + state.radius > state.floorY) {
        state.y = state.floorY - state.radius;
        state.vy *= -.48;
        if (Math.abs(state.vy) < .25) state.vy = 0;
        state.vx *= .9;
      }
      if (state.x < state.radius) { state.x = state.radius; state.vx = Math.abs(state.vx) * .6; }
      if (state.x > bounds.width - state.radius) { state.x = bounds.width - state.radius; state.vx = -Math.abs(state.vx) * .6; }
      if (state.y < state.radius) { state.y = state.radius; state.vy = Math.abs(state.vy) * .35; }
    });

    for (let a = 0; a < states.length; a += 1) {
      for (let b = a + 1; b < states.length; b += 1) {
        const first = states[a];
        const second = states[b];
        const dx = second.x - first.x;
        const dy = second.y - first.y;
        const distance = Math.hypot(dx, dy) || 1;
        const minimum = (first.radius + second.radius) * .78;
        if (distance >= minimum) continue;
        const overlap = (minimum - distance) * .5;
        const nx = dx / distance;
        const ny = dy / distance;
        first.x -= nx * overlap;
        first.y -= ny * overlap;
        second.x += nx * overlap;
        second.y += ny * overlap;
        const impulse = (second.vx - first.vx) * nx + (second.vy - first.vy) * ny;
        if (impulse < 0) {
          first.vx += impulse * nx * .5;
          first.vy += impulse * ny * .5;
          second.vx -= impulse * nx * .5;
          second.vy -= impulse * ny * .5;
        }
      }
    }
    states.forEach(place);
  }
  frame = requestAnimationFrame(tick);
  window.addEventListener("pagehide", () => cancelAnimationFrame(frame), { once: true });
}

function revealSite() {
  if (!gate || !siteShell) return;
  gate.classList.add("is-leaving");
  siteShell.removeAttribute("inert");
  startAmbient();
  initKineticType();
  scheduleCrystal();
  window.setTimeout(() => gate.remove(), 950);
}

if (page === "home") {
  if (unlocked) revealSite();
  document.querySelector("#gateForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const account = document.querySelector("#account").value.trim();
    const password = document.querySelector("#password").value;
    if (account.toUpperCase() === "GTAI" && password === "GTAI2026!") {
      sessionStorage.setItem("gtai-preview", "unlocked");
      revealSite();
    } else {
      const error = document.querySelector("#gateError");
      error.textContent = translations[language].invalidLogin;
      document.querySelector("#password").select();
    }
  });
} else if (!unlocked) {
  window.location.replace("index.html");
} else if (soundOn) {
  const resumeOnce = () => { startAmbient(); document.removeEventListener("pointerdown", resumeOnce); };
  document.addEventListener("pointerdown", resumeOnce, { once: true });
}

/* Magazine page carousel. */
const panels = [...document.querySelectorAll(".talent-panel")];
let currentPanel = 0;
let changing = false;

function hydratePanel(panel) {
  panel?.querySelectorAll("img[data-src]").forEach((image) => {
    image.src = image.dataset.src;
    image.removeAttribute("data-src");
  });
}

const homeExperience = document.querySelector("#homeExperience");
const talentStage = document.querySelector("#talentStage");
const servicesStage = document.querySelector("#servicesStage");
const workStage = document.querySelector("#workStage");
const crewStage = document.querySelector("#crewStage");
const viewNavButtons = [...document.querySelectorAll("[data-view]")];
const workVideos = [...document.querySelectorAll("[data-work-video]")];
const workMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const mainSiteHeader = document.querySelector(".site-header:not(.profile-header)");

function syncWorkAudioButton(button, isSoundOn) {
  button.classList.toggle("is-muted", !isSoundOn);
  button.setAttribute("aria-label", isSoundOn ? "Mute project video" : "Turn sound on");
  button.setAttribute("aria-pressed", String(isSoundOn));
}

/* The information views scroll inside their own fixed-height panels, so the
   reading-aware header must follow those scrollers rather than window.scrollY. */
document.querySelectorAll(".information-stage .info-stage-inner").forEach((scroller) => {
  let lastScrollTop = Math.max(scroller.scrollTop, 0);
  let scrollFrame = 0;

  scroller.addEventListener("scroll", () => {
    if (scrollFrame || !scroller.closest(".information-stage")?.classList.contains("is-visible")) return;
    scrollFrame = requestAnimationFrame(() => {
      const currentScrollTop = Math.max(scroller.scrollTop, 0);
      const delta = currentScrollTop - lastScrollTop;
      if (currentScrollTop <= 24 || delta < -6) mainSiteHeader?.classList.remove("is-hidden");
      else if (delta > 8 && currentScrollTop > (mainSiteHeader?.offsetHeight || 72)) mainSiteHeader?.classList.add("is-hidden");
      lastScrollTop = currentScrollTop;
      scrollFrame = 0;
    });
  }, { passive: true });

  scroller.addEventListener("scrollend", () => {
    lastScrollTop = Math.max(scroller.scrollTop, 0);
  }, { passive: true });
});

function syncWorkVideoPlayback() {
  const workIsActive = workStage?.classList.contains("is-visible") && !document.hidden;
  if (!workIsActive) {
    workVideos.forEach((video) => { video.muted = true; });
    document.querySelectorAll(".work-audio-toggle").forEach((button) => {
      syncWorkAudioButton(button, false);
    });
  }
  workVideos.forEach((video) => {
    /* Playback is always user initiated. Leaving WORK, hiding the tab or
       scrolling a card out of view pauses it without scheduling a resume. */
    const shouldPause = !workIsActive || video.dataset.inView !== "true" || document.hidden;
    if (shouldPause) video.pause();
  });
}

function formatWorkTime(value) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

/* Custom controls keep every reel visually consistent while exposing play,
   seeking, sound and fullscreen without permanently covering the work. */
workVideos.forEach((video) => {
  const card = video.closest(".work-card");
  const media = video.closest(".work-media");
  if (!card || !media) return;

  const controls = document.createElement("div");
  controls.className = "work-video-controls";
  controls.innerHTML = `
    <button class="work-play-toggle" type="button" aria-label="Pause project video">
      <span aria-hidden="true">Ⅱ</span>
    </button>
    <input class="work-progress" type="range" min="0" max="1000" value="0" step="1" aria-label="Video progress">
    <output class="work-time" aria-live="off">0:00 / 0:00</output>
    <button class="work-audio-toggle work-control-icon is-muted" type="button" aria-label="Turn sound on" aria-pressed="false">
      <svg class="work-audio-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path class="work-audio-speaker" d="M4 9h4l5-4v14l-5-4H4z"/>
        <path class="work-audio-waves" d="M16 9.2c.9.8 1.4 1.7 1.4 2.8s-.5 2-1.4 2.8M18.5 6.8c1.6 1.4 2.5 3.1 2.5 5.2s-.9 3.8-2.5 5.2"/>
        <path class="work-audio-slash" d="M4.5 4.5l15 15"/>
      </svg>
    </button>
    <button class="work-fullscreen-toggle work-control-icon" type="button" aria-label="Enter fullscreen">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M7 3H3v4M13 3h4v4M7 17H3v-4M13 17h4v-4"/>
      </svg>
    </button>
  `;
  video.insertAdjacentElement("afterend", controls);

  const playButton = controls.querySelector(".work-play-toggle");
  const playIcon = playButton.querySelector("span");
  const progress = controls.querySelector(".work-progress");
  const time = controls.querySelector(".work-time");
  const audioButton = controls.querySelector(".work-audio-toggle");
  const fullscreenButton = controls.querySelector(".work-fullscreen-toggle");

  /* Pointer interaction must never pin the controls open after the cursor
     leaves. Keyboard focus remains supported until an actual pointer exit. */
  card.addEventListener("pointerleave", () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    controls.querySelector(":focus")?.blur();
    card.classList.remove("is-controls-visible");
  });

  const updatePlayState = () => {
    const isPaused = video.paused;
    playIcon.textContent = isPaused ? "▶" : "Ⅱ";
    playButton.setAttribute("aria-label", `${isPaused ? "Play" : "Pause"} project video`);
    card.classList.toggle("is-video-paused", isPaused);
  };

  const updateTimeline = () => {
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    progress.value = duration ? String(Math.round((video.currentTime / duration) * 1000)) : "0";
    progress.style.setProperty("--work-progress", `${duration ? (video.currentTime / duration) * 100 : 0}%`);
    time.value = `${formatWorkTime(video.currentTime)} / ${formatWorkTime(duration)}`;
  };

  playButton.addEventListener("click", () => {
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });

  video.addEventListener("click", () => {
    if (!window.matchMedia("(hover: none)").matches) return;
    document.querySelectorAll(".work-card.is-controls-visible").forEach((item) => {
      if (item !== card) item.classList.remove("is-controls-visible");
    });
    card.classList.toggle("is-controls-visible");
  });

  progress.addEventListener("input", () => {
    if (!Number.isFinite(video.duration)) return;
    video.currentTime = (Number(progress.value) / 1000) * video.duration;
    updateTimeline();
  });

  audioButton.addEventListener("click", () => {
    const enableSound = video.muted;
    workVideos.forEach((item) => { item.muted = true; });
    document.querySelectorAll(".work-audio-toggle").forEach((button) => {
      syncWorkAudioButton(button, false);
    });
    if (enableSound) {
      video.muted = false;
      syncWorkAudioButton(audioButton, true);
      soundOn = false;
      sessionStorage.setItem("gtai-sound", "off");
      stopAmbient();
    }
  });

  const enterFullscreen = () => {
    if (media.requestFullscreen) {
      media.requestFullscreen().catch(() => {});
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  };

  fullscreenButton.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else enterFullscreen();
  });

  video.addEventListener("dblclick", () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else enterFullscreen();
  });

  document.addEventListener("fullscreenchange", () => {
    const isFullscreen = document.fullscreenElement === media;
    fullscreenButton.setAttribute("aria-label", `${isFullscreen ? "Exit" : "Enter"} fullscreen`);
    card.classList.toggle("is-fullscreen", isFullscreen);
  });

  video.addEventListener("play", updatePlayState);
  video.addEventListener("pause", updatePlayState);
  video.addEventListener("loadedmetadata", updateTimeline);
  video.addEventListener("durationchange", updateTimeline);
  video.addEventListener("timeupdate", updateTimeline);
  updatePlayState();
  updateTimeline();
});

if (workVideos.length && "IntersectionObserver" in window) {
  const workVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.dataset.inView = String(entry.isIntersecting && entry.intersectionRatio >= .12);
    });
    syncWorkVideoPlayback();
  }, { root: workStage?.querySelector(".info-stage-inner") || null, threshold: [.12, .35] });
  workVideos.forEach((video) => workVideoObserver.observe(video));
} else {
  workVideos.forEach((video) => { video.dataset.inView = "true"; });
}

document.addEventListener("visibilitychange", syncWorkVideoPlayback);
workMotionQuery.addEventListener?.("change", syncWorkVideoPlayback);

function showView(view) {
  const normalizedView = view === "talents" ? "artists" : view;
  const stages = [
    ["home", homeExperience],
    ["artists", talentStage],
    ["services", servicesStage],
    ["work", workStage],
    ["crew", crewStage]
  ];
  stages.forEach(([name, stage]) => {
    const isCurrent = name === normalizedView;
    stage?.classList.toggle(name === "home" ? "is-hidden" : "is-visible", name === "home" ? !isCurrent : isCurrent);
    stage?.setAttribute("aria-hidden", String(!isCurrent));
    if (isCurrent) stage?.removeAttribute("inert");
    else stage?.setAttribute("inert", "");
  });
  if (normalizedView === "artists") {
    hydratePanel(panels[currentPanel]);
    window.setTimeout(() => hydratePanel(panels[(currentPanel + 1) % panels.length]), 500);
  }
  viewNavButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.view === normalizedView));
  mainSiteHeader?.classList.remove("is-hidden");
  if (page === "home") history.replaceState(null, "", normalizedView === "home" ? location.pathname : `#${normalizedView}`);
  window.requestAnimationFrame(syncWorkVideoPlayback);
}

document.querySelector("#rosterEntry")?.addEventListener("click", () => showView("artists"));
viewNavButtons.forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
if (page === "home") {
  const initialView = location.hash.slice(1);
  if (["artists", "talents", "services", "work", "crew"].includes(initialView)) showView(initialView);
}

/* ARTISTS remains a direct route to the carousel while the adjacent chevron
   exposes individual profiles. This avoids the ambiguous first-tap behavior
   of a single control that is both a link and a disclosure. */
document.querySelectorAll(".artist-nav-menu").forEach((menu) => {
  const toggle = menu.querySelector(".artist-menu-toggle");
  const close = () => {
    menu.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  };
  toggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = !menu.classList.contains("is-open");
    document.querySelectorAll(".artist-nav-menu.is-open").forEach((item) => item.classList.remove("is-open"));
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll(".artist-dropdown a, .artist-dropdown button").forEach((item) => item.addEventListener("click", close));
});
document.addEventListener("pointerdown", (event) => {
  document.querySelectorAll(".artist-nav-menu.is-open").forEach((menu) => {
    if (!menu.contains(event.target)) {
      menu.classList.remove("is-open");
      menu.querySelector(".artist-menu-toggle")?.setAttribute("aria-expanded", "false");
    }
  });
});

function showPanel(nextIndex, direction) {
  if (!panels.length || changing || nextIndex === currentPanel) return;
  changing = true;
  const oldPanel = panels[currentPanel];
  const nextPanel = panels[nextIndex];
  hydratePanel(nextPanel);
  oldPanel.classList.add(direction > 0 ? "is-exiting-next" : "is-exiting-prev");
  oldPanel.classList.remove("is-active");
  oldPanel.setAttribute("aria-hidden", "true");
  nextPanel.classList.add("is-active");
  nextPanel.removeAttribute("aria-hidden");
  document.querySelector("#currentNumber").textContent = String(nextIndex + 1).padStart(2, "0");
  window.setTimeout(() => {
    oldPanel.classList.remove("is-exiting-next", "is-exiting-prev");
    currentPanel = nextIndex;
    changing = false;
    window.setTimeout(() => hydratePanel(panels[(currentPanel + direction + panels.length) % panels.length]), 250);
  }, 540);
}

document.querySelector("#nextTalent")?.addEventListener("click", () => showPanel((currentPanel + 1) % panels.length, 1));
document.querySelector("#prevTalent")?.addEventListener("click", () => showPanel((currentPanel - 1 + panels.length) % panels.length, -1));
document.querySelectorAll(".talent-guide, .toy-talent").forEach((guide) => {
  guide.addEventListener("click", () => {
    const nextIndex = Number(guide.dataset.talent);
    showView("artists");
    if (Number.isInteger(nextIndex) && nextIndex !== currentPanel) {
      const forward = nextIndex > currentPanel ? 1 : -1;
      window.setTimeout(() => showPanel(nextIndex, forward), 120);
    }
  });
});
if (panels.length) {
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") showPanel((currentPanel + 1) % panels.length, 1);
    if (event.key === "ArrowLeft") showPanel((currentPanel - 1 + panels.length) % panels.length, -1);
  });
}

/* Profile header yields on downward reading and returns immediately on upward intent. */
const profileHeader = document.querySelector(".profile-header");
if (profileHeader) {
  let lastScrollY = Math.max(window.scrollY, 0);
  let headerFrame = 0;

  function updateProfileHeader() {
    headerFrame = 0;
    const currentScrollY = Math.max(window.scrollY, 0);
    const delta = currentScrollY - lastScrollY;
    if (currentScrollY <= 24 || delta < -6) profileHeader.classList.remove("is-hidden");
    else if (delta > 8 && currentScrollY > profileHeader.offsetHeight) profileHeader.classList.add("is-hidden");
    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", () => {
    if (!headerFrame) headerFrame = requestAnimationFrame(updateProfileHeader);
  }, { passive: true });
}

/* Mario gallery. */
const shots = [...document.querySelectorAll(".profile-shot")];
let currentShot = 0;
function showShot(index) {
  if (!shots.length) return;
  shots[currentShot].classList.remove("is-active");
  currentShot = (index + shots.length) % shots.length;
  shots[currentShot].classList.add("is-active");
  document.querySelector("#shotCount").textContent = `${String(currentShot + 1).padStart(2, "0")} / ${String(shots.length).padStart(2, "0")}`;
  const liveLabel = document.querySelector(".profile-motion-line span");
  if (liveLabel) liveLabel.textContent = `LIVE PORTRAIT / ${String(currentShot + 1).padStart(2, "0")}`;
}
document.querySelector("#nextShot")?.addEventListener("click", () => showShot(currentShot + 1));
document.querySelector("#prevShot")?.addEventListener("click", () => showShot(currentShot - 1));

/* Editorial motion stays subtle: portraits respond to the cursor and sections reveal in sequence. */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  talentStage?.addEventListener("pointermove", (event) => {
    const activeFigure = panels[currentPanel]?.querySelector(".talent-figure, .placeholder-portrait");
    if (!activeFigure) return;
    const x = (event.clientX / window.innerWidth - .5) * -10;
    const y = (event.clientY / window.innerHeight - .5) * -7;
    activeFigure.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, { passive: true });
  talentStage?.addEventListener("pointerleave", () => {
    const activeFigure = panels[currentPanel]?.querySelector(".talent-figure, .placeholder-portrait");
    if (activeFigure) activeFigure.style.transform = "translate3d(0, 0, 0)";
  });

  const profileHero = document.querySelector(".profile-hero");
  const profileGallery = document.querySelector(".profile-gallery");
  profileHero?.addEventListener("pointermove", (event) => {
    const bounds = profileHero.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * -9;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * -6;
    if (profileGallery) profileGallery.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, { passive: true });
  profileHero?.addEventListener("pointerleave", () => {
    if (profileGallery) profileGallery.style.transform = "translate3d(0, 0, 0)";
  });
}

const profileSections = [...document.querySelectorAll(".profile-section")];
if (profileSections.length) {
  if (reduceMotion || !("IntersectionObserver" in window)) {
    profileSections.forEach((section) => section.classList.add("is-revealed"));
  } else {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: .14, rootMargin: "0px 0px -8%" });
    profileSections.forEach((section) => sectionObserver.observe(section));
  }
}

/* Build two pixel-identical image groups and move by exactly one group width.
   Extra shots are added to the first group on wide screens so the viewport can
   never outrun the loop and reveal an empty seam. */
function buildProfileRailLoop() {
  const rail = document.querySelector("#profileRail");
  const firstGroup = rail?.querySelector(".profile-rail-group");
  if (!rail || !firstGroup) return;

  rail.classList.remove("is-ready");
  rail.querySelectorAll(".profile-rail-group:not(:first-child)").forEach((group) => group.remove());
  firstGroup.querySelectorAll("[data-loop-fill]").forEach((shot) => shot.remove());

  const sourceShots = [...firstGroup.children];
  const minimumGroupWidth = window.innerWidth * 1.35;
  let sourceIndex = 0;
  while (firstGroup.scrollWidth < minimumGroupWidth && sourceShots.length && sourceIndex < 32) {
    const clone = sourceShots[sourceIndex % sourceShots.length].cloneNode(true);
    clone.dataset.loopFill = "";
    clone.querySelector("img")?.setAttribute("alt", "");
    firstGroup.append(clone);
    sourceIndex += 1;
  }

  const secondGroup = firstGroup.cloneNode(true);
  secondGroup.setAttribute("aria-hidden", "true");
  secondGroup.querySelectorAll("img").forEach((image) => image.setAttribute("alt", ""));
  rail.append(secondGroup);

  const loopDistance = firstGroup.getBoundingClientRect().width;
  rail.style.setProperty("--rail-loop-distance", `-${loopDistance}px`);
  rail.style.setProperty("--rail-loop-duration", `${Math.max(26, loopDistance / 55)}s`);
  requestAnimationFrame(() => rail.classList.add("is-ready"));
}

if (document.querySelector("#profileRail")) {
  const profileImages = [...document.querySelectorAll("#profileRail img")];
  Promise.all(profileImages.map((image) => image.decode?.().catch(() => {}) ?? Promise.resolve()))
    .then(buildProfileRailLoop);

  let profileRailResizeFrame = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(profileRailResizeFrame);
    profileRailResizeFrame = requestAnimationFrame(buildProfileRailLoop);
  }, { passive: true });
}

document.querySelector("#inquiryForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector("#formStatus");
  const button = event.currentTarget.querySelector("button[type='submit']");
  button.disabled = true;
  status.textContent = "TRANSMITTING…";
  window.setTimeout(() => {
    status.textContent = translations[language].inquirySent;
    button.disabled = false;
    event.currentTarget.reset();
  }, 650);
});

/* Liquid-crystal brand sculpture. CSS glass fragments remain as fallback. */
function scheduleCrystal() {
  if (crystalStarted || isProfile || window.matchMedia("(max-width: 900px)").matches) return;
  if (navigator.connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory < 4)) return;
  crystalStarted = true;
  const launch = () => initCrystal();
  if ("requestIdleCallback" in window) window.requestIdleCallback(launch, { timeout: 1800 });
  else window.setTimeout(launch, 900);
}

async function initCrystal() {
  const canvas = document.querySelector("#crystalCanvas");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try {
    const THREE = await import("https://unpkg.com/three@0.170.0/build/three.module.js");
    const compact = window.matchMedia("(max-width: 900px)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    camera.position.set(0, 0, compact ? 6.8 : 5.4);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !compact, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1 : 1.25));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const geometry = new THREE.TorusKnotGeometry(compact ? 1.22 : 1.48, compact ? .37 : .44, compact ? 72 : 112, compact ? 10 : 16, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xeaf4ff,
      roughness: .08,
      metalness: .02,
      transmission: .9,
      thickness: 1.15,
      ior: 1.35,
      clearcoat: 1,
      clearcoatRoughness: .08,
      transparent: true,
      opacity: .88,
      iridescence: .35,
      iridescenceIOR: 1.3
    });
    const crystal = new THREE.Mesh(geometry, material);
    crystal.rotation.set(.4, -.2, .24);
    crystal.position.set(compact ? .35 : .2, compact ? .35 : .05, 0);
    scene.add(crystal);

    const wire = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x00a75d, wireframe: true, transparent: true, opacity: .065 }));
    wire.scale.setScalar(1.018);
    crystal.add(wire);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x86bfa3, 2.4));
    const key = new THREE.DirectionalLight(0xffffff, 5);
    key.position.set(3, 5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x00a75d, 4);
    rim.position.set(-4, 1, -2);
    scene.add(rim);

    function resize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });
    let frame;
    let lastFrame = 0;
    const clock = new THREE.Clock();
    function render(timestamp = 0) {
      frame = requestAnimationFrame(render);
      if (document.hidden || homeExperience?.classList.contains("is-hidden") || timestamp - lastFrame < 33) return;
      lastFrame = timestamp;
      const elapsed = clock.getElapsedTime();
      crystal.rotation.y = elapsed * .065;
      crystal.rotation.x = .4 + Math.sin(elapsed * .21) * .12;
      crystal.rotation.z = .24 + Math.cos(elapsed * .16) * .08;
      crystal.position.y = (compact ? .35 : .05) + Math.sin(elapsed * .28) * .08;
      renderer.render(scene, camera);
    }
    render();
    window.addEventListener("pagehide", () => cancelAnimationFrame(frame), { once: true });
  } catch (error) {
    console.warn("GTAI crystal fallback active", error);
  }
}

initMarioTennisRig();
applyLanguage();
updateSoundUI();
if (page === "home" && unlocked) scheduleCrystal();
