import Header from "../../components/Header.js";
import Sidebar from "../../components/Sidebar.js";

export default function explore() {
  return `
            ${Header()}
               <div class="flex">
                 ${Sidebar()}
                 <main class="flex-1 pt-[100px] ml-[72px] text-white">
                    <div class="app-container px-6">
                       <div class="flex justify-between gap-6">
                        <!-- Bản phát hành mới -->
                        <a href="/explore/new-releases"
                            class="flex items-center  gap-3
                                px-6 py-4 w-[400px]
                                rounded-2xl
                                bg-white/10 hover:bg-white/15
                                text-white font-medium
                                backdrop-blur h-[60px]
                                transition cursor-pointer"
                        >
                            <span
                            class="w-9 h-9 flex items-center justify-center
                                    rounded-full bg-white/15"
                            >
                            <i class="fa-solid fa-compact-disc"></i>
                            </span>
                            <span class="text-lg">Bản phát hành mới</span>
                        </a>

                        <!-- Bảng xếp hạng -->
                        <a href="/explore/charts"
                            class="flex items-center gap-3
                                px-6 py-4 w-[400px]
                                rounded-2xl
                                bg-white/10 hover:bg-white/15
                                text-white font-medium
                                backdrop-blur h-[60px]
                                transition cursor-pointer"
                        >
                            <span
                            class="w-9 h-9 flex items-center justify-center
                                    rounded-full bg-white/15"
                            >
                            <i class="fa-solid fa-chart-simple"></i>
                            </span>
                            <span class="text-lg">Bảng xếp hạng</span>
                        </a>

                        <!-- Tâm trạng & thể loại -->
                        <a href="/explore/mood-and-genres"
                            class="flex items-center gap-3
                                px-6 py-4 w-[400px]
                                rounded-2xl
                                bg-white/10 hover:bg-white/15
                                text-white font-medium
                                backdrop-blur h-[60px]
                                transition cursor-pointer"
                        >
                            <span
                            class="w-9 h-9 flex items-center justify-center
                                    rounded-full bg-white/15"
                            >
                            <i class="fa-regular fa-face-smile"></i>
                            </span>
                            <span class="text-lg">Tâm trạng và thể loại</span>
                        </a>
                        </div>

                        <!--new albums-->
                        <section class = "mb-10 mt-10">
                            <div class="flex items-center justify-between mb-4">
                            <h2 class="text-3xl font-bold">New Album</h2>

                            <div class="flex gap-5">
                                <button id="albumPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                                <button id="albumNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            </div>

                            <div
                            id="albumsNew"
                            class="flex gap-4 overflow-x-auto scroll-smooth pb-4 custom-scrollbar"
                            >
                            <p class="text-neutral-400">Đang tải...</p>
                            </div>
                        </section>

                        <!--List mood-->
                         <section class = "mb-10 mt-10">
                            <div class="flex items-center justify-between mb-4">
                            <h2 class="text-3xl font-bold">Mood & genres</h2>

                            <div class="flex gap-5">
                                <button id="todayPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                                <button id="todayNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            </div>

                            <div
                            id="moodList"
                            class=" grid grid-flow-col
                                    grid-rows-4
                                    gap-4
                                    overflow-x-auto scroll-smooth
                                    pb-4
                                    custom-scrollbar"
                            >
                            <p class="text-neutral-400">Đang tải...</p>
                            </div>
                        </section>

                        <!--new video-->
                        <section class = "mb-10 mt-10">
                            <div class="flex items-center justify-between mb-4">
                            <h2 class="text-3xl font-bold">New music video</h2>

                            <div class="flex gap-5">
                                <button id="videoPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                                <button id="videoNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            </div>

                            <div
                            id="videoNew"
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
