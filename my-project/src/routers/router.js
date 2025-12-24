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
  showAlert,
} from "../utils/home-logic.js";
import Auth from "../views/auth.js";
import moodSlug from "../views/mood-slug.js";
import { moodSlugDetail, featuredForyou, morePicks } from "../utils/mood-slug.js";
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
import {
  initNewAlbums,
  initListMood,
  initListVideo,
} from "../utils/explore/explore-logic.js";
import newReleases from "../views/explore/new-releases.js";
import { initNewReleases } from "../utils/explore/newReleases-logic.js";
import charts from "../views/explore/charts.js";
import {
  initChartCountry,
  initChartVideos,
  initChartArtist,
} from "../utils/explore/charts-logic.js";

import moodGenres from "../views/explore/mood-and-genres.js";
import {
  initMoodGenres,
  initListLines,
} from "../utils/explore/mood-and-genres.js";
import categoriesMood from "../views/explore/categories-slug.js";
import { initCategoriesSlug } from "../utils/explore/categories-slug.js";

import linesSlug from "../views/explore/lines-slug.js";
import {
  initLineSlug,
  initLinePlaylist,
  initLineAlbum,
  initLineVideo,
} from "../utils/explore/lines-slug.js";
import videoDetail from "../views/explore/video-detail.js";
import { initVideoDetails } from "../utils/explore/video-details.js";

import {
  initMiniPlayer,
  playMiniVideo,
  showMiniPlayer,
  hideMiniPlayer,
  hasMiniVideo,
} from "../utils/explore/miniYtb-logic.js";
const router = new Navigo("/");

router.hooks({
  after: (match) => {
    const url = match?.url || "";
    const isVideoDetail = url.startsWith("videos/details");

    if (isVideoDetail) {
      hideMiniPlayer();
    } else if (hasMiniVideo()) {
      showMiniPlayer();
    }
  },
});

export function navigate(path) {
  router.navigate(path);
}

export default function initRouter() {
  initMiniPlayer();
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
      featuredForyou(slug);
      morePicks(slug);
      initSlider("albumsForYou", "albumPrev", "albumNext");
      initSlider("albumsTodayHit", "todayPrev", "todayNext");
      initSlider("modSlug", "moodPrev", "moodNext");
      initSlider("morepicks", "morepicksPrev", "morepicksNext");
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
      headerAvatar();
      initSlider("albumsNew", "albumPrev", "albumNext");
      initSlider("moodList", "todayPrev", "todayNext");
      initSlider("videoNew", "videoPrev", "videoNext");
    })
    .on("explore/new-releases", () => {
      render(newReleases());
      initNewReleases();
      initListVideo();
      initSlider("newReleases", "albumPrev", "albumNext");
      initSlider("videoNew", "videoPrev", "videoNext");
    })
    .on("explore/charts", () => {
      render(charts());
      let countryCode = null;

      initChartCountry((code) => {
        countryCode = code;
        initChartVideos({
          country: code,
        });
        initChartArtist({
          country: code,
        });
      });
    })
    .on("explore/mood-and-genres", () => {
      render(moodGenres());
      initMoodGenres();
      initListLines();
      initSlider("moodGenresList", "moodPrev", "moodNext");
      initSlider("moodLines", "linePrev", "lineNext");
    })
    .on("explore/categories/:slug", (match) => {
      const slug = match.data.slug;
      render(categoriesMood(slug));
      initCategoriesSlug(slug);
    })
    .on("explore/lines/:slug", (match) => {
      const slug = match.data.slug;
      render(linesSlug(slug));
      initLineSlug(slug);
      initLinePlaylist(slug);
      initLineAlbum(slug);
      initLineVideo(slug);
    })
    .on("videos/details/:id", (match) => {
      const id = match.data.id;
      hideMiniPlayer();
      
      render(videoDetail(id));
      initVideoDetails(id);
      playMiniVideo(id);
    });
  router.resolve();
}

function render(html) {
  document.getElementById("app").innerHTML = html;
}
