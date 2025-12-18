import Navigo from "navigo";
import Home from "../views/Home.js";
import {
  initHome,
  initTodayHit,
  initMoots,
  headerAvatar,
  initQickPick,
  initPersonalized,
  initListCountry,
} from "../utils/home-logic.js";
import Auth from "../views/auth.js";
import moodSlug from "../views/mood-slug.js";
import { moodSlugDetail } from "../utils/mood-slug.js";
import { initAuth, navigateAuth, initRegiter } from "../utils/auth-logic.js";
import meDetail from "../views/meDetail.js";
import { initMeDetail } from "../utils/meDetail-logic.js";
import changePassword from "../views/changePassword.js";
import { initChangePassword } from "../utils/change-password.js";
import { initLogout } from "../utils/auth-logic.js";
import { initSlider } from "../utils/slider.js";
import albumDetail from "../views/album-detail.js";
import { initAlbumsDetails } from "../utils/albums-details.js";
import playListDetail from "../views/playlist-detail.js";
import { initPlayListDetails } from "../utils/playList-details.js";
import songetails from "../views/song-details.js";
import { initSongDetails } from "../utils/songs-details.js";

// Explore
import explore from "../views/explore/explore.js";
import { initNewAlbums, initListMood, initListVideo } from "../utils/explore/explore-logic.js";

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
      initQickPick();
      initPersonalized();
      initListCountry();
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
    .on("auth/logout", () => {
      render(Auth());
      initLogout();
      initAuth();
      navigateAuth();
      initRegiter();
    })
    // Trang chi tiết mood: /mood/:slug
    .on("moods/:slug", (match) => {
      const slug = match.data.slug;
      console.log("slug =", slug);
      render(moodSlug());
      initMoots();
      initQickPick();
      moodSlugDetail(slug);
      initSlider("albumsForYou", "albumPrev", "albumNext");
      initSlider("albumsTodayHit", "todayPrev", "todayNext");
    })
    .on("albums/details/:slug", (match) => {
      const slug = match.data.slug;
      render(albumDetail(slug));
      initAlbumsDetails(slug);
    })
    .on("playlists/details/:slug", (match) => {
      const slug = match.data.slug;
      render(playListDetail(slug));
      initPlayListDetails(slug);
    })
    .on("/songs/details/:id", (match) => {
      const id = match.data.id;
      render(songetails(id));
      initSongDetails(id);
    })
    .on("explore", () => {
      render(explore());
      initNewAlbums();
      initListMood();
      initListVideo();
      initSlider("albumsNew", "albumPrev", "albumNext");
      initSlider("moodList", "todayPrev", "todayNext");
      initSlider("videoNew", "videoPrev", "videoNext");
    })
    .resolve();
}

function render(html) {
  document.getElementById("app").innerHTML = html;
}
