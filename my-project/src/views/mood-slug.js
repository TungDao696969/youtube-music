import Header from "../components/Header.js";
import Sidebar from "../components/Sidebar.js";

export default function moodSlug() {
  return `
        ${Header()}
           <div class="flex">
             ${Sidebar()}
             <main class="flex-1 pt-[100px] ml-[72px] text-white">
                <div class="app-container px-6">
                    <!-- Tags -->
                    <div id="listMoots" class="flex gap-3 mt-6 mb-8"></div>

                     <section class = "mb-10">
                        <div id="mood-slug" class="space-y-4"></div>
                    </section>
                    
                     <section class = "mb-10">
                        <h2 class = "text-white text-4xl font-bold mb-6">Quick pick</h2>
                        <div id="quickPicks" class="space-y-4"></div>
                    </section>

                    <section class = "mb-10">
                    <div class="flex items-center justify-between mb-4">
                      <h2 class="text-3xl font-bold">Featured</h2>

                      <div class="flex gap-5">
                        <button id="albumPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                        <button id="albumNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                      </div>
                    </div>

                    <div
                      id="featured"
                      class="flex gap-4 overflow-x-auto scroll-smooth pb-4 custom-scrollbar"
                    >
                      <p class="text-neutral-400">Đang tải...</p>
                    </div>
                  </section>

                  <section class = "mb-10">
                    <div class="flex items-center justify-between mb-4">
                      <h2 class="text-3xl font-bold">More picks</h2>

                      <div class="flex gap-5">
                        <button id="morepicksPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                        <button id="morepicksNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                      </div>
                    </div>

                    <div
                      id="morepicks"
                      class="flex gap-4 overflow-x-auto scroll-smooth pb-4 custom-scrollbar"
                    >
                      <p class="text-neutral-400">Đang tải...</p>
                    </div>
                  </section>
                </div>
             </main>
           </div>
    `;
}
