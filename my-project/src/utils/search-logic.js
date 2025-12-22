import { searchSuggestions, searchResult } from "../services/api";
import { navigate } from "../routers/router";
export const initSearch = () => {
  console.log("INIT SEARCH OK");
  const debounce = (callback, delay = 400) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  const input = document.getElementById("searchInput");
  const dropdown = document.getElementById("searchDropdown");
  const suggestionsEl = document.getElementById("suggestionList");
  const resultsEl = document.getElementById("resultList");

  if (!input || !resultsEl) return;
  const handleSearch = async (keyword) => {
    if (keyword.length < 1) {
      dropdown.classList.add("hidden");
      return;
    }

    dropdown.classList.remove("hidden");

    try {
      const [suggestions, results] = await Promise.all([
        searchSuggestions(keyword),
        searchResult({ q: keyword, limit: 5 }),
      ]);

      console.log("suggestions:", suggestions);
      console.log("results:", results);

      renderSuggestions(suggestions.suggestions || []);
      renderResults(results.results || []);
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedSearch = debounce(handleSearch, 400);

  input.addEventListener("input", (e) => {
    debouncedSearch(e.target.value.trim());
  });

  const renderSuggestions = (list) => {
    suggestionsEl.innerHTML = list
      .map(
        (item) => `
      <li
        class="px-4 py-2 hover:bg-white/10 cursor-pointer text-white"
        data-keyword="${item}"
      >
        ${item}
      </li>
    `
      )
      .join("");
  };

  const renderResults = (items) => {
    resultsEl.innerHTML = items
      .map(
        (item) => `
      <li class="flex gap-3 px-4 py-2 hover:bg-white/10 cursor-pointer" data-id="${
        item.id
      }" data-type ="${item.type}">
        <img
          src="${item.thumbnails}"
          class="w-12 h-12 rounded object-cover"
        />
        <div>
          <p class="text-white text-sm line-clamp-1">
            ${item.title}
          </p>
          <p class="text-neutral-400 text-xs">
            ${item.genre || ""}
          </p>  
        </div>
      </li>
    `
      )
      .join("");
  };

  suggestionsEl.addEventListener("click", async (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const keyword = li.dataset.keyword;
    input.value = keyword;
    suggestionsEl.classList.add("hidden");

    const data = await searchResult({ q: keyword });
    console.log(data);

    renderResults(data.results || []);
  });

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const keyword = input.value.trim();
      if (!keyword) return;

      dropdown.classList.add("hidden");
      const data = await searchResult({ q: keyword });
      renderResults(data.results || []);
    }
  });

  resultsEl.addEventListener("click", (e) => {
    const card = e.target.closest("[data-id][data-type]");
    if (!card) return;
    const { id, type } = card.dataset;

    if (type === "song") {
      sessionStorage.setItem("autoplaySong", id);
      navigate(`/songs/details/${id}`);
    }

    if (type === "album") {
      navigate(`/albums/details/${id}`);
    }

    if (type === "playlist") {
      navigate(`/playlists/details/${id}`);
    }
  });
};
