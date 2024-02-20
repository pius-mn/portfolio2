(function () {
  "use strict";

  const ud_header = document.querySelector(".ud-header");
  const sticky = ud_header.offsetTop;
  const logo = document.querySelectorAll(".header-logo")[0];
  const backToTop = document.querySelector(".back-to-top");
  const navbarToggler = document.querySelector("#navbarToggler");
  const navbarCollapse = document.querySelector("#navbarCollapse");
  const submenuItems = document.querySelectorAll(".submenu-item");
  const faqs = document.querySelectorAll(".single-faq");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > sticky) {
      ud_header.classList.add("sticky");
      logo.src = "assets/images/logo/logo.svg";
    } else {
      ud_header.classList.remove("sticky");
      logo.src = "assets/images/logo/logo-white.svg";
    }

    if (document.documentElement.classList.contains("dark")) {
      logo.src = "assets/images/logo/logo-white.svg";
    }

    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  });

  navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("navbarTogglerActive");
    navbarCollapse.classList.toggle("hidden");
  });

  navbarCollapse.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && e.target.parentElement.tagName !== "LI") {
      navbarToggler.classList.remove("navbarTogglerActive");
      navbarCollapse.classList.add("hidden");
    }
  });

  submenuItems.forEach((el) => {
    el.querySelector("a").addEventListener("click", () => {
      el.querySelector(".submenu").classList.toggle("hidden");
    });
  });

  faqs.forEach((el) => {
    el.querySelector(".faq-btn").addEventListener("click", () => {
      el.querySelector(".icon").classList.toggle("rotate-180");
      el.querySelector(".faq-content").classList.toggle("hidden");
    });
  });

  new WOW().init();

  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  backToTop.onclick = () => {
    scrollTo(document.documentElement);
  };

  // themeSwitcher
  const themeSwitcher = document.getElementById("themeSwitcher");

  // Theme Vars
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color0scheme: dark)")
    .matches;

  // Initial Theme Check
  const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
      return;
    }
  };

  // Manual Theme Switch
  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      return;
    }

    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  };

  // call theme switch on clicking buttons
  themeSwitcher.addEventListener("click", () => {
    themeSwitch();
  });

  // invoke theme check on initial load
  themeCheck();
})();