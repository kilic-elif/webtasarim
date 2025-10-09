/* Güncel Tarihten Yeni Yıl Arasındaki Gün/Saat/Dakika/Saniye Hesabı */
function guncelTarih(hedefTarih) {
  const simdi = new Date();
  const fark = (hedefTarih - simdi) / 1000; // saniye cinsinden fark

  return {
    gun: Math.floor(fark / (3600 * 24)),
    saat: Math.floor((fark / 3600) % 24),
    dakika: Math.floor((fark / 60) % 60),
    saniye: Math.floor(fark % 60),
    toplam: fark,
  };
}

/* Sayı Değişiminde Animasyon */
function animasyon(span) {
  span.classList.add("flip");
  setTimeout(() => span.classList.remove("flip"), 700);
}

/* Geri Sayımı Başlat */
function baslat(id, hedefTarih) {
  const zamanElem = document.getElementById(id);

  const interval = setInterval(() => {
    const kalan = guncelTarih(hedefTarih);

    zamanElem.innerHTML = `
      <span>${kalan.gun}</span>
      <span>${kalan.saat}</span>
      <span>${kalan.dakika}</span>
      <span>${kalan.saniye}</span>
    `;

    const spans = zamanElem.getElementsByTagName("span");

    // Animasyon kontrolü
    animasyon(spans[3]);
    if (kalan.saniye === 59) animasyon(spans[2]);
    if (kalan.dakika === 59 && kalan.saniye === 59) animasyon(spans[1]);
    if (kalan.saat === 23 && kalan.dakika === 59 && kalan.saniye === 59)
      animasyon(spans[0]);

    // Süre bittiyse sıfırla
    if (kalan.toplam <= 0) {
      clearInterval(interval);
      zamanElem.innerHTML = `<span>0</span><span>0</span><span>0</span><span>0</span>`;
    }
  }, 1000);
}

/* Sayfa Yüklendiğinde Başlat */
window.onload = function () {
  const simdi = new Date();
  const gelecekYil = simdi.getFullYear() + 1;
  const yeniYil = new Date(`1 Jan ${gelecekYil} 00:00:00`);
  baslat("clock", yeniYil);
};
