const fieldEl = document.querySelector(".field");

let touchStartX = 0;
let touchStartY = 0;

fieldEl.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  },
  { passive: true }
);

fieldEl.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
  },
  { passive: false }
);

fieldEl.addEventListener(
  "touchend",
  (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) < 25) return;

    if (absDx > absDy) {
      handleMove(dx > 0 ? KEY_ACTIONS[39] : KEY_ACTIONS[37]);
    } else {
      handleMove(dy > 0 ? KEY_ACTIONS[40] : KEY_ACTIONS[38]);
    }
  },
  { passive: true }
);
