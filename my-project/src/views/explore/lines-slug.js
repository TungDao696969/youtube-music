import Header from "../../components/Header.js";
import Sidebar from "../../components/Sidebar.js";

export default function linesSlug() {
  return `
            ${Header()}
               <div class="flex">
                 ${Sidebar()}
                 <main class="flex-1 pt-[120px] ml-[72px] text-white">
                    <div class="app-container px-6">
                        <section class="mb-10 mt-10">
                        <!-- TITLE -->
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-3xl font-bold">Songs</h2>

                            <div class="flex gap-5">
                                <button id="albumPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                                <button id="albumNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            </div>
                        <!-- SCROLL ROW -->
                        <div
                            id="linesSlug"
                            class="grid grid-flow-col
                                    grid-rows-3 gap-4 overflow-x-auto scroll-smooth pb-4 custom-scrollbar"
                        >
                            <p class="text-neutral-400">Đang tải...</p>
                        </div>
                        </section>

                        <!--playlists nổi bật-->
                        <section class = "mb-10 mt-10">
                            <div class="flex items-center justify-between mb-4">
                            <h2 class="text-3xl font-bold">Playlist</h2>

                            <div class="flex gap-5">
                                <button id="albumPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                                <button id="albumNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            </div>

                            <div
                            id="linesPlaylist"
                            class="flex gap-4 overflow-x-auto scroll-smooth pb-4 custom-scrollbar"
                            >
                            <p class="text-neutral-400">Đang tải...</p>
                            </div>
                        </section>

                        <!--album theo dòng-->
                        <section class = "mb-10 mt-10">
                            <div class="flex items-center justify-between mb-4">
                            <h2 class="text-3xl font-bold">Album theo dòng</h2>

                            <div class="flex gap-5">
                                <button id="albumPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                                <button id="albumNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            </div>

                            <div
                            id="linesAlbum"
                            class="flex gap-4 overflow-x-auto scroll-smooth pb-4 custom-scrollbar"
                            >
                            <p class="text-neutral-400">Đang tải...</p>
                            </div>
                        </section>

                        <!--video theo dòng-->
                        <section class = "mb-10 mt-10">
                            <div class="flex items-center justify-between mb-4">
                            <h2 class="text-3xl font-bold">Video theo dòng</h2>

                            <div class="flex gap-5">
                                <button id="albumPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                                <button id="albumNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            </div>

                            <div
                            id="linesVideo"
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
