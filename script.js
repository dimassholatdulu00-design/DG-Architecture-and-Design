// ===== NAVBAR SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// ===== FORM PEMESANAN KIRIM WHATSAPP =====
const form = document.getElementById("form-pemesanan");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nama = document.getElementById("nama").value;
        const kontak = document.getElementById("kontak").value;
        const layanan = document.getElementById("layanan").value;
        const catatan = document.getElementById("catatan").value;

        const pesanWA =
`Halo, saya ingin melakukan pemesanan:

Nama : ${nama}
Kontak : ${kontak}
Jenis Layanan : ${layanan}
Catatan :
${catatan}

Terima kasih.`;

        const nomorWA = "62895375108037";
        const link = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanWA)}`;

        window.open(link, "_blank");
    });
}

console.log("DG Architecture Website Loaded ✓");
