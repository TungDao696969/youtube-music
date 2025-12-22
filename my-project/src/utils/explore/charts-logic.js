import {
  getChartCountry,
  getChartVideo,
  getChartArtist,
} from "../../services/api";
import chartVideoCard from "../../components/explore/chartVideoCard";
import chartArtistCard from "../../components/explore/chartArtistCard";
import { navigate } from "../../routers/router";
export const initChartCountry = async (onChange) => {
  const selectBtn = document.getElementById("selectBtn");
  const selectMenu = document.getElementById("selectMenu");
  const selectedText = document.getElementById("selectedText");
  const wrapper = document.getElementById("rankingSelect");
  if (!selectBtn || !selectMenu) return;

  try {
    const res = await getChartCountry();
    const countries = Array.isArray(res.countries) ? res.countries : [];

    if (!countries.length) {
      selectedText.textContent = "No data";
      return;
    }

    selectedText.textContent = countries[0].name;

    selectMenu.innerHTML = countries
      .map(
        (c, index) => `
          <div
            class="px-4 py-2 cursor-pointer
                   ${index === 0 ? "bg-blue-600" : "hover:bg-white/10"}
                   text-white"
            data-code="${c.code}"
          >
            ${c.name}
          </div>
        `
      )
      .join("");

    selectBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      selectMenu.classList.toggle("hidden");
    });

    selectMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = e.target.closest("[data-code]");

      if (!item) return;

      const code = item.dataset.code;
      const name = item.textContent;

      selectedText.textContent = name;

      [...selectMenu.children].forEach((el) => {
        el.classList.remove("bg-blue-600");
        el.classList.add("hover:bg-white/10");
      });

      item.classList.add("bg-blue-600");
      item.classList.remove("hover:bg-white/10");

      selectMenu.classList.add("hidden");

      // callback để call API chart
      if (typeof onChange === "function") {
        onChange(code);
      }
    });

    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) {
        selectMenu.classList.add("hidden");
      }
    });

    // gọi lần đầu
    if (typeof onChange === "function") {
      onChange(countries[0].code);
    }
  } catch (error) {
    console.error(error);
    selectedText.textContent = "Error";
  }
};

export const initChartVideos = async (options) => {
  const container = document.getElementById("videoChart");
  if (!container) return;

  try {
    const res = await getChartVideo(options);
    const videos = Array.isArray(res.items) ? res.items : [];

    container.innerHTML = videos.map(chartVideoCard).join("");

    container.addEventListener("click", (e) => {
      const card = e.target.closest(".video-card");
      if (!card) return;
      console.log("video id:", card.dataset.id);
      navigate(`/videos/details/${card.dataset.id}`);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <p class="text-red-500">Không thể tải chart video</p>
    `;
  }
};

export const initChartArtist = async (options) => {
  const container = document.getElementById("artistChart");
  if (!container) return;

  try {
    const res = await getChartArtist(options);
    const videos = Array.isArray(res.items) ? res.items : [];

    container.innerHTML = videos.map(chartArtistCard).join("");
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <p class="text-red-500">Không thể tải chart video</p>
    `;
  }
};
