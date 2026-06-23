// ===== KONFIGURASI KODE AKSES =====
const ACCESS_CODE = "kode123"; // Ganti dengan kode Anda

// ===== ELEMEN DOM =====
const gateForm = document.getElementById('gateForm');
const gateInput = document.getElementById('gateInput');
const gateError = document.getElementById('gateError');
const gateCard = document.querySelector('.gate-card');

// ===== FUNGSI UTAMA =====

// Cek apakah user sudah login sebelumnya
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('discussion_auth');
    if (isAuthenticated === 'true') {
        // Jika sudah login, langsung redirect ke halaman diskusi
        window.location.href = 'room.html';
    }
}

// Validasi kode akses
function validateCode(code) {
    const cleanInput = code.trim();
    const cleanCode = ACCESS_CODE.trim();
    return cleanInput.toLowerCase() === cleanCode.toLowerCase();
}

// Tampilkan error
function showError(message = 'Kode salah. Coba lagi.') {
    gateError.textContent = message;
    gateError.classList.add('show');
    gateCard.classList.add('shake');
    
    setTimeout(() => {
        gateCard.classList.remove('shake');
    }, 400);
}

// ===== EVENT LISTENERS =====

gateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputCode = gateInput.value;
    
    if (!inputCode.trim()) {
        showError('Mohon masukkan kode akses.');
        return;
    }
    
    if (validateCode(inputCode)) {
        // Set session dan redirect ke halaman room
        sessionStorage.setItem('discussion_auth', 'true');
        window.location.href = 'room.html';
    } else {
        showError();
        gateInput.value = '';
        gateInput.focus();
    }
});

// ===== INISIALISASI =====
checkAuth();