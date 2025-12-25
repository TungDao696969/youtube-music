import { getVideoDetail } from "../../services/api";
// import { playMiniVideo, stopAndHideMiniPlayer } from "./miniYtb-logic";
import {
  attachYTPlayer,
  detachYTPlayer,
  setPlayQueue,
  setOnVideoPlayCallback,
  playVideo,
} from "../player-logic.js";
import {
  showMiniPlayer,
  attachYTToMain,
  attachYTToMini,
} from "./miniYtb-logic";
import { getYTPlayer, setYTPlayer } from "../player-logic.js";
let currentTracks = [];

const loadYouTubeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve();

    const existing = document.getElementById("yt-iframe-api");
    if (existing) {
      const check = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(check);
          resolve();
        }
      }, 100);
      return;
    }

    const tag = document.createElement("script");
    tag.id = "yt-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => resolve();
  });
};

export const initVideoDetails = async (id) => {
  const container = document.getElementById("videoDetails");

  try {
    const video = await getVideoDetail(id);
    // playMiniVideo(video.videoId);
    const related = Array.isArray(video.related) ? video.related : [];

    currentTracks = [video, ...related];

    container.innerHTML = `
            <section class="flex gap-10 px-10 py-10">

                <!-- LEFT-->
                <div class="flex-1">
                <div class="aspect-video bg-black rounded-xl overflow-hidden mb-4">
                    <div id="mainVideoPlayer" class="w-full h-full"></div>
                </div>

                <h1 id="videoTitle" class="text-2xl font-bold mb-2">
                    ${video.title}
                </h1>

                <p id="videoDuration" class="text-neutral-400 text-sm">
                    Thời lượng: ${formatDuration(video.duration)}
                </p>
                </div>

                <!-- RIGHT -->
                <div class="w-[420px] flex flex-col gap-4">
                    <h2 class="text-xl border-b font-semibold text-white">
                       Danh sách video liên quan
                    </h2>
                <div class="flex flex-col gap-3">
                ${related
                  .map(
                    (item, index) => `
                    
                    <div
                        class="video-row group flex gap-3 cursor-pointer rounded-lg
                            hover:bg-white/5 p-2 transition"
                        data-index="${index + 1}"
                        data-video-id="${item.videoId}"
                    >
                        <img
                        src="${item.thumbnails?.[0] || ""}"
                        class="w-32 aspect-video rounded"
                        />

                        <div class="flex-1">
                        <p class="font-medium line-clamp-2">
                            ${item.title}
                        </p>
                        <p class="text-sm text-neutral-400 mt-1">
                            ${formatDuration(item.duration)}
                        </p>
                        </div>
                    </div>
                    `
                  )
                  .join("")}
                </div>
                </div>
            </section>

            <button id="closeVideoBtn" 
                class="absolute top-20 right-5 z-50 bg-gray-600 cursor-pointer text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

    const closeBtn = document.getElementById("closeVideoBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        const container = document.getElementById("videoDetails");
        if (!container) return;

        container.classList.add("hidden");
        showMiniPlayer();

        const player = getYTPlayer();
        if (player) {
          attachYTToMini(player);
        }

        if (window.history && window.history.length > 1) {
          window.history.back();
        }
      });
    }
    // playVideo(id);
    container.addEventListener("click", (e) => {
      const row = e.target.closest(".video-row");
      if (!row) return;

      const index = Number(row.dataset.index);
      playVideoByIndex(index);
    });

    setPlayQueue(currentTracks, 0);

    setOnVideoPlayCallback((index, video) => {
      const title = document.getElementById("videoTitle");
      const duration = document.getElementById("videoDuration");

      if (title) title.textContent = video.title;
      if (duration)
        duration.textContent = `Thời lượng: ${formatDuration(video.duration)}`;
      highlightPlayingVideo(index);
    });

    highlightPlayingVideo(0);

    await loadYouTubeAPI();
    createOrLoadPlayer(video.videoId, {
      title: video.title,
      thumbnails: video.thumbnails || [],
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <p class="text-red-500 px-10">
        Không thể tải video
      </p>
    `;
  }
};

export const cleanupVideoDetails = () => {
  setOnVideoPlayCallback(null);
};

const playVideoByIndex = (index) => {
  const video = currentTracks[index];
  if (!video) return;

  setPlayQueue(currentTracks, index);

  let player = getYTPlayer();

  if (player) {
    playVideo(video);
  } else {
    createOrLoadPlayer(video.videoId, {
      title: video.title,
      thumbnails: video.thumbnails || [],
    });
  }
};

const highlightPlayingVideo = (index) => {
  document.querySelectorAll(".video-row").forEach((row) => {
    row.classList.toggle("bg-white/10", Number(row.dataset.index) === index);
  });
};

export const formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h} giờ ${m} phút` : `${m} phút`;
};

const createOrLoadPlayer = (videoId, meta = {}) => {
  const container = document.getElementById("mainVideoPlayer");
  if (!container) return;

  const player = getYTPlayer();

  if (player) {
    attachYTToMain(player);
    // attachYTPlayer(player, meta);
    return;
  }

  // chưa có → tạo mới
  const newPlayer = new YT.Player("mainVideoPlayer", {
    videoId,
    playerVars: { autoplay: 1, controls: 0 },
    events: {
      onReady: () => {
        setYTPlayer(newPlayer);
        attachYTPlayer(newPlayer, meta);
      },
    },
  });
};
