// App State Management
class AppState {
    constructor() {
        this.activeModule = 'mtk';
        this.activeSubMtk = 'mtk-default';
        this.calculationHistory = [];
        this.gameState = {
            score: 0,
            timeLeft: 60,
            timer: null,
            currentWord: '',
            scrambledWord: ''
        };
        this.loadFromStorage();
    }

    saveToStorage() {
        const state = {
            activeModule: this.activeModule,
            activeSubMtk: this.activeSubMtk,
            calculationHistory: this.calculationHistory.slice(0, 50), // Keep last 50
            gameScore: this.gameState.score
        };
        localStorage.setItem('multitaskAppState', JSON.stringify(state));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('multitaskAppState');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                this.activeModule = state.activeModule || 'mtk';
                this.activeSubMtk = state.activeSubMtk || 'mtk-default';
                this.calculationHistory = state.calculationHistory || [];
                this.gameState.score = state.gameScore || 0;
            } catch (e) {
                console.warn('Failed to load saved state:', e);
            }
        }
    }

    addToHistory(calculation) {
        this.calculationHistory.unshift({
            ...calculation,
            timestamp: new Date().toISOString(),
            id: Date.now().toString()
        });
        
        // Keep only last 50 calculations
        if (this.calculationHistory.length > 50) {
            this.calculationHistory = this.calculationHistory.slice(0, 50);
        }
        
        this.saveToStorage();
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        // Optional: Implement history display in UI
        console.log('Calculation History:', this.calculationHistory);
    }
}

// Utility Functions
class MathUtils {
    static validateNumber(input, min = 0, max = Infinity, fieldName = 'Input') {
        const value = parseFloat(input);
        if (isNaN(value)) {
            throw new Error(`${fieldName} harus berupa angka`);
        }
        if (value < min) {
            throw new Error(`${fieldName} tidak boleh kurang dari ${min}`);
        }
        if (value > max) {
            throw new Error(`${fieldName} tidak boleh lebih dari ${max}`);
        }
        return value;
    }

    static formatResult(value, decimals = 2) {
        return Number(value.toFixed(decimals)).toString();
    }

    static showLoading(button) {
        const buttonText = button.querySelector('.button-text');
        const spinner = button.querySelector('.loading-spinner');
        
        if (buttonText && spinner) {
            buttonText.textContent = 'Menghitung...';
            spinner.classList.remove('hidden');
            button.disabled = true;
        }
    }

    static hideLoading(button, originalText = 'Hitung') {
        const buttonText = button.querySelector('.button-text');
        const spinner = button.querySelector('.loading-spinner');
        
        if (buttonText && spinner) {
            buttonText.textContent = originalText;
            spinner.classList.add('hidden');
            button.disabled = false;
        }
    }

    static showResult(elementId, result, isError = false) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = result;
            element.style.color = isError ? '#dc3545' : '';
            element.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    static announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }
}

// Module Management
class ModuleManager {
    constructor(appState) {
        this.appState = appState;
    }

    showModule(moduleId) {
        // Update tab states
        document.querySelectorAll('.tabs button').forEach(button => {
            const isActive = button.dataset.module === moduleId;
            button.classList.toggle('active-tab', isActive);
            button.setAttribute('aria-selected', isActive.toString());
        });

        // Update module visibility
        document.querySelectorAll('.module').forEach(section => {
            const isActive = section.id === moduleId;
            section.classList.toggle('hidden', !isActive);
            section.classList.toggle('active', isActive);
        });

        this.appState.activeModule = moduleId;
        this.appState.saveToStorage();

        // Announce to screen readers
        MathUtils.announceToScreenReader(`Modul ${this.getModuleName(moduleId)} aktif`);
    }

    showSubMtk(subMtkId) {
        // Update submenu button states
        document.querySelectorAll('.mtk-submenu button').forEach(button => {
            const isActive = button.dataset.submtk === subMtkId;
            button.classList.toggle('active-submtk', isActive);
        });

        // Update subcontent visibility
        document.querySelectorAll('.mtk-subcontent').forEach(content => {
            const isActive = content.id === subMtkId;
            content.classList.toggle('hidden', !isActive);
            content.classList.toggle('active', isActive);
        });

        this.appState.activeSubMtk = subMtkId;
        this.appState.saveToStorage();
    }

    getModuleName(moduleId) {
        const names = {
            'mtk': 'Matematika dan Fisika',
            'kesehatan': 'Kesehatan dan Kebugaran',
            'game': 'Minigame Bahasa'
        };
        return names[moduleId] || moduleId;
    }
}

// Calculation Functions
class CalculationEngine {
    static calculateLuasLingkaran() {
        const button = document.getElementById('btn-luas-lingkaran');
        MathUtils.showLoading(button);

        try {
            const r = MathUtils.validateNumber(
                document.getElementById('jari-jari').value, 
                0, 
                10000, 
                'Jari-jari'
            );
            const luas = Math.PI * Math.pow(r, 2);
            const result = MathUtils.formatResult(luas);
            
            this.recordCalculation('luas-lingkaran', { r }, `Luas lingkaran: ${result} cm²`);
            MathUtils.showResult('hasil-mtk', result);
            MathUtils.announceToScreenReader(`Luas lingkaran adalah ${result} centimeter persegi`);
        } catch (error) {
            MathUtils.showResult('hasil-mtk', error.message, true);
            MathUtils.announceToScreenReader(`Error: ${error.message}`);
        } finally {
            MathUtils.hideLoading(button, 'Hitung Luas');
        }
    }

    static calculateKecepatan() {
        const button = document.getElementById('btn-kecepatan');
        MathUtils.showLoading(button);

        try {
            const s = MathUtils.validateNumber(
                document.getElementById('jarak-kec').value,
                0,
                100000,
                'Jarak'
            );
            const t = MathUtils.validateNumber(
                document.getElementById('waktu-kec').value,
                0.001,
                1000,
                'Waktu'
            );
            const v = s / t;
            const result = MathUtils.formatResult(v);
            
            this.recordCalculation('kecepatan', { s, t }, `Kecepatan: ${result} km/jam`);
            MathUtils.showResult('hasil-kecepatan', result);
            MathUtils.announceToScreenReader(`Kecepatan adalah ${result} kilometer per jam`);
        } catch (error) {
            MathUtils.showResult('hasil-kecepatan', error.message, true);
            MathUtils.announceToScreenReader(`Error: ${error.message}`);
        } finally {
            MathUtils.hideLoading(button, 'Hitung Kecepatan');
        }
    }

    static calculateDebit() {
        const button = document.getElementById('btn-debit');
        MathUtils.showLoading(button);

        try {
            const v = MathUtils.validateNumber(
                document.getElementById('volume-deb').value,
                0,
                100000,
                'Volume'
            );
            const t = MathUtils.validateNumber(
                document.getElementById('waktu-deb').value,
                0.001,
                10000,
                'Waktu'
            );
            const Q = v / t;
            const result = MathUtils.formatResult(Q);
            
            this.recordCalculation('debit', { v, t }, `Debit: ${result} liter/menit`);
            MathUtils.showResult('hasil-debit', result);
            MathUtils.announceToScreenReader(`Debit adalah ${result} liter per menit`);
        } catch (error) {
            MathUtils.showResult('hasil-debit', error.message, true);
            MathUtils.announceToScreenReader(`Error: ${error.message}`);
        } finally {
            MathUtils.hideLoading(button, 'Hitung Debit');
        }
    }

    static calculateSkala() {
        const button = document.getElementById('btn-skala');
        MathUtils.showLoading(button);

        try {
            const jp = MathUtils.validateNumber(
                document.getElementById('jarak-peta').value,
                0.1,
                1000,
                'Jarak peta'
            );
            const js_km = MathUtils.validateNumber(
                document.getElementById('jarak-sebenarnya').value,
                0.1,
                100000,
                'Jarak sebenarnya'
            );
            const js_cm = js_km * 100000;
            const skala = js_cm / jp;
            const result = Math.round(skala).toLocaleString('id-ID');
            
            this.recordCalculation('skala', { jp, js_km }, `Skala: 1 : ${result}`);
            MathUtils.showResult('hasil-skala', result);
            MathUtils.announceToScreenReader(`Skala peta adalah 1 banding ${result}`);
        } catch (error) {
            MathUtils.showResult('hasil-skala', error.message, true);
            MathUtils.announceToScreenReader(`Error: ${error.message}`);
        } finally {
            MathUtils.hideLoading(button, 'Hitung Skala');
        }
    }

    static calculateBMI() {
        const button = document.getElementById('btn-bmi');
        MathUtils.showLoading(button);

        try {
            const berat = MathUtils.validateNumber(
                document.getElementById('berat').value,
                1,
                300,
                'Berat badan'
            );
            const tinggi = MathUtils.validateNumber(
                document.getElementById('tinggi').value,
                0.5,
                3,
                'Tinggi badan'
            );
            const bmi = berat / (tinggi * tinggi);
            const bmiResult = MathUtils.formatResult(bmi);
            
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
            
            this.recordCalculation('bmi', { berat, tinggi }, `BMI: ${bmiResult} - ${kategori}`);
            MathUtils.showResult('hasil-bmi', bmiResult);
            MathUtils.showResult('kategori-bmi', kategori);
            MathUtils.announceToScreenReader(`Indeks Massa Tubuh Anda ${bmiResult}, kategori ${kategori}`);
        } catch (error) {
            MathUtils.showResult('hasil-bmi', error.message, true);
            MathUtils.showResult('kategori-bmi', '');
            MathUtils.announceToScreenReader(`Error: ${error.message}`);
        } finally {
            MathUtils.hideLoading(button, 'Hitung BMI');
        }
    }

    static recordCalculation(type, inputs, result) {
        if (window.appState) {
            window.appState.addToHistory({
                type,
                inputs,
                result,
                module: window.appState.activeModule
            });
        }
    }
}

// Game Management
class GameManager {
    constructor(appState) {
        this.appState = appState;
        this.daftarKata = ["PRODUKTIVITAS", "PENGKODEAN", "ALGORITMA", "TEKNOLOGI", "GEMINI", "PROGRAM", "KOMPUTER", "INTERNET"];
    }

    initGame() {
        this.stopTimer();
        this.appState.gameState.score = 0;
        this.appState.gameState.timeLeft = 60;
        this.updateGameDisplay();
        this.startNewRound();
        this.startTimer();
        MathUtils.announceToScreenReader('Game tebak kata dimulai!');
    }

    startNewRound() {
        const indeksAcak = Math.floor(Math.random() * this.daftarKata.length);
        this.appState.gameState.currentWord = this.daftarKata[indeksAcak];
        this.appState.gameState.scrambledWord = this.acakKata(this.appState.gameState.currentWord);
        
        document.getElementById('kata-acak').textContent = this.appState.gameState.scrambledWord;
        document.getElementById('hasil-game').textContent = "Susunlah kata ini!";
        document.getElementById('jawaban').value = "";
        document.getElementById('jawaban').focus();
    }

    acakKata(kata) {
        return kata.split('').sort(() => 0.5 - Math.random()).join('');
    }

    checkAnswer() {
        const jawabanUser = document.getElementById('jawaban').value.toUpperCase().trim();
        const hasilGameElement = document.getElementById('hasil-game');

        if (!jawabanUser) {
            hasilGameElement.textContent = "Silakan masukkan jawaban Anda!";
            hasilGameElement.style.color = '#ffc107';
            return;
        }

        if (jawabanUser === this.appState.gameState.currentWord) {
            this.appState.gameState.score += 10;
            this.appState.gameState.timeLeft += 5; // Bonus waktu
            hasilGameElement.textContent = "🎉 Selamat! Jawaban Anda Benar! +10 Poin! +5 Detik!";
            hasilGameElement.style.color = '#28a745';
            
            MathUtils.announceToScreenReader('Jawaban benar! Mendapat 10 poin dan bonus 5 detik');
            
            setTimeout(() => {
                this.startNewRound();
                this.updateGameDisplay();
            }, 1500);
        } else {
            hasilGameElement.textContent = "❌ Coba lagi. Jawaban Anda salah.";
            hasilGameElement.style.color = '#dc3545';
            MathUtils.announceToScreenReader('Jawaban salah, coba lagi');
        }
        
        this.updateGameDisplay();
    }

    startTimer() {
        this.appState.gameState.timer = setInterval(() => {
            this.appState.gameState.timeLeft--;
            this.updateGameDisplay();

            if (this.appState.gameState.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.appState.gameState.timer) {
            clearInterval(this.appState.gameState.timer);
            this.appState.gameState.timer = null;
        }
    }

    endGame() {
        this.stopTimer();
        const finalScore = this.appState.gameState.score;
        document.getElementById('hasil-game').textContent = 
            `⏰ Waktu habis! Skor akhir Anda: ${finalScore}`;
        document.getElementById('hasil-game').style.color = '#007bff';
        
        MathUtils.announceToScreenReader(`Game berakhir! Skor akhir Anda ${finalScore} poin`);
        
        // Save high score
        this.appState.saveToStorage();
    }

    updateGameDisplay() {
        document.getElementById('score').textContent = this.appState.gameState.score;
        document.getElementById('timer').textContent = this.appState.gameState.timeLeft;
    }

    provideHint() {
        const word = this.appState.gameState.currentWord;
        if (word.length > 3) {
            const hint = word.substring(0, 2) + '...' + word.substring(word.length - 1);
            document.getElementById('hasil-game').textContent = `Petunjuk: ${hint}`;
            document.getElementById('hasil-game').style.color = '#17a2b8';
            this.appState.gameState.score = Math.max(0, this.appState.gameState.score - 2); // Penalty for hint
            this.updateGameDisplay();
            MathUtils.announceToScreenReader(`Petunjuk: ${hint}`);
        }
    }
}

// Dynamic Input Generator
class InputGenerator {
    static generateInputs(containerId, fields) {
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
            input.min = field.min || 0;
            input.step = field.step || 'any';
            if (field.required) input.setAttribute('aria-required', 'true');
            container.appendChild(input);

            if (field.help) {
                const help = document.createElement('small');
                help.className = 'input-help';
                help.textContent = field.help;
                container.appendChild(help);
            }
        });

        const button = document.createElement('button');
        button.className = 'calculate-btn';
        button.innerHTML = `
            <span class="button-text">Hitung</span>
            <span class="loading-spinner hidden" aria-hidden="true"></span>
        `;
        button.id = `btn-${containerId}`;
        container.appendChild(button);

        const result = document.createElement('div');
        result.className = 'result-container';
        result.innerHTML = `<p>Hasil: <span id="hasil-${containerId}" aria-live="polite">-</span></p>`;
        container.appendChild(result);
    }

    static calculate(shape, containerId) {
        const button = document.getElementById(`btn-${containerId}`);
        const hasilElement = document.getElementById(`hasil-${containerId}`);
        
        MathUtils.showLoading(button);
        
        // Simulate calculation delay for better UX
        setTimeout(() => {
            try {
                let resultText = '';
                
                switch (shape) {
                    case 'persegi':
                        const s = MathUtils.validateNumber(document.getElementById('sisi').value, 0, 10000, 'Sisi');
                        resultText = `Luas: ${s*s}, Keliling: ${4*s}`;
                        break;
                    case 'persegi-panjang':
                        const p = MathUtils.validateNumber(document.getElementById('panjang').value, 0, 10000, 'Panjang');
                        const l = MathUtils.validateNumber(document.getElementById('lebar').value, 0, 10000, 'Lebar');
                        resultText = `Luas: ${p*l}, Keliling: ${2*(p+l)}`;
                        break;
                    case 'segitiga':
                        const a = MathUtils.validateNumber(document.getElementById('alas').value, 0, 10000, 'Alas');
                        const t = MathUtils.validateNumber(document.getElementById('tinggi').value, 0, 10000, 'Tinggi');
                        resultText = `Luas: ${0.5*a*t}`;
                        break;
                    case 'lingkaran':
                        const r = MathUtils.validateNumber(document.getElementById('jari2').value, 0, 10000, 'Jari-jari');
                        resultText = `Luas: ${(Math.PI * r * r).toFixed(2)}, Keliling: ${(2 * Math.PI * r).toFixed(2)}`;
                        break;
                    case 'jajar-genjang':
                        const al = MathUtils.validateNumber(document.getElementById('alas').value, 0, 10000, 'Alas');
                        const ti = MathUtils.validateNumber(document.getElementById('tinggi').value, 0, 10000, 'Tinggi');
                        resultText = `Luas: ${al*ti}`;
                        break;
                    case 'kubus':
                        const rusuk = MathUtils.validateNumber(document.getElementById('rusuk').value, 0, 10000, 'Rusuk');
                        resultText = `Volume: ${Math.pow(rusuk, 3)}, Luas Permukaan: ${6*Math.pow(rusuk, 2)}`;
                        break;
                    case 'balok':
                        const pj = MathUtils.validateNumber(document.getElementById('panjang').value, 0, 10000, 'Panjang');
                        const lb = MathUtils.validateNumber(document.getElementById('lebar').value, 0, 10000, 'Lebar');
                        const tg = MathUtils.validateNumber(document.getElementById('tinggi').value, 0, 10000, 'Tinggi');
                        resultText = `Volume: ${pj*lb*tg}, Luas Permukaan: ${2*((pj*lb)+(pj*tg)+(lb*tg))}`;
                        break;
                    case 'tabung':
                        const r_tabung = MathUtils.validateNumber(document.getElementById('jari2').value, 0, 10000, 'Jari-jari');
                        const t_tabung = MathUtils.validateNumber(document.getElementById('tinggi').value, 0, 10000, 'Tinggi');
                        const vol_t = (Math.PI * Math.pow(r_tabung, 2) * t_tabung).toFixed(2);
                        const lp_t = (2 * Math.PI * r_tabung * (r_tabung + t_tabung)).toFixed(2);
                        resultText = `Volume: ${vol_t}, Luas Permukaan: ${lp_t}`;
                        break;
                    case 'kerucut':
                        const r_kerucut = MathUtils.validateNumber(document.getElementById('jari2').value, 0, 10000, 'Jari-jari');
                        const t_kerucut = MathUtils.validateNumber(document.getElementById('tinggi').value, 0, 10000, 'Tinggi');
                        const s_kerucut = Math.sqrt(Math.pow(r_kerucut, 2) + Math.pow(t_kerucut, 2));
                        const vol_k = ((1/3) * Math.PI * Math.pow(r_kerucut, 2) * t_kerucut).toFixed(2);
                        const lp_k = (Math.PI * r_kerucut * (r_kerucut + s_kerucut)).toFixed(2);
                        resultText = `Volume: ${vol_k}, Luas Permukaan: ${lp_k}`;
                        break;
                    case 'aritmatika-un':
                        const a_un = MathUtils.validateNumber(document.getElementById('suku_a').value, -100000, 100000, 'Suku pertama');
                        const n_un = MathUtils.validateNumber(document.getElementById('suku_n').value, 1, 1000, 'Suku ke-n');
                        const b_un = MathUtils.validateNumber(document.getElementById('beda_b').value, -10000, 10000, 'Beda');
                        resultText = `Un = ${a_un + (n_un - 1) * b_un}`;
                        break;
                    case 'aritmatika-sn':
                        const a_sn = MathUtils.validateNumber(document.getElementById('suku_a').value, -100000, 100000, 'Suku pertama');
                        const n_sn = MathUtils.validateNumber(document.getElementById('suku_n').value, 1, 1000, 'Jumlah suku');
                        const b_sn = MathUtils.validateNumber(document.getElementById('beda_b').value, -10000, 10000, 'Beda');
                        resultText = `Sn = ${(n_sn/2) * (2*a_sn + (n_sn-1)*b_sn)}`;
                        break;
                    case 'geometri-un':
                        const ag_un = MathUtils.validateNumber(document.getElementById('suku_a').value, -100000, 100000, 'Suku pertama');
                        const ng_un = MathUtils.validateNumber(document.getElementById('suku_n').value, 1, 100, 'Suku ke-n');
                        const rg_un = MathUtils.validateNumber(document.getElementById('rasio_r').value, -100, 100, 'Rasio');
                        resultText = `Un = ${ag_un * Math.pow(rg_un, ng_un - 1)}`;
                        break;
                    case 'geometri-sn':
                        const ag_sn = MathUtils.validateNumber(document.getElementById('suku_a').value, -100000, 100000, 'Suku pertama');
                        const ng_sn = MathUtils.validateNumber(document.getElementById('suku_n').value, 1, 100, 'Jumlah suku');
                        const rg_sn = MathUtils.validateNumber(document.getElementById('rasio_r').value, -100, 100, 'Rasio');
                        let sn_geo;
                        if (rg_sn === 1) {
                            sn_geo = ag_sn * ng_sn;
                        } else if (rg_sn > 1) {
                            sn_geo = (ag_sn * (Math.pow(rg_sn, ng_sn) - 1)) / (rg_sn - 1);
                        } else {
                            sn_geo = (ag_sn * (1 - Math.pow(rg_sn, ng_sn))) / (1 - rg_sn);
                        }
                        resultText = `Sn = ${sn_geo.toFixed(2)}`;
                        break;
                    case 'peluang':
                        const na = MathUtils.validateNumber(document.getElementById('peluang-na').value, 0, 1000000, 'n(A)');
                        const ns = MathUtils.validateNumber(document.getElementById('peluang-ns').value, 1, 1000000, 'n(S)');
                        const probability = na / ns;
                        resultText = `P(A) = ${probability.toFixed(3)} atau ${((probability)*100).toFixed(1)}%`;
                        break;
                    default:
                        throw new Error('Jenis perhitungan tidak dikenali');
                }
                
                hasilElement.textContent = resultText;
                MathUtils.announceToScreenReader(`Hasil perhitungan: ${resultText}`);
                CalculationEngine.recordCalculation(shape, {}, resultText);
                
            } catch (error) {
                hasilElement.textContent = error.message;
                hasilElement.style.color = '#dc3545';
                MathUtils.announceToScreenReader(`Error: ${error.message}`);
            } finally {
                MathUtils.hideLoading(button, 'Hitung');
            }
        }, 500);
    }
}

// Input Mappings Configuration
const INPUT_MAPPINGS = {
    'select-luas-datar': {
        'persegi': [
            { id: 'sisi', label: 'Sisi:', min: 0, step: 'any', required: true, help: 'Masukkan panjang sisi persegi' }
        ],
        'persegi-panjang': [
            { id: 'panjang', label: 'Panjang:', min: 0, step: 'any', required: true, help: 'Masukkan panjang persegi panjang' },
            { id: 'lebar', label: 'Lebar:', min: 0, step: 'any', required: true, help: 'Masukkan lebar persegi panjang' }
        ],
        'segitiga': [
            { id: 'alas', label: 'Alas:', min: 0, step: 'any', required: true, help: 'Masukkan panjang alas segitiga' },
            { id: 'tinggi', label: 'Tinggi:', min: 0, step: 'any', required: true, help: 'Masukkan tinggi segitiga' }
        ],
        'lingkaran': [
            { id: 'jari2', label: 'Jari-jari:', min: 0, step: 'any', required: true, help: 'Masukkan panjang jari-jari lingkaran' }
        ],
        'jajar-genjang': [
            { id: 'alas', label: 'Alas:', min: 0, step: 'any', required: true, help: 'Masukkan panjang alas jajar genjang' },
            { id: 'tinggi', label: 'Tinggi:', min: 0, step: 'any', required: true, help: 'Masukkan tinggi jajar genjang' }
        ]
    },
    'select-luas-ruang': {
        'kubus': [
            { id: 'rusuk', label: 'Rusuk:', min: 0, step: 'any', required: true, help: 'Masukkan panjang rusuk kubus' }
        ],
        'balok': [
            { id: 'panjang', label: 'Panjang:', min: 0, step: 'any', required: true, help: 'Masukkan panjang balok' },
            { id: 'lebar', label: 'Lebar:', min: 0, step: 'any', required: true, help: 'Masukkan lebar balok' },
            { id: 'tinggi', label: 'Tinggi:', min: 0, step: 'any', required: true, help: 'Masukkan tinggi balok' }
        ],
        'tabung': [
            { id: 'jari2', label: 'Jari-jari:', min: 0, step: 'any', required: true, help: 'Masukkan jari-jari alas tabung' },
            { id: 'tinggi', label: 'Tinggi:', min: 0, step: 'any', required: true, help: 'Masukkan tinggi tabung' }
        ],
        'kerucut': [
            { id: 'jari2', label: 'Jari-jari:', min: 0, step: 'any', required: true, help: 'Masukkan jari-jari alas kerucut' },
            { id: 'tinggi', label: 'Tinggi:', min: 0, step: 'any', required: true, help: 'Masukkan tinggi kerucut' }
        ]
    },
    'select-aritmatika': {
        'un': [
            { id: 'suku_a', label: 'Suku Pertama (a):', step: 'any', required: true, help: 'Masukkan suku pertama deret' },
            { id: 'suku_n', label: 'Suku ke- (n):', min: 1, step: 1, required: true, help: 'Masukkan urutan suku yang dicari' },
            { id: 'beda_b', label: 'Beda (b):', step: 'any', required: true, help: 'Masukkan beda antar suku' }
        ],
        'sn': [
            { id: 'suku_a', label: 'Suku Pertama (a):', step: 'any', required: true, help: 'Masukkan suku pertama deret' },
            { id: 'suku_n', label: 'Jumlah Suku (n):', min: 1, step: 1, required: true, help: 'Masukkan jumlah suku yang dijumlahkan' },
            { id: 'beda_b', label: 'Beda (b):', step: 'any', required: true, help: 'Masukkan beda antar suku' }
        ]
    },
    'select-geometri': {
        'un': [
            { id: 'suku_a', label: 'Suku Pertama (a):', step: 'any', required: true, help: 'Masukkan suku pertama deret' },
            { id: 'suku_n', label: 'Suku ke- (n):', min: 1, step: 1, required: true, help: 'Masukkan urutan suku yang dicari' },
            { id: 'rasio_r', label: 'Rasio (r):', step: 'any', required: true, help: 'Masukkan rasio antar suku' }
        ],
        'sn': [
            { id: 'suku_a', label: 'Suku Pertama (a):', step: 'any', required: true, help: 'Masukkan suku pertama deret' },
            { id: 'suku_n', label: 'Jumlah Suku (n):', min: 1, step: 1, required: true, help: 'Masukkan jumlah suku yang dijumlahkan' },
            { id: 'rasio_r', label: 'Rasio (r):', step: 'any', required: true, help: 'Masukkan rasio antar suku' }
        ]
    }
};

// Application Initialization
class App {
    constructor() {
        this.appState = new AppState();
        this.moduleManager = new ModuleManager(this.appState);
        this.gameManager = new GameManager(this.appState);
        
        // Make utilities globally available for debugging
        window.appState = this.appState;
        window.MathUtils = MathUtils;
    }

    initialize() {
        this.setupEventListeners();
        this.restorePreviousState();
        this.gameManager.initGame();
        
        console.log('Multitask Calculator initialized successfully!');
        MathUtils.announceToScreenReader('Aplikasi Kalkulator Multitask siap digunakan');
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tabs button').forEach(button => {
            button.addEventListener('click', () => {
                const moduleId = button.dataset.module;
                this.moduleManager.showModule(moduleId);
            });
            
            // Keyboard navigation
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });

        // Submenu navigation
        document.querySelectorAll('.mtk-submenu button').forEach(button => {
            button.addEventListener('click', () => {
                const subMtkId = button.dataset.submtk;
                this.moduleManager.showSubMtk(subMtkId);
            });
        });

        // Basic calculation buttons
        document.getElementById('btn-luas-lingkaran').addEventListener('click', 
            CalculationEngine.calculateLuasLingkaran.bind(CalculationEngine));
        document.getElementById('btn-kecepatan').addEventListener('click', 
            CalculationEngine.calculateKecepatan.bind(CalculationEngine));
        document.getElementById('btn-debit').addEventListener('click', 
            CalculationEngine.calculateDebit.bind(CalculationEngine));
        document.getElementById('btn-skala').addEventListener('click', 
            CalculationEngine.calculateSkala.bind(CalculationEngine));
        document.getElementById('btn-bmi').addEventListener('click', 
            CalculationEngine.calculateBMI.bind(CalculationEngine));
        document.getElementById('btn-peluang').addEventListener('click', 
            () => InputGenerator.calculate('peluang', 'calc-peluang'));

        // Game controls
        document.getElementById('btn-cek-jawaban').addEventListener('click', 
            () => this.gameManager.checkAnswer());
        document.getElementById('btn-restart-game').addEventListener('click', 
            () => this.gameManager.initGame());
        document.getElementById('btn-hint').addEventListener('click', 
            () => this.gameManager.provideHint());
            
        // Enter key for game input
        document.getElementById('jawaban').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.gameManager.checkAnswer();
            }
        });

        // Dynamic input generators
        this.setupDynamicInputs();
    }

    setupDynamicInputs() {
        for (const selectId in INPUT_MAPPINGS) {
            const selectElement = document.getElementById(selectId);
            const containerId = selectId.replace('select', 'calc');
            
            selectElement.addEventListener('change', (event) => {
                const selectedValue = event.target.value;
                const fields = INPUT_MAPPINGS[selectId][selectedValue];
                
                if (fields) {
                    InputGenerator.generateInputs(containerId, fields);
                    
                    // Add event listener to the dynamically created button
                    document.getElementById(`btn-${containerId}`).addEventListener('click', () => {
                        let calcId = selectedValue;
                        if (selectId.includes('aritmatika')) calcId = `aritmatika-${selectedValue}`;
                        if (selectId.includes('geometri')) calcId = `geometri-${selectedValue}`;
                        InputGenerator.calculate(calcId, containerId);
                    });
                } else {
                    document.getElementById(containerId).innerHTML = 
                        '<p class="rumus-info">Silakan pilih jenis perhitungan</p>';
                }
            });
        }
    }

    restorePreviousState() {
        // Restore active module and submodule
        this.moduleManager.showModule(this.appState.activeModule);
        this.moduleManager.showSubMtk(this.appState.activeSubMtk);
        
        // Restore game score
        this.gameManager.updateGameDisplay();
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.initialize();
});

// Error boundary for unhandled errors
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    MathUtils.announceToScreenReader('Terjadi kesalahan dalam aplikasi');
});
