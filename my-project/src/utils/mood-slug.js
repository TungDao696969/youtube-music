import { getMoodSlug } from "../services/api";
export const moodSlugDetail = async (slug) => {
  const container = document.querySelector("#mood-slug");

  if (!container) return;

  container.innerHTML = `<p class="text-neutral-400">Đang tải...</p>`;

  try {
    const data = await getMoodSlug(slug);
    const title = data.hero?.title || data.name || "";
    const sections = data.sections || [];
    const items = sections.flatMap((s) => s.items || []);

    if (!items.length) {
      container.innerHTML = `
        <p class="text-neutral-400">Chưa có mục nào trong danh mục này.</p>
      `;
      return;
    }

    container.innerHTML = `
      <section class=" pt-6">
      <div class="flex items-center justify-between mb-4">
              <h2 class="text-3xl font-bold">${title}</h2>

              <div class="flex gap-5">
                <button id="albumPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                <button id="albumNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
              </div>
            </div>

        <div class="grid
            grid-flow-col
            grid-rows-4 
            auto-cols-[320px]
            gap-3
            overflow-x-auto
            pb-2 custom-scrollbar">
          ${items
            .map((item) => {
              const image =
                item.thumbnailUrl ||
                item.thumbnail ||
                item.thumbnails?.[0] ||
                "";

              return `
                <div
                  class="group w-full cursor-pointer flex items-center gap-3
                         p-3 rounded-lg hover:bg-white/5 transition"
                  data-play-card="true"
                  data-playlist-id="${item._id || item.slug || ""}"
                >
                  <div class="relative">
                    <img
                      src="${image}"
                      alt="${item.title}"
                      class="w-14 h-14 rounded object-cover flex-shrink-0"
                    />

                    <!-- OVERLAY -->
                    <div
                      class="absolute inset-0 bg-black/40
                        opacity-0 group-hover:opacity-100
                        transition flex items-center justify-center"
                    >
                      <div
                        class="w-10 h-10 rounded-full
                                flex items-center justify-center"
                      >
                        <i class="fa-solid fa-play text-xl"></i>
                      </div>
                    </div>
                  </div>

                  <div class="flex-1">
                    <h4 class="text-base font-semibold line-clamp-1">
                      ${item.title}
                    </h4>

                    <div class="flex gap-2 text-sm text-gray-400">
                      <span class="line-clamp-1">
                        ${item.artists?.join?.(", ") || "Various Artists"}
                      </span>
                      <span>•</span>
                      <span>${item.popularity} lượt nghe</span>
                    </div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  } catch (error) {
    console.log(error);
    container.innerHTML = `
        <p class="text-red-500">Không thể tải mood chi tiết</p>
    `;
  }
};
