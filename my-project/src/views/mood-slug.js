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
                </div>
             </main>
           </div>
    `;
}
