let miniPlayerEl = null;

export function initMiniPlayer() {
  if (miniPlayerEl) return;

  miniPlayerEl = document.createElement("div");
  miniPlayerEl.id = "mini-player";
  miniPlayerEl.className = `
      fixed bottom-24 right-4 z-50
      w-[320px] h-[180px]
      bg-black rounded-xl overflow-hidden shadow-xl
      hidden
    `;

  miniPlayerEl.innerHTML = `
      <div id="miniYTContainer" class="w-full h-full"></div>
    `;

  document.body.appendChild(miniPlayerEl);
}

export function showMiniPlayer() {
  initMiniPlayer();
  miniPlayerEl.classList.remove("hidden");
  miniPlayerEl.style.pointerEvents = "auto";
}

export function hideMiniPlayer() {
  if (!miniPlayerEl) return;
  miniPlayerEl.classList.add("hidden");
  miniPlayerEl.style.pointerEvents = "none";
}

export function attachYTToMain(ytPlayer) {
  const container = document.getElementById("mainVideoPlayer");
  if (!container || !ytPlayer) return;

  const iframe = ytPlayer.getIframe();
  if (iframe.parentNode === container) return;

  // resume if was paused during mini player
  if (
    ytPlayer.getPlayerState &&
    ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING
  ) {
    ytPlayer.playVideo();
  }
  container.appendChild(iframe);
}

// export function attachYTToMini(ytPlayer) {
//   const container = document.getElementById("miniYTContainer");
//   if (!container || !ytPlayer) return;

//   const iframe = ytPlayer.getIframe();
//   if (iframe.parentNode === container) return;

//   // keep playing while moving
//   const wasPlaying =
//     ytPlayer.getPlayerState &&
//     ytPlayer.getPlayerState() === YT.PlayerState.PLAYING;
//   container.appendChild(iframe);
//   if (wasPlaying) {
//     // give it a moment to settle before resuming
//     setTimeout(() => {
//       if (
//         ytPlayer.getPlayerState &&
//         ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING
//       ) {
//         ytPlayer.playVideo();
//       }
//     }, 100);
//   }
// }

export function attachYTToMini(ytPlayer) {
  const container = document.getElementById("miniYTContainer");
  if (!container || !ytPlayer) return;

  const iframe = ytPlayer.getIframe();
  if (iframe.parentNode === container) return;

  iframe.className = "w-full h-full";
  container.appendChild(iframe);

  if (
    ytPlayer.getPlayerState &&
    ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING
  ) {
    ytPlayer.playVideo();
  }
}
