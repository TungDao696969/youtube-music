import Navigo from "navigo";
import Home from "../views/Home.js";
import {
  initHome,
  initTodayHit,
  initSlider,
  initMoots,
  headerAvatar,
} from "../utils/home-logic.js";
import Auth from "../views/auth.js";
import { initAuth, navigateAuth, initRegiter } from "../utils/auth-logic.js";
import meDetail from "../views/meDetail.js";
import { initMeDetail } from "../utils/meDetail-logic.js";
import changePassword from "../views/changePassword.js";
import { initChangePassword } from "../utils/change-password.js";
const router = new Navigo("/");

export function navigate(path) {
  router.navigate(path);
}

export default function initRouter() {
  router
    .on("/", async () => {
      render(Home());
      initHome();
      initTodayHit();
      initMoots();
      headerAvatar();
      initSlider("albumsForYou", "albumPrev", "albumNext");
      initSlider("albumsTodayHit", "todayPrev", "todayNext");
    })
    .on("auth", () => {
      render(Auth());
      initAuth();
      navigateAuth();
      initRegiter();
    })
    .on("auth/me", () => {
      render(meDetail());
      headerAvatar();
      initMeDetail();
    })
    .on("auth/change-password", () => {
      render(changePassword());
      headerAvatar();
      initChangePassword();
    })
    .resolve();
}

function render(html) {
  document.getElementById("app").innerHTML = html;
}
