export default function newAlbumCard(album) {
  return `
    <div 
      class="group cursor-pointer flex-shrink-0 w-[200px]" 
      data-slug="${album.slug}"
    >
      <!-- IMAGE -->
      <div class="relative w-full aspect-square overflow-hidden rounded-lg bg-neutral-800">
        <img
          src="${album.thumb}"
          alt="${album.name}"
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
          <div
            class="w-12 h-12 rounded-full
                   flex items-center justify-center
                   shadow-lg"
          >
            <i class="fa-solid fa-play text-3xl"></i>
          </div>
        </div>
      </div>

      <!-- NAME -->
      <h3 class="mt-2 text-base font-semibold line-clamp-2">
        ${album.name}
      </h3>

      <!-- TYPE -->
      <p class="text-sm text-neutral-400">
        ${album.albumType || album.artists}
      </p>
    </div>
  `;
}
