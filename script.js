
function openOrder(){document.getElementById('orderPage').classList.remove('hidden');window.scrollTo(0,0);}
function closeOrder(){document.getElementById('orderPage').classList.add('hidden');}

function previewImg(){
 let v=document.getElementById('jenis').value;
 let p=document.getElementById('prevImg');
 if(v=='Desain Interior')p.src='interior.jpg';
 if(v=='Desain Eksterior')p.src='exterior.jpg';
 if(v=='Custom Kitchen Set')p.src='kitchen.jpg';
 updateWA();
}

function updateWA(){
 let nama=document.getElementById('nama').value;
 let wa=document.getElementById('wa').value;
 let jenis=document.getElementById('jenis').value;
 let cat=document.getElementById('catatan').value;
 let pesan=`Halo, saya ingin memesan:\nNama: ${nama}\nWA: ${wa}\nLayanan: ${jenis}\nCatatan: ${cat}`;
 document.getElementById('waLink').href="https://wa.me/6280000000000?text="+encodeURIComponent(pesan);
}

document.querySelectorAll("[data-ani]").forEach(el=>{
 let obs=new IntersectionObserver(e=>{
  e.forEach(x=>{if(x.isIntersecting)x.target.classList.add("animate")})
 });
 obs.observe(el);
});
