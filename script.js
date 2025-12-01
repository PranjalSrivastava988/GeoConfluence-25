document.addEventListener("DOMContentLoaded", () => {
  // --- Navbar Functionality ---
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-item");

  // Toggle Mobile Menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");

    // Animate hamburger bars
    const bars = hamburger.children;
    if (hamburger.classList.contains("active")) {
      bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";
    }
  });

  // Close Mobile Menu on Click
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        hamburger.click();
      }
    });
  });

  // Sticky Navbar on Scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // --- Lightbox Gallery ---
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");

  window.openLightbox = (element) => {
    const img = element.querySelector("img");
    const altText = img.getAttribute("alt");

    lightboxImg.src = img.src;
    lightboxCaption.innerText = altText;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  window.closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  // Close lightbox on clicking outside image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // --- Scroll Animations (Intersection Observer) ---
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-up, .fade-in, .fade-in-up"
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0) translateX(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "0px",
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // Failsafe: If content is still hidden after 1 second, show it (fixes "vanish" bug)
  setTimeout(() => {
    revealElements.forEach((el) => {
      if (getComputedStyle(el).opacity === "0") {
        el.classList.add("active");
        el.style.opacity = 1;
        el.style.transform = "translateY(0) translateX(0)";
      }
    });
  }, 1000);

  // --- Glitch Text Effect (Simple) ---
  const glitchText = document.querySelector(".glitch-text");
  if (glitchText) {
    setInterval(() => {
      glitchText.style.textShadow = `2px 0 var(--primary-green), -2px 0 var(--accent-gold)`;
      setTimeout(() => {
        glitchText.style.textShadow = "none";
      }, 100);
    }, 3000);
  }

  // --- Copyright Year ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
