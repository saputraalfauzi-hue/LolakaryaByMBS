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
        {
            question: "Bagaimana cara menangani exception di Python?",
            options: ["try-catch", "try-except", "catch-try", "error-handle"],
            answer: "try-except"
        },
        {
            question: "Apa output dari kode berikut: print('Hello' + 'World')",
            options: ["HelloWorld", "Hello World", "Hello+World", "Error"],
            answer: "HelloWorld"
        },
        {
            question: "Fungsi apa yang mengembalikan panjang list?",
            options: ["size()", "length()", "len()", "count()"],
            answer: "len()"
        },
        {
            question: "Apa output dari kode berikut: print(2 ** 3)",
            options: ["6", "8", "9", "5"],
            answer: "8"
        }
    ],
    mahir: [
        {
            question: "Apa output dari kode berikut: [x**2 for x in range(5) if x % 2 == 0]",
            options: ["[0, 4, 16]", "[0, 1, 4, 9, 16]", "[0, 4]", "[1, 9]"],
            answer: "[0, 4]"
        },
        {
            question: "Apa perbedaan antara list dan tuple?",
            options: [
                "List mutable, tuple immutable",
                "List immutable, tuple mutable", 
                "Keduanya mutable",
                "Keduanya immutable"
            ],
            answer: "List mutable, tuple immutable"
        },
        {
            question: "Apa output dari kode berikut: print(lambda x: x*2)(5)",
            options: ["10", "25", "7", "Error"],
            answer: "10"
        },
        {
            question: "Bagaimana cara mengimpor modul math di Python?",
            options: ["import math", "include math", "require math", "using math"],
            answer: "import math"
        },
        {
            question: "Apa fungsi dari __init__ dalam class Python?",
            options: [
                "Method destructor",
                "Method constructor", 
                "Method utama",
                "Method statis"
            ],
            answer: "Method constructor"
        }
    ]
};

const bankSoalTebakOutput = [
    {
        code: `print(5 // 2)`,
        options: ["2", "2.5", "3", "Error"],
        answer: "2",
        explanation: "Operator // adalah floor division, yang membulatkan hasil ke bawah ke bilangan bulat terdekat."
    },
    {
        code: `print(True and False or True)`,
        options: ["True", "False", "Error", "None"],
        answer: "True",
        explanation: "Operator 'and' memiliki prioritas lebih tinggi dari 'or'. True and False = False, kemudian False or True = True."
    },
    {
        code: `x = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)`,
        options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4]", "Error"],
        answer: "[1, 2, 3, 4]",
        explanation: "List adalah mutable object. y = x membuat referensi ke objek yang sama, jadi perubahan di y mempengaruhi x."
    },
    {
        code: `print(3 * 'hi ')`,
        options: ["hihihi", "hi hi hi ", "hihihi ", "Error"],
        answer: "hi hi hi ",
        explanation: "Operator * dengan string mengulang string tersebut sebanyak angka yang diberikan."
    }
];

const bankSoalDebugging = {
    syntax: [
        {
            code: `def greet(name)\n    print("Hello, " + name)\ngreet("Alice")`,
            question: "Apa error dalam kode di atas?",
            options: [
                "Missing colon after function definition",
                "Incorrect variable name", 
                "Wrong string concatenation",
                "No error"
            ],
            answer: "Missing colon after function definition",
            explanation: "Fungsi di Python harus diakhiri dengan colon (:). Perbaikan: def greet(name):"
        },
        {
            code: `x = 5\nif x = 5:\n    print("x is 5")`,
            question: "Bagaimana memperbaiki kode ini?",
            options: [
                "Ganti '=' dengan '==' dalam kondisi if",
                "Tambahkan colon setelah print",
                "Ubah variabel x menjadi string",
                "Kode sudah benar"
            ],
            answer: "Ganti '=' dengan '==' dalam kondisi if",
            explanation: "Operator perbandingan di Python adalah '==', sedangkan '=' adalah operator assignment."
        }
    ],
    indentation: [
        {
            code: `def calculate_sum(a, b):\nresult = a + b\nreturn result\nprint(calculate_sum(3, 4))`,
            question: "Mengapa kode ini menghasilkan IndentationError?",
            options: [
                "Baris result dan return tidak di-indentasi",
                "Nama fungsi tidak sesuai",
                "Parameter fungsi salah",
                "Tidak ada error"
            ],
            answer: "Baris result dan return tidak di-indentasi",
            explanation: "Di Python, blok kode dalam fungsi harus di-indentasi. Perbaikan:\ndef calculate_sum(a, b):\n    result = a + b\n    return result"
        }
    ],
    logic: [
        {
            code: `numbers = [1, 2, 3, 4, 5]\ntotal = 0\nfor i in range(len(numbers)):\n    total += i\nprint("Total:", total)`,
            question: "Mengapa output tidak sesuai harapan?",
            options: [
                "Loop menggunakan index bukan nilai",
                "Range seharusnya range(5)",
                "Variabel total tidak direset",
                "Output sudah benar"
            ],
            answer: "Loop menggunakan index bukan nilai",
            explanation: "Kode menjumlahkan index (0,1,2,3,4) bukan nilai list. Perbaikan: total += numbers[i] atau for num in numbers: total += num"
        }
    ]
};

const daftarKata = [
    "print", "html", "def", "for", "in", "range", "if", "else", "while", 
    "function", "variable", "class", "object", "method", "attribute", 
    "import", "from", "return", "break", "continue", "list", "tuple", 
    "dictionary", "string", "integer", "float", "boolean", "module", 
    "package", "exception", "lambda", "decorator", "generator", "iterator"
];

let kataSaatIni = "";
let soalSaatIni = null;
let levelSaatIni = "";
let skorDebugging = 0;
let kesempatanDebugging = 3;
let levelDebugging = 1;
let soalDebuggingSaatIni = null;
let tipeSoalDebugging = 'syntax';
let skorTebak = 0;
let kesempatanTebak = 3;
let soalTebakSaatIni = null;

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

function showSubGame(subGameId) {
    document.querySelectorAll('.game-subcontent').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
    });
    const activeSubGame = document.getElementById(subGameId);
    if (activeSubGame) {
        activeSubGame.classList.remove('hidden');
        activeSubGame.classList.add('active');
        
        if (subGameId === 'bahasa') {
            inisialisasiGame();
        } else if (subGameId === 'pahlawan-kode') {
            document.querySelectorAll('.level-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.querySelectorAll('.level-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        } else if (subGameId === 'debugging-detective') {
            initDebuggingGame();
        } else if (subGameId === 'tebak-output') {
            initTebakOutput();
        }
    }
}

function showLevel(levelId) {
    document.querySelectorAll('.level-content').forEach(content => {
        content.classList.add('hidden');
    });
    const activeLevel = document.getElementById(levelId);
    if (activeLevel) {
        activeLevel.classList.remove('hidden');
        levelSaatIni = levelId.replace('level-', '');
        generateSoalPython(levelSaatIni);
    }
}

function generateSoalPython(level) {
    let soalArray;
    
    if (level === 'random') {
        soalArray = [...bankSoalPython.pemula, ...bankSoalPython.menengah, ...bankSoalPython.mahir];
    } else {
        soalArray = bankSoalPython[level];
    }
    
    const randomIndex = Math.floor(Math.random() * soalArray.length);
    soalSaatIni = soalArray[randomIndex];
    
    document.getElementById(`question-${level}`).textContent = soalSaatIni.question;
    
    const optionsContainer = document.getElementById(`options-${level}`);
    optionsContainer.innerHTML = '';
    
    soalSaatIni.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        optionsContainer.appendChild(button);
    });
    
    document.getElementById(`result-${level}`).textContent = '';
    document.getElementById(`result-${level}`).className = 'result';
}

function checkPythonAnswer(level, selectedAnswer) {
    const resultElement = document.getElementById(`result-${level}`);
    const optionButtons = document.querySelectorAll(`#level-${level} .option-btn`);
    
    optionButtons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        if (btn.textContent === soalSaatIni.answer) {
            btn.classList.add('correct');
        }
        if (btn.textContent === selectedAnswer && btn.textContent !== soalSaatIni.answer) {
            btn.classList.add('incorrect');
        }
    });
    
    if (selectedAnswer === soalSaatIni.answer) {
        resultElement.textContent = "✅ Jawaban Benar!";
        resultElement.className = "result correct";
        
        setTimeout(() => {
            generateSoalPython(level);
        }, 1500);
    } else {
        resultElement.textContent = "❌ Jawaban Salah!";
        resultElement.className = "result incorrect";
    }
}

function hitungLuasLingkaran() {
    const button = document.getElementById('btn-luas-lingkaran');
    button.classList.add('loading');
    
    setTimeout(() => {
        const r = parseFloat(document.getElementById('jari-jari').value);
        const hasilElement = document.getElementById('hasil-mtk');
        if (isNaN(r) || r <= 0) {
            hasilElement.textContent = "Masukkan angka jari-jari yang valid.";
            button.classList.remove('loading');
            return;
        }
        const Luas = Math.PI * Math.pow(r, 2);
        hasilElement.textContent = Luas.toFixed(2);
        button.classList.remove('loading');
    }, 800);
}

function hitungKecepatan() {
    const button = document.getElementById('btn-kecepatan');
    button.classList.add('loading');
    
    setTimeout(() => {
        const s = parseFloat(document.getElementById('jarak-kec').value);
        const t = parseFloat(document.getElementById('waktu-kec').value);
        const hasilElement = document.getElementById('hasil-kecepatan');
        if (isNaN(s) || isNaN(t) || t <= 0) {
            hasilElement.textContent = "Data tidak valid.";
            button.classList.remove('loading');
            return;
        }
        const v = s / t;
        hasilElement.textContent = v.toFixed(2);
        button.classList.remove('loading');
    }, 800);
}

function hitungDebit() {
    const button = document.getElementById('btn-debit');
    button.classList.add('loading');
    
    setTimeout(() => {
        const v = parseFloat(document.getElementById('volume-deb').value);
        const t = parseFloat(document.getElementById('waktu-deb').value);
        const hasilElement = document.getElementById('hasil-debit');
        if (isNaN(v) || isNaN(t) || t <= 0) {
            hasilElement.textContent = "Data tidak valid.";
            button.classList.remove('loading');
            return;
        }
        const Q = v / t;
        hasilElement.textContent = Q.toFixed(2);
        button.classList.remove('loading');
    }, 800);
}

function hitungSkala() {
    const button = document.getElementById('btn-skala');
    button.classList.add('loading');
    
    setTimeout(() => {
        const jp = parseFloat(document.getElementById('jarak-peta').value);
        const js_km = parseFloat(document.getElementById('jarak-sebenarnya').value);
        const hasilElement = document.getElementById('hasil-skala');
        if (isNaN(jp) || isNaN(js_km) || jp <= 0 || js_km <= 0) {
            hasilElement.textContent = "Data tidak valid.";
            button.classList.remove('loading');
            return;
        }
        const js_cm = js_km * 100000;
        const skala = js_cm / jp;
        hasilElement.textContent = Math.round(skala).toLocaleString('id-ID');
        button.classList.remove('loading');
    }, 800);
}

function hitungKonversiSatuan() {
    const button = document.getElementById('btn-konversi');
    button.classList.add('loading');
    
    setTimeout(() => {
        const nilai = parseFloat(document.getElementById('nilai-konversi').value);
        const dari = document.getElementById('dari-satuan').value;
        const ke = document.getElementById('ke-satuan').value;
        const hasilElement = document.getElementById('hasil-konversi');
        
        if (isNaN(nilai)) {
            hasilElement.textContent = "Masukkan nilai yang valid.";
            button.classList.remove('loading');
            return;
        }
        
        let hasil;
        
        if ((dari.includes('byte') || dari.includes('bit')) && (ke.includes('byte') || ke.includes('bit'))) {
            const factors = {
                'byte': 1,
                'kilobyte': 1024,
                'megabyte': 1024 * 1024
            };
            hasil = (nilai * factors[dari]) / factors[ke];
        } else {
            if (dari === 'celsius') {
                if (ke === 'fahrenheit') hasil = (nilai * 9/5) + 32;
                else if (ke === 'kelvin') hasil = nilai + 273.15;
                else hasil = nilai;
            } else if (dari === 'fahrenheit') {
                if (ke === 'celsius') hasil = (nilai - 32) * 5/9;
                else if (ke === 'kelvin') hasil = (nilai - 32) * 5/9 + 273.15;
                else hasil = nilai;
            } else if (dari === 'kelvin') {
                if (ke === 'celsius') hasil = nilai - 273.15;
                else if (ke === 'fahrenheit') hasil = (nilai - 273.15) * 9/5 + 32;
                else hasil = nilai;
            }
        }
        
        hasilElement.textContent = hasil.toFixed(4);
        button.classList.remove('loading');
    }, 800);
}

function hitungWaktuParuh() {
    const button = document.getElementById('btn-waktu-paruh');
    button.classList.add('loading');
    
    setTimeout(() => {
        const N0 = parseFloat(document.getElementById('jumlah-awal').value);
        const T = parseFloat(document.getElementById('waktu-paruh-input').value);
        const t = parseFloat(document.getElementById('waktu-total').value);
        const hasilElement = document.getElementById('hasil-waktu-paruh');
        const waktuDisplay = document.getElementById('waktu-display');
        
        if (isNaN(N0) || isNaN(T) || isNaN(t) || N0 <= 0 || T <= 0 || t < 0) {
            hasilElement.textContent = "Data tidak valid.";
            button.classList.remove('loading');
            return;
        }
        
        const N = N0 * Math.pow(0.5, t / T);
        hasilElement.textContent = N.toFixed(4);
        waktuDisplay.textContent = t + " satuan waktu";
        button.classList.remove('loading');
    }, 800);
}

function hitungStatistik() {
    const button = document.getElementById('btn-statistik');
    button.classList.add('loading');
    
    setTimeout(() => {
        const dataInput = document.getElementById('data-statistik').value;
        const dataArray = dataInput.split(',').map(item => parseFloat(item.trim())).filter(item => !isNaN(item));
        
        if (dataArray.length === 0) {
            document.getElementById('rata-rata').textContent = "Data tidak valid";
            document.getElementById('median').textContent = "Data tidak valid";
            document.getElementById('modus').textContent = "Data tidak valid";
            document.getElementById('jangkauan').textContent = "Data tidak valid";
            button.classList.remove('loading');
            return;
        }
        
        dataArray.sort((a, b) => a - b);
        
        const rataRata = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        
        let median;
        const mid = Math.floor(dataArray.length / 2);
        if (dataArray.length % 2 === 0) {
            median = (dataArray[mid - 1] + dataArray[mid]) / 2;
        } else {
            median = dataArray[mid];
        }
        
        const frekuensi = {};
        dataArray.forEach(num => {
            frekuensi[num] = (frekuensi[num] || 0) + 1;
        });
        
        let modus = [];
        let maxFreq = 0;
        for (const num in frekuensi) {
            if (frekuensi[num] > maxFreq) {
                modus = [parseFloat(num)];
                maxFreq = frekuensi[num];
            } else if (frekuensi[num] === maxFreq) {
                modus.push(parseFloat(num));
            }
        }
        
        const jangkauan = dataArray[dataArray.length - 1] - dataArray[0];
        
        document.getElementById('rata-rata').textContent = rataRata.toFixed(2);
        document.getElementById('median').textContent = median;
        document.getElementById('modus').textContent = modus.length === dataArray.length ? "Tidak ada modus" : modus.join(', ');
        document.getElementById('jangkauan').textContent = jangkauan;
        button.classList.remove('loading');
    }, 800);
}

// FUNGSI KESEHATAN BARU (DARI WEBSITE 2)
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

function hitungBMR() {
    const berat = parseFloat(document.getElementById('berat-bmr').value);
    const tinggi = parseFloat(document.getElementById('tinggi-bmr').value);
    const usia = parseFloat(document.getElementById('usia-bmr').value);
    const gender = document.getElementById('gender-bmr').value;
    const hasilElement = document.getElementById('hasil-bmr');
    let bmr = 0;

    if (isNaN(berat) || isNaN(tinggi) || isNaN(usia) || berat <= 0 || tinggi <= 0 || usia <= 0) {
        hasilElement.textContent = "Masukkan Berat, Tinggi, dan Usia yang valid.";
        return;
    }

    if (gender === 'pria') {
        bmr = 88.362 + (13.397 * berat) + (4.799 * tinggi) - (5.677 * usia);
    } else if (gender === 'wanita') {
        bmr = 447.593 + (9.247 * berat) + (3.098 * tinggi) - (4.330 * usia);
    }

    hasilElement.textContent = `BMR Anda (Kebutuhan Kalori Dasar): ${bmr.toFixed(0)} Kalori/hari`;
}

function hitungBroca() {
    const tinggi = parseFloat(document.getElementById('tinggi-broca').value);
    const gender = document.getElementById('gender-broca').value;
    const hasilElement = document.getElementById('hasil-broca');
    
    if (isNaN(tinggi) || tinggi <= 0) {
        hasilElement.textContent = "Masukkan tinggi badan yang valid.";
        return;
    }
    
    let beratIdeal;
    const dasar = tinggi - 100;
    
    if (gender === 'pria') {
        beratIdeal = dasar - (0.10 * dasar); // 10% pengurangan untuk pria
    } else {
        beratIdeal = dasar - (0.15 * dasar); // 15% pengurangan untuk wanita
    }
    
    // Hitung rentang berat ideal (±5%)
    const rentangBawah = (beratIdeal * 0.95).toFixed(1);
    const rentangAtas = (beratIdeal * 1.05).toFixed(1);
    
    hasilElement.innerHTML = `
        <p><strong>Berat Badan Ideal:</strong> ${beratIdeal.toFixed(1)} kg</p>
        <p><strong>Rentang Sehat:</strong> ${rentangBawah} kg - ${rentangAtas} kg</p>
    `;
}

function hitungMHR() {
    const usia = parseFloat(document.getElementById('usia-mhr').value);
    const hasilElement = document.getElementById('hasil-mhr');
    let mhr = 0;

    if (isNaN(usia) || usia <= 0) {
        hasilElement.textContent = "Masukkan Usia yang valid.";
        return;
    }

    mhr = 220 - usia;

    let zonaPembakaranLemak = [mhr * 0.6, mhr * 0.7].map(n => n.toFixed(0));
    let zonaKardio = [mhr * 0.7, mhr * 0.85].map(n => n.toFixed(0));

    hasilElement.innerHTML = `
        <p>Denyut Jantung Maksimal (MHR): ${mhr} bpm</p>
        <p>Zona Pembakaran Lemak (60-70%): ${zonaPembakaranLemak[0]} - ${zonaPembakaranLemak[1]} bpm</p>
        <p>Zona Kardio (70-85%): ${zonaKardio[0]} - ${zonaKardio[1]} bpm</p>
    `;
}

// HAPUS FUNGSI KESEHATAN LAMA (BMI, Broca, BMR lama)
// Fungsi hitungBMI(), hitungBroca(), hitungBMR() yang lama sudah dihapus

function acakKata(kata) {
    return kata.split('').sort(() => 0.5 - Math.random()).join('');
}

function inisialisasiGame() {
    const indeksAcak = Math.floor(Math.random() * daftarKata.length);
    kataSaatIni = daftarKata[indeksAcak];
    document.getElementById('kata-acak').textContent = acakKata(kataSaatIni);
    document.getElementById('hasil-game').textContent = "Susunlah kata ini!";
    document.getElementById('hasil-game').style.color = '#333';
    document.getElementById('jawaban').value = "";
    
    if (kesempatan <= 0) {
        kesempatan = 3;
        skor = 0;
    }
    updateGameUI();
}

function updateGameUI() {
    const skorElement = document.getElementById('skor-game');
    const kesempatanElement = document.getElementById('kesempatan-game');
    
    if (skorElement) skorElement.textContent = skor;
    if (kesempatanElement) kesempatanElement.textContent = kesempatan;
}

function cekJawaban() {
    const button = document.getElementById('btn-cek-jawaban');
    button.classList.add('loading');
    
    setTimeout(() => {
        const jawabanUser = document.getElementById('jawaban').value.toLowerCase();
        const hasilGameElement = document.getElementById('hasil-game');
        
        if (jawabanUser === kataSaatIni.toLowerCase()) {
            skor += 10;
            hasilGameElement.innerHTML = "🎉 <strong>Selamat! Jawaban Anda Benar!</strong> (+10 poin)";
            hasilGameElement.style.color = '#28a745';
            setTimeout(inisialisasiGame, 1500);
        } else {
            kesempatan--;
            if (kesempatan <= 0) {
                hasilGameElement.innerHTML = `❌ <strong>Game Over!</strong> Skor akhir: ${skor}`;
                setTimeout(() => {
                    skor = 0;
                    kesempatan = 3;
                    inisialisasiGame();
                }, 3000);
            } else {
                hasilGameElement.innerHTML = `❌ Salah! Kesempatan tersisa: ${kesempatan}`;
                hasilGameElement.style.color = '#dc3545';
            }
        }
        updateGameUI();
        button.classList.remove('loading');
    }, 800);
}

function generateInputs(containerId, fields) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;
        container.appendChild(label);

        const input = document.createElement('input');
        input.type = 'number';
        input.id = field.id;
        container.appendChild(input);
    });

    const button = document.createElement('button');
    button.textContent = 'Hitung';
    button.id = `btn-calc-${containerId}`;
    container.appendChild(button);

    const result = document.createElement('p');
    result.innerHTML = `Hasil: <span id="hasil-${containerId}"></span>`;
    container.appendChild(result);
}

function calculate(shape, containerId) {
    const button = document.getElementById(`btn-calc-${containerId}`);
    button.classList.add('loading');
    
    setTimeout(() => {
        const hasilElement = document.getElementById(`hasil-${containerId}`);
        let resultText = '';

        try {
            switch (shape) {
                case 'persegi':
                    const s = parseFloat(document.getElementById('sisi').value);
                    if (isNaN(s)) throw new Error();
                    resultText = `Luas: ${s*s}, Keliling: ${4*s}`;
                    break;
                case 'persegi-panjang':
                    const p = parseFloat(document.getElementById('panjang').value);
                    const l = parseFloat(document.getElementById('lebar').value);
                    if (isNaN(p) || isNaN(l)) throw new Error();
                    resultText = `Luas: ${p*l}, Keliling: ${2*(p+l)}`;
                    break;
                case 'segitiga':
                    const a = parseFloat(document.getElementById('alas').value);
                    const t = parseFloat(document.getElementById('tinggi').value);
                    if (isNaN(a) || isNaN(t)) throw new Error();
                    resultText = `Luas: ${0.5*a*t}`;
                    break;
                case 'lingkaran':
                    const r = parseFloat(document.getElementById('jari2').value);
                    if (isNaN(r)) throw new Error();
                    resultText = `Luas: ${(Math.PI * r * r).toFixed(2)}, Keliling: ${(2 * Math.PI * r).toFixed(2)}`;
                    break;
                case 'jajar-genjang':
                    const al = parseFloat(document.getElementById('alas').value);
                    const ti = parseFloat(document.getElementById('tinggi').value);
                    if (isNaN(al) || isNaN(ti)) throw new Error();
                    resultText = `Luas: ${al*ti}`;
                    break;
                case 'kubus':
                    const rusuk = parseFloat(document.getElementById('rusuk').value);
                    if (isNaN(rusuk)) throw new Error();
                    resultText = `Volume: ${Math.pow(rusuk, 3)}, Luas Permukaan: ${6*Math.pow(rusuk, 2)}`;
                    break;
                case 'balok':
                    const pj = parseFloat(document.getElementById('panjang').value);
                    const lb = parseFloat(document.getElementById('lebar').value);
                    const tg = parseFloat(document.getElementById('tinggi').value);
                    if (isNaN(pj) || isNaN(lb) || isNaN(tg)) throw new Error();
                    resultText = `Volume: ${pj*lb*tg}, Luas Permukaan: ${2*((pj*lb)+(pj*tg)+(lb*tg))}`;
                    break;
                case 'tabung':
                    const r_tabung = parseFloat(document.getElementById('jari2').value);
                    const t_tabung = parseFloat(document.getElementById('tinggi').value);
                    if (isNaN(r_tabung) || isNaN(t_tabung)) throw new Error();
                    const vol_t = (Math.PI * Math.pow(r_tabung, 2) * t_tabung).toFixed(2);
                    const lp_t = (2 * Math.PI * r_tabung * (r_tabung + t_tabung)).toFixed(2);
                    resultText = `Volume: ${vol_t}, Luas Permukaan: ${lp_t}`;
                    break;
                case 'kerucut':
                    const r_kerucut = parseFloat(document.getElementById('jari2').value);
                    const t_kerucut = parseFloat(document.getElementById('tinggi').value);
                    if(isNaN(r_kerucut) || isNaN(t_kerucut)) throw new Error();
                    const s_kerucut = Math.sqrt(Math.pow(r_kerucut, 2) + Math.pow(t_kerucut, 2));
                    const vol_k = ((1/3) * Math.PI * Math.pow(r_kerucut, 2) * t_kerucut).toFixed(2);
                    const lp_k = (Math.PI * r_kerucut * (r_kerucut + s_kerucut)).toFixed(2);
                    resultText = `Volume: ${vol_k}, Luas Permukaan: ${lp_k}`;
                    break;
                case 'limas-segitiga':
                    const a_limas3 = parseFloat(document.getElementById('alas').value);
                    const t_limas3 = parseFloat(document.getElementById('tinggi').value);
                    const t_sisi3 = parseFloat(document.getElementById('tinggi-sisi').value);
                    if(isNaN(a_limas3) || isNaN(t_limas3) || isNaN(t_sisi3)) throw new Error();
                    const vol_limas3 = (1/3) * (1/2 * a_limas3 * t_limas3) * t_sisi3;
                    const lp_limas3 = (1/2 * a_limas3 * t_limas3) + (3 * 1/2 * a_limas3 * t_sisi3);
                    resultText = `Volume: ${vol_limas3.toFixed(2)}, Luas Permukaan: ${lp_limas3.toFixed(2)}`;
                    break;
                case 'limas-segiempat':
                    const s_limas4 = parseFloat(document.getElementById('sisi').value);
                    const t_limas4 = parseFloat(document.getElementById('tinggi').value);
                    if(isNaN(s_limas4) || isNaN(t_limas4)) throw new Error();
                    const vol_limas4 = (1/3) * Math.pow(s_limas4, 2) * t_limas4;
                    const lp_limas4 = Math.pow(s_limas4, 2) + (4 * 1/2 * s_limas4 * t_limas4);
                    resultText = `Volume: ${vol_limas4.toFixed(2)}, Luas Permukaan: ${lp_limas4.toFixed(2)}`;
                    break;
                case 'bola':
                    const r_bola = parseFloat(document.getElementById('jari2').value);
                    if(isNaN(r_bola)) throw new Error();
                    const vol_bola = (4/3) * Math.PI * Math.pow(r_bola, 3);
                    const lp_bola = 4 * Math.PI * Math.pow(r_bola, 2);
                    resultText = `Volume: ${vol_bola.toFixed(2)}, Luas Permukaan: ${lp_bola.toFixed(2)}`;
                    break;
                case 'aritmatika-un':
                    const a_un = parseFloat(document.getElementById('suku_a').value);
                    const n_un = parseFloat(document.getElementById('suku_n').value);
                    const b_un = parseFloat(document.getElementById('beda_b').value);
                    if(isNaN(a_un) || isNaN(n_un) || isNaN(b_un)) throw new Error();
                    resultText = `Un = ${a_un + (n_un - 1) * b_un}`;
                    break;
                case 'aritmatika-sn':
                    const a_sn = parseFloat(document.getElementById('suku_a').value);
                    const n_sn = parseFloat(document.getElementById('suku_n').value);
                    const b_sn = parseFloat(document.getElementById('beda_b').value);
                    if(isNaN(a_sn) || isNaN(n_sn) || isNaN(b_sn)) throw new Error();
                    resultText = `Sn = ${(n_sn/2) * (2*a_sn + (n_sn-1)*b_sn)}`;
                    break;
                case 'geometri-un':
                    const ag_un = parseFloat(document.getElementById('suku_a').value);
                    const ng_un = parseFloat(document.getElementById('suku_n').value);
                    const rg_un = parseFloat(document.getElementById('rasio_r').value);
                    if(isNaN(ag_un) || isNaN(ng_un) || isNaN(rg_un)) throw new Error();
                    resultText = `Un = ${ag_un * Math.pow(rg_un, ng_un - 1)}`;
                    break;
                case 'geometri-sn':
                    const ag_sn = parseFloat(document.getElementById('suku_a').value);
                    const ng_sn = parseFloat(document.getElementById('suku_n').value);
                    const rg_sn = parseFloat(document.getElementById('rasio_r').value);
                    if(isNaN(ag_sn) || isNaN(ng_sn) || isNaN(rg_sn)) throw new Error();
                    let sn_geo;
                    if(rg_sn > 1) sn_geo = (ag_sn * (Math.pow(rg_sn, ng_sn) - 1)) / (rg_sn - 1);
                    else sn_geo = (ag_sn * (1 - Math.pow(rg_sn, ng_sn))) / (1 - rg_sn);
                    resultText = `Sn = ${sn_geo.toFixed(2)}`;
                    break;
                case 'peluang':
                    const na = parseFloat(document.getElementById('peluang-na').value);
                    const ns = parseFloat(document.getElementById('peluang-ns').value);
                    if(isNaN(na) || isNaN(ns) || ns === 0) throw new Error();
                    resultText = `P(A) = ${(na/ns).toFixed(3)} atau ${((na/ns)*100).toFixed(1)}%`;
                    break;
            }
            hasilElement.textContent = resultText;
        } catch (error) {
            hasilElement.textContent = 'Input tidak valid. Periksa kembali angka Anda.';
        }
        button.classList.remove('loading');
    }, 800);
}

function generateSoalDebugging() {
    const soalArray = bankSoalDebugging[tipeSoalDebugging];
    const randomIndex = Math.floor(Math.random() * soalArray.length);
    soalDebuggingSaatIni = soalArray[randomIndex];
    
    document.getElementById('problem-code').textContent = soalDebuggingSaatIni.code;
    document.getElementById('debug-question').textContent = soalDebuggingSaatIni.question;
    
    const optionsContainer = document.getElementById('debug-options');
    optionsContainer.innerHTML = '';
    
    soalDebuggingSaatIni.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('explanation-section').classList.add('hidden');
    document.getElementById('btn-next-debug').classList.remove('hidden');
    document.getElementById('btn-try-again').classList.add('hidden');
}

function checkDebugAnswer(selectedAnswer) {
    const explanationSection = document.getElementById('explanation-section');
    const explanationText = document.getElementById('debug-explanation');
    const optionButtons = document.querySelectorAll('#debug-options .option-btn');
    const nextButton = document.getElementById('btn-next-debug');
    const tryAgainButton = document.getElementById('btn-try-again');
    
    optionButtons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        if (btn.textContent === soalDebuggingSaatIni.answer) {
            btn.classList.add('correct');
        }
        if (btn.textContent === selectedAnswer && btn.textContent !== soalDebuggingSaatIni.answer) {
            btn.classList.add('incorrect');
        }
    });
    
    if (selectedAnswer === soalDebuggingSaatIni.answer) {
        skorDebugging += 10;
        explanationText.textContent = "✅ Benar! " + soalDebuggingSaatIni.explanation;
        explanationSection.classList.remove('hidden');
        nextButton.classList.remove('hidden');
        tryAgainButton.classList.add('hidden');
        
        if (skorDebugging >= 30 && levelDebugging === 1) {
            levelDebugging = 2;
            tipeSoalDebugging = 'indentation';
        } else if (skorDebugging >= 60 && levelDebugging === 2) {
            levelDebugging = 3;
            tipeSoalDebugging = 'logic';
        }
        
        document.getElementById('skor-debugging').textContent = skorDebugging;
        document.getElementById('level-debugging').textContent = levelDebugging;
    } else {
        kesempatanDebugging--;
        explanationText.textContent = "❌ Salah! " + soalDebuggingSaatIni.explanation;
        explanationSection.classList.remove('hidden');
        nextButton.classList.add('hidden');
        tryAgainButton.classList.remove('hidden');
        
        document.getElementById('kesempatan-debugging').textContent = kesempatanDebugging;
        
        if (kesempatanDebugging <= 0) {
            setTimeout(() => {
                skorDebugging = 0;
                kesempatanDebugging = 3;
                levelDebugging = 1;
                tipeSoalDebugging = 'syntax';
                document.getElementById('skor-debugging').textContent = skorDebugging;
                document.getElementById('kesempatan-debugging').textContent = kesempatanDebugging;
                document.getElementById('level-debugging').textContent = levelDebugging;
                generateSoalDebugging();
            }, 3000);
        }
    }
}

function initDebuggingGame() {
    skorDebugging = 0;
    kesempatanDebugging = 3;
    levelDebugging = 1;
    tipeSoalDebugging = 'syntax';
    
    document.getElementById('skor-debugging').textContent = skorDebugging;
    document.getElementById('kesempatan-debugging').textContent = kesempatanDebugging;
    document.getElementById('level-debugging').textContent = levelDebugging;
    
    generateSoalDebugging();
}

function generateSoalTebak() {
    const randomIndex = Math.floor(Math.random() * bankSoalTebakOutput.length);
    soalTebakSaatIni = bankSoalTebakOutput[randomIndex];
    
    document.getElementById('tebak-code').textContent = soalTebakSaatIni.code;
    
    const optionsContainer = document.getElementById('tebak-options');
    optionsContainer.innerHTML = '';
    
    soalTebakSaatIni.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('tebak-explanation-section').classList.add('hidden');
    document.getElementById('btn-next-tebak').classList.remove('hidden');
    document.getElementById('btn-try-again-tebak').classList.add('hidden');
}

function checkTebakAnswer(selectedAnswer) {
    const explanationSection = document.getElementById('tebak-explanation-section');
    const explanationText = document.getElementById('tebak-explanation');
    const optionButtons = document.querySelectorAll('#tebak-options .option-btn');
    const nextButton = document.getElementById('btn-next-tebak');
    const tryAgainButton = document.getElementById('btn-try-again-tebak');
    
    optionButtons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        if (btn.textContent === soalTebakSaatIni.answer) {
            btn.classList.add('correct');
        }
        if (btn.textContent === selectedAnswer && btn.textContent !== soalTebakSaatIni.answer) {
            btn.classList.add('incorrect');
        }
    });
    
    if (selectedAnswer === soalTebakSaatIni.answer) {
        skorTebak += 10;
        explanationText.textContent = "✅ Benar! " + soalTebakSaatIni.explanation;
        explanationSection.classList.remove('hidden');
        nextButton.classList.remove('hidden');
        tryAgainButton.classList.add('hidden');
        
        document.getElementById('skor-tebak').textContent = skorTebak;
    } else {
        kesempatanTebak--;
        explanationText.textContent = "❌ Salah! " + soalTebakSaatIni.explanation;
        explanationSection.classList.remove('hidden');
        nextButton.classList.add('hidden');
        tryAgainButton.classList.remove('hidden');
        
        document.getElementById('kesempatan-tebak').textContent = kesempatanTebak;
        
        if (kesempatanTebak <= 0) {
            setTimeout(() => {
                skorTebak = 0;
                kesempatanTebak = 3;
                document.getElementById('skor-tebak').textContent = skorTebak;
                document.getElementById('kesempatan-tebak').textContent = kesempatanTebak;
                generateSoalTebak();
            }, 3000);
        }
    }
}

function initTebakOutput() {
    skorTebak = 0;
    kesempatanTebak = 3;
    
    document.getElementById('skor-tebak').textContent = skorTebak;
    document.getElementById('kesempatan-tebak').textContent = kesempatanTebak;
    
    generateSoalTebak();
}

function addSmoothInteractions() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const tabs = document.querySelectorAll('.tabs button');
            const currentIndex = Array.from(tabs).findIndex(tab => 
                tab.classList.contains('active-tab'));
            
            let newIndex;
            if (e.key === 'ArrowRight') {
                newIndex = (currentIndex + 1) % tabs.length;
            } else {
                newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            }
            
            tabs[newIndex].click();
        }
    });
}

document.addEventListener('click', function(e) {
    if (e.target.id.startsWith('btn-calc-')) {
        const containerId = e.target.id.replace('btn-calc-', '');
        const selectId = containerId.replace('calc-', 'select-');
        const selectElement = document.getElementById(selectId);
        
        if (selectElement) {
            const selectedValue = selectElement.value;
            let calcId = selectedValue;
            
            if(containerId.includes('aritmatika')) calcId = `aritmatika-${selectedValue}`;
            if(containerId.includes('geometri')) calcId = `geometri-${selectedValue}`;
            
            calculate(calcId, containerId);
        }
    }
    
    if (e.target.classList.contains('level-btn')) {
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        const level = e.target.dataset.level;
        showLevel(`level-${level}`);
    }
    
    if (e.target.classList.contains('option-btn')) {
        const levelContent = e.target.closest('.level-content');
        if (levelContent) {
            const level = levelContent.id.replace('level-', '');
            checkPythonAnswer(level, e.target.textContent);
        }
        
        const debugContainer = e.target.closest('#debugging-detective');
        if (debugContainer) {
            checkDebugAnswer(e.target.textContent);
        }
        
        const tebakContainer = e.target.closest('#tebak-output');
        if (tebakContainer) {
            checkTebakAnswer(e.target.textContent);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    showModule('profile');
    document.querySelector('.tabs button[data-module="profile"]').classList.add('active-tab');
    showSubMtk('mtk-default');
    inisialisasiGame();
    addSmoothInteractions();

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

    const subGameButtons = document.querySelectorAll('.game-submenu button');
    subGameButtons.forEach(button => {
        button.addEventListener('click', () => {
            subGameButtons.forEach(btn => btn.classList.remove('active-subgame'));
            button.classList.add('active-subgame');
            const subGameId = button.dataset.subgame;
            showSubGame(subGameId);
        });
    });

    document.getElementById('btn-luas-lingkaran').addEventListener('click', hitungLuasLingkaran);
    document.getElementById('btn-kecepatan').addEventListener('click', hitungKecepatan);
    document.getElementById('btn-debit').addEventListener('click', hitungDebit);
    document.getElementById('btn-skala').addEventListener('click', hitungSkala);
    document.getElementById('btn-konversi').addEventListener('click', hitungKonversiSatuan);
    document.getElementById('btn-waktu-paruh').addEventListener('click', hitungWaktuParuh);
    document.getElementById('btn-statistik').addEventListener('click', hitungStatistik);
    
    // EVENT LISTENERS KESEHATAN BARU
    document.getElementById('btn-bmi').addEventListener('click', hitungBMI);
    document.getElementById('btn-broca').addEventListener('click', hitungBroca);
    document.getElementById('btn-bmr').addEventListener('click', hitungBMR);
    document.getElementById('btn-mhr').addEventListener('click', hitungMHR);
    
    document.getElementById('btn-cek-jawaban').addEventListener('click', cekJawaban);
    document.getElementById('btn-peluang').addEventListener('click', () => calculate('peluang', 'peluang'));
    document.getElementById('btn-next-debug').addEventListener('click', generateSoalDebugging);
    document.getElementById('btn-try-again').addEventListener('click', generateSoalDebugging);
    document.getElementById('btn-next-tebak').addEventListener('click', generateSoalTebak);
    document.getElementById('btn-try-again-tebak').addEventListener('click', generateSoalTebak);

    const inputMappings = {
        'select-luas-datar': {
            'persegi': [{ id: 'sisi', label: 'Sisi:' }],
            'persegi-panjang': [{ id: 'panjang', label: 'Panjang:' }, { id: 'lebar', label: 'Lebar:' }],
            'segitiga': [{ id: 'alas', label: 'Alas:' }, { id: 'tinggi', label: 'Tinggi:' }],
            'lingkaran': [{ id: 'jari2', label: 'Jari-jari:' }],
            'jajar-genjang': [{ id: 'alas', label: 'Alas:' }, { id: 'tinggi', label: 'Tinggi:' }]
        },
        'select-luas-ruang': {
            'kubus': [{ id: 'rusuk', label: 'Rusuk:' }],
            'balok': [{ id: 'panjang', label: 'Panjang:' }, { id: 'lebar', label: 'Lebar:' }, { id: 'tinggi', label: 'Tinggi:' }],
            'tabung': [{ id: 'jari2', label: 'Jari-jari:' }, { id: 'tinggi', label: 'Tinggi:' }],
            'kerucut': [{ id: 'jari2', label: 'Jari-jari:' }, { id: 'tinggi', label: 'Tinggi:' }]
        },
        'select-geometri-lanjut': {
            'limas-segitiga': [
                { id: 'alas', label: 'Alas Segitiga:' },
                { id: 'tinggi', label: 'Tinggi Alas:' },
                { id: 'tinggi-sisi', label: 'Tinggi Limas:' }
            ],
            'limas-segiempat': [
                { id: 'sisi', label: 'Sisi Alas:' },
                { id: 'tinggi', label: 'Tinggi Limas:' }
            ],
            'bola': [
                { id: 'jari2', label: 'Jari-jari:' }
            ]
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

    const userProgress = {
    totalCalculations: 0,
    gamesPlayed: 0,
    correctAnswers: 0,
    achievements: [],
    favoriteTools: [],
    activityHistory: [],
    notes: [],
    gameStats: {
        highScore: 0,
        totalGames: 0,
        wins: 0
    }
};

const achievements = [
    { id: 'first_calc', name: 'Pertama Kali', desc: 'Selesaikan 1 perhitungan', icon: '🔢', target: 1, type: 'calculations' },
    { id: 'math_enthusiast', name: 'Pecinta Matematika', desc: 'Selesaikan 10 perhitungan', icon: '📐', target: 10, type: 'calculations' },
    { id: 'math_master', name: 'Master Matematika', desc: 'Selesaikan 50 perhitungan', icon: '🎯', target: 50, type: 'calculations' },
    { id: 'game_starter', name: 'Pemula Game', desc: 'Mainkan 1 game', icon: '🎮', target: 1, type: 'games' },
    { id: 'game_lover', name: 'Pecinta Game', desc: 'Mainkan 10 game', icon: '👾', target: 10, type: 'games' },
    { id: 'correct_beginner', name: 'Pemula Cerdas', desc: '10 jawaban benar', icon: '⭐', target: 10, type: 'correct' },
    { id: 'smart_thinker', name: 'Pemikir Cerdas', desc: '50 jawaban benar', icon: '🏆', target: 50, type: 'correct' },
    { id: 'note_taker', name: 'Pencatat Ulung', desc: 'Simpan 5 catatan', icon: '📝', target: 5, type: 'notes' }
];

function loadProgress() {
    const saved = localStorage.getItem('userProgress');
    if (saved) {
        Object.assign(userProgress, JSON.parse(saved));
    }
    updateDashboard();
}

function saveProgress() {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
}

function updateProgress(type, value = 1) {
    userProgress[type] += value;
    
    if (type === 'correctAnswers') {
        userProgress.gameStats.wins += value;
    }
    
    if (type === 'gamesPlayed') {
        userProgress.gameStats.totalGames += value;
    }
    
    checkAchievements();
    saveProgress();
    updateDashboard();
}

function checkAchievements() {
    achievements.forEach(achievement => {
        if (!userProgress.achievements.includes(achievement.id)) {
            let progress = 0;
            
            switch (achievement.type) {
                case 'calculations':
                    progress = userProgress.totalCalculations;
                    break;
                case 'games':
                    progress = userProgress.gamesPlayed;
                    break;
                case 'correct':
                    progress = userProgress.correctAnswers;
                    break;
                case 'notes':
                    progress = userProgress.notes.length;
                    break;
            }
            
            if (progress >= achievement.target) {
                userProgress.achievements.push(achievement.id);
                showAchievementNotification(achievement);
            }
        }
    });
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.5s ease;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 2em;">${achievement.icon}</span>
            <div>
                <strong>${achievement.name}</strong>
                <div style="font-size: 0.9em;">${achievement.desc}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function updateDashboard() {
    document.getElementById('total-calculations').textContent = userProgress.totalCalculations;
    document.getElementById('games-played').textContent = userProgress.gamesPlayed;
    document.getElementById('correct-answers').textContent = userProgress.correctAnswers;
    document.getElementById('achievement-count').textContent = userProgress.achievements.length;
    
    document.getElementById('high-score').textContent = userProgress.gameStats.highScore;
    document.getElementById('total-games').textContent = userProgress.gameStats.totalGames;
    document.getElementById('win-rate').textContent = userProgress.gameStats.totalGames > 0 
        ? Math.round((userProgress.gameStats.wins / userProgress.gameStats.totalGames) * 100) + '%'
        : '0%';
    
    document.getElementById('user-score').textContent = userProgress.gameStats.highScore;
    
    updateAchievementsDisplay();
    updateActivityHistory();
    updateFavoriteTools();
    updateNotesDisplay();
}

function updateAchievementsDisplay() {
    const container = document.getElementById('achievements-container');
    container.innerHTML = '';
    
    achievements.forEach(achievement => {
        const isUnlocked = userProgress.achievements.includes(achievement.id);
        const card = document.createElement('div');
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-title">${achievement.name}</div>
            <div class="achievement-desc">${achievement.desc}</div>
        `;
        container.appendChild(card);
    });
}

function updateActivityHistory() {
    const container = document.getElementById('recent-activity');
    
    if (userProgress.activityHistory.length === 0) {
        container.innerHTML = '<p>Belum ada aktivitas</p>';
        return;
    }
    
    container.innerHTML = userProgress.activityHistory
        .slice(-5)
        .reverse()
        .map(activity => `
            <div class="history-item">
                <div class="history-operation">${activity.action}</div>
                <div class="history-result">${activity.result}</div>
                <div class="history-time">${new Date(activity.timestamp).toLocaleTimeString()}</div>
            </div>
        `).join('');
}

function updateFavoriteTools() {
    const container = document.getElementById('favorite-tools');
    
    if (userProgress.favoriteTools.length === 0) {
        container.innerHTML = '<p>Belum ada tools favorit</p>';
        return;
    }
    
    container.innerHTML = userProgress.favoriteTools
        .map(tool => `
            <div style="padding: 8px; background: var(--light-color); margin: 5px 0; border-radius: 5px;">
                ${tool}
            </div>
        `).join('');
}

function updateNotesDisplay() {
    const container = document.getElementById('saved-notes');
    
    if (userProgress.notes.length === 0) {
        container.innerHTML = '<p>Belum ada catatan</p>';
        return;
    }
    
    container.innerHTML = userProgress.notes
        .slice(-3)
        .reverse()
        .map(note => `
            <div class="history-item">
                <div class="history-operation">${note.text.substring(0, 50)}...</div>
                <div class="history-time">${note.tag} • ${new Date(note.timestamp).toLocaleDateString()}</div>
            </div>
        `).join('');
}

function addActivity(action, result) {
    userProgress.activityHistory.push({
        action,
        result,
        timestamp: new Date().toISOString()
    });
    
    if (userProgress.activityHistory.length > 20) {
        userProgress.activityHistory = userProgress.activityHistory.slice(-20);
    }
    
    saveProgress();
    updateDashboard();
}

function saveNote() {
    const noteText = document.getElementById('quick-note').value.trim();
    const activeTag = document.querySelector('.note-tag.active').dataset.tag;
    
    if (noteText) {
        userProgress.notes.push({
            text: noteText,
            tag: activeTag,
            timestamp: new Date().toISOString()
        });
        
        document.getElementById('quick-note').value = '';
        updateProgress('notes');
        addActivity('Membuat catatan', `Tag: ${activeTag}`);
    }
}

function trackToolUsage(toolName) {
    const existingIndex = userProgress.favoriteTools.indexOf(toolName);
    
    if (existingIndex !== -1) {
        userProgress.favoriteTools.splice(existingIndex, 1);
    }
    
    userProgress.favoriteTools.unshift(toolName);
    
    if (userProgress.favoriteTools.length > 5) {
        userProgress.favoriteTools = userProgress.favoriteTools.slice(0, 5);
    }
    
    saveProgress();
    updateDashboard();
}

function updateGameStats(score) {
    if (score > userProgress.gameStats.highScore) {
        userProgress.gameStats.highScore = score;
    }
    
    saveProgress();
    updateDashboard();
}

document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    
    document.getElementById('save-note').addEventListener('click', saveNote);
    
    document.querySelectorAll('.note-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.note-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    document.getElementById('quick-note').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            saveNote();
        }
    });
});

const originalCekJawaban = cekJawaban;
cekJawaban = function() {
    const result = originalCekJawaban.apply(this, arguments);
    updateProgress('gamesPlayed');
    return result;
};

const originalCheckPythonAnswer = checkPythonAnswer;
checkPythonAnswer = function(level, selectedAnswer) {
    const result = originalCheckPythonAnswer.apply(this, arguments);
    updateProgress('gamesPlayed');
    if (selectedAnswer === soalSaatIni.answer) {
        updateProgress('correctAnswers');
    }
    return result;
};

const originalCheckDebugAnswer = checkDebugAnswer;
checkDebugAnswer = function(selectedAnswer) {
    const result = originalCheckDebugAnswer.apply(this, arguments);
    updateProgress('gamesPlayed');
    if (selectedAnswer === soalDebuggingSaatIni.answer) {
        updateProgress('correctAnswers');
        updateGameStats(skorDebugging);
    }
    return result;
};

const originalCheckTebakAnswer = checkTebakAnswer;
checkTebakAnswer = function(selectedAnswer) {
    const result = originalCheckTebakAnswer.apply(this, arguments);
    updateProgress('gamesPlayed');
    if (selectedAnswer === soalTebakSaatIni.answer) {
        updateProgress('correctAnswers');
        updateGameStats(skorTebak);
    }
    return result;
};

document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        updateProgress('totalCalculations');
        const toolName = this.closest('.health-section, .mtk-subcontent').querySelector('h3').textContent;
        trackToolUsage(toolName);
        addActivity('Menggunakan kalkulator', toolName);
    });
});

    for (const selectId in inputMappings) {
        const selectElement = document.getElementById(selectId);
        const containerId = selectId.replace('select', 'calc');
        
        selectElement.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            const fields = inputMappings[selectId][selectedValue];
            if (fields) {
                generateInputs(containerId, fields);
            } else {
                document.getElementById(containerId).innerHTML = '';
            }
        });
    }
});
