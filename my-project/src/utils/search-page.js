import { searchResult } from "../services/api";
import { navigate } from "../routers/router";

export const initSearchPage = async () => {
  const list = document.getElementById("searchResultList");

  if (!list) {
    console.error("searchResultList NOT FOUND");
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("q");

  if (!keyword) return;

  const res = await searchResult({ q: keyword });

  list.innerHTML = (res.results || [])
    .map(
      (item) => `
      <li
        class="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer"
        data-id="${item.id}"
        data-type="${item.type}"
      >
        <img src="${item.thumbnails}" class="w-14 h-14 rounded" />

        <div>
          <p class="text-white">${item.title}</p>
          <p class="text-neutral-400 text-sm">
            ${item.genre || item.artists || ""}
          </p>
        </div>
      </li>
    `
    )
    .join("");

  list.addEventListener("click", (e) => {
    const card = e.target.closest("[data-id][data-type]");
    if (!card) return;

    const { id, type } = card.dataset;

    if (type === "song") {
      sessionStorage.setItem("autoplaySong", id);
      navigate(`/songs/details/${id}`);
    }
    if (type === "album") navigate(`/albums/details/${id}`);
    if (type === "playlist") navigate(`/playlists/details/${id}`);
    if (type === "video") navigate(`/videos/details/${id}`);
  });
};
