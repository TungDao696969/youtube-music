let miniPlayerEl = null;
let currentVideoId = null;

export function initMiniPlayer() {
  if (miniPlayerEl) return;

  miniPlayerEl = document.createElement("div");
  miniPlayerEl.id = "mini-player";
  miniPlayerEl.className = `
    fixed bottom-4 right-4 z-50
    w-[320px] h-[180px]
    bg-black rounded-xl overflow-hidden shadow-xl
    hidden
  `;

  miniPlayerEl.innerHTML = `
    <iframe
      id="mini-player-iframe"
      class="w-full h-full"
      allow="autoplay; encrypted-media"
      frameborder="0"
    ></iframe>
  `;

  document.body.appendChild(miniPlayerEl);
}

export function playMiniVideo(videoId) {
  initMiniPlayer();

  if (currentVideoId === videoId) return;

  const iframe = document.getElementById("mini-player-iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}?mute=1&playsinline=1`;
  currentVideoId = videoId;
}

export function showMiniPlayer() {
  if (!miniPlayerEl || !currentVideoId) return;
  miniPlayerEl.classList.remove("hidden");
}

export function hideMiniPlayer() {
  if (!miniPlayerEl) return;
  miniPlayerEl.classList.add("hidden");
}

export function hasMiniVideo() {
  return !!currentVideoId;
}
