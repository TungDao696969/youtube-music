// Hàm hiện thị thông báo alert
export const showAlert = (message, type = "success", duration = 3000) => {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `
    px-4 py-2 rounded-lg shadow-lg text-white font-medium
    transition-opacity duration-300 mt-4
    ${type === "success" ? "bg-green-500" : ""}
    ${type === "error" ? "bg-red-500" : ""}
    ${type === "info" ? "bg-blue-500" : ""}
    opacity-0
  `;

  container.appendChild(toast);

  // Fade in
  requestAnimationFrame(() => {
    toast.classList.add("opacity-100");
  });

  // Tự động ẩn
  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.addEventListener("transitionend", () => toast.remove());
  }, duration);
};