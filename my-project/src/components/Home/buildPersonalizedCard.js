export const buildPersonalizedCard = (item = {}) => {
  const image =
    item.thumbnailUrl || item.thumbnail || item.thumbnails?.[0] || "";
 

  return `
  
    <div
      class="group w-[300px] cursor-pointer flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition"
      data-personalized-card
      data-type="${item.type}"
      data-slug="${item.slug || ""}"
      data-id="${item.id || ""}"
      data-song-id="${item.songId || ""}"
    >
    
      <div class="quick-pick-item cursor-pointer flex gap-2">
      <div class ="relative">
      
            <img src="${image}" alt="${item.title}" class="w-14 h-14 rounded object-cover flex-shrink-0" />
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
                <h4 class="mt-2 text-lg font-semibold line-clamp-1">${item.title}</h4>
                <div class = "flex gap-2">
                    <p class="text-sm text-gray-400 line-clamp-1">${item.artists} -</p>
                    <p class="text-sm text-gray-400 line-clamp-1">${item.popularity} lượt nghe</p>
                </div>
            </div>
        </div>
    </div>
  `;
};