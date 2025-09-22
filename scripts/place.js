// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Format and display last modified date and time
const modifiedRaw = new Date(document.lastModified);
const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
};
const formatted = modifiedRaw.toLocaleString("en-US", options);
document.getElementById("lastmodified").textContent = formatted;