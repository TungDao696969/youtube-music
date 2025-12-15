export default function TodayHitCard(album) {
  const image =
    album.thumbnailUrl || album.thumbnail || album.thumbnails?.[0] || "";

  return `
    <div 
      class="group cursor-pointer flex-shrink-0 w-[200px]"
      data-slug="${album.slug}"
    >
      <!-- IMAGE -->
      <div class="w-full aspect-square overflow-hidden rounded-lg bg-neutral-800">
        <img
          src="${image}"
          alt="${album.title}"
          loading="lazy"
          class="w-full h-full object-cover
                 group-hover:scale-105 transition"
        />
      </div>

      <!-- TITLE -->
      <h3 class="mt-2 text-base font-semibold line-clamp-2">
        ${album.title}
      </h3>

      <!-- ARTIST -->
      <p class="text-sm text-neutral-400 truncate">
        ${album.artists}
      </p>
    </div>
  `;
}
