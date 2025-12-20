import Header from "../../components/Header.js";
import Sidebar from "../../components/Sidebar.js";

export default function charts() {
  return `
            ${Header()}
               <div class="flex">
                 ${Sidebar()}
                 <main class="flex-1 pt-[120px] ml-[72px] text-white">
                    <div class="app-container px-6">
                        <h2 class="text-3xl font-bold">Bảng xếp hạng</h2>
                       <div class="relative inline-block text-left mt-10" id="rankingSelect">
                        <!-- Button -->
                        <button
                            id="selectBtn"
                            class="flex items-center gap-3
                                px-5 py-2
                                rounded-full
                                border-2 border-yellow-400
                                text-white font-medium
                                bg-black/30 backdrop-blur
                                hover:bg-black/40
                                transition"
                        >
                            <span id="selectedText">Loading...</span>
                            <i class="fa-solid fa-caret-down text-sm"></i>
                        </button>

                        <!-- Dropdown -->
                        <div
                            id="selectMenu"
                            class="absolute mt-2 w-full
                                rounded-md overflow-hidden
                                bg-black shadow-lg
                                border border-white/10
                                hidden z-50"
                        ></div>
                        </div>

                        <!--chart video-->
                        <section class = "mb-10 mt-10">
                            <div class="flex items-center justify-between mb-4">
                            <h2 class="text-3xl font-bold">New music video</h2>

                            <div class="flex gap-5">
                                <button id="videoPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                                <button id="videoNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            </div>

                            <div
                            id="videoChart"
                            class="flex gap-4 overflow-x-auto scroll-smooth pb-4 custom-scrollbar"
                            >
                            <p class="text-neutral-400">Đang tải...</p>
                            </div>
                        </section>

                        <!--chart astrit-->
                        <section class="bg-gradient-to-br rounded-2xl">
                        <h2 class="text-3xl font-bold text-white mb-8">
                            Nghệ sĩ hàng đầu
                        </h2>

                        <div id="artistChart"></div>
                        </section>

                    </div>
                 </main>
               </div>
        `;
}
