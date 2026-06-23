// ===== CEK AUTENTIKASI =====
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('discussion_auth');
    if (isAuthenticated !== 'true') {
        // Jika belum login, redirect ke halaman login
        window.location.href = 'discussion.html';
    }
}

// ===== LOGOUT =====
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin keluar dari portal?')) {
        sessionStorage.removeItem('discussion_auth');
        window.location.href = 'discussion.html';
    }
});

// ===== FITUR CATATAN =====
const messageInput = document.getElementById('messageInput');
const saveMessageBtn = document.getElementById('saveMessage');
const messagesContainer = document.getElementById('messagesContainer');

// Load pesan yang tersimpan
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('discussion_messages') || '[]');
    
    if (messages.length === 0) {
        messagesContainer.innerHTML = '<p class="empty-state">📝 Belum ada catatan. Mulai tulis sesuatu!</p>';
        return;
    }
    
    messagesContainer.innerHTML = messages.map((msg, index) => `
        <div class="message-card">
            <div class="message-header">
                <span class="message-date">📅 ${msg.date}</span>
                <button class="delete-message" data-index="${index}">✕</button>
            </div>
            <p class="message-text">${escapeHtml(msg.text)}</p>
        </div>
    `).join('');
    
    // Event listener untuk tombol hapus
    document.querySelectorAll('.delete-message').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            deleteMessage(index);
        });
    });
}

// Simpan pesan baru
function saveMessage() {
    const text = messageInput.value.trim();
    
    if (!text) {
        alert('⚠️ Tulis pesan terlebih dahulu.');
        return;
    }
    
    const messages = JSON.parse(localStorage.getItem('discussion_messages') || '[]');
    
    messages.unshift({
        text: text,
        date: new Date().toLocaleString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    });
    
    // Batasi maksimal 50 catatan
    if (messages.length > 50) {
        messages.pop();
    }
    
    localStorage.setItem('discussion_messages', JSON.stringify(messages));
    messageInput.value = '';
    loadMessages();
    
    // Feedback visual
    const saveBtn = document.getElementById('saveMessage');
    saveBtn.textContent = '✅ Tersimpan!';
    setTimeout(() => {
        saveBtn.textContent = '💾 Simpan Catatan';
    }, 2000);
}

// Hapus pesan
function deleteMessage(index) {
    if (!confirm('🗑️ Hapus catatan ini?')) return;
    
    const messages = JSON.parse(localStorage.getItem('discussion_messages') || '[]');
    messages.splice(index, 1);
    localStorage.setItem('discussion_messages', JSON.stringify(messages));
    loadMessages();
}

// Escape HTML untuk keamanan
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== EVENT LISTENERS =====
saveMessageBtn.addEventListener('click', saveMessage);

// Simpan dengan Ctrl+Enter
messageInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        saveMessage();
    }
});

// ===== INISIALISASI =====
checkAuth();
loadMessages();
messageInput.focus();

// Proteksi: redirect jika user mencoba akses langsung
window.addEventListener('load', checkAuth);