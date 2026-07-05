const weddingDate = new Date("2026-09-27T12:00:00+08:00");
const dayEl = document.querySelector("[data-countdown-days]");
const hourEl = document.querySelector("[data-countdown-hours]");
const minuteEl = document.querySelector("[data-countdown-minutes]");

function updateCountdown() {
  const diff = weddingDate.getTime() - Date.now();

  if (diff <= 0) {
    dayEl.textContent = "0";
    hourEl.textContent = "0";
    minuteEl.textContent = "0";
    return;
  }

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  dayEl.textContent = String(days);
  hourEl.textContent = String(hours).padStart(2, "0");
  minuteEl.textContent = String(minutes).padStart(2, "0");
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
const shareUrl = "https://kang-zih-jin.github.io/kang-Kuo_marry/";

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shareUrl);
    copyStatus.textContent = "已複製婚禮邀請連結";
  } catch {
    copyStatus.textContent = shareUrl;
  }
});
