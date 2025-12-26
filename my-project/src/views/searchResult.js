
import Header from "../components/Header.js";
import Sidebar from "../components/Sidebar.js";
export default function songetails () {
    return `
            ${Header()}
               <div class="flex">
                 ${Sidebar()}
                 <main class="flex-1 pt-[100px] ml-[72px] text-white">
                    <div class="app-container px-6">
                        <h2 class="text-3xl font-bold mb-5">Kết quả tìm kiếm</h2>
                        <div id="searchResultList" class="space-y-2"></div>
                    </div>
                 </main>
               </div>
        `;
}