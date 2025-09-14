// Footer Dynamic year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("active");
    hamburger.textContent = isOpen ? "✖" : "☰";
});