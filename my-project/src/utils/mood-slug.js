import { getMoodSlug } from "../services/api";
import { navigate } from "../routers/router";
import AlbumCard from "../components/Home/AlbumCard";
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
      <div id="modSlug" class="flex items-center justify-between mb-4">
              <h2 class="text-3xl font-bold">${title}</h2>

              <div class="flex gap-5">
                <button id="moodPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                <button id="moodNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
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
                  data-slug="${item.slug}"
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
                        transition flex items-center justify-center pointer-events-none"
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
       
    `;

    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-play-card]");
      if (!card) return;

      const slug = card.dataset.slug;
      navigate(`/playlists/details/${slug}`);
    });
  } catch (error) {
    console.log(error);
    container.innerHTML = `
        <p class="text-red-500">Không thể tải mood chi tiết</p>
    `;
  }
};

export const featuredForyou = async (slug) => {
  const container = document.getElementById("featured");

  if (!container) return;

  try {
    const data = await getMoodSlug(slug);
    const featuredSection = data.sections?.find(
      (section) => section.id === "featured"
    );

    const items = featuredSection?.items || [];

    container.innerHTML = items.map(AlbumCard).join("");

    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;

      const slug = card.dataset.slug;
      navigate(`/playlists/details/${slug}`);
    });
  } catch (error) {
    console.log(error);
    listMoots.innerHTML = `
      <p class="text-red-500">
        Không thể tải mood
      </p>
    `;
  }
};

export const morePicks = async (slug) => {
  const container = document.getElementById("morepicks");

  if (!container) return;

  try {
    const data = await getMoodSlug(slug);

     const moreSection = data.sections?.find(
      (section) => section.id === "more"
    );

    const items = moreSection?.items || [];

    container.innerHTML = items.map(AlbumCard).join("");
    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;

      const slug = card.dataset.slug;
      navigate(`/playlists/details/${slug}`);
    });
  } catch (error) {
    console.log(error);
    listMoots.innerHTML = `
      <p class="text-red-500">
        Không thể tải mood
      </p>
    `;
  }
};