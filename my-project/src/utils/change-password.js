import { navigate } from "../routers/router";
import { apiChangePassword } from "../services/api";
import { showAlert } from "./home-logic";
export const initChangePassword = async () => {
  const form = document.querySelector("#changePasswordForm");

  if (!form) return;

  const oldInput = document.querySelector("#oldPassword");
  const newInput = document.querySelector("#newPassword");
  const confirmInput = document.querySelector("#confirmPassword");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const oldPassword = oldInput.value.trim();
    const newPassword = newInput.value.trim();
    const confirmPassword = confirmInput.value.trim();

    if (!oldPassword || !newPassword || !confirmPassword) {
      // alert("Vui lòng nhập đầy đủ thông tin");
      showAlert("Vui lòng nhập đầy đủ thông tin", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      // alert("Mật khẩu xác nhận không khớp");
      showAlert("Mật khẩu xác nhận không khớp", "error");
      return;
    }

    try {
      await apiChangePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });

      alert("Đổi mật khẩu thành công");
      // showAlert("Đổi mật khẩu thành công", "success");
      navigate("/auth");
      form.reset();
    } catch (err) {
      alert(err.message);
    }
  });
};
