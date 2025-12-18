export default function Sidebar() {
    return `
        <aside class="fixed top-15 left-0 z-50 h-screen w-[72px] bg-black border-gray-700">
        <nav class="flex flex-col space-y-3 w-full mt-5">
            <a href="/" class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
                <i class="fa-solid fa-house text-white text-xl"></i>
                <span class="text-[11px] text-gray-300 group-hover:text-white">Home</span>
            </a>

            <a href="/explore" class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
                <i class="fa-regular fa-compass text-white text-xl"></i>
                <span class="text-[11px] text-gray-300 group-hover:text-white">Explore</span>
            </a>

            <a href="" class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
                <i class="fa-regular fa-bookmark text-white text-xl"></i>
                <span class="text-[11px] text-gray-300 group-hover:text-white">Library</span>
            </a>

            <a href="" class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
                <i class="fa-solid fa-crown text-white text-xl"></i>
                <span class="text-[11px] text-gray-300 group-hover:text-white">Upgrade</span>
            </a>
        </nav>
      </aside>
    `
}