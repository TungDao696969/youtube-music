import Header from "../../components/Header.js";
import Sidebar from "../../components/Sidebar.js";

export default function moodGenres () {
    return `
            ${Header()}
               <div class="flex">
                 ${Sidebar()}
                 <main class="flex-1 pt-[100px] ml-[72px] text-white">
                    <div class="app-container px-6">
                       <!--List mood-->
                         <section class = "mb-10 mt-10">
                            <div class="flex items-center justify-between mb-4">
                            <h2 class="text-3xl font-bold">Tâm trạng và thể loại</h2>

                            <div class="flex gap-5">
                                <button id="moodPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                                <button id="moodNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            </div>

                            <div
                            id="moodGenresList"
                            class=" grid grid-flow-col
                                    grid-rows-3
                                    gap-4
                                    overflow-x-auto scroll-smooth
                                    pb-4
                                    custom-scrollbar"
                            >
                            <p class="text-neutral-400">Đang tải...</p>
                            </div>
                        </section>

                         <!--List lines-->
                         <section class = "mb-10 mt-10">
                            <div class="flex items-center justify-between mb-4">
                            <h2 class="text-3xl font-bold">Thể loại</h2>

                            <div class="flex gap-5">
                                <button id="linePrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                                <button id="lineNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            </div>

                            <div
                            id="moodLines"
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
                    </div>
                 </main>
               </div>
        `;
}