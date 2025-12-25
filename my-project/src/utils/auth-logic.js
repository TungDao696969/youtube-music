import { navigate } from "../routers/router.js";
import { getAuth, registerAuth, apiLogOut } from "../services/api.js";
import { showAlert } from "./home-logic.js";

export const initAuth = () => {
  const btnLogin = document.querySelector("#loginForm");

  btnLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await getAuth({ email, password });
      // Lưu token
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);
      localStorage.setItem("user", JSON.stringify(res.user));
  
      navigate("/");
      showAlert("Đăng nhập thành công", "success");
    } catch (error) {
      // alert("Email hoặc mật khẩu sai");
      showAlert("Email hoặc mật khẩu sai", "error");
    }
  });
};

export function navigateAuth() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const toRegister = document.getElementById("toRegister");
  const toLogin = document.getElementById("toLogin");

  toRegister.addEventListener("click", () => {
    loginForm.classList.add("opacity-0", "scale-95", "pointer-events-none");
    registerForm.classList.remove(
      "opacity-0",
      "scale-95",
      "pointer-events-none"
    );
  });

  toLogin.addEventListener("click", () => {
    registerForm.classList.add("opacity-0", "scale-95", "pointer-events-none");
    loginForm.classList.remove("opacity-0", "scale-95", "pointer-events-none");
  });
}

export const initRegiter = () => {
  const btnRegiter = document.querySelector("#registerForm");

  if (!btnRegiter) {
    return;
  }

  btnRegiter.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailRegiter = document.querySelector("#registerEmail").value.trim();
    const userNameRegiter = document
      .querySelector("#registerName")
      .value.trim();
    const passwordRegiter = document
      .querySelector("#registerPassword")
      .value.trim();
    const passwordCofirm = document
      .querySelector("#registerConfirmPassword")
      .value.trim();

    if (
      !userNameRegiter ||
      !emailRegiter ||
      !passwordRegiter ||
      !passwordCofirm
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (passwordRegiter !== passwordCofirm) {
      alert("Mật khẩu nhập lại không khớp");
      return;
    }

    try {
      const res = await registerAuth({
        name: userNameRegiter,
        email: emailRegiter,
        password: passwordRegiter,
        confirmPassword: passwordCofirm,
      });

      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("user", JSON.stringify(res.user));

      navigate("/");
      showAlert("Đăng kí thành công. Đã đăng nhập !", "success");
    } catch (error) {
      alert("Đăng ký thất bại");
    }
  });
};

export const initLogout = async () => {
  const btnLogout = document.querySelector("#btnLogout");
  if (!btnLogout) return;

  btnLogout.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      await apiLogOut();

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      sessionStorage.clear();

      showAlert("Đăng xuất thành công", "success");

     
      navigate("/auth");
    } catch (error) {
      showAlert("Đăng xuất thất bại", "error");
    }
  });
};
