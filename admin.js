const ADMIN_PASSWORD = 'admin123'; // Update this to your actual admin password

const initAdminData = () => {
    if (!sessionStorage.getItem('adminLoggedIn')) {
        sessionStorage.setItem('adminLoggedIn', 'false');
    }
};

const adminLogin = () => {
    const password = document.getElementById('admin-password').value.trim();
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('admin-login-section').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        loadAdminComments();
    } else {
        alert('Incorrect password.');
    }
};

const adminLogout = () => {
    sessionStorage.setItem('adminLoggedIn', 'false');
    document.getElementById('admin-login-section').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'none';
};

const clearAllComments = () => {
    if (confirm('Are you sure you want to clear all comments?')) {
        localStorage.removeItem('comments');
        loadAdminComments();
    }
};

const deleteComment = () => {
    const commentId = document.getElementById('delete-comment-id').value.trim();
    if (commentId) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        const updatedComments = comments.filter(c => c.id !== commentId);
        localStorage.setItem('comments', JSON.stringify(updatedComments));
        document.getElementById('delete-comment-id').value = '';
        loadAdminComments();
    } else {
        alert('Please enter a valid comment ID.');
    }
};

const loadAdminComments = () => {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    document.getElementById('admin-comment-list').innerHTML = comments.map(c => `
        <div class="comment-item">
            <div class="comment-username">${c.username}</div>
            <div>${c.comment}</div>
            <div class="comment-time">${new Date(c.timestamp).toLocaleString()}</div>
            <div class="comment-id">ID: ${c.id}</div>
        </div>
    `).join('');
};

window.onload = () => {
    initAdminData();
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('admin-login-section').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        loadAdminComments();
    } else {
        document.getElementById('admin-login-section').style.display = 'block';
        document.getElementById('admin-panel').style.display = 'none';
    }
};
