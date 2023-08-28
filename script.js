const matkulSelect = document.getElementById('matkul');
const jenisSoalSelect = document.getElementById('jenisSoal');
const generateBtn = document.getElementById('generateBtn');
const soalContainer = document.getElementById('soalContainer');

generateBtn.addEventListener('click', generateSoal);

function generateSoal() {
    const selectedMatkul = matkulSelect.value;
    const selectedJenisSoal = jenisSoalSelect.value;

    if (selectedJenisSoal === 'pilihanGanda') {
        generatePilihanGandaSoal(selectedMatkul);
    } else if (selectedJenisSoal === 'essai') {
        generateEssaiSoal(selectedMatkul);
    }
}

function generatePilihanGandaSoal(matkul) {
    const randomSoal = getRandomSoal(matkul);

    const opsiJawaban = ['A', 'B', 'C', 'D', 'E'];

    const soalHTML = `
        <h2>Soal Pilihan Ganda:</h2>
        <p>${randomSoal.soal}</p>
        <ul>
            ${randomSoal.pilihanGanda.map((pilihan, index) => `<li><input type="radio" name="pilihan" value="${index}">${opsiJawaban[index]}. ${pilihan}</li>`).join('')}
        </ul>
        <button id="cekJawabanBtn">Cek Jawaban</button>
        <button id="bersihkanJawabanBtn">Bersihkan Jawaban</button>
        <div id="hasilJawaban"></div>
    `;

    soalContainer.innerHTML = soalHTML;
    // Pilih tema warna di sini
    soalContainer.classList.add('theme1');

    const cekJawabanBtn = document.getElementById('cekJawabanBtn');
    cekJawabanBtn.addEventListener('click', cekPilihanGandaJawaban);

    const bersihkanJawabanBtn = document.getElementById('bersihkanJawabanBtn');
    bersihkanJawabanBtn.addEventListener('click', bersihkanPilihanGandaJawaban);

    function cekPilihanGandaJawaban() {
        const selectedPilihanGanda = document.querySelector('input[name="pilihan"]:checked');

        if (selectedPilihanGanda) {
            const pilihanGandaIndex = parseInt(selectedPilihanGanda.value);
            const isCorrectPilihanGanda = pilihanGandaIndex === randomSoal.jawabanPilihanGanda;

            const hasilJawaban = `
                <p>Pilihan Ganda: ${isCorrectPilihanGanda ? 'Benar' : 'Salah'}</p>
            `;

            document.getElementById('hasilJawaban').innerHTML = hasilJawaban;
        } else {
            alert('Harap pilih salah satu jawaban.');
        }
    }

    function bersihkanPilihanGandaJawaban() {
        const pilihanGandaItems = document.querySelectorAll('input[type="radio"]');
        pilihanGandaItems.forEach(item => {
            item.checked = false;
        });
    }
}

function generateEssaiSoal(matkul) {
    const randomSoal = getRandomSoal(matkul);

    const soalHTML = `
        <h2>Soal Essai:</h2>
        <p>${randomSoal.soal}</p>
        <textarea id="jawabanEssai" rows="4" cols="50"></textarea>
        <button id="cekJawabanBtn">Cek Jawaban</button>
        <button id="bersihkanJawabanBtn">Bersihkan Jawaban</button>
        <div id="hasilJawaban"></div>
    `;

    soalContainer.innerHTML = soalHTML;
    // Pilih tema warna di sini
    soalContainer.classList.add('theme2');

    const cekJawabanBtn = document.getElementById('cekJawabanBtn');
    cekJawabanBtn.addEventListener('click', cekEssaiJawaban);

    const bersihkanJawabanBtn = document.getElementById('bersihkanJawabanBtn');
    bersihkanJawabanBtn.addEventListener('click', bersihkanEssaiJawaban);

    function cekEssaiJawaban() {
        const jawabanEssai = document.getElementById('jawabanEssai').value;
        
        if (jawabanEssai) {
            const isCorrectEssai = compareStrings(jawabanEssai, randomSoal.jawabanEssai);

            const hasilJawaban = `
                <p>Essai: ${isCorrectEssai ? 'Benar' : 'Salah'}</p>
            `;

            document.getElementById('hasilJawaban').innerHTML = hasilJawaban;
        } else {
            alert('Harap isi jawaban essai.');
        }
    }

    function bersihkanEssaiJawaban() {
        const jawabanEssai = document.getElementById('jawabanEssai');
        jawabanEssai.value = '';
    }
}

function getRandomSoal(matkul) {
    const soalDatabase = {
        pancasila: [
            {
                soal: 'Apa salah satu sila Pancasila yang mengajarkan kita untuk berperilaku adil dan bijaksana?',
                pilihanGanda: ['Sila Pertama', 'Sila Kedua', 'Sila Ketiga', 'Sila Keempat', 'Sila Kelima'],
                jawabanPilihanGanda: 1,
                jawabanEssai: 'Salah satu sila Pancasila yang mengajarkan kita untuk berperilaku adil dan bijaksana adalah Sila Kedua.'
            },
            // ... tambahkan lebih banyak soal Pancasila di sini
        ],
        agama: [
            {
                soal: 'Siapakah nabi terakhir dalam agama Islam?',
                pilihanGanda: ['Nabi Muhammad', 'Nabi Musa', 'Nabi Isa', 'Nabi Adam', 'Nabi Ibrahim'],
                jawabanPilihanGanda: 0,
                jawabanEssai: 'Nabi terakhir dalam agama Islam adalah Nabi Muhammad.'
            },
            // ... tambahkan lebih banyak soal Agama di sini
        ],
        // ... tambahkan lebih banyak mata kuliah dengan format yang sama
    };

    const randomIndex = Math.floor(Math.random() * soalDatabase[matkul].length);
    return soalDatabase[matkul][randomIndex];
}

function compareStrings(str1, str2) {
    // Menghilangkan spasi ekstra dari kedua string
    const cleanedStr1 = str1.trim();
    const cleanedStr2 = str2.trim();

    // Membandingkan kedua string tanpa memperdulikan huruf besar/kecil
    return cleanedStr1.toLowerCase() === cleanedStr2.toLowerCase();
}