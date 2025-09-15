// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initializeThemeToggle();
  initializeNavigation();
  initializeScrollEffects();
  initializeContactForm();
  initializeAnimations();
});

// Theme Toggle Functionality
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light";

  // Apply theme
  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Theme toggle handlers
  function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  themeToggle.addEventListener("click", toggleTheme);
  themeToggleMobile.addEventListener("click", toggleTheme);
}

// Navigation Functionality
function initializeNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  // Mobile menu toggle
  hamburger.addEventListener("click", function () {
    const isOpen = navMenu.classList.contains("translate-x-0");

    if (isOpen) {
      navMenu.classList.remove("translate-x-0");
      navMenu.classList.add("-translate-x-full");
      hamburger.classList.remove("active");
    } else {
      navMenu.classList.remove("-translate-x-full");
      navMenu.classList.add("translate-x-0");
      hamburger.classList.add("active");
    }

    // Animate hamburger
    const spans = hamburger.querySelectorAll("span");
    if (!isOpen) {
      spans[0].style.transform = "translateY(8px) rotate(45deg)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "translateY(-8px) rotate(-45deg)";
    } else {
      spans[0].style.transform = "translateY(0) rotate(0)";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "translateY(0) rotate(0)";
    }
  });

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("translate-x-0");
      navMenu.classList.add("-translate-x-full");
      hamburger.classList.remove("active");

      // Reset hamburger animation
      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "translateY(0) rotate(0)";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "translateY(0) rotate(0)";
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Active navigation link highlighting
  window.addEventListener("scroll", updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-blue-500", "dark:text-blue-400");
    link.classList.add("text-slate-700", "dark:text-slate-200");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.remove("text-slate-700", "dark:text-slate-200");
      link.classList.add("text-blue-500", "dark:text-blue-400");
    }
  });
}

// Scroll Effects
function initializeScrollEffects() {
  // Navbar background on scroll
  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-white/98", "dark:bg-slate-900/98");
      navbar.classList.remove("bg-white/95", "dark:bg-slate-900/95");
    } else {
      navbar.classList.add("bg-white/95", "dark:bg-slate-900/95");
      navbar.classList.remove("bg-white/98", "dark:bg-slate-900/98");
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Add specific animations based on element type
        if (entry.target.classList.contains("project-card")) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }

        if (entry.target.classList.contains("skill-item")) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }

        if (entry.target.classList.contains("contact-item")) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".project-card, .skill-item, .contact-item"
  );
  animateElements.forEach((el) => {
    // Set initial state
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(el);
  });
}

// Contact Form Functionality
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);

    // Validate form
    if (validateForm(formObject)) {
      // Simulate form submission
      submitForm(formObject);
    }
  });

  // Add focus effects to form inputs
  const formInputs = document.querySelectorAll(
    "#contact-form input, #contact-form textarea"
  );
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.classList.add("ring-2", "ring-blue-500", "ring-opacity-50");
    });

    input.addEventListener("blur", function () {
      this.classList.remove("ring-2", "ring-blue-500", "ring-opacity-50");
    });
  });
}

function validateForm(data) {
  const { name, email, subject, message } = data;

  // Basic validation
  if (!name.trim()) {
    showNotification("Please enter your name", "error");
    return false;
  }

  if (!email.trim() || !isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    return false;
  }

  if (!subject.trim()) {
    showNotification("Please enter a subject", "error");
    return false;
  }

  if (!message.trim()) {
    showNotification("Please enter your message", "error");
    return false;
  }

  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function submitForm(data) {
  const submitButton = document.querySelector(
    '#contact-form button[type="submit"]'
  );
  const originalText = submitButton.textContent;

  // Show loading state
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;
  submitButton.classList.add("opacity-75", "cursor-not-allowed");

  // Simulate API call
  setTimeout(() => {
    // Reset form
    document.getElementById("contact-form").reset();

    // Reset button
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    submitButton.classList.remove("opacity-75", "cursor-not-allowed");

    // Show success message
    showNotification(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );

    // Log form data (in real app, this would be sent to server)
    console.log("Form submitted:", data);
  }, 2000);
}

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className =
    "notification fixed top-24 right-4 z-50 max-w-sm p-4 rounded-xl text-white font-medium shadow-xl transform translate-x-full transition-transform duration-300";

  // Add type-specific styles
  if (type === "success") {
    notification.classList.add("bg-green-500");
  } else if (type === "error") {
    notification.classList.add("bg-red-500");
  } else {
    notification.classList.add("bg-blue-500");
  }

  notification.innerHTML = `
        <div class="flex items-center justify-between gap-3">
            <span class="notification-message">${message}</span>
            <button class="notification-close text-white/80 hover:text-white text-xl leading-none">&times;</button>
        </div>
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
    notification.classList.add("translate-x-0");
  }, 100);

  // Close functionality
  const closeButton = notification.querySelector(".notification-close");
  closeButton.addEventListener("click", () => {
    hideNotification(notification);
  });

  // Auto hide after 5 seconds
  setTimeout(() => {
    hideNotification(notification);
  }, 5000);
}

function hideNotification(notification) {
  notification.classList.add("translate-x-full");
  notification.classList.remove("translate-x-0");

  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Initialize Animations
function initializeAnimations() {
  // Parallax effect for hero section (optional)
  const hero = document.querySelector("#home");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Smooth reveal animations for sections
  const sections = document.querySelectorAll("section");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    section.classList.add(
      "opacity-0",
      "translate-y-8",
      "transition-all",
      "duration-1000"
    );
    sectionObserver.observe(section);
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Performance optimization: Debounce scroll events
const debouncedScrollHandler = debounce(() => {
  updateActiveNavLink();
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// Handle page loading
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Fade in hero section
  const hero = document.querySelector("#home");
  if (hero) {
    hero.classList.add("opacity-100");
    hero.classList.remove("opacity-0");
  }
});

// Handle resize events
window.addEventListener(
  "resize",
  debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
      const navMenu = document.querySelector(".nav-menu");
      const hamburger = document.querySelector(".hamburger");

      navMenu.classList.remove("translate-x-0");
      navMenu.classList.add("-translate-x-full");
      hamburger.classList.remove("active");

      // Reset hamburger animation
      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "translateY(0) rotate(0)";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "translateY(0) rotate(0)";
    }
  }, 250)
);

// Add typing effect to hero title (optional)
function addTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const typeTimer = setInterval(() => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeTimer);
    }
  }, 100);
}

// Uncomment to enable typing effect
// addTypingEffect();

// Console welcome message
console.log(`
🚀 Portfolio Website Loaded Successfully!
🎨 Theme: ${
  document.documentElement.classList.contains("dark") ? "Dark" : "Light"
}
⚡ Built with Tailwind CSS
📱 Fully Responsive Design
🌓 Dark/Light Mode Support

Feel free to explore the code and customize it to your needs!
`);

// Add custom scrollbar styling
const style = document.createElement("style");
style.textContent = `
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: rgb(241 245 249);
    }
    
    .dark ::-webkit-scrollbar-track {
        background: rgb(30 41 59);
    }
    
    ::-webkit-scrollbar-thumb {
        background: rgb(59 130 246);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: rgb(37 99 235);
    }
    
    .dark ::-webkit-scrollbar-thumb {
        background: rgb(96 165 250);
    }
    
    .dark ::-webkit-scrollbar-thumb:hover {
        background: rgb(59 130 246);
    }
`;
document.head.appendChild(style);
