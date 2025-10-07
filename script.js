let gameState = {
    skor: 0,
    kesempatan: 3,
    skorDebugging: 0,
    kesempatanDebugging: 3,
    levelDebugging: 1,
    skorTebak: 0,
    kesempatanTebak: 3,
    totalGamesPlayed: 0,
    totalCorrectAnswers: 0,
    highScore: 0
};

const progressData = {
    'dasar-ai': 0,
    'dasar-python': 0,
    'fullstack-dev': 0
};

function showSubZero(subZeroId) {
    document.querySelectorAll('.zero-subcontent').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
    });
    const activeSubZero = document.getElementById(subZeroId);
    if (activeSubZero) {
        activeSubZero.classList.remove('hidden');
        activeSubZero.classList.add('active');
    }
    
    document.querySelectorAll('.horizontal-submenu button[data-subzero]').forEach(btn => {
        btn.classList.remove('active-subzero');
    });
    document.querySelector(`button[data-subzero="${subZeroId}"]`).classList.add('active-subzero');
}

let kataSaatIni = "";
let soalSaatIni = null;
let levelSaatIni = "";
let soalDebuggingSaatIni = null;
let tipeSoalDebugging = 'syntax';
let soalTebakSaatIni = null;

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

function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 400px;
    `;
    
    const backgrounds = {
        info: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    };
    
    notification.style.background = backgrounds[type] || backgrounds.info;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
    
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

function updateProgress(section, progress) {
    if (progress >= 0 && progress <= 100) {
        progressData[section] = progress;
        localStorage.setItem('learningProgress', JSON.stringify(progressData));
        updateProgressUI();
        showNotification(`Progress ${section}: ${progress}% selesai`, 'success', 3000);
    }
}

function updateProgressUI() {
    Object.keys(progressData).forEach(section => {
        const progressElement = document.querySelector(`#${section} .progress-fill`);
        const percentageElement = document.querySelector(`#${section} .progress-percentage`);
        
        if (progressElement) {
            progressElement.style.width = `${progressData[section]}%`;
        }
        if (percentageElement) {
            percentageElement.textContent = `${progressData[section]}%`;
        }
    });
}

function markSectionComplete(section) {
    updateProgress(section, 100);
}

function markSectionInProgress(section, percentage) {
    updateProgress(section, percentage);
}

function initGlosariumSearch() {
    const glosariumContainer = document.querySelector('.glosarium-container');
    if (!glosariumContainer) return;
    
    let searchContainer = glosariumContainer.querySelector('.search-container');
    if (!searchContainer) {
        searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" class="search-input" placeholder="🔍 Cari istilah coding & AI...">
            <div class="search-stats" style="margin-top: 10px; font-size: 0.9em; color: #666;"></div>
        `;
        glosariumContainer.insertBefore(searchContainer, glosariumContainer.firstChild);
    }
    
    const searchInput = searchContainer.querySelector('.search-input');
    const searchStats = searchContainer.querySelector('.search-stats');
    const items = document.querySelectorAll('.istilah-item');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        
        items.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
            
            item.style.display = isVisible ? 'block' : 'none';
            if (isVisible) visibleCount++;
        });
        
        const totalCount = items.length;
        searchStats.textContent = searchTerm ? 
            `Menampilkan ${visibleCount} dari ${totalCount} istilah` : 
            `Total ${totalCount} istilah`;
    }
    
    searchInput.addEventListener('input', performSearch);
    performSearch();
}

function makeCodeInteractive() {
    document.querySelectorAll('pre code').forEach(codeBlock => {
        const pre = codeBlock.parentElement;
        const copyButton = document.createElement('button');
        copyButton.textContent = '📋 Copy';
        copyButton.className = 'copy-code-btn';
        copyButton.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        
        copyButton.addEventListener('mouseenter', () => {
            copyButton.style.background = 'rgba(255,255,255,0.3)';
        });
        
        copyButton.addEventListener('mouseleave', () => {
            copyButton.style.background = 'rgba(255,255,255,0.2)';
        });
        
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                copyButton.textContent = '✅ Copied!';
                setTimeout(() => {
                    copyButton.textContent = '📋 Copy';
                }, 2000);
            } catch (err) {
                copyButton.textContent = '❌ Error';
                setTimeout(() => {
                    copyButton.textContent = '📋 Copy';
                }, 2000);
            }
        });
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
    });
}

function addProgressTrackers() {
    const sections = ['dasar-ai', 'dasar-python', 'fullstack-dev'];
    
    sections.forEach(section => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
            let progressContainer = sectionElement.querySelector('.progress-container');
            if (!progressContainer) {
                progressContainer = document.createElement('div');
                progressContainer.className = 'progress-container';
                progressContainer.innerHTML = `
                    <div class="progress-header">
                        <h4>Learning Progress</h4>
                        <span class="progress-percentage">0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="progress-labels">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                    <div class="progress-actions" style="margin-top: 15px; display: flex; gap: 10px;">
                        <button class="mark-in-progress-btn" style="padding: 8px 15px; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer;">Mark 50%</button>
                        <button class="mark-complete-btn" style="padding: 8px 15px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">Mark Complete</button>
                    </div>
                `;
                
                const firstH3 = sectionElement.querySelector('h3');
                if (firstH3) {
                    firstH3.parentNode.insertBefore(progressContainer, firstH3.nextSibling);
                }
                
                const inProgressBtn = progressContainer.querySelector('.mark-in-progress-btn');
                const completeBtn = progressContainer.querySelector('.mark-complete-btn');
                
                inProgressBtn.addEventListener('click', () => {
                    markSectionInProgress(section, 50);
                });
                
                completeBtn.addEventListener('click', () => {
                    markSectionComplete(section);
                });
            }
        }
    });
}

function saveGameState() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        gameState = { ...gameState, ...JSON.parse(saved) };
    }
}

function updateGameStats(score = 0, correct = 0) {
    if (score > gameState.highScore) {
        gameState.highScore = score;
    }
    gameState.totalGamesPlayed += 1;
    gameState.totalCorrectAnswers += correct;
    saveGameState();
    updateStatistikDisplay();
}

function updateStatistikDisplay() {
    const highScoreElement = document.getElementById('high-score');
    const totalGamesElement = document.getElementById('total-games');
    const winRateElement = document.getElementById('win-rate');
    
    if (highScoreElement) highScoreElement.textContent = gameState.highScore;
    if (totalGamesElement) totalGamesElement.textContent = gameState.totalGamesPlayed;
    
    const winRate = gameState.totalGamesPlayed > 0 
        ? Math.round((gameState.totalCorrectAnswers / gameState.totalGamesPlayed) * 100)
        : 0;
    if (winRateElement) winRateElement.textContent = winRate + '%';
}

function showStatistikGame() {
    updateStatistikDisplay();
}

function validateNumberInput(value, min = 0, max = Number.MAX_SAFE_INTEGER) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
}

function validateRequiredInput(value) {
    return value && value.trim().length > 0;
}

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
    
    if (moduleId === 'mtk') {
        showSubMtk('mtk-default');
    }
    if (moduleId === 'game') {
        showSubGame('game-default');
    }
    if (moduleId === 'zero-to-hero') {
        showSubZero('dasar-ai');
    }
    
    setTimeout(() => {
        if (moduleId === 'glosarium') {
            initGlosariumSearch();
        }
        
        if (moduleId === 'zero-to-hero') {
            makeCodeInteractive();
            addProgressTrackers();
            updateProgressUI();
        }
    }, 100);
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
        
        switch(subGameId) {
            case 'bahasa':
                inisialisasiGame();
                break;
            case 'pahlawan-kode':
                document.querySelectorAll('.level-content').forEach(content => {
                    content.classList.add('hidden');
                });
                document.querySelectorAll('.level-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                break;
            case 'debugging-detective':
                initDebuggingGame();
                break;
            case 'tebak-output':
                initTebakOutput();
                break;
            case 'statistik-game':
                showStatistikGame();
                break;
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
        updateGameStats(0, 1);
        
        setTimeout(() => {
            generateSoalPython(level);
        }, 1500);
    } else {
        resultElement.textContent = "❌ Jawaban Salah!";
        resultElement.className = "result incorrect";
    }
    updateGameStats(0, 0);
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

function hitungBMI() {
    const berat = document.getElementById('berat').value;
    const tinggiCm = document.getElementById('tinggi').value;
    const hasilElement = document.getElementById('hasil-bmi');

    if (!validateRequiredInput(berat) || !validateRequiredInput(tinggiCm)) {
        hasilElement.textContent = "Harap isi semua field yang diperlukan.";
        hasilElement.style.color = 'var(--danger-color)';
        return;
    }

    if (!validateNumberInput(berat, 1, 500) || !validateNumberInput(tinggiCm, 50, 300)) {
        hasilElement.textContent = "Masukkan berat (1-500kg) dan tinggi (50-300cm) yang valid.";
        hasilElement.style.color = 'var(--danger-color)';
        return;
    }

    const tinggiM = parseFloat(tinggiCm) / 100;
    const bmi = parseFloat(berat) / (tinggiM * tinggiM);
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
    hasilElement.style.color = 'var(--success-color)';
}

function hitungBMR() {
    const berat = document.getElementById('berat-bmr').value;
    const tinggi = document.getElementById('tinggi-bmr').value;
    const usia = document.getElementById('usia-bmr').value;
    const gender = document.getElementById('gender-bmr').value;
    const hasilElement = document.getElementById('hasil-bmr');
    let bmr = 0;

    if (!validateRequiredInput(berat) || !validateRequiredInput(tinggi) || !validateRequiredInput(usia)) {
        hasilElement.textContent = "Harap isi semua field yang diperlukan.";
        hasilElement.style.color = 'var(--danger-color)';
        return;
    }

    if (!validateNumberInput(berat, 1, 500) || !validateNumberInput(tinggi, 50, 300) || !validateNumberInput(usia, 1, 120)) {
        hasilElement.textContent = "Masukkan data yang valid.";
        hasilElement.style.color = 'var(--danger-color)';
        return;
    }

    if (gender === 'pria') {
        bmr = 88.362 + (13.397 * parseFloat(berat)) + (4.799 * parseFloat(tinggi)) - (5.677 * parseFloat(usia));
    } else if (gender === 'wanita') {
        bmr = 447.593 + (9.247 * parseFloat(berat)) + (3.098 * parseFloat(tinggi)) - (4.330 * parseFloat(usia));
    }

    hasilElement.textContent = `BMR Anda (Kebutuhan Kalori Dasar): ${bmr.toFixed(0)} Kalori/hari`;
    hasilElement.style.color = 'var(--success-color)';
}

function hitungBroca() {
    const tinggi = document.getElementById('tinggi-broca').value;
    const gender = document.getElementById('gender-broca').value;
    const hasilElement = document.getElementById('hasil-broca');
    
    if (!validateRequiredInput(tinggi)) {
        hasilElement.textContent = "Harap isi tinggi badan.";
        hasilElement.style.color = 'var(--danger-color)';
        return;
    }
    
    if (!validateNumberInput(tinggi, 50, 300)) {
        hasilElement.textContent = "Masukkan tinggi badan yang valid (50-300cm).";
        hasilElement.style.color = 'var(--danger-color)';
        return;
    }
    
    let beratIdeal;
    const dasar = parseFloat(tinggi) - 100;
    
    if (gender === 'pria') {
        beratIdeal = dasar - (0.10 * dasar);
    } else {
        beratIdeal = dasar - (0.15 * dasar);
    }
    
    const rentangBawah = (beratIdeal * 0.95).toFixed(1);
    const rentangAtas = (beratIdeal * 1.05).toFixed(1);
    
    hasilElement.innerHTML = `
        <p><strong>Berat Badan Ideal:</strong> ${beratIdeal.toFixed(1)} kg</p>
        <p><strong>Rentang Sehat:</strong> ${rentangBawah} kg - ${rentangAtas} kg</p>
    `;
    hasilElement.style.color = 'var(--success-color)';
}

function hitungMHR() {
    const usia = document.getElementById('usia-mhr').value;
    const hasilElement = document.getElementById('hasil-mhr');
    let mhr = 0;

    if (!validateRequiredInput(usia)) {
        hasilElement.textContent = "Harap isi usia.";
        hasilElement.style.color = 'var(--danger-color)';
        return;
    }

    if (!validateNumberInput(usia, 1, 120)) {
        hasilElement.textContent = "Masukkan usia yang valid (1-120 tahun).";
        hasilElement.style.color = 'var(--danger-color)';
        return;
    }

    mhr = 220 - parseFloat(usia);

    let zonaPembakaranLemak = [mhr * 0.6, mhr * 0.7].map(n => n.toFixed(0));
    let zonaKardio = [mhr * 0.7, mhr * 0.85].map(n => n.toFixed(0));

    hasilElement.innerHTML = `
        <p>Denyut Jantung Maksimal (MHR): ${mhr} bpm</p>
        <p>Zona Pembakaran Lemak (60-70%): ${zonaPembakaranLemak[0]} - ${zonaPembakaranLemak[1]} bpm</p>
        <p>Zona Kardio (70-85%): ${zonaKardio[0]} - ${zonaKardio[1]} bpm</p>
    `;
    hasilElement.style.color = 'var(--success-color)';
}

function acakKata(kata) {
    return kata.split('').sort(() => 0.5 - Math.random()).join('');
}

function inisialisasiGame() {
    loadGameState();
    
    const indeksAcak = Math.floor(Math.random() * daftarKata.length);
    kataSaatIni = daftarKata[indeksAcak];
    document.getElementById('kata-acak').textContent = acakKata(kataSaatIni);
    document.getElementById('hasil-game').textContent = "Susunlah kata ini!";
    document.getElementById('hasil-game').style.color = '#333';
    document.getElementById('jawaban').value = "";
    
    if (gameState.kesempatan <= 0) {
        gameState.kesempatan = 3;
        gameState.skor = 0;
    }
    updateGameUI();
}

function updateGameUI() {
    document.getElementById('skor-game').textContent = gameState.skor;
    document.getElementById('kesempatan-game').textContent = gameState.kesempatan;
    document.getElementById('skor-debugging').textContent = gameState.skorDebugging;
    document.getElementById('kesempatan-debugging').textContent = gameState.kesempatanDebugging;
    document.getElementById('level-debugging').textContent = gameState.levelDebugging;
    document.getElementById('skor-tebak').textContent = gameState.skorTebak;
    document.getElementById('kesempatan-tebak').textContent = gameState.kesempatanTebak;
}

function cekJawaban() {
    const button = document.getElementById('btn-cek-jawaban');
    button.classList.add('loading');
    
    setTimeout(() => {
        const jawabanUser = document.getElementById('jawaban').value.toLowerCase();
        const hasilGameElement = document.getElementById('hasil-game');
        
        if (jawabanUser === kataSaatIni.toLowerCase()) {
            gameState.skor += 10;
            hasilGameElement.innerHTML = "🎉 <strong>Selamat! Jawaban Anda Benar!</strong> (+10 poin)";
            hasilGameElement.style.color = '#28a745';
            updateGameStats(gameState.skor, 1);
            setTimeout(inisialisasiGame, 1500);
        } else {
            gameState.kesempatan--;
            if (gameState.kesempatan <= 0) {
                hasilGameElement.innerHTML = `❌ <strong>Game Over!</strong> Skor akhir: ${gameState.skor}`;
                updateGameStats(gameState.skor, 0);
                setTimeout(() => {
                    gameState.kesempatan = 3;
                    gameState.skor = 0;
                    inisialisasiGame();
                }, 3000);
            } else {
                hasilGameElement.innerHTML = `❌ Salah! Kesempatan tersisa: ${gameState.kesempatan}`;
                hasilGameElement.style.color = '#dc3545';
            }
        }
        saveGameState();
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
        gameState.skorDebugging += 10;
        explanationText.textContent = "✅ Benar! " + soalDebuggingSaatIni.explanation;
        explanationSection.classList.remove('hidden');
        nextButton.classList.remove('hidden');
        tryAgainButton.classList.add('hidden');
        updateGameStats(gameState.skorDebugging, 1);
        
        if (gameState.skorDebugging >= 30 && gameState.levelDebugging === 1) {
            gameState.levelDebugging = 2;
            tipeSoalDebugging = 'indentation';
        } else if (gameState.skorDebugging >= 60 && gameState.levelDebugging === 2) {
            gameState.levelDebugging = 3;
            tipeSoalDebugging = 'logic';
        }
        
        document.getElementById('skor-debugging').textContent = gameState.skorDebugging;
        document.getElementById('level-debugging').textContent = gameState.levelDebugging;
    } else {
        gameState.kesempatanDebugging--;
        explanationText.textContent = "❌ Salah! " + soalDebuggingSaatIni.explanation;
        explanationSection.classList.remove('hidden');
        nextButton.classList.add('hidden');
        tryAgainButton.classList.remove('hidden');
        
        document.getElementById('kesempatan-debugging').textContent = gameState.kesempatanDebugging;
        
        if (gameState.kesempatanDebugging <= 0) {
            setTimeout(() => {
                gameState.skorDebugging = 0;
                gameState.kesempatanDebugging = 3;
                gameState.levelDebugging = 1;
                tipeSoalDebugging = 'syntax';
                document.getElementById('skor-debugging').textContent = gameState.skorDebugging;
                document.getElementById('kesempatan-debugging').textContent = gameState.kesempatanDebugging;
                document.getElementById('level-debugging').textContent = gameState.levelDebugging;
                generateSoalDebugging();
            }, 3000);
        }
    }
    saveGameState();
    updateGameUI();
}

function initDebuggingGame() {
    gameState.skorDebugging = 0;
    gameState.kesempatanDebugging = 3;
    gameState.levelDebugging = 1;
    tipeSoalDebugging = 'syntax';
    
    document.getElementById('skor-debugging').textContent = gameState.skorDebugging;
    document.getElementById('kesempatan-debugging').textContent = gameState.kesempatanDebugging;
    document.getElementById('level-debugging').textContent = gameState.levelDebugging;
    
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
        gameState.skorTebak += 10;
        explanationText.textContent = "✅ Benar! " + soalTebakSaatIni.explanation;
        explanationSection.classList.remove('hidden');
        nextButton.classList.remove('hidden');
        tryAgainButton.classList.add('hidden');
        updateGameStats(gameState.skorTebak, 1);
        
        document.getElementById('skor-tebak').textContent = gameState.skorTebak;
    } else {
        gameState.kesempatanTebak--;
        explanationText.textContent = "❌ Salah! " + soalTebakSaatIni.explanation;
        explanationSection.classList.remove('hidden');
        nextButton.classList.add('hidden');
        tryAgainButton.classList.remove('hidden');
        
        document.getElementById('kesempatan-tebak').textContent = gameState.kesempatanTebak;
        
        if (gameState.kesempatanTebak <= 0) {
            setTimeout(() => {
                gameState.skorTebak = 0;
                gameState.kesempatanTebak = 3;
                document.getElementById('skor-tebak').textContent = gameState.skorTebak;
                document.getElementById('kesempatan-tebak').textContent = gameState.kesempatanTebak;
                generateSoalTebak();
            }, 3000);
        }
    }
    saveGameState();
    updateGameUI();
}

function initTebakOutput() {
    gameState.skorTebak = 0;
    gameState.kesempatanTebak = 3;
    
    document.getElementById('skor-tebak').textContent = gameState.skorTebak;
    document.getElementById('kesempatan-tebak').textContent = gameState.kesempatanTebak;
    
    generateSoalTebak();
}

document.addEventListener('DOMContentLoaded', () => {
    loadGameState();
    
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
        try {
            Object.assign(progressData, JSON.parse(savedProgress));
        } catch (e) {
            console.error('Error loading progress data:', e);
        }
    }
    
    makeCodeInteractive();
    addProgressTrackers();
    updateProgressUI();
    
    setTimeout(() => {
        showNotification('Selamat belajar! 🚀', 'info', 4000);
    }, 1000);
    
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const activeModule = document.querySelector('.module.active');
            if (activeModule && activeModule.id === 'glosarium') {
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        }
        
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('.search-input');
            if (searchInput && document.activeElement === searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        }
    });
    
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = 'var(--danger-color)';
                showNotification('Format email tidak valid', 'error', 3000);
            } else {
                this.style.borderColor = '';
            }
        });
    });
    
    document.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(input => {
        input.addEventListener('blur', function() {
            this.value = sanitizeInput(this.value);
        });
    });
    
    showModule('profile');
    document.querySelector('.vertical-tabs button[data-module="profile"]').classList.add('active-tab');
    showSubMtk('mtk-default');
    inisialisasiGame();
    updateStatistikDisplay();

    const tabButtons = document.querySelectorAll('.vertical-tabs button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active-tab'));
            button.classList.add('active-tab');
            const moduleId = button.dataset.module;
            showModule(moduleId);
        });
    });

    const subMtkButtons = document.querySelectorAll('.horizontal-submenu button[data-submtk]');
    subMtkButtons.forEach(button => {
        button.addEventListener('click', () => {
            subMtkButtons.forEach(btn => btn.classList.remove('active-submtk'));
            button.classList.add('active-submtk');
            const subMtkId = button.dataset.submtk;
            showSubMtk(subMtkId);
        });
    });

    const subGameButtons = document.querySelectorAll('.horizontal-submenu button[data-subgame]');
    subGameButtons.forEach(button => {
        button.addEventListener('click', () => {
            subGameButtons.forEach(btn => btn.classList.remove('active-subgame'));
            button.classList.add('active-subgame');
            const subGameId = button.dataset.subgame;
            showSubGame(subGameId);
        });
    });

    const subZeroButtons = document.querySelectorAll('.horizontal-submenu button[data-subzero]');
    subZeroButtons.forEach(button => {
        button.addEventListener('click', () => {
            subZeroButtons.forEach(btn => btn.classList.remove('active-subzero'));
            button.classList.add('active-subzero');
            const subZeroId = button.dataset.subzero;
            showSubZero(subZeroId);
       });
    });

    document.getElementById('btn-luas-lingkaran').addEventListener('click', hitungLuasLingkaran);
    document.getElementById('btn-kecepatan').addEventListener('click', hitungKecepatan);
    document.getElementById('btn-debit').addEventListener('click', hitungDebit);
    document.getElementById('btn-skala').addEventListener('click', hitungSkala);
    document.getElementById('btn-konversi').addEventListener('click', hitungKonversiSatuan);
    document.getElementById('btn-waktu-paruh').addEventListener('click', hitungWaktuParuh);
    document.getElementById('btn-statistik').addEventListener('click', hitungStatistik);
    
    document.getElementById('btn-bmi').addEventListener('click', hitungBMI);
    document.getElementById('btn-broca').addEventListener('click', hitungBroca);
    document.getElementById('btn-bmr').addEventListener('click', hitungBMR);
    document.getElementById('btn-mhr').addEventListener('click', hitungMHR);
    
    document.getElementById('btn-cek-jawaban').addEventListener('click', cekJawaban);
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
        'select-aritmatika': {
            'un': [{ id: 'suku_a', label: 'Suku Pertama (a):' }, { id: 'suku_n', label: 'Suku ke- (n):' }, { id: 'beda_b', label: 'Beda (b):' }],
            'sn': [{ id: 'suku_a', label: 'Suku Pertama (a):' }, { id: 'suku_n', label: 'Jumlah Suku (n):' }, { id: 'beda_b', label: 'Beda (b):' }]
        },
        'select-geometri': {
            'un': [{ id: 'suku_a', label: 'Suku Pertama (a):' }, { id: 'suku_n', label: 'Suku ke- (n):' }, { id: 'rasio_r', label: 'Rasio (r):' }],
            'sn': [{ id: 'suku_a', label: 'Suku Pertama (a):' }, { id: 'suku_n', label: 'Jumlah Suku (n):' }, { id: 'rasio_r', label: 'Rasio (r):' }]
        }
    };

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

    document.addEventListener('click', function(e) {
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
    });
    
    document.getElementById('btn-peluang').addEventListener('click', function() {
        const na = parseFloat(document.getElementById('peluang-na').value);
        const ns = parseFloat(document.getElementById('peluang-ns').value);
        const hasilElement = document.getElementById('hasil-peluang');
        
        if (isNaN(na) || isNaN(ns) || ns === 0) {
            hasilElement.textContent = "Masukkan nilai yang valid (n(S) tidak boleh 0)";
            return;
        }
        
        const peluang = na / ns;
        hasilElement.textContent = `${peluang.toFixed(3)} atau ${(peluang * 100).toFixed(1)}%`;
    });
});

window.Lolakarya = {
    showNotification,
    updateProgress,
    validateEmail,
    sanitizeInput
};

window.addEventListener('error', function(e) {
    console.error('Global error occurred:', e.error);
    showNotification('Terjadi kesalahan, silakan refresh halaman', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('Terjadi kesalahan sistem', 'error');
});
