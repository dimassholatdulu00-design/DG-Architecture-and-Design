document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orderForm');
    const notification = document.getElementById('notification');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nama = document.getElementById('nama').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const layanan = document.getElementById('layanan').value;
        const catatan = document.getElementById('catatan').value;
        
        // Cek apakah ada pekerjaan aktif (jika localStorage memiliki item)
        const keys = Object.keys(localStorage);
        const hasActiveWork = keys.some(key => key.startsWith('client'));
        
        if (hasActiveWork) {
            notification.textContent = 'Saat ini kami sedang mengerjakan proyek pelanggan lain. Pesanan Anda masuk dalam antrian.';
            notification.style.display = 'block';
            notification.style.color = 'red';
            notification.style.marginTop = '20px';
        }
        
        // Simpan ke localStorage sebagai antrian
        let clientNumber = 1;
        while (localStorage.getItem(`client${clientNumber}`)) {
            clientNumber++;
        }
        localStorage.setItem(`client${clientNumber}`, `Klien ${clientNumber}: ${nama} - ${layanan} - ${catatan}`);
        
        // Redirect ke WhatsApp
        const message = `Halo, saya ingin memesan layanan ${layanan}. Nama saya ${nama}.`;
        const whatsappURL = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`; // Ganti nomor WhatsApp dengan yang benar
        window.open(whatsappURL, '_blank');
        
        // Reset form
        form.reset();
    });
});