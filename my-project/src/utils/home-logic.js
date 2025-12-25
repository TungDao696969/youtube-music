import {
  getAlbumsForYou,
  getTodayHit,
  getListMoots,
  apiQuickPicks,
  getPersonalized,
  logPlayEvent,
  getListCountry,
} from "../services/api.js";
import AlbumCard from "../components/Home/AlbumCard.js";
import { navigate } from "../routers/router.js";
import TodayHitCard from "../components/Home/TodayHitCard.js";
import ListMootsCard from "../components/Home/ListMootsCard.js";
import quickPickCart from "../components/Home/quickPicks.js";
import { buildPersonalizedCard } from "../components/Home/buildPersonalizedCard.js";

export async function initHome() {
  const container = document.getElementById("albumsForYou");
  if (!container) return;

  try {
    const albums = await getAlbumsForYou();

    if (!Array.isArray(albums)) {
      throw new Error("Albums is not an array");
    }

    container.innerHTML = albums.map(AlbumCard).join("");

    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;

      navigate(`/albums/details/${card.dataset.slug}`);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <p class="text-red-500">
        Không thể tải album gợi ý
      </p>
    `;
  }
}
export const initTodayHit = async () => {
  const container = document.querySelector("#albumsTodayHit");
  if (!container) {
    return;
  }

  try {
    const albums = await getTodayHit();

    container.innerHTML = albums.map(TodayHitCard).join("");

    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;

      navigate(`/playlists/details/${card.dataset.slug}`);
    });
  } catch (error) {
    console.log(error);
    container.innerHTML = `
      <p class="text-red-500">
        Không thể tải today hit
      </p>
    `;
  }
};

export const initMoots = async () => {
  const listMoots = document.getElementById("listMoots");

  if (!listMoots) {
    return;
  }

  try {
    const albums = await getListMoots();
    const moods = albums.items;

    if (!Array.isArray(moods)) {
      console.error("Moods không phải mảng", albums);
      return;
    }

    listMoots.innerHTML = moods.map(ListMootsCard).join("");
  } catch (error) {
    console.log(error);
    listMoots.innerHTML = `
      <p class="text-red-500">
        Không thể tải mood
      </p>
    `;
  }
};

export const headerAvatar = () => {
  const btnAvatar = document.querySelector("#btnAvatar");
  const dropdownAvatar = document.querySelector("#dropdownAvatar");
  if (!btnAvatar || !dropdownAvatar) return;
  btnAvatar.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownAvatar.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    dropdownAvatar.classList.add("hidden");
  });
};

// Hàm hiện thị thông báo alert
export const showAlert = (message, type = "success", duration = 3000) => {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `
    px-4 py-2 rounded-lg shadow-lg text-white font-medium
    transition-opacity duration-300
    ${type === "success" ? "bg-green-500" : ""}
    ${type === "error" ? "bg-red-500" : ""}
    ${type === "info" ? "bg-blue-500" : ""}
    opacity-0
  `;

  container.appendChild(toast);

  // Fade in
  requestAnimationFrame(() => {
    toast.classList.add("opacity-100");
  });

  // Tự động ẩn
  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.addEventListener("transitionend", () => toast.remove());
  }, duration);
};

export const initQickPick = async () => {
  const quickPicks = document.querySelector("#quickPicks");
  if (!quickPicks) return;

  try {
    const data = await apiQuickPicks();

    quickPicks.innerHTML = data.map(quickPickCart).join("");
    quickPicks.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;

      navigate(`/playlists/details/${card.dataset.slug}`);
    });
  } catch (error) {
    console.error(error);
    quickPicks.innerHTML = `
      <p class="text-red-500">
        Không thể tải Quick Picks
      </p>
    `;
  }
};

// lịch sử nghe
export const initPersonalized = async () => {
  const container = document.querySelector("#personalizedList");
  if (!container) return;

  const token = localStorage.getItem("access_token");
  if (!token) {
    return;
  }

  try {
    const data = await getPersonalized({ limit: 20 });

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = `
        <p class="text-neutral-400 text-sm">
          Chưa có gợi ý phù hợp.
        </p>
      `;
      return;
    }

    // container.innerHTML = data.map(buildPersonalizedCard).join("");
    container.innerHTML = `
       <section class=" pt-6">
      <div id="modSlug" class="flex items-center justify-between mb-4">
              <h2 class="text-3xl font-bold">Gợi ý trang cá nhân</h2>

              <div class="flex gap-5">
                <button id="moodPrev" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-left"></i></button>
                <button id="moodNext" class="nav-btn bg-white/10 rounded-full px-2 cursor-pointer"><i class="fa-solid fa-chevron-right"></i></button>
              </div>
            </div>

        <div class="grid
            grid-flow-col
            grid-rows-4
            auto-cols-[320px]
            gap-5 
            overflow-x-auto
            pb-2 custom-scrollbar">
        ${data.map(buildPersonalizedCard).join("")}
       </div>
      </section>
    `;
    container.addEventListener("click", async (e) => {
      const card = e.target.closest("[data-personalized-card]");
      if (!card) return;

      const type = card.dataset.type;
      const slug = card.dataset.slug;
      const id = card.dataset.id;

      if (type === "playlist") {
        navigate(`/playlists/details/${slug || id}`);
      }

      if (type === "album") {
        navigate(`/albums/details/${slug}`);
      }

      const payload = {
        songId: card.dataset.songId || undefined,
        albumId: type === "album" ? id : undefined,
        playlistId: type === "playlist" ? id : undefined,
      };

      try {
        await logPlayEvent(payload);
      } catch (err) {
        console.warn("Không lưu được lịch sử nghe", err);
      }
    });
  } catch (error) {
    console.log(error);
    container.innerHTML = `
      <p class="text-red-500">
        Không thể tải gợi ý cá nhân
      </p>
    `;
  }
};

export async function initListCountry({ country = "VN", limit = 12 } = {}) {
  const listCountry = document.getElementById("listCountry");
  if (!listCountry) return;

  try {
    const albums = await getListCountry({ country, limit });

    if (!Array.isArray(albums)) {
      throw new Error("Albums is not an array");
    }

    listCountry.innerHTML = albums.map(AlbumCard).join("");

    listCountry.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;

      navigate(`/playlists/details/${card.dataset.slug}`);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <p class="text-red-500">
        Không thể tải album gợi ý
      </p>
    `;
  }
}

export function initSidebarToggle() {
  const btn = document.getElementById("btnToggleSidebar");
  const sidebar = document.getElementById("sidebar");

  if (!btn || !sidebar) return;

  const open = () => {
    sidebar.classList.add("expanded");
    sidebar.classList.remove("w-[72px]");
    sidebar.classList.remove("w-[240px]");
    sidebar.classList.add("w-[150px]");
  };

  const close = () => {
    sidebar.classList.remove("expanded");
    sidebar.classList.remove("w-[150px]");
    sidebar.classList.add("w-[72px]");
  };

  btn.addEventListener("click", () => {
    sidebar.classList.contains("expanded") ? close() : open();
  });

  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !btn.contains(e.target)) {
      close();
    }
  });
}

// Set active class on sidebar items based on current location
export function initSidebarActive() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const items = sidebar.querySelectorAll("a.sidebar-item");
  const path = window.location.pathname || "/";

  items.forEach((el) => {
    el.classList.remove("active");
    const href = el.getAttribute("href") || "";
    // normalize
    if (!href) return;
    // exact match for root
    if (href === "/" && path === "/") {
      el.classList.add("active");
      return;
    }
    // if href is prefix of path (e.g. /explore and /explore/whatever)
    if (href !== "/" && path.startsWith(href)) {
      el.classList.add("active");
    }
  });
}
