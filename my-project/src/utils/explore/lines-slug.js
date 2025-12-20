import { getLinesSlug, getLinePlaylist, getLineAlbum, getLineVideo} from "../../services/api";
import lineSlugCard from "../../components/explore/lineSlugCard";
import newAlbumCard from "../../components/explore/newAlbumCard";
import VideoCard from "../../components/explore/videoCard";
export const initLineSlug = async (slug) => {
  const container = document.getElementById("linesSlug");
  if (!container) return;

  try {
    const res = await getLinesSlug(slug);

    const lines = Array.isArray(res.items) ? res.items : [];
    container.innerHTML = lines.map(lineSlugCard).join("");
    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;

      navigate(`/explore/lines/${card.dataset.slug}`);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = `
        <p class="text-red-500">
          Không thể tải new album gợi ý
        </p>
      `;
  }
};

export const initLinePlaylist = async (slug) => {
  const container = document.getElementById("linesPlaylist");
  if (!container) return;

  try {
    const res = await getLinePlaylist(slug);

    const lines = Array.isArray(res.items) ? res.items : [];
    container.innerHTML = lines.map(newAlbumCard).join("");
    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;

      navigate(`/explore/lines/${card.dataset.slug}`);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = `
        <p class="text-red-500">
          Không thể tải new album gợi ý
        </p>
      `;
  }
};

export const initLineAlbum = async (slug) => {
  const container = document.getElementById("linesAlbum");
  if (!container) return;

  try {
    const res = await getLineAlbum(slug);

    const lines = Array.isArray(res.items) ? res.items : [];
    container.innerHTML = lines.map(newAlbumCard).join("");
    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;

      navigate(`/explore/lines/${card.dataset.slug}`);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = `
        <p class="text-red-500">
          Không thể tải new album gợi ý
        </p>
      `;
  }
};

export const initLineVideo = async (slug) => {
  const container = document.getElementById("linesVideo");
  if (!container) return;

  try {
    const res = await getLineVideo(slug);

    const lines = Array.isArray(res.items) ? res.items : [];
    container.innerHTML = lines.map(VideoCard).join("");
    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;

      navigate(`/explore/lines/${card.dataset.slug}`);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = `
        <p class="text-red-500">
          Không thể tải new album gợi ý
        </p>
      `;
  }
};