import { getAlbumsForYou, getTodayHit, getListMoots } from "../services/api.js";
import AlbumCard from "../components/Home/AlbumCard.js";
import { navigate } from "../routers/router.js";
import TodayHitCard from "../components/Home/TodayHitCard.js";
import ListMootsCard from "../components/Home/ListMootsCard.js";

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

      navigate(`/albums/${card.dataset.slug}`);
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

export function initSlider(containerId, prevId, nextId) {
  const container = document.getElementById(containerId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  if (!container || !prevBtn || !nextBtn) return;

  const scrollAmount = 300; // mỗi lần trượt

  nextBtn.addEventListener("click", () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });

  prevBtn.addEventListener("click", () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });
}

export const headerAvatar = () => {
  const btnAvatar = document.querySelector("#btnAvatar");
  const dropdownAvatar = document.querySelector("#dropdownAvatar");
  const btnLogout = document.querySelector("#btnLogout");

  btnAvatar.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownAvatar.classList.toggle("hidden");

    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      navigate("/auth");
    })
  });

  document.addEventListener("click", ()=> {
    dropdownAvatar.classList.add("hidden");
  })
};