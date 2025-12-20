import Header from "../../components/Header.js";
import Sidebar from "../../components/Sidebar.js";

export default function categoriesMood() {
  return `
            ${Header()}
               <div class="flex">
                 ${Sidebar()}
                 <main class="flex-1 pt-[100px] ml-[72px] text-white">
                    <div class="app-container px-6">
                      <section class="mb-10 mt-10">
                        <!-- TITLE -->
                        <h1 id="categoryTitle" class="text-3xl font-bold mb-10"></h1>
                        <div class="flex justify-between">
                        <h2 id="subcategoryTitle" class="text-xl text-neutral-300 mb-4"></h2>

                        <!-- NAV -->
                        
                        
                        </div>
                        <!-- SCROLL ROW -->
                        <div
                            id="categoriesWrapper"
                            class="flex flex-col gap-4 overflow-x-auto scroll-smooth pb-4 custom-scrollbar"
                        >
                            <p class="text-neutral-400">Đang tải...</p>
                        </div>
                        </section>
                    </div>
                 </main>
               </div>
        `;
}
