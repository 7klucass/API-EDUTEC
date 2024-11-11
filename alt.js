// js/auth.js
function verifyIfTokenExists() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "./pages/login/login.html";
        return;
    }
}