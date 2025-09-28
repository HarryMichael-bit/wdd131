console.log("filtered-temples.js running, temples is:", temples);

// -- Template & Container --
const template = document.getElementById("temple-template");
const list = document.getElementById("temple-list");

// -- Render Function --
function displayTemples(data) {
    list.innerHTML = ""; // clear old cards

    data.forEach((t) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector("img").src = t.imageUrl;
        clone.querySelector("img").alt = t.templeName;
        clone.querySelector(".temple-name").textContent = t.templeName;
        clone.querySelector(".temple-location").textContent = t.location;
        clone.querySelector(".temple-dedicated").textContent = `Dedicated: ${t.dedicated}`;
        clone.querySelector(".temple-area").textContent = `Area: ${t.area.toLocaleString()} sq ft`;
        list.appendChild(clone);
    });
}

// Initial render: show all
displayTemples(temples);

// -- Filtering Logic --
const buttons = document.querySelectorAll("header nav a");
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = btn.dataset.filter;
        let filtered = temples;

        if (filter === "old") {
            filtered = temples.filter((t) => parseInt(t.dedicated) < 1900);
        }
        else if (filter === "new") {
            filtered = temples.filter((t) => parseInt(t.dedicated) > 2000);
        }
        else if (filter === "large") {
            filtered = temples.filter((t) => t.area > 90000);
        }
        else if (filter === "small") {
            filtered = temples.filter((t) => t.area < 10000);
        }

        displayTemples(filtered);
    });
});

// -- Footer: dynamic year & last modified --
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;