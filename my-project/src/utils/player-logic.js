import { logPlayEvent } from "../services/api";
import { destroyMiniPlayer } from "./explore/miniYtb-logic";
const audio = document.getElementById("playerAudio");
const player = document.getElementById("musicPlayer");

const playBtn = document.getElementById("playerPlayBtn");
const titleEl = document.getElementById("playerTitle");
const artistEl = document.getElementById("playerArtist");
const thumbEl = document.getElementById("playerThumbnail");

const progress = document.getElementById("playerProgress");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const volume = document.getElementById("playerVolume");

const progressBar = document.getElementById("playerProgressBar");
const progressDot = document.getElementById("playerProgressDot");

const btnPrev = document.getElementById("prevSong");
const btnNext = document.getElementById("nextSong");

const closePlayerBtn = document.getElementById("closePlayerBtn");

let isPlaying = false;
let playQueue = [];
let currentIndex = -1;

let currentSong = null;
let hasLoggedPlay = false;
let isVideoMode = false;
let currentYTPlayer = null;
let ytProgressTimer = null;
let onVideoPlayCallback = null;

let ytPlayer = null;
let attachedVideoId = null;

let isPlayerDestroyed = false;

export const setPlayQueue = (queue, index = 0) => {
  playQueue = queue;
  currentIndex = index;
};

export const playSong = async ({
  id,
  title,
  artist = "Không rõ nghệ sĩ",
  audioUrl,
  thumbnails,
}) => {
  detachYTPlayer();
  currentSong = { id };
  hasLoggedPlay = false;
  // Set UI
  titleEl.textContent = title;
  artistEl.textContent = artist;
  thumbEl.src = thumbnails?.[0] || "";

  // Set audio
  if (audio.src !== audioUrl) {
    audio.src = audioUrl;
  }

  audio.play();
  isPlaying = true;
  updatePlayIcon();

  // Show player
  player.classList.remove(
    "translate-y-full",
    "opacity-0",
    "invisible",
    "pointer-events-none"
  );

  document.dispatchEvent(
    new CustomEvent("songchange", {
      detail: {
        index: currentIndex,
        isPlaying,
      },
    })
  );
};

const playByIndex = (index) => {
  const item = playQueue[index];
  if (!item) return;

  currentIndex = index;

  if (item.videoId) {
    playVideo(item);
  } else {
    playSong(item);
  }
};

export const playVideo = (video) => {
  resetPlayerDestroyed();
  // if (!currentYTPlayer) return;

  isVideoMode = true;

  const index = playQueue.findIndex((item) => item.videoId === video.videoId);
  if (index !== -1) currentIndex = index;

  titleEl.textContent = video.title || "";
  artistEl.textContent = "Video";
  thumbEl.src = video.thumbnails?.[0] || "";

  // callback cho trang video details
  if (onVideoPlayCallback) {
    onVideoPlayCallback(currentIndex, video);
  }

  // currentYTPlayer.loadVideoById(video.videoId);
  if (currentYTPlayer) {
    currentYTPlayer.loadVideoById(video.videoId);
  }
  isPlaying = true;
  updatePlayIcon();
};

// pause
playBtn.addEventListener("click", () => {
  if (isVideoMode) {
    if (!currentYTPlayer) return;
    const state = currentYTPlayer.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      currentYTPlayer.pauseVideo();
      isPlaying = false;
    } else {
      currentYTPlayer.playVideo();
      isPlaying = true;
    }
    updatePlayIcon();
    return;
  }

  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play();
    isPlaying = true;
  }

  updatePlayIcon();
});

btnNext.addEventListener("click", () => {
  if (!playQueue.length) return;

  const nextIndex = currentIndex + 1 >= playQueue.length ? 0 : currentIndex + 1;

  playByIndex(nextIndex);
});

btnPrev.addEventListener("click", () => {
  if (!playQueue.length) return;

  const prevIndex =
    currentIndex - 1 < 0 ? playQueue.length - 1 : currentIndex - 1;

  playByIndex(prevIndex);
});

const updatePlayIcon = () => {
  playBtn.innerHTML = isPlaying
    ? `<i class="fa-solid fa-pause text-xl"></i>`
    : `<i class="fa-solid fa-play text-xl"></i>`;
};

audio.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration || !currentSong?.id) return;

  // chỉ log 1 lần
  if (!hasLoggedPlay && audio.currentTime >= 5) {
    hasLoggedPlay = true;

    logPlayEvent({
      songId: currentSong.id,
      playedAt: new Date().toISOString(),
    }).catch((err) => console.warn("Không lưu được lịch sử nghe", err));
  }

  const percent = (audio.currentTime / audio.duration) * 100;

  progress.value = percent;
  progressBar.style.width = `${percent}%`;
  progressDot.style.left = `${percent}%`;

  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// hết bài tự next bài tiếp theo
audio.addEventListener("ended", () => {
  if (!playQueue.length) return;

  const nextIndex = currentIndex + 1 >= playQueue.length ? 0 : currentIndex + 1;

  playByIndex(nextIndex);
});

progress.addEventListener("input", () => {
  if (isVideoMode) {
    if (!currentYTPlayer || typeof currentYTPlayer.getDuration !== "function")
      return;
    const duration = currentYTPlayer.getDuration() || 0;
    const seekTo = (progress.value / 100) * duration;
    currentYTPlayer.seekTo(seekTo, true);
    return;
  }

  if (!audio.duration) return;

  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

export const getCurrentIndex = () => currentIndex;

export const attachYTPlayer = (ytPlayer, meta = {}) => {
  if (isPlayerDestroyed) return;

  currentYTPlayer = ytPlayer;
  isVideoMode = true;

  titleEl.textContent = meta.title || "";
  artistEl.textContent = "Video";
  thumbEl.src = meta.thumbnails?.[0] || "";

  const videoId = ytPlayer.getVideoData?.().video_id;

  if (attachedVideoId === videoId) return;

  attachedVideoId = videoId;

  audio.pause();
  audio.currentTime = 0;
  // audio.src = "";

  currentSong = null;
  hasLoggedPlay = false;

  isPlaying = true;
  updatePlayIcon();

  player.classList.remove(
    "translate-y-full",
    "opacity-0",
    "invisible",
    "pointer-events-none"
  );

  if (ytProgressTimer) clearInterval(ytProgressTimer);

  ytProgressTimer = setInterval(() => {
    const duration = ytPlayer.getDuration?.() || 0;
    const current = ytPlayer.getCurrentTime?.() || 0;

    if (duration > 0) {
      const percent = (current / duration) * 100;
      progress.value = percent;
      progressBar.style.width = `${percent}%`;
      progressDot.style.left = `${percent}%`;
    }

    currentTimeEl.textContent = formatTime(current);
    totalTimeEl.textContent = formatTime(duration);
  }, 500);
};

// export const detachYTPlayer = () => {
//   isVideoMode = false;
//   currentYTPlayer = null;
//   // onVideoPlayCallback = null;
//   if (ytProgressTimer) {
//     clearInterval(ytProgressTimer);
//     ytProgressTimer = null;
//   }
// };

// export const detachYTPlayer = () => {
//   isVideoMode = false;

//   if (ytProgressTimer) {
//     clearInterval(ytProgressTimer);
//     ytProgressTimer = null;
//   }

//   if (currentYTPlayer) {
//     try {
//       currentYTPlayer.stopVideo();
//       // currentYTPlayer.destroy();
//     } catch (e) {}
//   }

//   currentYTPlayer = null;
//   attachedVideoId = null;

//   destroyMiniPlayer();
// };

export const detachYTPlayer = (destroy = true) => {
  isVideoMode = false;

  if (ytProgressTimer) {
    clearInterval(ytProgressTimer);
    ytProgressTimer = null;
  }

  if (destroy && currentYTPlayer) {
    try {
      currentYTPlayer.stopVideo(); // chỉ khi destroy = true mới stop
    } catch (e) {}
  }

  // không reset currentYTPlayer nếu chỉ chuyển sang mini
  if (destroy) {
    currentYTPlayer = null;
    attachedVideoId = null;
  }

  if (destroy) destroyMiniPlayer();
};

export const setOnVideoPlayCallback = (callback) => {
  onVideoPlayCallback = callback;
};

const formatTime = (seconds = 0) => {
  if (!seconds || isNaN(seconds)) return "0:00";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  }

  return `${m}:${s.toString().padStart(2, "0")}`;
};

export const setYTPlayer = (player) => {
  ytPlayer = player;
};

export const getYTPlayer = () => ytPlayer;

export const hasActiveVideo = () => !!ytPlayer;

// cờ đóng video khong hiện lại
export const markPlayerDestroyed = () => {
  isPlayerDestroyed = true;
};

export const resetPlayerDestroyed = () => {
  isPlayerDestroyed = false;
};

export const isDestroyed = () => isPlayerDestroyed;

// dấu x ở thanh bar quay về trang trước
let isInVideoDetail = false;

export const setInVideoDetail = (val) => {
  isInVideoDetail = val;
};

export const getInVideoDetail = () => isInVideoDetail;


// đóng nhạc
closePlayerBtn.addEventListener("click", () => {
  const inDetail = getInVideoDetail();
  // stop audio
  audio.pause();
  audio.currentTime = 0;

  // destroy YT
  const yt = getYTPlayer();
  if (yt) {
    yt.stopVideo();
    yt.destroy();
    setYTPlayer(null);
  }

  detachYTPlayer();
  markPlayerDestroyed();

  // reset state
  isPlaying = false;
  currentSong = null;
  playQueue = [];
  currentIndex = -1;

  // ẩn UI
  player.classList.add(
    "translate-y-full",
    "opacity-0",
    "invisible",
    "pointer-events-none"
  );

  //nếu đang ở video detail → back
  if (inDetail && window.history.length > 1) {
    setInVideoDetail(false);
    window.history.back();
  }
});
