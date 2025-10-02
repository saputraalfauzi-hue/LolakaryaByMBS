let skor = 0;
let kesempatan = 3;

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
    }
}

function showLevel(levelId) {
    document.querySelectorAll('.level-content').forEach(content => {
        content.classList.add('hidden');
    });
    const activeLevel = document.getElementById(levelId);
    if (activeLevel) {
        activeLevel.classList.remove('hidden');
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

function hitungBroca() {
    const tinggi = parseFloat(document.getElementById('tinggi-broca').value);
    const jenisKelamin = document.getElementById('jenis-kelamin').value;
    const hasilElement = document.getElementById('hasil-broca');
    
    if (isNaN(tinggi) || tinggi <= 0) {
        hasilElement.textContent = "Masukkan tinggi badan yang valid.";
        return;
    }
    
    let beratIdeal;
    if (jenisKelamin === 'pria') {
        beratIdeal = tinggi - 100;
    } else {
        beratIdeal = tinggi - 105;
    }
    
    hasilElement.textContent = beratIdeal.toFixed(1);
}

function hitungBMR() {
    const berat = parseFloat(document.getElementById('berat-bmr').value);
    const tinggi = parseFloat(document.getElementById('tinggi-bmr').value);
    const usia = parseFloat(document.getElementById('usia-bmr').value);
    const jenisKelamin = document.getElementById('jenis-kelamin-bmr').value;
    const hasilElement = document.getElementById('hasil-bmr');
    
    if (isNaN(berat) || isNaN(tinggi) || isNaN(usia) || berat <= 0 || tinggi <= 0 || usia <= 0) {
        hasilElement.textContent = "Data tidak valid.";
        return;
    }
    
    let bmr;
    if (jenisKelamin === 'pria') {
        bmr = 66.5 + (13.7 * berat) + (5 * tinggi) - (6.8 * usia);
    } else {
        bmr = 655 + (9.6 * berat) + (1.8 * tinggi) - (4.7 * usia);
    }
    
    hasilElement.textContent = bmr.toFixed(2);
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
    const jawabanUser = document.getElementById('jawaban').value.toUpperCase();
    const hasilGameElement = document.getElementById('hasil-game');
    
    if (jawabanUser === kataSaatIni) {
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
}

function checkCodeAnswer(level, selectedAnswer, correctAnswer) {
    const resultElement = document.getElementById(`result-${level}`);
    const optionButtons = document.querySelectorAll(`#level-${level} .option-btn`);
    
    optionButtons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        }
        if (btn.textContent === selectedAnswer && btn.textContent !== correctAnswer) {
            btn.classList.add('incorrect');
        }
    });
    
    if (selectedAnswer === correctAnswer) {
        resultElement.textContent = "✅ Jawaban Benar!";
        resultElement.className = "result correct";
    } else {
        resultElement.textContent = "❌ Jawaban Salah!";
        resultElement.className = "result incorrect";
    }
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
            
            if (level === 'pemula') {
                checkCodeAnswer('pemula', e.target.textContent, '5');
            } else if (level === 'menengah') {
                checkCodeAnswer('menengah', e.target.textContent, '12');
            } else if (level === 'mahir') {
                checkCodeAnswer('mahir', e.target.textContent, 'string');
            }
        }
    }
});

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
    document.getElementById('btn-bmi').addEventListener('click', hitungBMI);
    document.getElementById('btn-broca').addEventListener('click', hitungBroca);
    document.getElementById('btn-bmr').addEventListener('click', hitungBMR);
    document.getElementById('btn-cek-jawaban').addEventListener('click', cekJawaban);
    document.getElementById('btn-peluang').addEventListener('click', () => calculate('peluang', 'peluang'));

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
});
