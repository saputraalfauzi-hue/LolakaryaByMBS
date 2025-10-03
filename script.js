let skor = 0;
let kesempatan = 3;

const bankSoalPython = {
    pemula: [
        {
            question: "Apa output dari kode berikut: print(2 + 3)",
            options: ["5", "23", "6", "Error"],
            answer: "5"
        },
        {
            question: "Fungsi apa yang digunakan untuk menampilkan teks di Python?",
            options: ["echo()", "print()", "output()", "display()"],
            answer: "print()"
        },
        {
            question: "Bagaimana cara mendefinisikan fungsi di Python?",
            options: ["function myFunc():", "def myFunc():", "define myFunc():", "func myFunc():"],
            answer: "def myFunc():"
        },
        {
            question: "Apa tipe data untuk nilai 3.14?",
            options: ["int", "str", "float", "bool"],
            answer: "float"
        },
        {
            question: "Bagaimana cara membuat komentar satu baris di Python?",
            options: ["// Ini komentar", "# Ini komentar", "/* Ini komentar */", "-- Ini komentar"],
            answer: "# Ini komentar"
        }
    ],
    menengah: [
        {
            question: "Apa output dari kode berikut: print([i for i in range(5)])",
            options: ["[0, 1, 2, 3, 4]", "[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4, 5]", "Error"],
            answer: "[0, 1, 2, 3, 4]"
        },
    ],
    lanjutan: [
        {
            question: "Apa yang akan terjadi jika Anda memanggil fungsi generator setelah iterasi selesai?",
            options: ["Program crash", "Mengembalikan None", "Mengeluarkan StopIteration", "Mengulang dari awal"],
            answer: "Mengeluarkan StopIteration"
        }
    ]
};

let currentSoalIndex = 0;
let currentSoalSet = [];

function showModule(moduleId) {
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
        module.style.display = 'none';
    });
    const activeModule = document.getElementById(moduleId);
    if (activeModule) {
        activeModule.classList.add('active');
        activeModule.style.display = 'block';
    }
}

function showSubMtk(subMtkId) {
    document.querySelectorAll('.mtk-submodule').forEach(submodule => {
        submodule.classList.remove('active-submtk');
        submodule.style.display = 'none';
    });
    const activeSubMtk = document.getElementById(subMtkId);
    if (activeSubMtk) {
        activeSubMtk.classList.add('active-submtk');
        activeSubMtk.style.display = 'block';
    }
}

function showSubGame(subGameId) {
    document.querySelectorAll('.game-submodule').forEach(submodule => {
        submodule.classList.remove('active-subgame');
        submodule.style.display = 'none';
    });
    const activeSubGame = document.getElementById(subGameId);
    if (activeSubGame) {
        activeSubGame.classList.add('active-subgame');
        activeSubGame.style.display = 'block';
        
        if (subGameId === 'python-kode') {
            document.getElementById('btn-start-python').style.display = 'block';
            resetQuiz();
        } else if (subGameId === 'debugging') {
            inisialisasiDebuggingGame();
        } else if (subGameId === 'tebak-output') {
            inisialisasiTebakOutput();
        } else if (subGameId === 'bahasa') {
            inisialisasiGameBahasa();
        }
    }
}

function resetQuiz() {
    currentSoalIndex = 0;
    skor = 0;
    kesempatan = 3;
    document.getElementById('skor-info').textContent = `Skor: ${skor} | Kesempatan: ${kesempatan}`;
    document.getElementById('feedback').textContent = 'Klik "Mulai Kuis" untuk memulai.';
    document.getElementById('soal-container').classList.remove('hidden');
    document.getElementById('options-container').innerHTML = '';
    document.getElementById('btn-next').style.display = 'none';
    document.getElementById('pertanyaan').textContent = '';
}

function startGame() {
    const tingkat = document.getElementById('tingkat-kesulitan').value;
    currentSoalSet = bankSoalPython[tingkat];
    resetQuiz();
    document.getElementById('btn-start-python').style.display = 'none';
    generateSoalPython();
}

function generateSoalPython() {
    if (currentSoalIndex >= currentSoalSet.length || kesempatan <= 0) {
        document.getElementById('pertanyaan').textContent = `Kuis Selesai! Skor Akhir: ${skor}`;
        document.getElementById('options-container').innerHTML = '';
        document.getElementById('btn-next').style.display = 'none';
        document.getElementById('btn-start-python').textContent = 'Mulai Ulang Kuis';
        document.getElementById('btn-start-python').style.display = 'block';
        document.getElementById('feedback').textContent = kesempatan <= 0 ? "Kesempatan habis!" : "Anda menyelesaikan semua soal!";
        return;
    }

    const soal = currentSoalSet[currentSoalIndex];
    document.getElementById('pertanyaan').textContent = soal.question;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    document.getElementById('btn-next').style.display = 'none';
    document.getElementById('feedback').textContent = '';

    soal.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.onclick = () => checkPythonAnswer(option, soal.answer, button);
        optionsContainer.appendChild(button);
    });
}

function checkPythonAnswer(selected, correct, button) {
    const allOptions = document.querySelectorAll('#options-container .option-btn');
    allOptions.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.classList.add('correct');
        }
    });

    if (selected === correct) {
        skor++;
        document.getElementById('feedback').textContent = "Jawaban Benar! 🎉";
    } else {
        kesempatan--;
        document.getElementById('feedback').textContent = `Jawaban Salah! Jawaban yang benar adalah: ${correct}`;
        button.classList.add('incorrect');
    }

    document.getElementById('skor-info').textContent = `Skor: ${skor} | Kesempatan: ${kesempatan}`;
    document.getElementById('btn-next').style.display = 'block';
}

function nextSoal() {
    currentSoalIndex++;
    generateSoalPython();
}

function hitungLuasLingkaran() {
    const jari2 = parseFloat(document.getElementById('jari2').value);
    const hasilElement = document.getElementById('hasil-luas-volume');
    if (isNaN(jari2) || jari2 <= 0) {
        hasilElement.textContent = "Masukkan nilai jari-jari yang valid.";
        return;
    }
    const luas = Math.PI * jari2 * jari2;
    hasilElement.textContent = `Luas Lingkaran: ${luas.toFixed(2)}`;
}

function hitungKecepatan() {
    const kecepatan = parseFloat(document.getElementById('kecepatan').value);
    const waktu = parseFloat(document.getElementById('waktu').value);
    const hasilElement = document.getElementById('hasil-kecepatan');
    if (isNaN(kecepatan) || isNaN(waktu) || kecepatan <= 0 || waktu <= 0) {
        hasilElement.textContent = "Masukkan nilai kecepatan dan waktu yang valid.";
        return;
    }
    const jarak = kecepatan * waktu;
    hasilElement.textContent = `Jarak Tempuh: ${jarak.toFixed(2)} km`;
}

function hitungDebit() {
    const volume = parseFloat(document.getElementById('volume').value);
    const waktuDebit = parseFloat(document.getElementById('waktu-debit').value);
    const hasilElement = document.getElementById('hasil-debit');
    if (isNaN(volume) || isNaN(waktuDebit) || volume <= 0 || waktuDebit <= 0) {
        hasilElement.textContent = "Masukkan nilai volume dan waktu yang valid.";
        return;
    }
    const debit = volume / waktuDebit;
    hasilElement.textContent = `Debit: ${debit.toFixed(2)} L/detik`;
}

function hitungSkala() {
    const jarakPeta = parseFloat(document.getElementById('jarak-peta').value);
    const jarakAsli = parseFloat(document.getElementById('jarak-asli').value);
    const hasilElement = document.getElementById('hasil-skala');
    if (isNaN(jarakPeta) || isNaN(jarakAsli) || jarakPeta <= 0 || jarakAsli <= 0) {
        hasilElement.textContent = "Masukkan nilai jarak peta dan jarak asli yang valid.";
        return;
    }
    const jarakAsliCm = jarakAsli * 100000;
    const skala = jarakAsliCm / jarakPeta;
    hasilElement.textContent = `Skala: 1 : ${skala.toFixed(0)}`;
}

function hitungWaktuParuh() {
    const massaAwal = parseFloat(document.getElementById('massa-awal').value);
    const massaAkhir = parseFloat(document.getElementById('massa-akhir').value);
    const waktuTotal = parseFloat(document.getElementById('waktu-total').value);
    const hasilElement = document.getElementById('hasil-waktu-paruh');

    if (isNaN(massaAwal) || isNaN(massaAkhir) || isNaN(waktuTotal) || massaAwal <= 0 || waktuTotal <= 0) {
        hasilElement.textContent = "Masukkan nilai massa/persentase dan waktu yang valid.";
        return;
    }

    if (massaAkhir >= massaAwal) {
        hasilElement.textContent = "Massa/Persentase akhir harus lebih kecil dari awal.";
        return;
    }

    const perbandingan = massaAwal / massaAkhir;
    let n = 0;
    let temp = perbandingan;

    while (temp > 1) {
        temp /= 2;
        n++;
    }

    if (Math.abs(temp - 1) > 0.001) {
        hasilElement.textContent = "Perbandingan massa tidak tepat mengikuti urutan setengah kali.";
        return;
    }

    const waktuParuh = waktuTotal / n;
    hasilElement.textContent = `Waktu Paruh (t½): ${waktuParuh.toFixed(2)} satuan waktu`;
}

function hitungBMI() {
    const berat = parseFloat(document.getElementById('berat').value);
    const tinggiCm = parseFloat(document.getElementById('tinggi').value);
    const hasilElement = document.getElementById('hasil-bmi');

    if (isNaN(berat) || isNaN(tinggiCm) || berat <= 0 || tinggiCm <= 0) {
        hasilElement.textContent = "Masukkan berat dan tinggi badan yang valid.";
        return;
    }

    const tinggiM = tinggiCm / 100;
    const bmi = berat / (tinggiM * tinggiM);
    let kategori = '';

    if (bmi < 18.5) {
        kategori = 'Kekurangan Berat Badan';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        kategori = 'Berat Badan Normal';
    } else if (bmi >= 25 && bmi < 29.9) {
        kategori = 'Kelebihan Berat Badan';
    } else {
        kategori = 'Obesitas';
    }

    hasilElement.textContent = `BMI Anda: ${bmi.toFixed(2)} (${kategori})`;
}

const inputMappings = {
    'select-luas-volume': {
        'kubus': [{ id: 'sisi', label: 'Sisi:' }],
        'balok': [{ id: 'panjang', label: 'Panjang:' }, { id: 'lebar', label: 'Lebar:' }, { id: 'tinggi', label: 'Tinggi:' }],
        'bola': [{ id: 'jari2', label: 'Jari-jari:' }]
    },
    'select-aritmatika': {
        'un': [{ id: 'suku_a', label: 'Suku Pertama (a):' }, { id: 'suku_n', label: 'Suku ke- (n):' }, { id: 'beda_b', label: 'Beda (b):' }],
        'sn': [{ id: 'suku_a', label: 'Suku Pertama (a):' }, { id: 'suku_n', label: 'Jumlah Suku (n):' }, { id: 'beda_b', label: 'Beda (b):' }]
    },
    'select-geometri': {
        'un': [{ id: 'suku_a', label: 'Suku Pertama (a):' }, { id: 'suku_n', label: 'Suku ke- (n):' }, { id: 'rasio_r', label: 'Rasio (r):' }],
        'sn': [{ id: 'suku_a', label: 'Suku Pertama (a):' }, { id: 'suku_n', label: 'Jumlah Suku (n):' }, { id: 'rasio_r', label: 'Rasio (r):' }]
    }
};

function generateInputFields(selectId) {
    const selectElement = document.getElementById(selectId);
    const containerId = selectId === 'select-luas-volume' ? 'input-luas-volume' : 'input-deret';
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    const selectedValue = selectElement.value;

    if (selectedValue && inputMappings[selectId][selectedValue]) {
        inputMappings[selectId][selectedValue].forEach(field => {
            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.textContent = field.label;
            const input = document.createElement('input');
            input.setAttribute('type', 'number');
            input.setAttribute('id', field.id);
            input.setAttribute('placeholder', field.label.replace(':', ''));
            container.appendChild(label);
            container.appendChild(input);
        });
    }
}

function handleDeretChange() {
    const selectDeret = document.getElementById('select-deret');
    const selectAritmatika = document.getElementById('select-aritmatika');
    const selectGeometri = document.getElementById('select-geometri');

    selectAritmatika.classList.add('hidden');
    selectGeometri.classList.add('hidden');
    document.getElementById('input-deret').innerHTML = '';

    if (selectDeret.value === 'aritmatika') {
        selectAritmatika.classList.remove('hidden');
        selectAritmatika.innerHTML = `
            <option value="none">Pilih Hitungan</option>
            <option value="un">Suku ke-n (Un)</option>
            <option value="sn">Jumlah Suku ke-n (Sn)</option>
        `;
        selectAritmatika.onchange = () => generateInputFields('select-aritmatika');
        generateInputFields('select-aritmatika');
    } else if (selectDeret.value === 'geometri') {
        selectGeometri.classList.remove('hidden');
        selectGeometri.innerHTML = `
            <option value="none">Pilih Hitungan</option>
            <option value="un">Suku ke-n (Un)</option>
            <option value="sn">Jumlah Suku ke-n (Sn)</option>
        `;
        selectGeometri.onchange = () => generateInputFields('select-geometri');
        generateInputFields('select-geometri');
    }
}

document.getElementById('select-deret').addEventListener('change', handleDeretChange);
document.getElementById('select-luas-volume').addEventListener('change', () => generateInputFields('select-luas-volume'));


function hitungDeret() {
    const deretType = document.getElementById('select-deret').value;
    let selectElementId = '';
    
    if (deretType === 'aritmatika') {
        selectElementId = 'select-aritmatika';
    } else if (deretType === 'geometri') {
        selectElementId = 'select-geometri';
    } else {
        document.getElementById('hasil-deret').textContent = "Pilih jenis deret terlebih dahulu.";
        return;
    }

    const hitunganType = document.getElementById(selectElementId).value;
    const hasilElement = document.getElementById('hasil-deret');
    const inputMap = inputMappings[selectElementId][hitunganType];
    const values = {};
    let error = false;

    if (!inputMap) {
        hasilElement.textContent = "Pilih hitungan yang ingin dilakukan.";
        return;
    }

    inputMap.forEach(field => {
        const input = document.getElementById(field.id);
        const value = parseFloat(input.value);
        if (isNaN(value)) {
            error = true;
        }
        values[field.id] = value;
    });

    if (error) {
        hasilElement.textContent = "Masukkan semua nilai input yang valid.";
        return;
    }

    let hasil = 0;
    
    if (deretType === 'aritmatika') {
        const a = values['suku_a'];
        const n = values['suku_n'];
        const b = values['beda_b'];
        
        if (hitunganType === 'un') {
            hasil = a + (n - 1) * b;
            hasilElement.textContent = `Suku ke-${n} (Un): ${hasil.toFixed(2)}`;
        } else if (hitunganType === 'sn') {
            hasil = (n / 2) * (2 * a + (n - 1) * b);
            hasilElement.textContent = `Jumlah Suku ke-${n} (Sn): ${hasil.toFixed(2)}`;
        }
    } else if (deretType === 'geometri') {
        const a = values['suku_a'];
        const n = values['suku_n'];
        const r = values['rasio_r'];
        
        if (hitunganType === 'un') {
            hasil = a * Math.pow(r, n - 1);
            hasilElement.textContent = `Suku ke-${n} (Un): ${hasil.toFixed(2)}`;
        } else if (hitunganType === 'sn') {
            if (r === 1) {
                hasil = a * n;
            } else {
                hasil = a * (Math.pow(r, n) - 1) / (r - 1);
            }
            hasilElement.textContent = `Jumlah Suku ke-${n} (Sn): ${hasil.toFixed(2)}`;
        }
    }
}

document.getElementById('btn-deret').addEventListener('click', hitungDeret);


function inisialisasiDebuggingGame() {
    document.getElementById('debug-feedback').textContent = "Game Debugging siap! Klik Mulai Debugging.";
    document.getElementById('btn-debug-next').style.display = 'none';
    document.getElementById('debug-pertanyaan').innerHTML = '';
    document.getElementById('debug-options').innerHTML = '';
    document.getElementById('btn-start-debugging').style.display = 'block';
}

function inisialisasiTebakOutput() {
    document.getElementById('tebak-feedback').textContent = "Game Tebak Output siap! Klik Mulai Tebak.";
    document.getElementById('btn-tebak-next').style.display = 'none';
    document.getElementById('tebak-pertanyaan').innerHTML = '';
    document.getElementById('tebak-options').innerHTML = '';
    document.getElementById('btn-start-tebak-output').style.display = 'block';
}

function inisialisasiGameBahasa() {
    document.getElementById('bahasa-feedback').textContent = "Game Bahasa Pemrograman siap! Klik Mulai Game Bahasa.";
    document.getElementById('btn-bahasa-next').style.display = 'none';
    document.getElementById('bahasa-pertanyaan').innerHTML = '';
    document.getElementById('bahasa-options').innerHTML = '';
    document.getElementById('btn-start-bahasa').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tabs button').forEach(button => {
        button.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            showModule(moduleId);
            document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active-tab'));
            this.classList.add('active-tab');

            if (moduleId === 'mtk') {
                document.querySelector('.mtk-submenu button').click();
            } else if (moduleId === 'game') {
                document.querySelector('.game-submenu button').click();
            }
        });
    });

    const profileButton = document.querySelector('.tabs button[data-module="profile"]');
    if (profileButton) {
        profileButton.classList.add('active-tab');
        profileButton.click();
    } else {
        showModule('profile');
    }

    document.querySelectorAll('.mtk-submenu button').forEach(button => {
        button.addEventListener('click', function() {
            const subMtkId = this.getAttribute('data-submtk');
            showSubMtk(subMtkId);
            document.querySelectorAll('.mtk-submenu button').forEach(btn => btn.classList.remove('active-submtk'));
            this.classList.add('active-submtk');
        });
    });
    
    document.querySelectorAll('.game-submenu button').forEach(button => {
        button.addEventListener('click', function() {
            const subGameId = this.getAttribute('data-subgame');
            showSubGame(subGameId);
            document.querySelectorAll('.game-submenu button').forEach(btn => btn.classList.remove('active-subgame'));
            this.classList.add('active-subgame');
        });
    });

    document.getElementById('btn-start-python').addEventListener('click', startGame);
    document.getElementById('btn-next').addEventListener('click', nextSoal);
    document.getElementById('btn-bmi').addEventListener('click', hitungBMI);
    document.getElementById('btn-luas-lingkaran').addEventListener('click', hitungLuasLingkaran);
    document.getElementById('btn-kecepatan').addEventListener('click', hitungKecepatan);
    document.getElementById('btn-debit').addEventListener('click', hitungDebit);
    document.getElementById('btn-skala').addEventListener('click', hitungSkala);
    document.getElementById('btn-waktu-paruh').addEventListener('click', hitungWaktuParuh);
});

