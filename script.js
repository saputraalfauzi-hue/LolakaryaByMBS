function showModule(moduleId) {
    document.querySelectorAll('.module').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });

    document.querySelectorAll('.tabs button').forEach(button => {
        button.classList.remove('active-tab');
    });

    const activeModule = document.getElementById(moduleId);
    activeModule.classList.remove('hidden');
    activeModule.classList.add('active');

    let buttonText = '';
    if (moduleId === 'mtk') buttonText = 'Matematika & Fisika';
    else if (moduleId === 'kesehatan') buttonText = 'Kesehatan & Kebugaran';
    else if (moduleId === 'game') buttonText = 'Minigame Bahasa';

    document.querySelectorAll('.tabs button').forEach(button => {
        if (button.textContent.trim() === buttonText) {
            button.classList.add('active-tab');
        }
    });
}

function showSubMtk(subMtkId) {
    document.querySelectorAll('.mtk-subcontent').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
    });

    document.querySelectorAll('.mtk-submenu button').forEach(button => {
        button.classList.remove('active-submtk');
    });

    const activeSubMtk = document.getElementById(subMtkId);
    if (activeSubMtk) {
        activeSubMtk.classList.remove('hidden');
        activeSubMtk.classList.add('active');
    }

    document.querySelector(`.mtk-submenu button[onclick="showSubMtk('${subMtkId}')"]`).classList.add('active-submtk');
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

document.addEventListener('DOMContentLoaded', inisialisasiGame);

document.addEventListener('DOMContentLoaded', () => {
    showModule('mtk');
    showSubMtk('mtk-default');
});
