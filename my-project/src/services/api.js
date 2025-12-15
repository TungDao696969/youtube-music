import { navigate } from "../routers/router";

const BASE_URL = "https://youtube-music.f8team.dev/api";

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    localStorage.setItem("access_token", data.access_token);

    return data.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
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

export async function getAuth(payload) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error("Login Faied");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

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

export const getmeDetail = async () => {
  let token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Chưa đăng nhập");
  }

  try {
    let res = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      const newToken = await refreshToken();

      if (!newToken) {
        localStorage.clear();
        alert("Phiên đăng nhập hết hạn");
        navigate("/auth");
        return;
      }
      token = newToken;
      // gọi lại api cũ
      res = await fetch(`${BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });
    }

    if (!res.ok) {
      throw new Error("Không lấy được thông tin user");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateMe = async (data) => {
  let token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Chưa đăng nhập");
  }

  try {
    let res = await fetch(`${BASE_URL}/auth/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      const newToken = await refreshToken();

      if (!newToken) {
        localStorage.clear();
        alert("Phiên đăng nhập hết hạn");
        navigate("/auth");
        return;
      }
      token = newToken
      res = await fetch(`${BASE_URL}/auth/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${newToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    if (!res.ok) {
      throw new Error("Cập nhật thất bại");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const apiChangePassword = async (data) => {
  let token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Bạn chưa đăng nhập");
  }
  try {
    let res = await fetch(`${BASE_URL}/auth/change-password`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      const newToken = await refreshToken();

      if (!newToken) {
        localStorage.clear();
        alert("Phiên đăng nhập hết hạn");
        navigate("/auth");
        return;
      }

      token = newToken
      res = await fetch(`${BASE_URL}/auth/change-password`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${newToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    if (!res.ok) {
      throw new Error("Cập nhật thất bại");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
