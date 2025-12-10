let currentTeams = []; // Menyimpan tim saat ini
let currentTeamNames = []; // Menyimpan nama tim saat ini

function generateTeams() {
    const namesInput = document.getElementById('names').value.trim();
    const numTeams = parseInt(document.getElementById('numTeams').value);
    const teamNamesInput = document.getElementById('teamNames').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (!namesInput || numTeams < 1) {
        resultDiv.textContent = 'Masukkan nama dan jumlah tim yang valid.';
        return;
    }
    
    const names = namesInput.split('\n').map(name => name.trim()).filter(name => name);
    if (names.length < numTeams) {
        resultDiv.textContent = 'Jumlah nama harus lebih banyak dari jumlah tim.';
        return;
    }
    
    // Ambil nama tim kustom atau gunakan default
    currentTeamNames = teamNamesInput ? teamNamesInput.split(',').map(name => name.trim()).filter(name => name) : [];
    if (currentTeamNames.length < numTeams) {
        for (let i = currentTeamNames.length; i < numTeams; i++) {
            currentTeamNames.push(`Tim ${i + 1}`);
        }
    }
    
    // Acak nama
    const shuffled = names.sort(() => Math.random() - 0.5);
    
    // Bagikan ke tim
    currentTeams = Array.from({ length: numTeams }, () => []);
    shuffled.forEach((name, index) => {
        currentTeams[index % numTeams].push(name);
    });
    
    // Tampilkan hasil
    displayTeams();
    
    // Tampilkan section add
    document.getElementById('addSection').style.display = 'block';
}

function addNamesToTeams() {
    const additionalInput = document.getElementById('additionalNames').value.trim();
    if (!additionalInput || currentTeams.length === 0) {
        alert('Masukkan nama tambahan dan pastikan tim sudah di-generate.');
        return;
    }
    
    const additionalNames = additionalInput.split('\n').map(name => name.trim()).filter(name => name);
    if (additionalNames.length === 0) {
        alert('Tidak ada nama tambahan yang valid.');
        return;
    }
    
    // Acak nama tambahan dan tambahkan ke tim secara merata
    const shuffledAdditional = additionalNames.sort(() => Math.random() - 0.5);
    shuffledAdditional.forEach((name, index) => {
        currentTeams[index % currentTeams.length].push(name);
    });
    
    // Update hasil
    displayTeams();
    
    // Kosongkan textarea
    document.getElementById('additionalNames').value = '';
}

function displayTeams() {
    const resultDiv = document.getElementById('result');
    let output = '';
    currentTeams.forEach((team, i) => {
        output += `${currentTeamNames[i]}:\n${team.join('\n')}\n\n`;
    });
    resultDiv.textContent = output;
}
