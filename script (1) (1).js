
// === PEMESANAN KE WHATSAPP ===
function kirimWA() {
    const nama = document.getElementById("nama").value;
    const wa = document.getElementById("wa").value;
    const layanan = document.getElementById("layanan").value;

    if (!nama || !wa) {
        alert("Harap isi semua data.");
        return;
    }

    const pesan = 
`Halo DG Architecture, saya ingin melakukan pemesanan:

Nama: ${nama}
Nomor WA: ${wa}
Layanan: ${layanan}

Mohon informasi lebih lanjut.`;

    const nomorTujuan = "6287755103235";
    const url = `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");
}

// === RATING TESTIMONI (CLIENT INPUT) ===
function tambahTestimoni() {
    const nama = document.getElementById("namaTesti").value;
    const rating = document.getElementById("rating").value;
    const pesan = document.getElementById("pesanTesti").value;

    if (!nama || !pesan) {
        alert("Harap isi nama dan pesan testimoni.");
        return;
    }

    const container = document.getElementById("listTestimoni");

    const card = document.createElement("div");
    card.className = "testi-card";
    card.innerHTML = `
        <h4>${nama}</h4>
        <p class="star">` + "⭐".repeat(rating) + `</p>
        <p>${pesan}</p>
    `;

    container.appendChild(card);

    document.getElementById("namaTesti").value = "";
    document.getElementById("rating").value = "5";
    document.getElementById("pesanTesti").value = "";
}
