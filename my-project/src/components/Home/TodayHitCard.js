export default function TodayHitCard(album) {
  const image =
    album.thumbnailUrl || album.thumbnail || album.thumbnails?.[0] || "";
  const title = album.title || album.name || "";

  let artists = "";
  if (Array.isArray(album.artists)) {
    artists = album.artists
      .map((a) => (typeof a === "string" ? a : a.name || ""))
      .filter(Boolean)
      .join(", ");
  } else if (typeof album.artists === "string") {
    artists = album.artists;
  } else if (Array.isArray(album.singers)) {
    artists = album.singers.map((s) => s.name || s).join(", ");
  } else {
    artists = album.artist || album.singer || "";
  }

  return `
    <div 
      class="group cursor-pointer flex-shrink-0 w-[200px]"
      data-slug="${album.slug}"
    >
      <!-- IMAGE -->
      <div class="relative w-full aspect-square overflow-hidden rounded-lg bg-neutral-800">
        <img
          src="${image}"
          alt="${title}"
          loading="lazy"
          class="w-full h-full object-cover
                 group-hover:scale-105 transition"
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
           <i class="fa-solid fa-play text-3xl"></i>
          </div>
        </div>
      </div>

      <!-- TITLE -->
      <h3 class="mt-2 text-base font-semibold line-clamp-2">
        ${title}
      </h3>

      <!-- ARTIST -->
      <p class="text-sm text-neutral-400 truncate">
        ${artists}
      </p>
    </div>
  `;
}
