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
    // Adjust this date/time to your exact ceremony time
    const weddingDate = new Date("2026-09-19T13:00:00+01:00"); // 19 Sept 2026, 1pm UK

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

      countdownEl.innerHTML = `<strong>${days}</strong> days, <strong>${hours}</strong> hours, <strong>${minutes}</strong> mins`;
    };

    updateCountdown();
    setInterval(updateCountdown, 60000);
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

  // Simple RSVP "fake submit" if using mailto or Google Form redirect
  const rsvpForm = document.getElementById("rsvp-form");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      // Comment out next line if you're pointing this to a real external endpoint
      e.preventDefault();

      const name = rsvpForm.querySelector("input[name='guestName']")?.value || "Lovely human";
      alert(`Thank you, ${name}! Your RSVP has been noted 🥂 (You can replace this with a real form handler later.)`);

      rsvpForm.reset();
    });
  }
});
