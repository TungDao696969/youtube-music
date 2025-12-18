export const MoodCard = (mood) => {
  return `
    <div 
      data-slug="${mood.slug}"
      class="relative cursor-pointer overflow-hidden rounded-xl
             bg-neutral-800 hover:bg-neutral-700 transition w-[300px] h-[50px] flex items-center"
    >
      <!-- LEFT COLOR BAR -->
      <div 
        class="absolute left-0 top-0 h-full w-2"
        style="background-color: ${mood.color}"
      ></div>

      <!-- CONTENT -->
      <div class="pl-6 pr-4 py-4">
        <h3 class="text-white text-sm font-semibold">
          ${mood.name}
        </h3>
      </div>
    </div>
  `;
};
