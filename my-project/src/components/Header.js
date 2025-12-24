export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user;
    return `
      <div id="toast-container" class="fixed top-10 right-5 z-50 flex flex-col gap-2"></div>
      <header class="fixed top-0 left-0 right-0 z-50 bg-black p-4 border-gray-700 flex items-center">
      <div class="w-[30px] flex justify-between items-center gap-1 ml-2">
        <i class="fa-solid fa-bars text-white text-xl cursor-pointer"></i>
        <div class="flex items-center gap-0 cursor-pointer">
          <img
            src="https://logos-world.net/wp-content/uploads/2021/04/Youtube-Music-Logo.png"
            alt=""
            srcset=""
            width="50px"
          />
          <span class="text-white text-xl font-bold">Music</span>
        </div>
      </div>

      <div class="w-[1300px] m-auto flex justify-between">
        <div class="relative w-100 ml-10">
          <i
            class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-50"
          ></i>
          
          <div class="relative w-full max-w-2xl">
          <input
            id="searchInput"
            type="text"
            placeholder="Search..."
            class="bg-[#292929]/90 pl-10 pr-3 py-2 rounded-lg w-[500px] focus:outline-none text-white"
          />
          <div
            id="searchDropdown"
            class="absolute left-0 right-0 mt-2 bg-neutral-900 rounded-xl shadow-xl hidden z-50"
          >
            <!-- GỢI Ý -->
            <div class="px-4 py-2 text-sm text-neutral-400">Gợi ý</div>
            <ul id="suggestionList"></ul>

            <div class="border-t border-white/10 my-2"></div>

            <!-- KẾT QUẢ -->
            <div class="px-4 py-2 text-sm text-neutral-400">Kết quả</div>
            <ul id="resultList"></ul>
          </div>
          </div>
        </div>

        <div class="flex items-center gap-5">
        <i class="fa-brands fa-chromecast text-2xl text-gray-200"></i>
        <i class = "fa-solid fa-ellipsis-vertical text-lg text-white"></i>
        ${isLoggedIn ? renderAvatar(user.name) : renderLoginButton()}
      </div>
      </div>
    </header>
    `;
}
function renderLoginButton() {
  return `
    <a href="/auth" class="px-4 py-1 rounded-full bg-white text-black font-medium">
      Đăng nhập
    </a>
  `;
}

function renderAvatar(name) {
  return `
  <div class = "relative">
      <div id="btnAvatar"
      class="w-9 h-9 rounded-full bg-purple-600 text-white
             flex items-center justify-center font-semibold cursor-pointer" title = "${name}"
    >
      ${name.charAt(0).toUpperCase()}
    </div>

    <div id ="dropdownAvatar" class = "absolute hidden flex flex-col justify-start text-sm text-white right-0 mt-2 w-50
               bg-[#2a2a2a] rounded-lg shadow-lg overflow-hidden z-50">
      <a href="/auth/me" class="mb-4 cursor-pointer hover:bg-gray-500 p-2">Thông tin người dùng</a>
      <a href="/auth/change-password" class="mb-4 cursor-pointer hover:bg-gray-500 p-2">Đổi mật khẩu</a>
      <a href="/auth/logout" id="btnLogout" class="text-red-600 text-left cursor-pointer hover:bg-gray-500 p-2">Đăng xuất</a>
    </div>
  </div>
  `;
}
