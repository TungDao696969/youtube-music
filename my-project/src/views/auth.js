export default function Auth() {
  return `
         <div
      class="relative w-full h-screen bg-[url('https://wallpapercave.com/wp/wp2417504.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center"
    >
      <form id="loginForm" class="transition-all duration-300 ease-out">
        <div
          class="w-[350px] p-6 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 shadow-xl"
        >
          <h1 class="text-white text-2xl font-semibold text-center">
            Đăng nhập
          </h1>
          <div class="flex flex-col mt-7">
            <p class="text-white text-sm mb-1">Email</p>
            <input
              type="email" id="email"
              class="border border-gray-500 bg-gray-300 rounded-sm p-1"
              placeholder="Email của bạn"
            />
          </div>

          <div class="flex flex-col mt-4">
            <p class="text-white text-sm mb-1">Password</p>
            <input
              type="password" id="password"
              class="border border-gray-500 bg-gray-300 rounded-sm p-1"
              placeholder="Password"
            />
          </div>

          <div>
            <button type="submit"
              class="mt-5 p-1 rounded-md text-white bg-gray-800 hover:bg-gray-900 cursor-pointer w-full"
            >
              Đăng nhập
            </button>
          </div>

          <p class="text-gray-500 text-sm text-center mt-5">
            Bạn chưa có tài khoản?
            <span onclick="window.routerNavigate('/auth/register')"
              id="toRegister"
              class="text-white underline cursor-pointer hover:text-red-400"
            >
              Đăng ký
            </span>
          </p>
        </div>
      </form>

      <!-- // đăng kí -->
      <form
        id="registerForm"
        class="absolute transition-all duration-300 ease-out opacity-0 scale-95 pointer-events-none"
      >
        <div
          class="w-[350px] p-6 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 shadow-xl"
        >
          <h1 class="text-white text-2xl font-semibold text-center">
            Đăng ký
          </h1>
          <div class="flex flex-col mt-7">
            <p class="text-white text-sm mb-1">Email</p>
            <input
              type="email" id = "registerEmail"
              class="border border-gray-500 bg-gray-300 rounded-sm p-1"
              placeholder="Email của bạn"
            />
          </div>

          <div class="flex flex-col mt-4">
            <p class="text-white text-sm mb-1">Tên hiện thị</p>
            <input id = "registerName"
              type="text"
              class="border border-gray-500 bg-gray-300 rounded-sm p-1"
              placeholder="Username"
            />
          </div>

          <div class="flex flex-col mt-4">
            <p class="text-white text-sm mb-1">Mật khẩu</p>
            <input
              type="password" id="registerPassword"
              class="border border-gray-500 bg-gray-300 rounded-sm p-1"
              placeholder="Password"
            />
          </div>

          <div class="flex flex-col mt-4">
            <p class="text-white text-sm mb-1">Nhập lại mật khẩu</p>
            <input
              type="password" id="registerConfirmPassword"
              class="border border-gray-500 bg-gray-300 rounded-sm p-1"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
          <div>
            <button
              class="mt-5 p-1 rounded-md text-white bg-gray-800 hover:bg-gray-900 cursor-pointer w-full"
            >
              Đăng ký
            </button>
          </div>

          <p class="text-gray-500 text-sm text-center mt-5">
            Bạn đã có tài khoản?
            <span onclick="window.routerNavigate('/auth/register')"
              id="toLogin"
              class="text-white underline cursor-pointer hover:text-red-400"
            >
              Đăng nhập
            </span>
          </p>
        </div>
      </form>
    </div>
    `;
}

