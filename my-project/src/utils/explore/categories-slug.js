import { getCategoriesSlug } from "../../services/api";
import { CategoriesSlugCard } from "../../components/explore/categoriesSlugCard";
import { navigate } from "../../routers/router";
export const initCategoriesSlug = async (slug) => {
  const wrapper = document.getElementById("categoriesWrapper");
  if (!wrapper) return;

  const data = await getCategoriesSlug(slug);

  // Title lớn
  wrapper.innerHTML = `
    <h1 class="text-4xl font-bold mb-10">${data.name}</h1>
  `;

  data.subcategories.forEach((sub, index) => {
    const sectionId = `subcategory-${index}`;

    wrapper.innerHTML += `
      <section class="mb-14">
        <!-- HEADER -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold">${sub.name}</h2>
        </div>

        <!-- PLAYLIST ROW -->
        <div
          id="${sectionId}"
          class="flex gap-5 overflow-x-auto scroll-smooth pb-3 custom-scrollbar"
        >
          ${sub.playlists.map(CategoriesSlugCard).join("")}
        </div>
      </section>
    `;

    wrapper.addEventListener("click", (e) => {
      const card = e.target.closest("[data-slug]");
      if (!card) return;
      navigate(`/playlists/details/${card.dataset.slug}`);
    })
  });
};
