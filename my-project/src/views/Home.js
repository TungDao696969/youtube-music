import Header from "../components/Header.js";
import Sidebar from "../components/Sidebar.js";
export default function Home() {
  // const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("access_token");
  const user = token
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;
  return `
    <div id="toast-container" class="fixed top-5 right-5 z-50 flex flex-col gap-2"></div>
    ${Header()}
    <div class="flex">
      ${Sidebar()}
      <main class="flex-1 pt-[100px] ml-[72px] text-white">
        <div class="app-container px-6">
          ${
              user
                ? `<div class="mb-10 text-3xl font-bold">👋 Chào mừng ${user.name}</div>`
                : `<div class="mb-10 text-neutral-400"></div>`
            }

          <!-- Tags -->
          <div id="listMoots" class="flex gap-3 mt-6 mb-8">
           
          </div>

          <!-- Personalized -->
          <section class="mb-10">
            <div class="space-y-4" id="personalizedList"></div>
          </section>

          <!-- Quick pick-->
           <section class = "mb-10">
            <h2 class = "text-white text-4xl font-bold mb-6">Quick pick</h2>
           <div id="quickPicks" class="space-y-4"></div>
           </section>

          <!-- Album -->
          <section class = "mb-10">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-3xl font-bold">Album for you</h2>

              <div class="flex gap-5">
                <button id="albumPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                <button id="albumNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
              </div>
            </div>

            <div
              id="albumsForYou"
              class="flex gap-4 overflow-x-auto scroll-smooth pb-4 custom-scrollbar"
            >
              <p class="text-neutral-400">Đang tải...</p>
            </div>
          </section>

          <section class = "mb-10">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-3xl font-bold">Today's Hit</h2>

              <div class="flex gap-5">
                <button id="todayPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                <button id="todayNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
              </div>
            </div>

            <div
              id="albumsTodayHit"
              class="flex gap-4 overflow-x-auto scroll-smooth pb-4 custom-scrollbar"
            >
              <p class="text-neutral-400">Đang tải...</p>
            </div>
          </section>

          <!--list country-->
          <section class = "mb-10">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-3xl font-bold">Nhạc Việt</h2>

              <div class="flex gap-5">
                <button id="todayPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                <button id="todayNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
              </div>
            </div>

            <div
              id="listCountry"
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
