import Header from "../components/Header.js";
import Sidebar from "../components/Sidebar.js";

export default function songetails () {
    return `
            ${Header()}
               <div class="flex">
                 ${Sidebar()}
                 <main class="flex-1 pt-[100px] ml-[72px] text-white">
                    <div class="app-container px-6">
                        <div id="songDetails"></div>
                        <div
                            id="audioSong"
                            class="fixed bottom-0 left-0 right-0 h-20 bg-neutral-900 border-t border-white/10
                                    flex items-center justify-between px-6 text-white z-50"
                            >
                        </div>
                    </div>

                   
                 </main>
               </div>
        `;
}