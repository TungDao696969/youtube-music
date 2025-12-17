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
let isPlaying = false;

export const playSong = ({
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

progress.addEventListener("input", () => {
  if (!audio.duration) return;

  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

const formatTime = (sec) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};
