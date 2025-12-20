import Header from "../../components/Header.js";
import Sidebar from "../../components/Sidebar.js";

export default function newReleases () {
    return `
            ${Header()}
               <div class="flex">
                 ${Sidebar()}
                 <main class="flex-1 pt-[120px] ml-[72px] text-white">
                    <div class="app-container px-6">
                        <section class = "mb-10">
                            <div class="flex items-center justify-between mb-4">
                            <h2 class="text-3xl font-bold">New Releases</h2>

                            <div class="flex gap-5">
                                <button id="albumPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                                <button id="albumNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            </div>

                            <div
                            id="newReleases"
                            class="flex gap-4 overflow-x-auto scroll-smooth pb-4 custom-scrollbar"
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