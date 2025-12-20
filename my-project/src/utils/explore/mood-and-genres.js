import { getMoodGenres, getListLines } from "../../services/api";
import { MoodCard } from "../../components/explore/listMoodCard";
import { navigate } from "../../routers/router";
export const initMoodGenres = async () => {
  const container = document.getElementById("moodGenresList");
  if (!container) return;

  try {
    const res = await getMoodGenres();

    const mood = Array.isArray(res.items) ? res.items : [];

    container.innerHTML = mood.map(MoodCard).join("");
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

export const initListLines = async () => {
  const container = document.getElementById("moodLines");
  if (!container) return;

  try {
    const res = await getListLines();

    const mood = Array.isArray(res.items) ? res.items : [];

    container.innerHTML = mood.map(MoodCard).join("");
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
