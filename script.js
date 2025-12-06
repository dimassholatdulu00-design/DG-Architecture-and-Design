/* main.js - DG Architecture & Design */
/* Theme, animation, service select, order modal, WA integration */

document.addEventListener('DOMContentLoaded', () => {

  /* YEAR AUTO */
  document.querySelectorAll('[id^="year"]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* THEME TOGGLE + SAVE */
  const themeBtns = document.querySelectorAll('.theme-toggle');
  const savedTheme = localStorage.getItem('dg-theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light');
  }

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      localStorage.setItem('dg-theme', isLight ? 'light' : 'dark');
      themeBtns.forEach(b => b.textContent = isLight ? '🌤️' : '🌙');
    });

    // initial icon
    btn.textContent = document.body.classList.contains('light') ? "🌤️" : "🌙";
  });

  /* AOS (IntersectionObserver) */
  const aos = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window && aos.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    aos.forEach(el => io.observe(el));
  } else {
    aos.forEach(el => el.classList.add('is-visible'));
  }

  /* PREFILL SERVICE (index -> pemesanan) */
  const params = new URLSearchParams(location.search);
  const prefillService = params.get("service");

  if (prefillService) {
    sessionStorage.setItem("dg-prefill-service", prefillService);
  }

  /* PEMESANAN PAGE LOGIC */
  const serviceButtons = document.querySelectorAll(".service-card-select");
  const selectedServices = new Set();

  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const s = btn.dataset.service;
      const pressed = btn.getAttribute("aria-pressed") === "true";

      if (pressed) {
        btn.setAttribute("aria-pressed", "false");
        selectedServices.delete(s);
      } else {
        btn.setAttribute("aria-pressed", "true");
        selectedServices.add(s);
      }
    });
  });

  // prefill selection from session
  const stored = sessionStorage.getItem("dg-prefill-service");
  if (stored) {
    serviceButtons.forEach(b => {
      if (b.dataset.service.toLowerCase() === stored.toLowerCase()) {
        b.setAttribute("aria-pressed", "true");
        selectedServices.add(b.dataset.service);
      }
    });
  }

  /* BUILD ORDER (modal) */
  const buildBtn = document.getElementById("buildOrder");
  const modal = document.getElementById("orderModal");
  const summary = document.getElementById("orderSummary");
  const closeModal = document.getElementById("modalClose");
  const confirmSend = document.getElementById("confirmSend");

  if (buildBtn) {
    buildBtn.addEventListener("click", () => {
      const name = (document.getElementById("name") || {}).value?.trim() || "";
      const phoneRaw = (document.getElementById("phone") || {}).value?.trim() || "";
      const pack = (document.getElementById("package") || {}).value || "";
      const notes = (document.getElementById("notes") || {}).value.trim() || "-";
      const services = Array.from(selectedServices);

      if (!name) return alert("Isi nama dulu");
      if (!phoneRaw) return alert("Isi nomor WhatsApp");
      if (!services.length) return alert("Pilih minimal 1 pelayanan");
      if (!pack) return alert("Pilih paket terlebih dahulu");

      let phone = phoneRaw.replace(/\D/g, "");
      if (phone.startsWith("0")) phone = "62" + phone.slice(1);

      summary.innerHTML = `
        <p><strong>Nama:</strong> ${escapeHtml(name)}</p>
        <p><strong>Nomor WA:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Pelayanan:</strong> ${services.map(s => escapeHtml(s)).join(", ")}</p>
        <p><strong>Paket:</strong> ${escapeHtml(pack)}</p>
        <p><strong>Keterangan:</strong> ${escapeHtml(notes)}</p>
      `;
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    });
  }

  /* SEND TO WHATSAPP */
  if (confirmSend) {
    confirmSend.addEventListener("click", () => {
      const name = (document.getElementById("name") || {}).value?.trim() || "-";
      let phone = (document.getElementById("phone") || {}).value?.trim() || "";
      const pack = (document.getElementById("package") || {}).value || "-";
      const notes = (document.getElementById("notes") || {}).value?.trim() || "-";
      const services = Array.from(selectedServices);

      phone = phone.replace(/\D/g, "");
      if (phone.startsWith("0")) phone = "62" + phone.slice(1);

      const admin = "6287755103235";

      const message =
        `Halo kak, saya ingin memesan jasa desain.%0A%0A` +
        `Nama: ${encodeURIComponent(name)}%0A` +
        `Nomor WA: ${encodeURIComponent(phone)}%0A` +
        `Pelayanan: ${encodeURIComponent(services.join(", "))}%0A` +
        `Paket: ${encodeURIComponent(pack)}%0A` +
        `Keterangan: ${encodeURIComponent(notes)}`;

      const waUrl = `https://wa.me/${admin}?text=${message}`;
      window.open(waUrl, "_blank");

      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });
  }

  /* ESCAPE HTML */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[m]);
  }

});
