import { navigate } from "../routers/router";
import { apiChangePassword } from "../services/api";

export const initChangePassword = async () => {
  const form = document.querySelector("#changePasswordForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword.length < 6) {
      alert("Mật khẩu phải ít nhất 6 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu nhập lại không khớp");
      return;
    }
    try {
      const res = await apiChangePassword({ oldPassword, newPassword });
      alert("Đổi mk thành công vui lòng đăng nhập lại");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  });
};
