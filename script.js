document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orderForm');
    const notification = document.getElementById('notification');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nama = document.getElementById('nama').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const layanan = document.getElementById('layanan').value;

        const message = `Halo, saya ingin memesan layanan ${layanan}. Nama saya ${nama}.`;
        const whatsappURL = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, '_blank');
        form.reset();
    });
});
