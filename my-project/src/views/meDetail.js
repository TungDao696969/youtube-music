import Header from "../components/Header.js";
import Sidebar from "../components/Sidebar.js";
export default function meDetail() {
  return `
    ${Header()}
    <div class="flex">
      ${Sidebar()}
      <main class="flex-1 ">
         <div
      class="relative w-full h-screen bg-[url('https://wallpapercave.com/wp/wp2417504.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center"
    >
      <form id="meForm" class="transition-all duration-300 ease-out">
        <div
          class="w-[350px] p-6 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 shadow-xl"
        >
          <h1 class="text-white text-2xl font-semibold text-center">
            Thông tin cá nhân
          </h1>
           <div class="flex flex-col mt-4">
            <p class="text-white text-sm mb-1">Tên hiện thị</p>
                <input
                type="text"
                id="meName"
                class="border border-gray-500 bg-gray-300 rounded-sm p-1"
                placeholder="Tên hiển thị"
                />
          </div>

          <div class="flex flex-col mt-7">
            <p class="text-white text-sm mb-1">Email</p>
            <input
              type="email" id="meEmail"
              class="border border-gray-500 bg-gray-300 rounded-sm p-1"
              placeholder="Email của bạn"
            />
          </div>
          <div>
            <button type="submit"
              class="mt-5 p-1 rounded-md text-white bg-gray-800 hover:bg-gray-900 cursor-pointer w-full"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </form>
    </div>
      </main>
    </div>
  `;
}
