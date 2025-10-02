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
});
