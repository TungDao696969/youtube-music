import { getNewReleases } from "../../services/api";
import newReleasesCard from "../../components/explore/newReleases";
export const initNewReleases = async () => {
  const container = document.getElementById("newReleases");
  if (!container) {
    return;
  }

  try {
    const res = await getNewReleases();
    const newReleases = Array.isArray(res.items) ? res.items : [];

    container.innerHTML = newReleases.map(newReleasesCard).join("");
    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-id]");
      if (!card) return;

      navigate(`/albums/details/${card.dataset.id}`);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <p class="text-red-500">
        Không thể tải new releases
      </p>
    `;
  }
};
