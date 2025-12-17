export function initSlider(containerId, prevId, nextId) {
  const container = document.getElementById(containerId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  if (!container || !prevBtn || !nextBtn) return;

  const scrollAmount = 300; // mỗi lần trượt

  nextBtn.addEventListener("click", () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });

  prevBtn.addEventListener("click", () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });
}