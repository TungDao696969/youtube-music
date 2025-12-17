import { getSongDetail } from "../services/api";
import { playSong } from "./player-logic";
export const initSongDetails = async (id) => {
  const container = document.getElementById("songDetails");
  container.innerHTML = `
    <p class="px-10 py-10 text-neutral-400">Đang tải bài hát...</p>
  `;

  try {
    const song = await getSongDetail(id);

    // ✅ tracks nằm trong album.tracks
    const tracks = Array.isArray(song.album?.tracks) ? song.album.tracks : [];

    container.innerHTML = `
      <div class="flex justify-center">
        <section class="flex gap-12 px-10 py-10">

          <!-- LEFT -->
          <div class="w-[400px] flex-shrink-0 text-center">
            <img
              src="${song.thumbnails?.[0] || ""}"
              class="w-full rounded-xl shadow-lg mb-6"
            />

            <h1 class="text-2xl font-bold mb-3">
              ${song.title}
            </h1>

            <p class="text-neutral-400 text-sm mb-2">
              Thời lượng: ${formatDuration(song.duration)}
            </p>

            <p class="text-neutral-400 text-sm">
              Album: ${song.album?.album?.title || "Không rõ"}
            </p>
          </div>

          <!-- RIGHT -->
          <div class="flex-1">
            <div class="flex flex-col gap-2 w-[500px]">
              ${tracks
                .map(
                  (track, index) => `
                  <div
                    class="group flex items-center gap-4 px-4 py-3 rounded-lg
                           hover:bg-white/5 cursor-pointer transition"
                    data-song-id="${track.id}"
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
      const row = e.target.closest("[data-song-id]");
      if (!row) return;

      const title = row.querySelector(".font-medium")?.textContent?.trim();

      playSong({
        title,
        audioUrl: row.dataset.audio,
        thumbnails: [row.querySelector("img")?.src],
      });
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <p class="text-red-500 px-10">
        Không thể tải song
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
