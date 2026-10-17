(() => {
  const phone = "916297442949";
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    }));
  }

  document.querySelectorAll("[data-enquiry]").forEach(link => {
    const name = link.getAttribute("data-enquiry") || "a product";
    const message = `Hello MS BROOM, I want to enquire about ${name}. Please share price, availability and wholesale quantity details.`;
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener";
  });

  const search = document.getElementById("productSearch");
  const cards = [...document.querySelectorAll(".product-card")];
  const count = document.getElementById("resultCount");
  const empty = document.getElementById("emptyState");
  if (search) {
    search.addEventListener("input", () => {
      const term = search.value.trim().toLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const matches = (card.dataset.product || card.textContent).toLowerCase().includes(term);
        card.hidden = !matches;
        if (matches) visible++;
      });
      if (count) count.textContent = `${visible} product${visible === 1 ? "" : "s"}`;
      if (empty) empty.hidden = visible !== 0;
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const max = card.classList.contains("product-card") ? 5 : 3.5;
        card.style.transform = `perspective(1000px) rotateX(${(0.5-y)*max}deg) rotateY(${(x-0.5)*max}deg) translateY(-2px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();