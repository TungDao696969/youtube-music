export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user;
  return `
        <header class="bg-black p-4 border-gray-700 flex items-center">
      <div class="w-[30px] flex justify-between items-center gap-1">
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
            class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-white"
          ></i>

          <input
            id="searchInput"
            type="text"
            placeholder="Search..."
            class="bg-[#292929]/80 pl-10 pr-3 py-2 rounded-lg w-[500px] focus:outline-none text-white"
          />
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
      <button id="btnLogout" class="text-red-600 text-left cursor-pointer hover:bg-gray-500 p-2">Đăng xuất</button>
    </div>
  </div>
  `;
}
