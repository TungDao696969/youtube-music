import initRouter from "./routers/router.js";
import "./assets/style.css";
import { initSearch } from "./utils/search-logic.js";
document.addEventListener("DOMContentLoaded", () => {
  initRouter();
  initSearch();
});
