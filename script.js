const homeView = document.querySelector(".home-view");
const sectionLinks = document.querySelectorAll("[data-section-link]");
const sectionPanels = document.querySelectorAll("[data-section-panel]");
const homeLink = document.querySelector("[data-home-link]");
const validSections = new Set([...sectionLinks].map((link) => link.dataset.sectionLink));
const workLinks = document.querySelectorAll("[data-work-link]");
const workBack = document.querySelector("[data-work-back]");
const workDetail = document.querySelector("[data-work-detail]");
const workTitle = document.querySelector("[data-work-title]");
const workDesc = document.querySelector("[data-work-desc]");
const workImages = document.querySelector("[data-work-images]");

const works = {
  sixteen: {
    title: "Sixteen",
    desc: "一个帮助你趣味记录、AI跟练的健身app",
    images: imageRange("./assets/projects/sixteen/", 3, 29),
    color: "#BAE400",
  },
  plg: {
    title: "PLG",
    desc: "从获客到续费到ADP计费转化链路优化",
    images: imageRange("./assets/projects/plg/", 30, 41),
    color: "#4A70FF",
  },
  "adp-brand": {
    title: "ADP Brand",
    desc: "adp品牌、icon skill视觉升级",
    images: imageRange("./assets/projects/adp-brand/", 40, 45),
    color: "#7CD1F7",
  },
  paymax: {
    title: "Paymax",
    desc: "0-1搭建的海外刷掌支付后台",
    images: imageRange("./assets/projects/paymax/", 50, 58),
    color: "#219F68",
  },
};

function imageRange(dir, from, to) {
  const list = [];
  for (let i = from; i <= to; i++) list.push(`${dir}${i}.jpg`);
  return list;
}

function sectionFromHash() {
  const section = window.location.hash.replace("#", "").split("/")[0];
  return validSections.has(section) ? section : "";
}

function workFromHash() {
  const [section, work] = window.location.hash.replace("#", "").split("/");
  return section === "works" && works[work] ? work : "";
}

function showWorkDetail(workId = workFromHash()) {
  const work = works[workId];
  homeView.classList.toggle("work-detail-mode", Boolean(work));
  workDetail.classList.toggle("is-active", Boolean(work));
  workDetail.setAttribute("aria-hidden", String(!work));

  if (!work) {
    workImages.replaceChildren();
    homeView.style.removeProperty("--active-work-color");
    return;
  }

  workTitle.textContent = work.title;
  workDesc.textContent = work.desc;
  renderWorkImages(work.images);
  homeView.style.setProperty("--active-work-color", work.color);
}

function renderWorkImages(srcs) {
  workImages.replaceChildren();
  srcs.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    img.classList.add("work-img");
    if (index === 0) img.classList.add("work-img-first");
    workImages.appendChild(img);
  });
}

function showSection(section = sectionFromHash()) {
  const hasPanel = section !== "";
  homeView.classList.remove("section-about", "section-works", "section-contact");
  homeView.classList.toggle("has-panel", hasPanel);
  if (hasPanel) {
    homeView.classList.add(`section-${section}`);
  }

  sectionLinks.forEach((link) => {
    const active = link.dataset.sectionLink === section;
    link.classList.toggle("is-active", active);
    link.setAttribute("aria-current", active ? "page" : "false");
  });

  sectionPanels.forEach((panel) => {
    const active = panel.dataset.sectionPanel === section;
    panel.classList.toggle("is-active", active);
    panel.setAttribute("aria-hidden", String(!active));
  });

  showWorkDetail(section === "works" ? workFromHash() : "");
}

homeLink.addEventListener("click", (event) => {
  event.preventDefault();
  history.pushState(null, "", window.location.pathname);
  homeView.scrollTo({ top: 0, behavior: "smooth" });
  showSection("");
});

sectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const section = link.dataset.sectionLink;
    history.pushState(null, "", `#${section}`);
    homeView.scrollTo({ top: 0, behavior: "smooth" });
    showSection(section);
  });
});

workLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const work = link.dataset.workId;
    history.pushState(null, "", `#works/${work}`);
    homeView.scrollTo({ top: 0, behavior: "smooth" });
    showSection("works");
  });
});

workBack.addEventListener("click", (event) => {
  event.preventDefault();
  history.pushState(null, "", "#works");
  homeView.scrollTo({ top: 0, behavior: "smooth" });
  showSection("works");
});

window.addEventListener("popstate", () => showSection());
showSection();

const helloBubble = document.querySelector(".hello-bubble");

helloBubble.addEventListener("click", () => {
  const count = 2 + Math.floor(Math.random() * 2);
  const burst = document.createElement("span");
  burst.className = "sparkle-burst";
  burst.setAttribute("aria-hidden", "true");
  helloBubble.appendChild(burst);

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("span");
    spark.className = "sparkle";
    spark.textContent = "✨";
    spark.style.setProperty("--dx", `${(30 + Math.random() * 46).toFixed(0)}px`);
    spark.style.setProperty("--dy", `${(-18 - Math.random() * 40).toFixed(0)}px`);
    spark.style.setProperty("--dr", `${(Math.random() * 40 - 20).toFixed(0)}deg`);
    spark.style.setProperty("--delay", `${(Math.random() * 0.14).toFixed(2)}s`);
    burst.appendChild(spark);
  }

  window.setTimeout(() => burst.remove(), 1600);
});


const helloModal = document.querySelector("[data-hello-modal]");
const helloModalClose = document.querySelector("[data-hello-close]");

if (helloModal) {
  const closeHelloModal = () => {
    helloModal.hidden = true;
  };

  helloBubble.addEventListener("click", () => {
    helloModal.hidden = false;
  });

  helloModalClose?.addEventListener("click", closeHelloModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !helloModal.hidden) {
      closeHelloModal();
    }
  });
}
