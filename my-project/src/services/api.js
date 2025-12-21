import { navigate } from "../routers/router";

const BASE_URL = "https://youtube-music.f8team.dev/api";

const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");

const setTokens = ({ access_token, refresh_token }) => {
  if (access_token) localStorage.setItem("access_token", access_token);
  if (refresh_token) localStorage.setItem("refresh_token", refresh_token);
};

const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

// Refresh Token
export const refreshToken = async () => {
  const refresh_token = getRefreshToken();
  if (!refresh_token) {
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ refresh_token }),
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    setTokens(data);
    return data.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// FETCH WITH AUTH  dùng chung
let refreshingPromise = null;
const fetchAuth = async (url, options = {}) => {
  let token = getAccessToken();

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  if (res.status !== 401) return res;
  if (!refreshingPromise) {
    refreshingPromise = refreshToken();
  }
  // access token hết hạn → refresh
  const newToken = await refreshingPromise;

  if (!newToken) {
    clearAuth();
    navigate("/auth");
    throw new Error("Phiên đăng nhập hết hạn");
  }

  // gọi lại request cũ
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${newToken}`,
    },
  });
};

// api Đăng kí
export async function registerAuth(data) {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Register failed");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

// Api đăng nhập
export async function getAuth(payload) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Login Faied");
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// api lấy danh sách gợi í
export const getPersonalized = async ({ limit = 20 } = {}) => {
  try {
    const res = await fetchAuth(`${BASE_URL}/home/personalized?limit=${limit}`);

    if (!res.ok) {
      throw new Error("Lấy gợi ý thất bại");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// api Albums for you
export async function getAlbumsForYou({ country = "GLOBAL", limit = 12 } = {}) {
  try {
    const res = await fetch(
      `${BASE_URL}/home/albums-for-you?country=${country}&limit=${limit}`
    );

    if (!res.ok) throw new Error("Fetch albums failed");

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

// Api today hit
export const getTodayHit = async ({ country = "GLOBAL", limit = 12 } = {}) => {
  try {
    const res = await fetch(
      `${BASE_URL}/home/todays-hits?country=${country}&limit=${limit}`
    );

    if (!res.ok) {
      throw new Error("Fetch today hit failed");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// api list mood
export const getListMoots = async () => {
  try {
    const res = await fetch(`${BASE_URL}/moods`);

    if (!res.ok) {
      throw new Error("Lỗi rồi");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// api Thông tin cá nhân
export const getmeDetail = async () => {
  try {
    const res = await fetchAuth(`${BASE_URL}/auth/me`);

    if (!res.ok) {
      throw new Error("Không lấy được thông tin user");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// api upate thông tin
export const updateMe = async (data) => {
  try {
    const res = await fetchAuth(`${BASE_URL}/auth/me`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Cập nhật thất bại");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// api thay đổi mk
export const apiChangePassword = async (data) => {
  try {
    const res = await fetchAuth(`${BASE_URL}/auth/change-password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Cập nhật thất bại");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// api login
export const apiLogOut = async () => {
  try {
    const res = await fetchAuth(`${BASE_URL}/auth/logout`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }

    const data = await res.json();
    clearAuth();
    return data;
  } catch (err) {
    console.error("Logout error", err);
    clearAuth(); // fallback → vẫn logout local
    throw err;
  }
};

// api quick pick
export const apiQuickPicks = async ({
  country = "GLOBAL",
  limit = 12,
} = {}) => {
  const res = await fetch(
    `${BASE_URL}/quick-picks?country=${country}&limit=${limit}`
  );

  if (!res.ok) {
    throw new Error("Quick Picks failed");
  }

  const data = await res.json();
  return data;
};

// api shi lại lịch sử nghe
export const logPlayEvent = async ({
  songId,
  albumId,
  playlistId,
  playedAt,
} = {}) => {
  const token = localStorage.getItem("access_token");
  if (!token) return;

  if (!songId && !albumId && !playlistId) {
    throw new Error("Thiếu songId, albumId hoặc playlistId");
  }

  const payload = {
    ...(songId ? { songId } : {}),
    ...(albumId ? { albumId } : {}),
    ...(playlistId ? { playlistId } : {}),
    ...(playedAt ? { playedAt } : {}),
  };

  try {
    const res = await fetchAuth(`${BASE_URL}/events/play`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Ghi lịch sử nghe thất bại");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// api mood-slug Lấy chi tiết danh mục

export const getMoodSlug = async (slug) => {
  const res = await fetch(`${BASE_URL}/moods/${slug}`);

  if (!res.ok) {
    throw new Error("Không lấy được chi tiết danh mục");
  }

  return res.json();
};

// api list country
export const getListCountry = async ({
  country = "GLOBAL",
  limit = 12,
} = {}) => {
  const res = await fetch(
    `${BASE_URL}/playlists/by-country?country=${country}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Không lấy được nhạc");
  }
  return res.json();
};

// api albums details
export const getAlbumsDetails = async (slug) => {
  const res = await fetch(`${BASE_URL}/albums/details/${slug}`);
  if (!res.ok) {
    throw new Error("Không thể lấy albums details");
  }

  return res.json();
};

// api play list details
export const getPlayListDetail = async (slug) => {
  const res = await fetch(`${BASE_URL}/playlists/details/${slug}`);
  if (!res.ok) {
    throw new Error("Không lấy được danh sách play list");
  }

  return res.json();
};

// api song details
export const getSongDetail = async (id) => {
  const res = await fetch(`${BASE_URL}/songs/details/${id}`);
  if (!res.ok) {
    throw new Error("Không lấy dc song detail");
  }

  return res.json();
};

//////// Explore

export const getNewAlbums = async () => {
  const res = await fetch(`${BASE_URL}/explore/albums`);

  if (!res.ok) {
    throw new Error("Lỗi không tải dc danh sách");
  }

  return res.json();
};

// list mood
export const getListMood = async () => {
  const res = await fetch(`${BASE_URL}/explore/meta`);
  if (!res.ok) {
    throw new Error("Lỗi không lấy được danh sách mood");
  }

  return res.json();
};

// list video
export const getListVideo = async () => {
  const res = await fetch(`${BASE_URL}/explore/videos`);
  if (!res.ok) {
    throw new Error("Lỗi list video");
  }

  return res.json();
};

// bản phát hành mới
export const getNewReleases = async () => {
  const res = await fetch(`${BASE_URL}/explore/new-releases`);
  if (!res.ok) {
    throw new Error("Lỗi không lấy được bane phát hành mới");
  }

  return res.json();
};

// Danh sách quốc gia
export const getChartCountry = async () => {
  const res = await fetch(`${BASE_URL}/charts/countries`);
  if (!res.ok) {
    throw new Error("Không lấy được api");
  }

  return res.json();
};

// bảng xếp hạng video
export const getChartVideo = async ({ country = "GLOBAL" }) => {
  const res = await fetch(`${BASE_URL}/charts/videos?country=${country}`);

  if (!res.ok) {
    throw new Error("Lỗi không lấy được video");
  }

  return res.json();
};

// bảng xếp hạng nghệ sĩ
export const getChartArtist = async ({ country = "GLOBAL" }) => {
  const res = await fetch(`${BASE_URL}/charts/top-artists?country=${country}`);

  if (!res.ok) {
    throw new Error("Lỗi không lấy được video");
  }

  return res.json();
};

// api tâm trạng thể loại
export const getMoodGenres = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) {
    throw new Error("Lỗi không lấy được danh sách");
  }

  return res.json();
};

// api lines
export const getListLines = async () => {
  const res = await fetch(`${BASE_URL}/lines`);
  if (!res.ok) {
    throw new Error("Lỗi không lấy được danh sách");
  }

  return res.json();
};

// api categories/slug
export const getCategoriesSlug = async (slug) => {
  const res = await fetch(`${BASE_URL}/categories/${slug}`);
  if (!res.ok) {
    throw new Error("Không lấy được danh sách play categories");
  }

  return res.json();
};

// api line/slug
export const getLinesSlug = async (slug) => {
  const res = await fetch(`${BASE_URL}/lines/${slug}/songs`);
  if (!res.ok) {
    throw new Error("Không lấy được danh sách play categories");
  }

  return res.json();
};

// api playlist nổi bâth
export const getLinePlaylist = async (slug) => {
  const res = await fetch(`${BASE_URL}/lines/${slug}/playlists`);

  if (!res.ok) {
    throw new Error("Không lấy được danh sách play categories");
  }

  return res.json();
};

// api album nổi bâth
export const getLineAlbum = async (slug) => {
  const res = await fetch(`${BASE_URL}/lines/${slug}/albums`);

  if (!res.ok) {
    throw new Error("Không lấy được danh sách play categories");
  }

  return res.json();
};

// api video nổi bâth
export const getLineVideo = async (slug) => {
  const res = await fetch(`${BASE_URL}/lines/${slug}/videos`);

  if (!res.ok) {
    throw new Error("Không lấy được danh sách play categories");
  }

  return res.json();
};

// api video details
export const getVideoDetail = async (id) => {
  const res = await fetch(`${BASE_URL}/videos/details/${id}`);

  if (!res.ok) {
    throw new Error("Không lấy được dánh sách video");
  }

  return res.json();
};

// api search
export const searchSuggestions = async (q) => {
  const res = await fetch(
    `${BASE_URL}/search/suggestions?q=${encodeURIComponent(q)}`
  );

  if (!res.ok) {
    throw new Error("Suggestion API error");
  }

  return res.json();
};

export const searchResult = async ({ q, limit = 20, page = 1 }) => {
  const res = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(q)}&limit=${limit}&page=${page}`
  );

  if (!res.ok) throw new Error("Search API error");

  return res.json();
};
