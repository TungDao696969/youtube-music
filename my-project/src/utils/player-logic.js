import { logPlayEvent } from "../services/api";
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

let isPlaying = false;
let playQueue = [];
let currentIndex = -1;

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

  if (id) {
    try {
      await logPlayEvent({ songId: id });
    } catch (err) {
      console.warn("Không lưu được lịch sử nghe", err);
    }
  }

  document.dispatchEvent(
    new CustomEvent("songchange", {
      detail: {
        index: currentIndex,
        isPlaying,
      },
    })
  );

  document.addEventListener("songchange", (e) => {
    highlightPlayingSong(e.detail.index);
  });
};

// pause
playBtn.addEventListener("click", () => {
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

// next song
btnNext.addEventListener("click", () => {
  if (!playQueue.length) return;

  currentIndex++;
  if (currentIndex >= playQueue.length) {
    currentIndex = 0;
  }

  playSong(playQueue[currentIndex]);
});

// prev song
btnPrev.addEventListener("click", () => {
  if (!playQueue.length) return;

  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = playQueue.length - 1;
  }

  playSong(playQueue[currentIndex]);
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
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;

  progress.value = percent;
  progressBar.style.width = `${percent}%`;
  progressDot.style.left = `${percent}%`;

  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// hết bài tự next bài tiếp theo
audio.addEventListener("ended", () => {
  if (!playQueue.length) return;

  currentIndex++;

  if (currentIndex >= playQueue.length) {
    currentIndex = 0;
  }

  playSong(playQueue[currentIndex]);
});

progress.addEventListener("input", () => {
  if (!audio.duration) return;

  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

export const getCurrentIndex = () => currentIndex;

const formatTime = (sec) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};
