import { getNewAlbums, getListMood, getListVideo } from "../../services/api";
import newAlbumCard from "../../components/explore/newAlbumCard";
import { MoodCard } from "../../components/explore/listMoodCard";
import VideoCard from "../../components/explore/videoCard";
import { navigate } from "../../routers/router";
export const initNewAlbums = async () => {
  const container = document.getElementById("albumsNew");
  try {
    const res = await getNewAlbums();
    const albums = Array.isArray(res.items) ? res.items : [];

    container.innerHTML = albums.map(newAlbumCard).join("");
    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;

      navigate(`/albums/details/${card.dataset.slug}`);
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

export const initListMood = async () => {
  const container = document.getElementById("moodList");

  if (!container) return;

  try {
    const res = await getListMood();
    const listMood = Array.isArray(res.categories) ? res.categories : [];
    container.innerHTML = listMood.map(MoodCard).join("");

    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;

      navigate(`/explore/categories/${card.dataset.slug}`);
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

export const initListVideo = async () => {
  const container = document.getElementById("videoNew");
  if (!container) return;

  try {
    const res = await getListVideo();
    const listVideo = Array.isArray(res.items) ? res.items : [];
    container.innerHTML = listVideo.map(VideoCard).join("");
    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-id]");
      if (!card) return;

      navigate(`/videos/details/${card.dataset.id}`);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <p class="text-red-500">
        Không thể tải video gợi ý
      </p>
    `;
  }
};
