// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Format: Last modified, formatted
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
document.getElementById("lastModified").textContent = modifiedRaw.toLocaleString("en-US", options);

// Wind chill: one-line function, conditionally applied
// Conditions: temp <= 10 °C and wind > 4.8 km/h
const t = parseFloat(document.getElementById("temp").textContent);
const v = parseFloat(document.getElementById("wind").textContent);

// One-line wind chill (Celsius, km/h)
const calculateWindChill = (tempC, windKmh) =>
    13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);

// Apply only if conditions are met
const windChillEl = document.getElementById("windchill");
if (!Number.isNaN(t) && !Number.isNaN(v) && t <= 10 && v > 4.8) {
    const wc = calculateWindChill(t, v);
    windChillEl.textContent = wc.toFixed(1); // e.g., "9.8"
} else {
    windChillEl.textContent = "N/A";
}