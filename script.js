function showModule(moduleId) {
    document.querySelectorAll('.module').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });

    const activeModule = document.getElementById(moduleId);
    if (activeModule) {
        activeModule.classList.remove('hidden');
        activeModule.classList.add('active');
    }
}

function showSubMtk(subMtkId) {
    document.querySelectorAll('.mtk-subcontent').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
    });

    const activeSubMtk = document.getElementById(subMtkId);
    if (activeSubMtk) {
        activeSubMtk.classList.remove('hidden');
        activeSubMtk.classList.add('active');
    }
}

function hitungLuasLingkaran() {
    const r = parseFloat(document.getElementById('jari-jari').value);
    const hasilElement = document.getElementById('hasil-mtk');

    if (isNaN(r) || r <= 0) {
        hasilElement.textContent = "Masukkan angka jari-jari yang valid.";
        return;
    }

    const Luas = Math.PI * Math.pow(r, 2);
    hasilElement.textContent = Luas.toFixed(2);
}

function hitungKecepatan() {
    const s = parseFloat(document.getElementById('jarak-kec').value);
    const t = parseFloat(document.getElementById('waktu-kec').value);
    const hasilElement = document.getElementById('hasil-kecepatan');

    if (isNaN(s) || isNaN(t) || t <= 0) {
        hasilElement.textContent = "Data tidak valid.";
        return;
    }

    const v = s / t;
    hasilElement.textContent = v.toFixed(2);
}

function hitungDebit() {
    const v = parseFloat(document.getElementById('volume-deb').value);
    const t = parseFloat(document.getElementById('waktu-deb').value);
    const hasilElement = document.getElementById('hasil-debit');

    if (isNaN(v) || isNaN(t) || t <= 0) {
        hasilElement.textContent = "Data tidak valid.";
        return;
    }

    const Q = v / t;
    hasilElement.textContent = Q.toFixed(2);
}

function hitungSkala() {
    const jp = parseFloat(document.getElementById('jarak-peta').value);
    const js_km = parseFloat(document.getElementById('jarak-sebenarnya').value);
    const hasilElement = document.getElementById('hasil-skala');

    if (isNaN(jp) || isNaN(js_km) || jp <= 0 || js_km <= 0) {
        hasilElement.textContent = "Data tidak valid.";
        return;
    }

    const js_cm = js_km * 100000;
    
    const skala = js_cm / jp;
    hasilElement.textContent = Math.round(skala).toLocaleString('id-ID');
}

function hitungPersegiPanjang() {
    const p = parseFloat(document.getElementById('p-pp').value);
    const l = parseFloat(document.getElementById('l-pp').value);
    const luasElement = document.getElementById('luas-pp');
    const kelilingElement = document.getElementById('keliling-pp');

    if (isNaN(p) || isNaN(l) || p <= 0 || l <= 0) {
        luasElement.textContent = "Input tidak valid.";
        kelilingElement.textContent = "Input tidak valid.";
        return;
    }

    const luas = p * l;
    const keliling = 2 * (p + l);

    luasElement.textContent = luas.toFixed(2);
    kelilingElement.textContent = keliling.toFixed(2);
}

function hitungBMI() {
    const berat = parseFloat(document.getElementById('berat').value);
    const tinggi = parseFloat(document.getElementById('tinggi').value);
    const hasilBMIElement = document.getElementById('hasil-bmi');
    const kategoriElement = document.getElementById('kategori-bmi');

    if (isNaN(berat) || isNaN(tinggi) || tinggi <= 0) {
        hasilBMIElement.textContent = "Data tidak valid.";
        kategoriElement.textContent = "";
        return;
    }

    const bmi = berat / (tinggi * tinggi);
    let kategori = "";

    if (bmi < 18.5) {
        kategori = "Kurus (Underweight)";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        kategori = "Normal (Healthy Weight)";
    } else if (bmi >= 25 && bmi <= 29.9) {
        kategori = "Gemuk (Overweight)";
    } else {
        kategori = "Obesitas (Obese)";
    }

    hasilBMIElement.textContent = bmi.toFixed(2);
    kategoriElement.textContent = kategori;
}

const daftarKata = ["PRODUKTIVITAS", "PENGKODEAN", "ALGORITMA", "TEKNOLOGI", "GEMINI"];
let kataSaatIni = "";

function acakKata(kata) {
    return kata.split('').sort(() => 0.5 - Math.random()).join('');
}

function inisialisasiGame() {
    const indeksAcak = Math.floor(Math.random() * daftarKata.length);
    kataSaatIni = daftarKata[indeksAcak];

    document.getElementById('kata-acak').textContent = acakKata(kataSaatIni);
    document.getElementById('hasil-game').textContent = "Susunlah kata ini!";
    document.getElementById('jawaban').value = "";
}

function cekJawaban() {
    const jawabanUser = document.getElementById('jawaban').value.toUpperCase();
    const hasilGameElement = document.getElementById('hasil-game');

    if (jawabanUser === kataSaatIni) {
        hasilGameElement.textContent = "🎉 Selamat! Jawaban Anda Benar!";
        setTimeout(inisialisasiGame, 2000);
    } else {
        hasilGameElement.textContent = "❌ Coba lagi. Jawaban Anda salah.";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showModule('mtk');
    document.querySelector('.tabs button[data-module="mtk"]').classList.add('active-tab');
    
    showSubMtk('mtk-default');
    
    inisialisasiGame();

    const tabButtons = document.querySelectorAll('.tabs button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active-tab'));
            button.classList.add('active-tab');
            const moduleId = button.dataset.module;
            showModule(moduleId);
        });
    });

    const subMtkButtons = document.querySelectorAll('.mtk-submenu button');
    subMtkButtons.forEach(button => {
        button.addEventListener('click', () => {
            subMtkButtons.forEach(btn => btn.classList.remove('active-submtk'));
            button.classList.add('active-submtk');
            const subMtkId = button.dataset.submtk;
            showSubMtk(subMtkId);
        });
    });

    document.getElementById('btn-luas-lingkaran').addEventListener('click', hitungLuasLingkaran);
    document.getElementById('btn-kecepatan').addEventListener('click', hitungKecepatan);
    document.getElementById('btn-debit').addEventListener('click', hitungDebit);
    document.getElementById('btn-skala').addEventListener('click', hitungSkala);
    document.getElementById('btn-persegi-panjang').addEventListener('click', hitungPersegiPanjang);
    document.getElementById('btn-bmi').addEventListener('click', hitungBMI);
    document.getElementById('btn-cek-jawaban').addEventListener('click', cekJawaban);
});
