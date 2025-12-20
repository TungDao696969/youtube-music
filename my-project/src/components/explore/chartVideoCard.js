export default function chartVideoCard(video) {
  return `
    <div
      class="group cursor-pointer w-[260px] flex-shrink-0"
      data-slug="${video.slug}"
      data-video-id="${video.videoId}"
    >
      <!-- THUMB -->
      <div class="relative aspect-video rounded-lg overflow-hidden bg-neutral-800">
        <img
          src="${video.thumb}"
          alt="${video.name}"
          loading="lazy"
          class="w-full h-full object-cover
                 group-hover:scale-105 transition"
        />

        <!-- PLAY ICON -->
        <div
          class="absolute inset-0 bg-black/40
                 opacity-0 group-hover:opacity-100
                 transition flex items-center justify-center"
        >
          <div
            class="w-14 h-14 rounded-full
                   flex items-center justify-center"
          >
            <i class="fa-solid fa-play text-white text-xl"></i>
          </div>
        </div>
      </div>

      <!-- TITLE -->
      <h3 class="mt-2 font-semibold line-clamp-2">
        ${video.title}
      </h3>

      <!-- VIEWS -->
      <p class="text-sm text-neutral-400">
        ${formatViews(video.views)} lượt xem
      </p>
    </div>
  `;
}

const formatViews = (views = 0) => {
  if (views >= 1000000)
    return (views / 1000000).toFixed(1) + "M";
  if (views >= 1000)
    return (views / 1000).toFixed(1) + "K";
  return views;
};
