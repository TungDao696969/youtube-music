import { getPlayListDetail } from "../services/api";
import { navigate } from "../routers/router";
export const initPlayListDetails = async (slug) => {
  const container = document.getElementById("playListDetails");

  container.innerHTML = `
         <div class="px-10 py-8 text-white">
            <p class="text-neutral-400">Đang tải play list...</p>
        </div>
    `;

  try {
    const playListDetail = await getPlayListDetail(slug);

    container.innerHTML = `
        <div class="flex justify-center">
            <section class="flex gap-12 px-10 py-10">
                <!-- LEFT -->
                <div class="w-[400px] flex-shrink-0 text-center">
                <img
                    src="${playListDetail.thumbnails?.[0]}"
                    class="w-full rounded-xl shadow-lg mb-6"
                />

                <h1 class="text-2xl font-bold mb-3">
                    ${playListDetail.title}
                </h1>

                <p class="text-neutral-400 text-sm mb-2">
                    ${playListDetail.songCount} bài hát • ${formatTotalDuration(
                    playListDetail.duration
                    )}
                </p>

                <p class="text-neutral-400 text-sm">
                   Các nghệ sĩ ${playListDetail.artists}
                </p>

                </div>

                <div class="flex-1 ">
                <div class="flex flex-col gap-2 w-[500px]">
                    ${playListDetail.tracks
                      .map(
                        (track, index) => `
                    <div
                        class="group flex items-center gap-4 px-4 py-3 rounded-lg
                            hover:bg-white/5 cursor-pointer transition"
                        data-id="${track.id}"
                        data-audio="${track.audioUrl}"
                    >
                        <span class="w-6 text-neutral-400 text-sm">
                        ${index + 1}
                        </span>
                        <div class="relative">
                             <img
                            src="${track.thumbnails?.[0]}"
                            class="w-10 h-10 rounded"
                            />
                             <!-- OVERLAY -->
                            <div
                                class="absolute inset-0 bg-black/40
                                        opacity-0 group-hover:opacity-100
                                        transition flex items-center justify-center"
                                >
                                <!-- PLAY ICON -->
                                <div
                                    class="w-12 h-12 rounded-full
                                        flex items-center justify-center
                                        shadow-lg"
                                >
                                <i class="fa-solid fa-play text-xl"></i>
                                </div>
                            </div>
                        </div>
                       
                        <div class="flex-1">
                        <p class="font-medium">
                            ${track.title}
                        </p>
                        </div>

                        <span class="text-neutral-400 text-sm">
                        ${formatDuration(track.duration)}
                        </span>
                    </div>
                    `
                      )
                      .join("")}
                </div>
                </div>
            </section>
        </div>
        `;

    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-id]");
      if (!card) return;

      navigate(`/songs/details/${card.dataset.id}`);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = `
        <p class="text-red-500 px-10">
            Không thể tải album
        </p>
        `;
  }
};

const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};
const formatTotalDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h} giờ ${m} phút`;
};
