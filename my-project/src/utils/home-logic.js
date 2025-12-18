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

export const initPersonalized = async () => {
  const container = document.querySelector("#personalizedList");
  if (!container) return;

  const token = localStorage.getItem("access_token");
  if (!token) {
    container.innerHTML = `
      <p class="text-neutral-400 text-sm">
        Vui lòng đăng nhập để xem gợi ý cá nhân.
      </p>
    `;
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

    container.innerHTML = data.map(buildPersonalizedCard).join("");
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
