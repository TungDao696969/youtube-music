export default function chartArtistCard (artist) {
  const { rank, name, totalViews, trend } = artist;
  let arrow = "";
  if (trend) {
    if (trend === "up") {
      arrow = `<span class="text-green-400 text-sm">▲</span>`;
    } else if (trend === "down") {
      arrow = `<span class="text-red-400 text-sm">▼</span>`;
    }
  }
  
   return `
    <div class="flex items-center gap-6 py-3">
      <!-- Rank -->
      <div class="w-6 text-2xl font-bold text-white">
        ${rank}
      </div>

      <!-- Arrow -->
      <div class="w-4">
        ${arrow}
      </div>

      <!-- Info -->
      <div>
        <p class="text-white font-semibold">${name}</p>
        <p class="text-neutral-400 text-sm">
          ${formatViews(totalViews)} views
        </p>
      </div>
    </div>
  `;
};

const formatViews = (num = 0) => {
  if (num >= 1000000)
    return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000)
    return (num / 1000).toFixed(1) + "K";
  return num;
};