const initData = () => {
    if (!localStorage.getItem('accounts')) localStorage.setItem('accounts', JSON.stringify([]));
    if (!localStorage.getItem('currentUser')) localStorage.setItem('currentUser', JSON.stringify(null));
};

const switchAuth = () => {
    const isLogin = document.getElementById('auth-title').textContent === 'Login';
    document.getElementById('auth-title').textContent = isLogin ? 'Create Account' : 'Login';
    document.getElementById('auth-button').textContent = isLogin ? 'Create Account' : 'Login';
    document.getElementById('auth-switch').innerHTML = isLogin 
        ? 'Already have an account? <a href="#" onclick="switchAuth()">Login</a>' 
        : 'Don\'t have an account? <a href="#" onclick="switchAuth()">Sign Up</a>';
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('comments-section').style.display = 'none';
};

const createAccount = () => {
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email && username.length >= 4 && password) {
        const accounts = JSON.parse(localStorage.getItem('accounts'));
        if (accounts.some(acc => acc.username === username)) {
            return alert('Username already exists. Please log in.');
        }
        accounts.push({ email, username, password });
        localStorage.setItem('accounts', JSON.stringify(accounts));
        loginUser(username);
    } else {
        alert('Please fill in all fields with valid data.');
    }
};

const login = () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('remember-me').checked;

    const accounts = JSON.parse(localStorage.getItem('accounts'));
    const user = accounts.find(acc => acc.username === username && acc.password === password);

    if (user) {
        loginUser(username, rememberMe);
    } else {
        alert('Invalid username or password.');
    }
};

const loginUser = (username, rememberMe = false) => {
    localStorage.setItem('currentUser', JSON.stringify(username));
    if (rememberMe) localStorage.setItem('rememberMe', 'true');
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('comments-section').style.display = 'block';
    loadComments();
};

const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    switchAuth();
};

window.onload = () => {
    initData();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('comments-section').style.display = 'block';
        loadComments();
    } else {
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('comments-section').style.display = 'none';
    }

    document.getElementById('auth-button').onclick = document.getElementById('auth-title').textContent === 'Create Account' ? createAccount : login;
};
