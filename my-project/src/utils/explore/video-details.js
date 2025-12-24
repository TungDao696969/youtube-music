import { getVideoDetail } from "../../services/api";
import { playMiniVideo } from "./miniYtb-logic";
let currentTracks = [];
export const initVideoDetails = async (id) => {
  const container = document.getElementById("videoDetails");

  try {
    const video = await getVideoDetail(id);
    playMiniVideo(video.videoId);
    const related = Array.isArray(video.related) ? video.related : [];

    currentTracks = [video, ...related];

    container.innerHTML = `
            <section class="flex gap-10 px-10 py-10">

                <!-- LEFT-->
                <div class="flex-1">
                <div class="aspect-video bg-black rounded-xl overflow-hidden mb-4">
                    <iframe
                    id="mainVideoPlayer"
                    class="w-full h-full"
                    src="https://www.youtube.com/embed/${
                      video.videoId
                    }?autoplay=1"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                    ></iframe>
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
        `;
      
      // playVideo(id);

      container.addEventListener("click", (e) => {
      const row = e.target.closest(".video-row");
      if (!row) return;

      const videoId = row.dataset.videoId;
      const index = Number(row.dataset.index);
      playVideoByIndex(index);
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

const playVideoByIndex = (index) => {
  const video = currentTracks[index];
  if (!video) return;

  const iframe = document.getElementById("mainVideoPlayer");
  const title = document.getElementById("videoTitle");
  const duration = document.getElementById("videoDuration");

  iframe.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1`;
  title.textContent = video.title;
  duration.textContent = `Thời lượng: ${formatDuration(video.duration)}`;
  playMiniVideo(video.videoId);
  highlightPlayingVideo(index);
};

const highlightPlayingVideo = (index) => {
  document.querySelectorAll(".video-row").forEach((row, i) => {
    if (Number(row.dataset.index) === index) {
      row.classList.add("bg-white/10");
    } else {
      row.classList.remove("bg-white/10");
    }
  });
};

const formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h} giờ ${m} phút` : `${m} phút`;
};
