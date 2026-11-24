/* =========================================================
   CineVault - Ortak Veri ve Mantık Dosyası (app.js)
   16 Başlangıç Filmi + localStorage + 4 Sayfanın Dinamik Yönetimi
   ========================================================= */

const STORAGE_KEY = "cinevault_filmler";

// 8 Türden 2'şer Adet Toplam 16 Başlangıç Filmi
const baslangicFilmleri = [
  // 1. BİLİM KURGU
  {
    id: 1,
    filmAdi: "Interstellar",
    yonetmen: "Christopher Nolan",
    yil: 2014,
    tur: "Bilim Kurgu",
    izlenmeTarihi: "2026-10-12",
    puan: 9.3,
    afisUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    notlar: "Zaman, yerçekimi ve baba-kız ilişkisi üzerine çekilmiş bir başyapıt. Hans Zimmer müzikleri olağanüstü."
  },
  {
    id: 2,
    filmAdi: "The Matrix",
    yonetmen: "Lana Wachowski, Lilly Wachowski",
    yil: 1999,
    tur: "Bilim Kurgu",
    izlenmeTarihi: "2026-10-15",
    puan: 9.0,
    afisUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    notlar: "Felsefi derinliği ve aksiyon sahnelerindeki çığır açan görsel efektleriyle sinema tarihini değiştiren bir kült."
  },

  // 2. AKSİYON
  {
    id: 3,
    filmAdi: "The Dark Knight",
    yonetmen: "Christopher Nolan",
    yil: 2008,
    tur: "Aksiyon",
    izlenmeTarihi: "2026-10-18",
    puan: 9.1,
    afisUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    notlar: "Heath Ledger'ın Joker performansı kusursuz. Çizgi roman uyarlamalarının zirve noktası."
  },
  {
    id: 4,
    filmAdi: "Mad Max: Fury Road",
    yonetmen: "George Miller",
    yil: 2015,
    tur: "Aksiyon",
    izlenmeTarihi: "2026-10-20",
    puan: 8.7,
    afisUrl: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    notlar: "Temposu bir saniye bile düşmeyen, pratik efektlerin ve görsel tasarımın doruğa çıktığı modern bir aksiyon dersi."
  },

  // 3. DRAM
  {
    id: 5,
    filmAdi: "Fight Club",
    yonetmen: "David Fincher",
    yil: 1999,
    tur: "Dram",
    izlenmeTarihi: "2026-10-22",
    puan: 8.9,
    afisUrl: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
    notlar: "Tüketim toplumuna ve kimlik krizine sert bir eleştiri. Final sahnesi ve kurgusu büyüleyici."
  },
  {
    id: 6,
    filmAdi: "Whiplash",
    yonetmen: "Damien Chazelle",
    yil: 2014,
    tur: "Dram",
    izlenmeTarihi: "2026-10-25",
    puan: 8.6,
    afisUrl: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    notlar: "Mükemmeliyetçilik, hırs ve psikolojik baskının jazz ritimleriyle birleştiği nefes kesici bir düello."
  },

  // 4. KOMEDİ
  {
    id: 7,
    filmAdi: "The Grand Budapest Hotel",
    yonetmen: "Wes Anderson",
    yil: 2014,
    tur: "Komedi",
    izlenmeTarihi: "2026-10-27",
    puan: 8.4,
    afisUrl: "https://m.media-amazon.com/images/I/713kiC-8JhL._AC_UF894,1000_QL80_.jpg",
    notlar: "Wes Anderson'ın simetrik kadrajları, renk paletleri ve Ralph Fiennes'ın oyunculuğuyla masalsı bir komedi."
  },
  {
    id: 8,
    filmAdi: "The Truman Show",
    yonetmen: "Peter Weir",
    yil: 1998,
    tur: "Komedi",
    izlenmeTarihi: "2026-10-29",
    puan: 8.5,
    afisUrl: "https://m.media-amazon.com/images/I/71zEnyA+49L._AC_UF894,1000_QL80_.jpg",
    notlar: "Hiciv ve trajikomik tonu bir arada tutan, Jim Carrey'nin oyunculuk zirvesini sergilediği öncü bir yapım."
  },

  // 5. GERİLİM
  {
    id: 9,
    filmAdi: "Parasite",
    yonetmen: "Bong Joon-ho",
    yil: 2019,
    tur: "Gerilim",
    izlenmeTarihi: "2026-10-31",
    puan: 8.8,
    afisUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    notlar: "Sınıf çatışmasını kara mizah ve tırmanan bir gerilimle işleyen, her karesi ince planlanmış Oscar rekortmeni."
  },
  {
    id: 10,
    filmAdi: "Shutter Island",
    yonetmen: "Martin Scorsese",
    yil: 2010,
    tur: "Gerilim",
    izlenmeTarihi: "2026-11-02",
    puan: 8.5,
    afisUrl: "https://image.tmdb.org/t/p/original/vinX2DNQTlYDT1I84YGiTYZ8bCP.jpg",
    notlar: "Akıl sağlığı, gerçeklik ve suçluluk temalarını işleyen, ters köşesiyle hafızalara kazınan psikolojik gerilim."
  },

  // 6. KORKU
  {
    id: 11,
    filmAdi: "The Shining",
    yonetmen: "Stanley Kubrick",
    yil: 1980,
    tur: "Korku",
    izlenmeTarihi: "2026-11-04",
    puan: 8.6,
    afisUrl: "https://image.tmdb.org/t/p/w500/xazWoLealQwEgqZ89MLZklLZD3k.jpg",
    notlar: "Yalnızlık ve izolasyonun getirdiği çıldırma hali. Kubrick'in kadrajları ve Jack Nicholson'ın performansı ikonik."
  },
  {
    id: 12,
    filmAdi: "Get Out",
    yonetmen: "Jordan Peele",
    yil: 2017,
    tur: "Korku",
    izlenmeTarihi: "2026-11-05",
    puan: 8.1,
    afisUrl: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    notlar: "Sosyal gerilim ve gizemi korku unsurlarıyla harmanlayan son dönemin en özgün yapımlarından biri."
  },

  // 7. SUÇ
  {
    id: 13,
    filmAdi: "Pulp Fiction",
    yonetmen: "Quentin Tarantino",
    yil: 1994,
    tur: "Suç",
    izlenmeTarihi: "2026-11-06",
    puan: 8.9,
    afisUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    notlar: "Doğrusal olmayan kurgusu, unutulmaz müzikleri ve popüler kültüre damga vuran diyaloglarıyla kült bir suç filmi."
  },
  {
    id: 14,
    filmAdi: "The Godfather",
    yonetmen: "Francis Ford Coppola",
    yil: 1972,
    tur: "Suç",
    izlenmeTarihi: "2026-11-07",
    puan: 9.2,
    afisUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    notlar: "Aile, güç ve sadakat ekseninde sinemanın en kusursuz mafya anlatısı ve oyunculuk gösterisi."
  },

  // 8. ANİMASYON
  {
    id: 15,
    filmAdi: "Spirited Away",
    yonetmen: "Hayao Miyazaki",
    yil: 2001,
    tur: "Animasyon",
    izlenmeTarihi: "2026-11-08",
    puan: 10,
    afisUrl: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    notlar: "Miyazaki'nin hayal gücünü ve doğa/insan dengesini yansıtan, görsel atmosferi büyüleyici bir başyapıt."
  },
  {
    id: 16,
    filmAdi: "Spider-Man: Into the Spider-Verse",
    yonetmen: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    yil: 2018,
    tur: "Animasyon",
    izlenmeTarihi: "2026-11-09",
    puan: 8.7,
    afisUrl: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    notlar: "Çizgi roman estetiğini 3D animasyonla birleştiren, görsel devrim niteliğinde modern bir süper kahraman hikayesi."
  }
];

// localStorage'dan filmleri getir (boşsa başlangıç filmlerini yükle)
function filmleriGetir() {
  const kayitliVeri = localStorage.getItem(STORAGE_KEY);
  if (!kayitliVeri) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(baslangicFilmleri));
    return baslangicFilmleri;
  }
  return JSON.parse(kayitliVeri);
}

// Filmleri localStorage'a kaydet
function filmleriKaydet(filmListesi) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filmListesi));
}

// =========================================================
// 1. SAYFA FONKSİYONU: Arşiv Listeleme (index.html)
// =========================================================
function arsivSayfasiniYukle() {
  const gridContainer = document.getElementById("movie-grid");
  const toplamSayac = document.getElementById("total-count");
  const turFiltre = document.getElementById("genre-filter");

  if (!gridContainer) return;

  function listeyiCiz(secilenTur) {
    const tumFilmler = filmleriGetir();
    const filtrelenmis = secilenTur === "Tümü"
      ? tumFilmler
      : tumFilmler.filter(function(f) { return f.tur === secilenTur; });

    toplamSayac.textContent = filtrelenmis.length;
    gridContainer.innerHTML = "";

    if (filtrelenmis.length === 0) {
      gridContainer.innerHTML = "<p>Bu kategoride henüz film bulunmuyor.</p>";
      return;
    }

    filtrelenmis.forEach(function(film) {
      const kart = document.createElement("article");
      kart.className = "movie-card";
      kart.innerHTML = `
        <img class="movie-poster" src="${film.afisUrl}" alt="${film.filmAdi}" onerror="this.src='https://via.placeholder.com/500x750/242c34/ffffff?text=Afis+Yok'" />
        <div class="card-body">
          <h2 class="card-title">${film.filmAdi}</h2>
          <div class="card-meta">${film.tur} • ${film.yil}</div>
          <span class="card-rating">★ ${film.puan} / 10</span>
          <a class="btn-detail" href="detay.html?id=${film.id}">Detayı Gör →</a>
        </div>
      `;
      gridContainer.appendChild(kart);
    });
  }

  turFiltre.addEventListener("change", function() {
    listeyiCiz(this.value);
  });

  listeyiCiz("Tümü");
}

// =========================================================
// 2. SAYFA FONKSİYONU: Film Detayı (detay.html)
// =========================================================
function detaySayfasiniYukle() {
  const detayKutusu = document.getElementById("detail-content");
  if (!detayKutusu) return;

  const params = new URLSearchParams(window.location.search);
  const filmId = Number(params.get("id"));
  const filmler = filmleriGetir();
  const secilenFilm = filmler.find(function(f) { return Number(f.id) === filmId; });

  if (!secilenFilm) {
    detayKutusu.innerHTML = `
      <div class="detail-info">
        <h1>Film Bulunamadı</h1>
        <p>Aradığınız film kaydı mevcut değil veya silinmiş.</p>
        <a class="btn-secondary" href="index.html">← Arşive Geri Dön</a>
      </div>
    `;
    return;
  }

  detayKutusu.innerHTML = `
    <img class="detail-poster" src="${secilenFilm.afisUrl}" alt="${secilenFilm.filmAdi}" onerror="this.src='https://via.placeholder.com/500x750/242c34/ffffff?text=Afis+Yok'" />
    <div class="detail-info">
      <h1>${secilenFilm.filmAdi} (${secilenFilm.yil})</h1>
      <div class="badge-row">
        <span class="badge rating-badge">★ ${secilenFilm.puan} / 10</span>
        <span class="badge">Tür: ${secilenFilm.tur}</span>
        <span class="badge">Yönetmen: ${secilenFilm.yonetmen}</span>
        <span class="badge">İzlenme Tarihi: ${secilenFilm.izlenmeTarihi}</span>
      </div>
      <div class="notes-box">
        <h3>Kişisel İzleme Notlarım & İnceleme</h3>
        <p>${secilenFilm.notlar}</p>
      </div>
      <div class="detail-actions">
        <a class="btn-secondary" href="index.html">← Arşive Dön</a>
        <a class="btn-secondary" href="ekle.html">+ Yeni Film Ekle</a>
        <button id="btn-delete" class="btn-danger">Bu Kaydı Sil</button>
      </div>
    </div>
  `;

  const silBtn = document.getElementById("btn-delete");
  silBtn.addEventListener("click", function() {
    const guncelListe = filmler.filter(function(f) { return Number(f.id) !== filmId; });
    filmleriKaydet(guncelListe);
    window.location.href = "index.html";
  });
}

// =========================================================
// 3. SAYFA FONKSİYONU: Film Ekleme Formu ve Doğrulama (ekle.html)
// =========================================================
function formSayfasiniYukle() {
  const form = document.getElementById("movie-form");
  if (!form) return;

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Hata mesajlarını sıfırla
    const hataAlanlari = document.querySelectorAll(".error-msg");
    hataAlanlari.forEach(function(el) { el.style.display = "none"; });

    const filmAdi = document.getElementById("filmAdi").value.trim();
    const yonetmen = document.getElementById("yonetmen").value.trim();
    const yil = Number(document.getElementById("yil").value);
    const tur = document.getElementById("tur").value;
    const izlenmeTarihi = document.getElementById("izlenmeTarihi").value;
    const puan = Number(document.getElementById("puan").value);
    const afisUrl = document.getElementById("afisUrl").value.trim();
    const notlar = document.getElementById("notlar").value.trim();

    let hataVarMi = false;

    if (filmAdi.length < 2) {
      document.getElementById("err-filmAdi").style.display = "block";
      hataVarMi = true;
    }
    if (yonetmen.length < 2) {
      document.getElementById("err-yonetmen").style.display = "block";
      hataVarMi = true;
    }
    if (!yil || yil < 1888 || yil > 2030) {
      document.getElementById("err-yil").style.display = "block";
      hataVarMi = true;
    }
    if (!tur) {
      document.getElementById("err-tur").style.display = "block";
      hataVarMi = true;
    }
    if (!izlenmeTarihi) {
      document.getElementById("err-tarih").style.display = "block";
      hataVarMi = true;
    }
    if (isNaN(puan) || puan < 1 || puan > 10) {
      document.getElementById("err-puan").style.display = "block";
      hataVarMi = true;
    }
    if (!afisUrl.startsWith("http://") && !afisUrl.startsWith("https://")) {
      document.getElementById("err-afis").style.display = "block";
      hataVarMi = true;
    }
    if (notlar.length < 10) {
      document.getElementById("err-notlar").style.display = "block";
      hataVarMi = true;
    }

    if (hataVarMi) return;

    const mevcutFilmler = filmleriGetir();
    const yeniFilm = {
      id: Date.now(),
      filmAdi: filmAdi,
      yonetmen: yonetmen,
      yil: yil,
      tur: tur,
      izlenmeTarihi: izlenmeTarihi,
      puan: puan,
      afisUrl: afisUrl,
      notlar: notlar
    };

    mevcutFilmler.unshift(yeniFilm);
    filmleriKaydet(mevcutFilmler);

    const basariMesaji = document.getElementById("success-banner");
    basariMesaji.style.display = "block";
    form.reset();

    setTimeout(function() {
      window.location.href = "index.html";
    }, 1200);
  });
}

// =========================================================
// 4. SAYFA FONKSİYONU: İstatistik ve Tablo Sayfası (tablo.html)
// =========================================================
function tabloSayfasiniYukle() {
  const tumTabloGovde = document.getElementById("all-movies-tbody");
  const turTabloGovde = document.getElementById("genre-stats-tbody");
  if (!tumTabloGovde || !turTabloGovde) return;

  const filmler = filmleriGetir();

  // Üst Özet İstatistik Kartları
  const toplamFilmEl = document.getElementById("stat-total");
  const ortPuanEl = document.getElementById("stat-avg");
  const favoriTurEl = document.getElementById("stat-top-genre");
  const enYuksekFilmEl = document.getElementById("stat-best-movie");

  toplamFilmEl.textContent = filmler.length;

  if (filmler.length === 0) {
    ortPuanEl.textContent = "0.0";
    favoriTurEl.textContent = "-";
    enYuksekFilmEl.textContent = "-";
    return;
  }

  let toplamPuan = 0;
  let enIyiFilm = filmler[0];
  const turSayilari = {};
  const turPuanToplamlari = {};

  filmler.forEach(function(f) {
    const p = Number(f.puan);
    toplamPuan += p;
    if (p > Number(enIyiFilm.puan)) {
      enIyiFilm = f;
    }
    if (!turSayilari[f.tur]) {
      turSayilari[f.tur] = 0;
      turPuanToplamlari[f.tur] = 0;
    }
    turSayilari[f.tur] += 1;
    turPuanToplamlari[f.tur] += p;
  });

  ortPuanEl.textContent = (toplamPuan / filmler.length).toFixed(1);
  enYuksekFilmEl.textContent = enIyiFilm.filmAdi + " (" + enIyiFilm.puan + ")";

  // En çok izlenen türü bul
  let maxTur = "-";
  let maxAdet = 0;
  Object.keys(turSayilari).forEach(function(turAdi) {
    if (turSayilari[turAdi] > maxAdet) {
      maxAdet = turSayilari[turAdi];
      maxTur = turAdi;
    }
  });
  favoriTurEl.textContent = maxTur + " (" + maxAdet + ")";

  // Tür Dağılım Tablosunu Doldur
  turTabloGovde.innerHTML = "";
  Object.keys(turSayilari).forEach(function(turAdi) {
    const adet = turSayilari[turAdi];
    const ort = (turPuanToplamlari[turAdi] / adet).toFixed(1);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${turAdi}</strong></td>
      <td>${adet} Film</td>
      <td class="td-rating">★ ${ort}</td>
    `;
    turTabloGovde.appendChild(tr);
  });

  // Tüm Filmler Tablosunu Doldur
  tumTabloGovde.innerHTML = "";
  filmler.forEach(function(f) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><a href="detay.html?id=${f.id}"><strong>${f.filmAdi}</strong></a></td>
      <td>${f.yonetmen}</td>
      <td>${f.tur}</td>
      <td>${f.yil}</td>
      <td>${f.izlenmeTarihi}</td>
      <td class="td-rating">★ ${f.puan}</td>
    `;
    tumTabloGovde.appendChild(tr);
  });
}

// Sayfa Yüklendiğinde İlgili Fonksiyonları Çalıştır
document.addEventListener("DOMContentLoaded", function() {
  arsivSayfasiniYukle();
  detaySayfasiniYukle();
  formSayfasiniYukle();
  tabloSayfasiniYukle();
});
