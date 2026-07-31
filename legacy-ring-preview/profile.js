const profiles = {
  noah: {
    name: "NOAH",
    label: "Noah Jae",
    images: [
      ["assets/profiles/noah/black-portrait.png", "Noah in a black portrait"],
      ["assets/profiles/noah/apple-portrait.jpg", "Noah holding an apple in a sunlit kitchen"],
      ["assets/profiles/noah/cafe-portrait.png", "Noah seated in a warm cafe interior"]
    ],
    headline: "An independent eye,<br><em>always in motion.</em>",
    bio: "Noah Jae is a Chinese–Korean fashion and lifestyle creator with a quiet, art-led point of view. His visual world moves through menswear, city culture, travel, photography and considered everyday spaces.",
    headlineZh: "獨立視角，<br><em>始終流動。</em>",
    bioZh: "Noah Jae 是一位中韓混血的時尚與生活風格創作者，以安靜而富藝術感的視角建立個人世界。他的影像穿梭於男裝、城市文化、旅遊、攝影與經過細緻思考的日常空間。",
    facts: [
      ["Age", "27"],
      ["Heritage", "Chinese–Korean"],
      ["Focus", "Fashion / Art / Travel / Photography"],
      ["Platform", "Instagram"]
    ],
    factsZh: [["年齡", "27"], ["血統", "中韓混血"], ["內容領域", "時尚／藝術／旅遊／攝影"], ["平台", "Instagram"]]
  },
  ooona: {
    name: "OOONA",
    label: "Ooona",
    images: [
      ["assets/profiles/ooona/hero.png", "Ooona soft beauty portrait"],
      ["assets/profiles/ooona/yoga.png", "Ooona practising yoga by the sea"],
      ["assets/profiles/ooona/laundry.jpg", "Ooona in a sunlit everyday setting"],
      ["assets/profiles/ooona/umbrella.jpg", "Ooona under a blue umbrella"]
    ],
    headline: "Soft energy,<br><em>shaped by movement.</em>",
    bio: "Ooona is a Korea-based beauty, wellness and lifestyle talent. Her world combines yoga, playful daily rituals, clean beauty and a gentle Seoul sensibility that feels light, healthy and approachable.",
    headlineZh: "柔和能量，<br><em>在流動中成形。</em>",
    bioZh: "Ooona 是常駐韓國的美妝、健康與生活風格藝人。她的世界結合瑜伽、俏皮的日常儀式、純淨美學與溫柔的首爾氣質，呈現輕盈、健康而親切的感覺。",
    facts: [
      ["Base", "Korea"],
      ["Focus", "Beauty / Wellness / Yoga / Lifestyle"],
      ["Style", "Soft / Clean / Playful"],
      ["Platform", "Instagram"]
    ],
    factsZh: [["常駐地", "韓國"], ["內容領域", "美妝／健康／瑜伽／生活風格"], ["風格", "柔和／純淨／俏皮"], ["平台", "Instagram"]]
  },
  amber: {
    name: "AMBER",
    label: "Amber Yun",
    images: [
      ["assets/profiles/amber/festival-wheel.png", "Amber at a music festival ferris wheel"],
      ["assets/profiles/amber/night-portrait.png", "Amber in a black evening portrait"],
      ["assets/profiles/amber/denim-editorial.png", "Amber in an oversized denim editorial look"],
      ["assets/profiles/amber/festival-stage.png", "Amber at an outdoor music festival"]
    ],
    headline: "Sound in restraint,<br><em>style with intent.</em>",
    bio: "Amber Yun is a Korean-American music producer based in Los Angeles. Her creative identity brings together genre-defying sound, fashion-forward restraint and the quiet rhythm of the city’s studio and cultural scene.",
    headlineZh: "聲音克制，<br><em>風格有意。</em>",
    bioZh: "Amber Yun 是常駐洛杉磯的韓裔美國音樂製作人。她的創作身份融合跨越類型的聲音、前衛而克制的時尚，以及城市錄音室與文化場景的安靜節奏。",
    facts: [
      ["Base", "Los Angeles"],
      ["Age", "26"],
      ["Focus", "Music Production / Fashion / City Culture"],
      ["Platform", "Instagram"]
    ],
    factsZh: [["常駐地", "洛杉磯"], ["年齡", "26"], ["內容領域", "音樂製作／時尚／城市文化"], ["平台", "Instagram"]]
  },
  maya: {
    name: "MAYA",
    label: "Maya",
    images: [
      ["assets/profiles/maya/street-grey.png", "Maya in a grey street style portrait"],
      ["assets/profiles/maya/pink-closeup.png", "Maya in a soft pink outdoor portrait"],
      ["assets/profiles/maya/pink-editorial.png", "Maya in a pink architectural editorial"],
      ["assets/profiles/maya/black-tailoring.png", "Maya in black tailoring"]
    ],
    headline: "Quiet power,<br><em>framed through culture.</em>",
    bio: "Maya is a high-fashion and art-world digital talent defined by restrained elegance. Her visual direction moves through galleries, museums, architecture and quiet-luxury city spaces without reducing her to a conventional fashion influencer.",
    headlineZh: "安靜力量，<br><em>由文化構圖。</em>",
    bioZh: "Maya 是一位以克制優雅為核心的高級時尚與藝術數字藝人。她的視覺方向穿梭於畫廊、博物館、建築與靜奢城市空間，不被簡化為傳統的時尚網紅。",
    facts: [
      ["Focus", "High Fashion / Art / Culture"],
      ["Visual language", "Quiet Luxury / Restrained Elegance"],
      ["Scenes", "Gallery / Museum / Architecture"],
      ["Platform", "Instagram"]
    ],
    factsZh: [["內容領域", "高級時尚／藝術／文化"], ["視覺語言", "靜奢／克制優雅"], ["場景", "畫廊／博物館／建築"], ["平台", "Instagram"]]
  }
};

const key = (document.body.dataset.artist || new URLSearchParams(location.search).get("artist"))?.toLowerCase();
const profile = profiles[key];

if (!profile) {
  location.replace("index.html#artists");
} else {
  document.body.dataset.artist = key;
  document.title = `${profile.label} — GTAI`;

  const wordmark = document.querySelector(".profile-wordmark");
  wordmark.innerHTML = Array.from({ length: 4 }, () => `<span>${profile.name}</span>`).join("");

  const title = document.querySelector("#profile-title");
  title.textContent = profile.name;

  const railWindow = document.querySelector(".profile-rail-window");
  railWindow.setAttribute("aria-label", `${profile.label} selected images`);
  document.querySelector(".profile-rail-group").innerHTML = profile.images.map(([src, alt]) =>
    `<figure class="rail-shot"><img src="${src}" alt="${alt}" decoding="async"></figure>`
  ).join("");

  const renderProfileLanguage = (requestedLanguage) => {
    const isChinese = requestedLanguage === "zh";
    const headline = document.querySelector("#profileHeadline");
    headline.innerHTML = isChinese ? profile.headlineZh : profile.headline;
    document.querySelector("#profileBio").textContent = isChinese ? profile.bioZh : profile.bio;
    const facts = isChinese ? profile.factsZh : profile.facts;
    document.querySelector("#profileFacts").innerHTML = facts.map(([term, value]) =>
      `<div><dt>${term}</dt><dd>${value}</dd></div>`
    ).join("");
  };

  renderProfileLanguage(localStorage.getItem("gtai-language") || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"));
  window.addEventListener("gtai:languagechange", (event) => renderProfileLanguage(event.detail.language));
}

await import("./app.js?v=20260722-20");
