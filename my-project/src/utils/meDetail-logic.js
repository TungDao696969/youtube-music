import { navigate } from "../routers/router";
import { getmeDetail, updateMe } from "../services/api";

export const initMeDetail = async () => {
  const emailInput = document.querySelector("#meEmail");
  const userInput = document.querySelector("#meName");
  const form = document.querySelector("#meForm");
  if (!emailInput || !userInput) {
    return;
  }

  try {
    const user = await getmeDetail();

    emailInput.value = user.email;
    userInput.value = user.name;

    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error(error);
    alert("Vui lòng đăng nhập lại");
    localStorage.clear();
    navigate("/auth");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const name = userInput.value.trim();

    if (!email || !name) {
      alert("Không được để trống");
      return;
    }

    try {
      await updateMe({ email, name });

      const freshUser = await getmeDetail();

      localStorage.setItem("user", JSON.stringify(freshUser));

      alert("Cập nhật thành công");

      navigate("/");
    } catch (error) {
      alert("Cập nhật thất bại");
    }
  });
};
