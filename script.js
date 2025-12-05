
function goTo(page){
  window.location.href = page;
}

function previewService(){
  const sel = document.getElementById('jenis');
  const img = document.getElementById('previewService');
  const val = sel.value;
  if(val.includes('Interior')) img.src='interior1.jpg';
  if(val.includes('Eksterior')) img.src='exterior1.jpg';
  if(val.includes('Kitchen')) img.src='kitchen1.jpg';
  updateEstimate();
}

function updateEstimate(){
  const pkg = document.getElementById('package').value;
  const est = document.getElementById('estimate');
  let price = 0;
  if(pkg=='Basic') price=1500000;
  if(pkg=='Standard') price=3000000;
  if(pkg=='Premium') price=6000000;
  estimate.innerText = 'Estimasi harga: Rp ' + price.toLocaleString();
}

function updateWhatsAppLink(){
  const nama = document.getElementById('nama').value || ' - ';
  const wa = document.getElementById('wa').value || ' - ';
  const jenis = document.getElementById('jenis').value || ' - ';
  const paket = document.getElementById('package').value || ' - ';
  const cat = document.getElementById('catatan').value || ' - ';
  const msg = `Halo DG Architecture, saya ingin memesan:\nNama: ${nama}\nWA: ${wa}\nLayanan: ${jenis}\nPaket: ${paket}\nCatatan: ${cat}`;
  document.getElementById('waLink').href = 'https://wa.me/6280000000000?text=' + encodeURIComponent(msg);
}

document.addEventListener('DOMContentLoaded', ()=>{
  try{ previewService(); updateEstimate(); }catch(e){}
});
