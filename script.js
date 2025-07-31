// === Intersection Observer for fade-scroll effects ===
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Show .visible only when >45% of element is visible to avoid flicker/gitter
    if (entry.intersectionRatio > 0.30) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: [0, 0.25, 0.45, 0.75, 1] });

// Observe newly inserted .fade-scroll elements
function observeFadedElements() {
  document.querySelectorAll('.fade-scroll:not([data-observed])').forEach(el => {
    fadeObserver.observe(el);
    el.dataset.observed = "true";
  });
}

document.addEventListener("DOMContentLoaded", function() {
  // ===== Selectors =====
  const main = document.getElementById("main-content");
  const desktopTabs = document.querySelectorAll("nav.tabs a");
  const mobileTabs = document.querySelectorAll("#mobile-nav a");
  const allTabs = [...desktopTabs, ...mobileTabs];
  const sections = document.querySelectorAll("main > section.section-block");
  const mobileBtn = document.getElementById("mobile-nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  // ===== Tab highlight logic (works for both navs) =====
  function highlightActiveTab(id) {
    allTabs.forEach(tab => {
      tab.classList.toggle("active", tab.getAttribute("href") === `#${id}`);
    });
  }

  // ===== Tab click/smooth scroll (for both navs) =====
  function tabClickHandler(tab) {
    tab.addEventListener("click", e => {
      const targetID = tab.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        e.preventDefault();

        // Calculate offset relative to main container
        const mainRect = main.getBoundingClientRect();
        const sectionRect = targetSection.getBoundingClientRect();
        const HEADER_HEIGHT = 60; // match CSS header height
        const offset = sectionRect.top - mainRect.top;

        main.scrollTo({
          top: main.scrollTop + offset - HEADER_HEIGHT,
          behavior: "smooth"
        });

        targetSection.focus({ preventScroll: true });

        highlightActiveTab(targetID);

        // If from mobile menu, auto-close menu
        if (mobileNav && mobileNav.classList.contains("open")) {
          mobileNav.classList.remove("open");
        }
      }
    });
  }

  desktopTabs.forEach(tabClickHandler);
  mobileTabs.forEach(tabClickHandler);

  // ===== Mobile menu toggle logic =====
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });
    // Outside click closes mobile menu
    document.addEventListener("click", e => {
      if (mobileNav.classList.contains("open")
          && !mobileNav.contains(e.target)
          && e.target !== mobileBtn) {
        mobileNav.classList.remove("open");
      }
    });
  }

  // ===== Scroll event for dynamic tab highlight =====
  main.addEventListener("scroll", () => {
    let currentSectionId = "";
    const scrollTop = main.scrollTop;
    const viewportHeight = main.clientHeight;

    sections.forEach(section => {
      const offsetTop = section.offsetTop;
      const offsetBottom = offsetTop + section.offsetHeight;
      // Highlight tab when section passes halfway point in main content viewport
      if (
        scrollTop + viewportHeight * 0.5 >= offsetTop &&
        scrollTop + viewportHeight * 0.5 < offsetBottom
      ) {
        currentSectionId = section.id;
      }
    });

    if (currentSectionId) highlightActiveTab(currentSectionId);
  });

  // ===== Activate first tab on page load =====
  if (sections.length) highlightActiveTab(sections[0].id);

  // ===== FILL DATA INTO SECTIONS =====
  fillHome();
  fillExperience();
  fillProjects();
  fillSkillsAndCertifications();
  fillTrainingsAndRecognitions();

  // Observe all fade-scroll elements
  observeFadedElements();

  // ===== DATA FILL FUNCTIONS (unchanged) =====

  function fillHome() {
    const d = window.profileData;
    if (!d) return;
    const nameElem = document.getElementById("name");
    const roleElem = document.getElementById("role");
    const aboutElem = document.getElementById("about");
    const eduElem = document.getElementById("edu");
    const linkedinElem = document.getElementById("linkedin");
    const githubElem = document.getElementById("github");
    const locationText = document.getElementById("location-text");
    const expElem = document.getElementById("exp");

    if (nameElem) nameElem.textContent = d.name || "";
    if (roleElem) roleElem.textContent = d.role || "";
    if (aboutElem) aboutElem.textContent = d.about || "";

    if (eduElem && d.education && d.education.length > 0) {
      const edu = d.education[0];
      eduElem.innerHTML = `
        <strong>${edu.degree}</strong><br>
        ${edu.college}<br>
        CGPA: ${edu.cgpa} (${edu.dates})<br>
        ${edu.location}
      `;
      eduElem.classList.add("fade-scroll");
    }

    if (linkedinElem && d.linkedin) linkedinElem.href = d.linkedin;
    if (githubElem && d.github) githubElem.href = d.github;
    if (locationText) locationText.textContent = d.location || "";
    if (expElem) expElem.textContent = calculateExperienceText(new Date(2021, 8, 3));
  }

  function calculateExperienceText(startDate) {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    if (now.getDate() > 20) months++;
    if (months < 0) {
      years--;
      months += 12;
    }
    if (months >= 12) {
      years++;
      months -= 12;
    }
    let str = years + " year" + (years !== 1 ? "s" : "");
    if (months > 0) str += " " + months + " month" + (months !== 1 ? "s" : "");
    return "I.T. Experience: " + str;
  }

  function fillExperience() {
    const d = window.profileData;
    const experiences = d.experience || [];
    const container = document.getElementById("exp-container");
    if (!container) return;
    container.className = "exp-card-list";
    container.innerHTML = experiences.map(exp => `
      <div class="exp-entry-card fade-scroll">
        <div class="exp-card-leftbar">
          <div class="exp-date-badge">
            <span class="exp-date-range">${exp.date}</span>
            <!-- Company badge removed -->
          </div>
        </div>
        <div class="exp-card-content">
          <div class="exp-org">${exp.company}</div>
          <span class="exp-role-badge">${exp.role}</span>
          <div class="exp-loc"><b>Location:</b> ${exp.location}</div>
          <div><b>Work Description:</b>
            <ul class="exp-jd-list">${exp.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
          </div>
          <div class="exp-tech"><b>Tech Stack:</b> ${exp.tech ? exp.tech.join(', ') : ''}</div>
        </div>
      </div>
    `).join("");
  }

  function fillProjects() {
    const projects = (window.profileData && window.profileData.projects) || [];
    const track = document.getElementById("carousel-track");
    const nextBtn = document.getElementById("carousel-next");
    const prevBtn = document.getElementById("carousel-prev");

    if (!track || !projects.length) return;

    track.innerHTML = projects.map(proj => `
      <div class="project-card">
        <div>
          <div class="exp-title">${proj.name}</div>
          <div class="proj-desc">${proj.desc}</div>
          <div class="proj-tech">${proj.tech ? proj.tech.join(", ") : ""}</div>
        </div>
        <div class="proj-git"><a href="${proj.github}" target="_blank" rel="noopener">View on GitHub</a></div>
      </div>
    `).join("");

    const cards = track.children;
    const total = cards.length;
    const showAtOnce = 3;
    let current = 0;

    function updateCarousel() {
      if (!cards.length) return;
      const cardWidth = cards[0].offsetWidth + 24; // approx margins
      track.style.transform = `translateX(${-current * cardWidth}px)`;

      Array.from(cards).forEach((card, i) => {
        if (i >= current && i < current + showAtOnce) card.classList.add('visible');
        else card.classList.remove('visible');
      });
    }

    function nextPage() {
      current = (current + showAtOnce) % total;
      if (current > total - showAtOnce) current = 0;
      updateCarousel();
    }
    function prevPage() {
      current = (current - showAtOnce + total) % total;
      updateCarousel();
    }

    nextBtn.onclick = () => {
      clearInterval(auto);
      nextPage();
      auto = setInterval(nextPage, 4500);
    };
    prevBtn.onclick = () => {
      clearInterval(auto);
      prevPage();
      auto = setInterval(nextPage, 4500);
    };

    updateCarousel();

    let auto = setInterval(nextPage, 4500);
  }

  function fillSkillsAndCertifications() {
    const d = window.profileData;
    function fillBubbles(arr, containerId) {
      const cont = document.getElementById(containerId);
      if (!cont) return;
      cont.innerHTML = (arr || []).map((skill, idx) =>
        `<span class="skill-bubble fade-scroll" style="--bubble-index:${idx};">${skill}</span>`
      ).join('');
    }

    fillBubbles(d.skills?.core, "core-skills");
    fillBubbles(d.skills?.tools, "tool-skills");
    fillBubbles(d.skills?.ai, "ai-skills");

    const grid = document.getElementById("cert-grid");
    if (!grid) return;
    const certs = d.certifications || [];
    grid.innerHTML = certs.map(cert => `
      <div class="cert-card-static fade-scroll">
        <div class="cert-title">${cert.name}</div>
        <div class="cert-desc">${cert.desc}</div>
        <div class="cert-links"><a href="${cert.url}" target="_blank" rel="noopener">View Certificate</a></div>
      </div>
    `).join('');
  }

  function fillTrainingsAndRecognitions() {
    const d = window.profileData;
    const trainingCont = document.getElementById("trainings-bubble-row");
    const recogCont = document.getElementById("recognitions-bubble-row");

    if (trainingCont) {
      trainingCont.innerHTML = (d.trainings || []).map(text =>
        `<div class="training-bubble fade-scroll">${text}</div>`
      ).join("");
    }
    if (recogCont) {
      recogCont.innerHTML = (d.recognitions || []).map(text =>
        `<div class="training-bubble fade-scroll">${text}</div>`
      ).join("");
    }
  }

  // After filling contents, observe fade-ins
  observeFadedElements();
});

// ===== Back to Top logic =====
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("back-to-top");
  const mainContent = document.getElementById("main-content");
  const SHOW_THRESHOLD = 200; // Show after scrolling 200px

  if (!backToTopBtn || !mainContent) return;

  mainContent.addEventListener("scroll", () => {
    if (mainContent.scrollTop > SHOW_THRESHOLD) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    mainContent.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
