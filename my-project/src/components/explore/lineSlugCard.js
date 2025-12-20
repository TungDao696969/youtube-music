export default function lineSlugCard(item) {
  return `
        <div class="quick-pick-item group cursor-pointer w-[300px] p-3 rounded-lg flex gap-2 hover:bg-white/5 transition" data-slug="${item.slug}">
            <div class ="relative">
            <img src="${item.thumb}" alt="${item.name}" class="w-14 h-14 rounded object-cover flex-shrink-0" />
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
                <i class="fa-solid fa-play text-2xl"></i>
                </div>
            </div>
        </div>
            <div>
                <h4 class="mt-2 text-lg font-semibold line-clamp-1">${item.name}</h4>
                <div class = "flex gap-2">
                    <p class="text-sm text-gray-400 line-clamp-1">${item.albumName} -</p>
                    <p class="text-sm text-gray-400 line-clamp-1">${item.views} lượt nghe</p>
                </div>
            </div>
        </div>
    `;
}
