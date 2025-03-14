// Smooth Scrolling for Navigation
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Navigation with Background Blur
window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.style.background = "rgba(26, 26, 44, 0.95)";
        nav.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
    } else {
        nav.style.background = "rgba(26, 26, 44, 0.8)";
        nav.style.boxShadow = "none";
    }
});

// Highlight Active Section in Navbar
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Reveal Sections on Scroll
function revealSections() {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 50) {
            section.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

// 🌙 Dark Mode Toggle
const darkModeToggle = document.createElement("button");
darkModeToggle.textContent = "🌙 Dark Mode";
darkModeToggle.style.position = "fixed";
darkModeToggle.style.bottom = "20px";
darkModeToggle.style.right = "20px";
darkModeToggle.style.background = "#6A0DAD";
darkModeToggle.style.color = "white";
darkModeToggle.style.padding = "10px 15px";
darkModeToggle.style.border = "none";
darkModeToggle.style.borderRadius = "5px";
darkModeToggle.style.cursor = "pointer";
darkModeToggle.style.zIndex = "1000";
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "☀️ Light Mode";
    } else {
        darkModeToggle.textContent = "🌙 Dark Mode";
    }
});

// CSS for Dark Mode
const darkModeStyles = document.createElement("style");
darkModeStyles.innerHTML = `
    .dark-mode {
        background: #121212 !important;
        color: #EAEAEA !important;
    }
    .dark-mode section {
        background: rgba(255, 255, 255, 0.1) !important;
    }
    .dark-mode nav {
        background: rgba(26, 26, 44, 0.9) !important;
    }
`;
document.head.appendChild(darkModeStyles);

// 📏 Scroll Progress Bar
const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.width = "0%";
progressBar.style.height = "5px";
progressBar.style.background = "#6A0DAD";
progressBar.style.zIndex = "1000";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrolled + "%";
});

// ⬆️ Back to Top Button
const backToTop = document.createElement("button");
backToTop.textContent = "⬆️";
backToTop.style.position = "fixed";
backToTop.style.bottom = "20px";
backToTop.style.left = "20px";
backToTop.style.background = "#6A0DAD";
backToTop.style.color = "white";
backToTop.style.padding = "10px 15px";
backToTop.style.border = "none";
backToTop.style.borderRadius = "50%";
backToTop.style.cursor = "pointer";
backToTop.style.zIndex = "1000";
backToTop.style.display = "none";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 🖼 Image Popup
const images = document.querySelectorAll("img");
images.forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.8)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "1000";
        overlay.style.cursor = "pointer";
        document.body.appendChild(overlay);

        const newImage = document.createElement("img");
        newImage.src = img.src;
        newImage.style.maxWidth = "80%";
        newImage.style.maxHeight = "80%";
        newImage.style.borderRadius = "10px";
        newImage.style.boxShadow = "0 4px 10px rgba(255, 255, 255, 0.3)";
        overlay.appendChild(newImage);

        overlay.addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
    });
});

// 🔘 Click Effects for Navigation
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function () {
        this.style.transform = "scale(0.9)";
        setTimeout(() => {
            this.style.transform = "scale(1)";
        }, 150);
    });
});
