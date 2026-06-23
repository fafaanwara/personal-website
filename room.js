// ===== CEK AUTENTIKASI =====
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('discussion_auth');
    if (isAuthenticated !== 'true') {
        window.location.href = 'discussion.html';
    }
}

// ===== LOGOUT =====
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Keluar dari portal diskusi?')) {
        sessionStorage.removeItem('discussion_auth');
        window.location.href = 'discussion.html';
    }
});

// ===== FITUR CATATAN =====
const messageInput = document.getElementById('messageInput');
const saveMessageBtn = document.getElementById('saveMessage');
const messagesContainer = document.getElementById('messagesContainer');

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('discussion_messages') || '[]');

    if (messages.length === 0) {
        messagesContainer.innerHTML = '<p class="empty-state">Belum ada catatan. Mulai tulis sesuatu.</p>';
        return;
    }

    messagesContainer.innerHTML = messages.map((msg, index) => `
        <div class="message-card">
            <div class="message-header">
                <span class="message-date">${msg.date}</span>
                <button class="delete-message" data-index="${index}" aria-label="Hapus catatan">✕</button>
            </div>
            <p class="message-text">${escapeHtml(msg.text)}</p>
        </div>
    `).join('');

    document.querySelectorAll('.delete-message').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            deleteMessage(index);
        });
    });
}

function saveMessage() {
    const text = messageInput.value.trim();

    if (!text) {
        messageInput.focus();
        messageInput.classList.add('input-error');
        setTimeout(() => messageInput.classList.remove('input-error'), 400);
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

    if (messages.length > 50) {
        messages.pop();
    }

    localStorage.setItem('discussion_messages', JSON.stringify(messages));
    messageInput.value = '';
    loadMessages();

    const saveBtn = document.getElementById('saveMessage');
    saveBtn.textContent = 'Tersimpan';
    saveBtn.classList.add('saved');
    setTimeout(() => {
        saveBtn.textContent = 'Simpan Catatan';
        saveBtn.classList.remove('saved');
    }, 1600);
}

function deleteMessage(index) {
    const messages = JSON.parse(localStorage.getItem('discussion_messages') || '[]');
    messages.splice(index, 1);
    localStorage.setItem('discussion_messages', JSON.stringify(messages));
    loadMessages();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== EVENT LISTENERS =====
saveMessageBtn.addEventListener('click', saveMessage);

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

window.addEventListener('pageshow', checkAuth);