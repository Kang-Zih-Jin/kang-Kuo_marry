const weddingDate = new Date("2026-09-27T12:00:00+08:00");
const openingOverlay = document.querySelector(".opening-overlay");

if (sessionStorage.getItem("weddingOpeningSeen") === "true") {
  document.body.classList.add("opening-seen");
} else {
  openingOverlay?.addEventListener("animationend", (event) => {
    if (event.target === openingOverlay) {
      sessionStorage.setItem("weddingOpeningSeen", "true");
    }
  });
}

const dayEl = document.querySelector("[data-countdown-days]");
const hourEl = document.querySelector("[data-countdown-hours]");
const minuteEl = document.querySelector("[data-countdown-minutes]");
const countdownEls = [dayEl, hourEl, minuteEl];
let previousCountdown = [];

function setCountdownValue(element, value, index) {
  if (!element) return;

  if (previousCountdown[index] !== value) {
    element.textContent = value;
    element.classList.remove("is-ticking");
    void element.offsetWidth;
    element.classList.add("is-ticking");
    previousCountdown[index] = value;
  }
}

function updateCountdown() {
  const diff = weddingDate.getTime() - Date.now();

  if (diff <= 0) {
    ["0", "0", "0"].forEach((value, index) => setCountdownValue(countdownEls[index], value, index));
    return;
  }

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  [String(days), String(hours).padStart(2, "0"), String(minutes).padStart(2, "0")]
    .forEach((value, index) => setCountdownValue(countdownEls[index], value, index));
}

updateCountdown();
setInterval(updateCountdown, 60000);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const copyButton = document.querySelector("[data-copy-link]");
const copyStatus = document.querySelector("[data-copy-status]");
const shareUrl = "https://kang-zih-jin.github.io/kang-Kuo_marry/?v=20260718";

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shareUrl);
    copyStatus.textContent = "已複製婚禮邀請連結";
  } catch {
    copyStatus.textContent = shareUrl;
  }
});
