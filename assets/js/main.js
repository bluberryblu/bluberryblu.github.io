// MAIN JS

// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Highlight active nav link based on current pathname
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // Countdown (if element exists)
  const countdownEl = document.getElementById("wedding-countdown");
  if (countdownEl) {
    // 5 September 2026 at 1pm UK time
    const weddingDate = new Date("2026-09-05T13:00:00+01:00");
  
    const updateCountdown = () => {
      const now = new Date();
      const diff = weddingDate - now;
    
      if (diff <= 0) {
        countdownEl.textContent = "It's wedding time! 🎉";
        return;
      }
    
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
    
      countdownEl.innerHTML =
        `<strong>${days}</strong>d ` +
        `<strong>${hours}</strong>h ` +
        `<strong>${minutes}</strong>m ` +
        `<strong>${seconds}</strong>s`;
    
      // Trigger a little pulse animation on each update
      countdownEl.classList.remove("countdown-pulse");
      // force reflow so the animation restarts
      void countdownEl.offsetWidth;
      countdownEl.classList.add("countdown-pulse");
    };
  
    updateCountdown();
    // update every second so it feels alive
    setInterval(updateCountdown, 1000);
  }

  // Gallery lightbox
  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector("img");
    const closeBtn = lightbox.querySelector(".lightbox-close");

    document.querySelectorAll(".gallery-item img").forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("open");
      });
    });

    const closeLightbox = () => lightbox.classList.remove("open");

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
});
