import Header from "../../components/Header.js";
import Sidebar from "../../components/Sidebar.js";

export default function videoDetail () {
    return `
            ${Header()}
               <div class="flex">
                 ${Sidebar()}
                 <main class="flex-1 pt-[100px] ml-[72px] text-white">
                    <div class="app-container px-6">
                      <div id="videoDetails"></div>
                    </div>
                 </main>
               </div>
        `;
}