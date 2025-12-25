export default function Sidebar() {
  const token = localStorage.getItem("access_token");
  const user = token
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

  const isLoggedIn = !!token && !!user;

  return `
    <!-- SIDEBAR -->
    <aside
      id="sidebar"
      class="
        fixed top-15 left-0
        h-screen
        w-[72px]
        bg-black
         border-gray-700
        overflow-hidden
        z-50
      "
    >
      <nav class="flex flex-col space-y-3 w-full mt-5">

        <a href="/" class="sidebar-item">
          <i class="sidebar-icon fa-solid fa-house"></i>
          <span class="sidebar-text">Home</span>
        </a>

        <a href="/explore" class="sidebar-item">
          <i class="sidebar-icon fa-regular fa-compass"></i>
          <span class="sidebar-text">Explore</span>
        </a>

        <a href="/library" class="sidebar-item">
          <i class="sidebar-icon fa-regular fa-bookmark"></i>
          <span class="sidebar-text">Library</span>
        </a>
        
       ${
          isLoggedIn
            ? `
              <a href="/upgrade" class="sidebar-item">
                <i class="sidebar-icon fa-solid fa-crown"></i>
                <span class="sidebar-text">Upgrade</span>
              </a>
            `
            : `
            <div class="border-t border-gray-500"></div>
              <a href="/auth" class="sidebar-item">
                <i class="sidebar-icon fa-regular fa-user text-lg"></i>
                <span class="sidebar-text">Login</span>
              </a>
            `
        }

      </nav>
    </aside>
  `;
}
