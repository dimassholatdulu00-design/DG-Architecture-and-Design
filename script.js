// === PEMESANAN KE WHATSAPP & LOGIKA WEBSITE ===

// Nomor WA target (gunakan format internasional tanpa +)
const WA_NUMBER = "6287755103235";

/**
 * Format angka jadi Rupiah, contoh: 350000 -> "Rp 350.000"
 */
function formatRp(n) {
  return "Rp " + Number(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Hitung total berdasarkan layanan, paket, dan tambahan
 */
function calcTotal(layanan, paket, tambahan = 0) {
  const hargaLayanan = {
    "Desain Eksterior": 350000,
    "Desain Interior": 300000,
    "Custom Kitchen Set": 250000,
    "Eksterior + Interior": 800000
  };
  const hargaPaket = {
    "Normal": 300000,
    "Reguler": 375000,
    "Premium": 450000
  };

  const la = hargaLayanan[layanan] || 0;
  const pa = hargaPaket[paket] || 0;
  return la + pa + Number(tambahan || 0);
}

/**
 * Fallback send WA (dipanggil dari tombol)
 */
function kirimWA() {
  const nama = document.getElementById("nama")?.value || "-";
  const wa = document.getElementById("wa")?.value || "-";
  const layanan = document.getElementById("layanan")?.value || "-";
  const paket = document.getElementById("package")?.value || "-";
  const tambahan = document.getElementById("tambahan")?.value || 0;

  if (!nama || !wa) {
    alert("Harap isi Nama dan Nomor WA.");
    return;
  }

  const total = calcTotal(layanan, paket, tambahan);
  const pesan =
    "📩 PESANAN BARU\n\n" +
    "Nama           : " + nama + "\n" +
    "Nomor WA       : " + wa + "\n" +
    "Layanan        : " + layanan + "\n" +
    "Harga Layanan  : " + formatRp((() => {
      const m = { "Desain Eksterior": 350000, "Desain Interior": 300000, "Custom Kitchen Set": 250000, "Eksterior + Interior": 800000 };
      return m[layanan] || 0;
    })()) + "\n" +
    "Paket          : " + paket + "\n" +
    "Harga Paket    : " + formatRp((() => {
      const p = { "Normal": 300000, "Reguler": 375000, "Premium": 450000 };
      return p[paket] || 0;
    })()) + "\n" +
    "Tambahan       : " + formatRp(tambahan || 0) + "\n" +
    "TOTAL          : " + formatRp(total) + "\n\n" +
    "Catatan: Harga dapat berubah tergantung tingkat kesulitan.";

  const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(pesan);
  window.open(url, "_blank");
}

/**
 * Simpan order ke localStorage dan pindah ke halaman rincian
 */
function toSummary() {
  const data = {
    nama: document.getElementById("nama")?.value || "-",
    wa: document.getElementById("wa")?.value || "-",
    layanan: document.getElementById("layanan")?.value || "-",
    paket: document.getElementById("package")?.value || "-",
    tambahan: document.getElementById("tambahan")?.value || 0,
    waktu: new Date().toLocaleString()
  };
  localStorage.setItem("dg_order", JSON.stringify(data));
  window.location.href = "rincian.html";
}

/**
 * Load summary di halaman rincian.html
 */
function loadSummary() {
  const raw = localStorage.getItem("dg_order");
  if (!raw) return;
  const d = JSON.parse(raw);
  const total = calcTotal(d.layanan, d.paket, d.tambahan);
  if(document.getElementById("sum_nama")) document.getElementById("sum_nama").innerText = d.nama;
  if(document.getElementById("sum_wa")) document.getElementById("sum_wa").innerText = d.wa;
  if(document.getElementById("sum_layanan")) document.getElementById("sum_layanan").innerText = d.layanan;
  if(document.getElementById("sum_paket")) document.getElementById("sum_paket").innerText = d.paket;
  if(document.getElementById("sum_tambahan")) document.getElementById("sum_tambahan").innerText = formatRp(Number(d.tambahan || 0));
  if(document.getElementById("sum_total")) document.getElementById("sum_total").innerText = formatRp(total);
  if(document.getElementById("sum_waktu")) document.getElementById("sum_waktu").innerText = d.waktu;
}

/**
 * Fungsi untuk memilih service lewat service-card (Model A)
 */
function selectService(el) {
  document.querySelectorAll(".service-card").forEach(c => c.classList.remove("selected"));
  el.classList.add('selected');
  const svc = el.getAttribute('data-service') || el.dataset.service;
  const hidden = document.getElementById('layanan');
  if (hidden) hidden.value = svc;
}

/**
 * Admin testimonial: simpan ke localStorage (dgn gambar dataURL)
 */
function saveAdminTesti(e) {
  e.preventDefault();
  const raw = localStorage.getItem('dg_testi') || '[]';
  const arr = JSON.parse(raw);
  const obj = {
    id: Date.now(),
    client: document.getElementById('admin_client')?.value || '-',
    layanan: document.getElementById('admin_layanan')?.value || '-',
    paket: document.getElementById('admin_paket')?.value || '-',
    harga_layanan: document.getElementById('admin_harga_layanan')?.value || '0',
    harga_paket: document.getElementById('admin_harga_paket')?.value || '0',
    tambahan: document.getElementById('admin_tambahan')?.value || '0',
    total: (Number(document.getElementById('admin_harga_layanan')?.value || 0) + Number(document.getElementById('admin_harga_paket')?.value || 0) + Number(document.getElementById('admin_tambahan')?.value || 0)),
    testi: document.getElementById('admin_testi')?.value || '',
    waktu: new Date().toLocaleDateString(),
    images: []
  };

  const files = document.getElementById('admin_images')?.files || [];
  const readers = [];
  for (let i = 0; i < files.length; i++) {
    readers.push(new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result);
      fr.onerror = () => rej();
      fr.readAsDataURL(files[i]);
    }));
  }

  Promise.all(readers).then(results => {
    obj.images = results;
    arr.unshift(obj);
    localStorage.setItem('dg_testi', JSON.stringify(arr));
    window.location.href = 'testimoni.html';
  });
}

/**
 * Load testimonials & client ratings
 */
function loadTestimonials() {
  const raw = localStorage.getItem('dg_testi') || '[]';
  const arr = JSON.parse(raw);
  const container = document.getElementById('testi_container');
  if (container) {
    container.innerHTML = '';
    arr.forEach(t => {
      const div = document.createElement('div');
      div.className = 'testi-card';
      const imgs = t.images.map(i => `<img src="${i}" style="width:100%;border-radius:8px;margin-bottom:8px">`).join('');
      div.innerHTML =
        imgs +
        `<h3>${t.client}</h3>
         <p class="small-muted">${t.layanan} • ${t.paket}</p>
         <p>Harga Layanan: ${formatRp(t.harga_layanan)} | Harga Paket: ${formatRp(t.harga_paket)} | Tambahan: ${formatRp(t.tambahan)}</p>
         <p style="font-weight:700">Total: ${formatRp(t.total)}</p>
         <p>${t.testi}</p>`;
      container.appendChild(div);
    });
  }

  const raw2 = localStorage.getItem('dg_ratings') || '[]';
  const rarr = JSON.parse(raw2);
  const rcont = document.getElementById('rating_container');
  if (rcont) {
    rcont.innerHTML = '';
    rarr.forEach(r => {
      const rd = document.createElement('div');
      rd.className = 'testi-card';
      rd.innerHTML = `<div class="rating">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div><p>${r.comment}</p><p class="small-muted">${r.name || 'Anonim'}</p>`;
      rcont.appendChild(rd);
    });
  }
}

/**
 * Save client rating
 */
function saveRating(e) {
  e.preventDefault();
  const stars = document.querySelector('input[name="stars"]:checked') ? Number(document.querySelector('input[name="stars"]:checked').value) : 5;
  const name = document.getElementById('rate_name')?.value || 'Anonim';
  const comment = document.getElementById('rate_comment')?.value || '';
  const raw = localStorage.getItem('dg_ratings') || '[]';
  const arr = JSON.parse(raw);
  arr.unshift({ stars: Number(stars), name: name, comment: comment, date: new Date().toLocaleDateString() });
  localStorage.setItem('dg_ratings', JSON.stringify(arr));
  window.location.href = 'testimoni.html';
}

/**
 * Init on DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('sum_total')) loadSummary();
  if (document.getElementById('testi_container')) loadTestimonials();
  const adminForm = document.getElementById('admin_testi_form');
  if (adminForm) adminForm.addEventListener('submit', saveAdminTesti);
  const ratingForm = document.getElementById('rating_form');
  if (ratingForm) ratingForm.addEventListener('submit', saveRating);
});
