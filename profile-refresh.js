const storedProfileLanguage = localStorage.getItem("gtai-language");
const savedLanguage = storedProfileLanguage === "zh" ? "zh-hant" : (storedProfileLanguage || "en");
const isTraditional = savedLanguage === "zh-hant";
const isSimplified = savedLanguage === "zh-hans";
const isChinese = isTraditional || isSimplified;
const localize = (english, traditional, simplified) => isTraditional ? traditional : isSimplified ? simplified : english;
const artistName = document.body.dataset.artist || "mario";
const header = document.querySelector(".profile-header");

const profileRefreshData = {
  maya: {
    name: "Maya", role: "Luxury Fashion / Art", followers: "14.5K",
    image: "assets/profiles/maya/black-tailoring.png",
    angles: [
      "assets/profiles/maya/angles/front.png",
      "assets/profiles/maya/angles/side.png",
      "assets/profiles/maya/angles/back.png"
    ],
    facts: [["Height", "171 cm"], ["Weight", "48 kg"], ["Measurements", "85 / 63 / 89"], ["Shoe", "38"], ["Base", "Paris / New York / Seoul"], ["Languages", "English / Korean"], ["Talent type", "Luxury Fashion / High Fashion / Art"]],
    gallery: ["assets/profiles/maya/black-tailoring.png", "assets/profiles/maya/pink-editorial.png", "assets/profiles/maya/pink-closeup.png", "assets/profiles/maya/street-grey.png"]
  },
  amber: {
    name: "Amber", role: "Music Producer / Fashion", followers: "13,094",
    image: "assets/profiles/amber/night-portrait.png",
    angles: [
      "assets/profiles/amber/angles/front.png?v=amber-centered-20260728",
      "assets/profiles/amber/angles/side.png?v=amber-centered-20260728",
      "assets/profiles/amber/angles/back.png?v=amber-centered-20260728"
    ],
    facts: [["Height", "175 cm"], ["Weight", "50 kg"], ["Measurements", "85 / 63 / 89"], ["Shoe", "38"], ["Base", "Los Angeles / Seoul"], ["Languages", "English / Korean"], ["Nationality", "Korean-American"], ["Talent type", "Music / Fashion / City Culture"]],
    gallery: ["assets/profiles/amber/night-portrait.png", "assets/profiles/amber/denim-editorial.png", "assets/profiles/amber/festival-stage.png", "assets/profiles/amber/festival-wheel.png"]
  },
  ooona: {
    name: "Ooona", role: "Beauty / Wellness", followers: "15.1K",
    image: "assets/profiles/ooona/hero.png",
    angles: [
      "assets/profiles/ooona/angles/front.png",
      "assets/profiles/ooona/angles/side.png",
      "assets/profiles/ooona/angles/back.png"
    ],
    facts: [["Height", "165 cm"], ["Weight", "45 kg"], ["Measurements", "82 / 60 / 86"], ["Shoe", "38"], ["Base", "Seoul"], ["Languages", "Korean / English"], ["Talent type", "Beauty / Wellness / Lifestyle"]],
    gallery: ["assets/profiles/ooona/hero.png", "assets/profiles/ooona/mirror.png", "assets/profiles/ooona/stairs.png", "assets/profiles/ooona/sport.png"]
  },
  mario: {
    name: "Mario", role: "Lifestyle / Fashion / Sport", followers: "13.5K",
    image: "assets/mario-hero.png",
    angles: [
      "assets/profiles/mario/turnaround/front.webp",
      "assets/profiles/mario/turnaround/side.webp",
      "assets/profiles/mario/turnaround/back.webp"
    ],
    facts: [["Height", "185 cm"], ["Weight", "80 kg"], ["Measurements", "100 / 80 / 96"], ["Shoe", "44"], ["Base", "Guangdong"], ["Languages", "Mandarin / Cantonese / English"], ["Nationality", "China"], ["Birthday", "21 June 2000"], ["Zodiac", "Gemini"], ["Talent type", "Lifestyle / Fashion / Sport / Travel"]],
    gallery: ["assets/mario-hero.png", "assets/mario-editorial.png", "assets/mario-campaign.png", "assets/mario-portrait.png", "assets/profiles/mario/yotree-cover.png"]
  },
  noah: {
    name: "Noah", role: "Film / Fashion / Photography", followers: "11.9K",
    image: "assets/profiles/noah/hero.png",
    facts: [["Height", "183 cm"], ["Weight", "70 kg"], ["Measurements", "88 / 77 / 91"], ["Shoe", "43"], ["Base", "Hong Kong / Seoul / Tokyo"], ["Languages", "Cantonese / Mandarin / English"], ["Birthday", "7 November 2001"], ["Zodiac", "Scorpio"], ["Talent type", "Film / Fashion / Photography"]],
    gallery: ["assets/profiles/noah/hero.png", "assets/profiles/noah/black-portrait.png", "assets/profiles/noah/cafe-portrait.png", "assets/profiles/noah/apple-portrait.jpg"]
  }
};

if (header) {
  header.classList.add("profile-refreshed");
  header.innerHTML = `
    <a class="profile-refresh-logo company-logo" href="index.html" aria-label="GreenTomato home"><img src="https://gtomato.com/_next/static/media/logo-gt-color.fd039543.svg" alt="GreenTomato"></a>
    <nav class="profile-refresh-nav" aria-label="Primary navigation">
      <a class="is-active" href="artists.html">${localize("Artists", "藝人", "艺人")}</a>
      <a href="index.html#work">${localize("Work", "作品", "作品")}</a>
      <a href="index.html#services">${localize("Services", "服務", "服务")}</a>
      <a href="index.html#about">${localize("About", "關於", "关于")}</a>
      <a class="profile-contact" href="#inquiry">${localize("Contact", "聯絡", "联系")}</a>
    </nav>
    <div class="profile-refresh-tools">
      <div class="profile-language-switcher" id="profileLanguageSwitcher" role="group" aria-label="Language">
        <button type="button" data-language="en" class="${savedLanguage === "en" ? "is-active" : ""}">EN</button>
        <button type="button" data-language="zh-hant" class="${isTraditional ? "is-active" : ""}">繁</button>
        <button type="button" data-language="zh-hans" class="${isSimplified ? "is-active" : ""}">简</button>
      </div>
      <button class="profile-refresh-menu" id="profileMenuToggle" type="button" aria-expanded="false" aria-label="Open menu"><span></span><span></span></button>
    </div>
    <nav class="profile-mobile-nav" id="profileMobileNav" aria-label="Mobile navigation">
      <a href="artists.html">${localize("Artists", "藝人", "艺人")}</a>
      <a href="index.html#work">${localize("Work", "作品", "作品")}</a>
      <a href="index.html#services">${localize("Services", "服務", "服务")}</a>
      <a href="index.html#about">${localize("About", "關於", "关于")}</a>
      <a href="#inquiry">${localize("Contact", "聯絡", "联系")}</a>
    </nav>
  `;

  document.querySelectorAll("#profileLanguageSwitcher [data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === savedLanguage));
    button.addEventListener("click", () => {
      localStorage.setItem("gtai-language", button.dataset.language);
      location.reload();
    });
  });
  document.querySelector("#profileMenuToggle")?.addEventListener("click", (event) => {
    const open = !document.body.classList.contains("profile-menu-open");
    document.body.classList.toggle("profile-menu-open", open);
    event.currentTarget.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll("#profileMobileNav a").forEach((link) => link.addEventListener("click", () => {
    document.body.classList.remove("profile-menu-open");
    document.querySelector("#profileMenuToggle")?.setAttribute("aria-expanded", "false");
  }));
}

const activeProfile = profileRefreshData[artistName];
const profileShowcase = document.querySelector(".profile-showcase");
const introduction = document.querySelector(".intro-section");
if (activeProfile && profileShowcase) {
  const labels = {
    available: localize("Available for Global Campaigns", "可接全球品牌合作", "可接全球品牌合作"),
    followers: localize("Total followers", "總粉絲數", "总粉丝数"),
    enquiry: localize("Enquire About This Talent", "諮詢這位藝人", "咨询这位艺人"),
    gallery: localize("Selected images", "人物影像", "人物影像"),
    viewAll: localize("View all", "查看全部", "查看全部"),
    collapse: localize("Collapse", "收起全部", "收起全部"),
    front: localize("Front", "正面", "正面"),
    side: localize("Side", "側面", "侧面"),
    back: localize("Back", "背面", "背面")
  };
  const factLabels = {
    Height: localize("Height", "身高", "身高"),
    Weight: localize("Weight", "體重", "体重"),
    Measurements: localize("Measurements", "三圍", "三围"),
    Shoe: localize("Shoe", "鞋碼", "鞋码"),
    Base: localize("Base", "常駐地", "常驻地"),
    Languages: localize("Languages", "語言", "语言"),
    Nationality: localize("Nationality", "國籍", "国籍"),
    Birthday: localize("Birthday", "生日", "生日"),
    Zodiac: localize("Zodiac", "星座", "星座"),
    "Talent type": localize("Talent type", "人物類型", "人物类型")
  };
  const facts = activeProfile.facts.map(([key, value]) => `<div><dt>${factLabels[key] || key}</dt><dd>${value}</dd></div>`).join("");
  const angleImages = activeProfile.angles || [activeProfile.image];
  angleImages.forEach((src) => {
    const preload = new Image();
    preload.src = src;
  });
  profileShowcase.innerHTML = `
    <div class="profile-overview">
      <div class="profile-overview-media">
        <div class="profile-angle-frame" data-angle-index="0">
          <img id="profileAngleImage" src="${angleImages[0]}" alt="${activeProfile.name} full-length view">
        </div>
        ${activeProfile.angles ? `
          <div class="profile-angle-controls" role="tablist" aria-label="${activeProfile.name} views">
            <button class="is-active" type="button" data-angle="0">${labels.front}</button>
            <button type="button" data-angle="1">${labels.side}</button>
            <button type="button" data-angle="2">${labels.back}</button>
          </div>` : ""}
      </div>
      <div class="profile-overview-copy">
        <p class="profile-availability"><span></span>${labels.available}</p>
        <h1>${activeProfile.name}</h1>
        <p class="profile-role">${activeProfile.role}</p>
        <div class="profile-followers"><strong>${activeProfile.followers}</strong><span>${labels.followers}</span></div>
        <dl class="profile-facts">${facts}</dl>
        <a class="profile-enquire-button" href="#inquiry">${labels.enquiry}<b>↘</b></a>
      </div>
    </div>
  `;

  profileShowcase.insertAdjacentHTML("afterend", `
    <section class="profile-gallery" id="profileGallery">
      <header>
        <div><p>PORTFOLIO</p><h2>${labels.gallery}</h2></div>
        <div class="profile-gallery-actions">
          <button type="button" data-gallery-prev aria-label="Previous images">←</button>
          <button type="button" data-gallery-next aria-label="Next images">→</button>
          <button type="button" data-gallery-toggle>${labels.viewAll}</button>
        </div>
      </header>
      <div class="profile-gallery-track">
        ${activeProfile.gallery.map((src, index) => `<figure><img src="${src}" alt="${activeProfile.name} portfolio image ${index + 1}" loading="${index < 2 ? "eager" : "lazy"}"></figure>`).join("")}
      </div>
    </section>
  `);

  const angleImage = document.querySelector("#profileAngleImage");
  document.querySelectorAll(".profile-gallery-track img").forEach((galleryImage) => {
    galleryImage.addEventListener("error", () => galleryImage.closest("figure")?.remove(), { once: true });
  });
  document.querySelectorAll("[data-angle]").forEach((button) => button.addEventListener("click", () => {
    const index = Number(button.dataset.angle);
    angleImage.src = angleImages[index];
    angleImage.closest(".profile-angle-frame")?.setAttribute("data-angle-index", String(index));
    document.querySelectorAll("[data-angle]").forEach((item) => item.classList.toggle("is-active", item === button));
  }));

  const gallery = document.querySelector("#profileGallery");
  const track = gallery.querySelector(".profile-gallery-track");
  gallery.querySelector("[data-gallery-prev]")?.addEventListener("click", () => track.scrollBy({ left: -track.clientWidth * 0.75, behavior: "smooth" }));
  gallery.querySelector("[data-gallery-next]")?.addEventListener("click", () => track.scrollBy({ left: track.clientWidth * 0.75, behavior: "smooth" }));
  gallery.querySelector("[data-gallery-toggle]")?.addEventListener("click", (event) => {
    const expanded = gallery.classList.toggle("is-expanded");
    event.currentTarget.textContent = expanded ? labels.collapse : labels.viewAll;
  });

  if (introduction) introduction.hidden = true;
}

const inquiry = document.querySelector(".inquiry-section");
const form = document.querySelector("#inquiryForm");
if (inquiry && form) {
  const title = inquiry.querySelector(".inquiry-copy h2");
  const intro = inquiry.querySelector(".inquiry-copy > p:last-child");
  if (title) title.innerHTML = localize(
    "Bring us the brief.<br><em>We’ll build the world.</em>",
    "告訴我們需求，<br><em>我們建立整個世界。</em>",
    "告诉我们需求，<br><em>我们建立整个世界。</em>"
  );
  if (intro) intro.textContent = localize(
    "Inquire about any GTAI service. Selecting the artist you are viewing is optional.",
    "所有服務均可詢問，無需選擇目前正在查看的藝人。",
    "所有服务均可咨询，无需选择目前正在查看的艺人。"
  );

  form.innerHTML = `
    <input type="hidden" name="sourceArtist" value="${artistName}">
    <div class="form-row">
      <label><span>${localize("Contact name", "聯絡人姓名", "联系人姓名")}</span><input required name="name" autocomplete="name"></label>
      <label><span>${localize("Company / brand", "公司／品牌", "公司／品牌")}</span><input required name="company" autocomplete="organization"></label>
    </div>
    <div class="form-row">
      <label><span>Email</span><input required type="email" name="email" autocomplete="email"></label>
      <label><span>${localize("Target launch", "預計推出時間", "预计推出时间")}</span><input name="timeline" placeholder="${localize("e.g. Q4 2026", "例如：2026 Q4", "例如：2026 Q4")}"></label>
    </div>
    <fieldset>
      <legend>${localize("What can we help with? *", "需要哪些服務？*", "需要哪些服务？*")}</legend>
      <div class="profile-service-options">
        <label><input type="checkbox" name="services" value="AI Video Production"><span>AI Video Production</span></label>
        <label><input type="checkbox" name="services" value="Digital Human Creation"><span>Digital Human Creation</span></label>
        <label><input type="checkbox" name="services" value="AI Campaign & Social"><span>AI Campaign & Social</span></label>
        <label><input type="checkbox" name="services" value="AI Experiences / Custom Project"><span>AI Experiences / Custom Project</span></label>
      </div>
    </fieldset>
    <label><span>${localize("Project brief", "項目說明", "项目说明")}</span><textarea required name="message" rows="5"></textarea></label>
    <div class="form-submit-row">
      <p class="profile-form-note">${localize("WhatsApp delivery will be connected next. This preview stores no data.", "WhatsApp 發送將在下一階段接通；目前預覽不會儲存資料。", "WhatsApp 发送将在下一阶段接通；目前预览不会存储资料。")}</p>
      <button class="submit-button" type="submit"><span>${localize("Send inquiry", "發送詢盤", "发送咨询")}</span><b>↗</b></button>
    </div>
    <p class="form-status" id="formStatus" aria-live="polite"></p>
  `;

  form.addEventListener("submit", (event) => {
    if (form.querySelectorAll('input[name="services"]:checked').length) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const status = form.querySelector("#formStatus");
    status.textContent = localize("Select at least one service.", "請至少選擇一項服務。", "请至少选择一项服务。");
    form.querySelector('input[name="services"]')?.focus();
  }, true);
}

document.querySelectorAll(".site-footer > a:first-child").forEach((logo) => {
  logo.className = "profile-footer-logo";
  logo.setAttribute("aria-label", "GreenTomato home");
  logo.innerHTML = '<img src="https://gtomato.com/_next/static/media/logo-gt-color.fd039543.svg" alt="GreenTomato">';
});
