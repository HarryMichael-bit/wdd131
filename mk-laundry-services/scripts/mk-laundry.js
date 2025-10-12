// mk-laundry.js

// Utility: get current page
const getCurrentPage = () => window.location.pathname.split("/").pop() || "index.html";

// Nav highlighting (DOM selection + modification)
const highlightActiveNav = () => {
    const current = getCurrentPage();
    document.querySelectorAll(".nav-list a").forEach(link => {
        if (link.getAttribute("href") === current) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
};

// Back-to-top button (DOM creation + conditional + event)
const initBackToTop = () => {
    const btn = document.createElement("button");
    btn.textContent = "↑ Top";
    btn.className = "btn btn-accent back-to-top";
    document.body.appendChild(btn);

    const toggleVisibility = () => {
        btn.style.display = window.scrollY > 300 ? "block" : "none"; // Conditional branching
    };

    window.addEventListener("scroll", toggleVisibility);
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
};

// year injection (DOM modificaation)
const setYear = () => {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
};

// smooth scroll for internal anchors
const initSmoothAnchors = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
};

// Data objects + arrays + template literals
const services = [
    { name: "Wash & Fold", price: 5.5, unit: "kg", turnaround: "24hr" },
    { name: "Ironing", price: 4.5, unit: "shirt", turnaround: "Same-day" },
    { name: "Dry Cleaning", price: 7.5, unit: "suit", turnaround: "48hr" },
    { name: "Stain Removal", price: 2.5, unit: "item", turnaround: "Varies" },
    { name: "Pickup & Delivery", price: 0, unit: "order", turnaround: "Same-day" },
];

const logServiceSummary = () => {
    // Array method + template literals
    const summary = services
        .map(s => `Service: ${s.name} - GHS ${s.price} per ${s.unit} (${s.turnaround})`)
        .join("\n");
    console.log(summary);
};

const applyCtaMode = mode => {
    document.querySelectorAll(".btn.btn-accent, .btn.btn-primary").forEach(btn => {
        // Switch CTA buttons between accent red and primary blue
        if (mode === "primary") {
            btn.classList.remove("btn-accent");
            btn.classList.add("btn-primary");
        } else {
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-accent");
        }
    });
};

// Contact form validation (DOM + events + conditional + template literals)
const initContactForm = () => {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    const serviceEl = document.getElementById("service");
    const messageEl = document.getElementById("message");

    const nameErr = document.getElementById("name-error");
    const emailErr = document.getElementById("email-error");
    const serviceErr = document.getElementById("service-error");
    const messageErr = document.getElementById("message-error");
    const successEl = document.getElementById("form-success");

    const isEmailValid = email =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    form.addEventListener("submit", e => {
        e.preventDefault()
        let valid = true;

        // Name 
        if (!nameEl.value.trim() || nameEl.value.trim().length < 2) {
            nameErr.textContent = "Please enter your full name (at least 2 characters).";
            valid = false;
        } else {
            nameErr.txtContent = "";
        }

        // Email
        if (!isEmailValid(emailEl.value.trim())) {
            emailErr.textContent = "Please enter a valid email address."
            valid = false;
        } else {
            emailErr.textContent = "";
        }

        // Service
        if (!serviceEl.value) {
            serviceErr.textContent = "Please choose a service.";
            valid = false;
        } else {
            serviceErr.textContent = "";
        }

        // Message
        if (!messageEl.value.trim() || messageEl.value.trim().length < 10) {
            messageErr.textContent = "Please provide at least 10 characters.";
            valid = false;
        } else {
            messageErr.textContent = "";
        }

        if (!valid) return;

        // Example: compose summary with template literals
        const summary = `Thanks, ${nameEl.value.trim()}! We received your message regarding "${serviceEl.value}". We'll reply to ${emailEl.value.trim()} soon.`;
        successEl.textContent = summary;

        // Persist last inquiry in localStorage
        localStorage.setItem("lastInquiry", JSON.stringify({
            name: nameEl.value.trim(),
            email: emailEl.value.trim(),
            service: serviceEl.value,
            message: messageEl.value.trim(),
            date: new Date().toISOString()
        }));

        form.requestFullscreen();
    });
};

//Init
document.addEventListener("DOMContentLoaded", () => {
    highlightActiveNav();
    initBackToTop();
    setYear();
    initSmoothAnchors();
    logServiceSummary();
    initContactForm();

    document.getElementById("year").textContent = new Date().getFullYear();
});