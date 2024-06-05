function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username === "" || password === "") {
        alert("Username and password cannot be empty");
        return;
    }

    // Store user credentials in local storage
    localStorage.setItem(username, password);
    alert("Registration successful!");
    document.getElementById('register-username').value = '';
    document.getElementById('register-password').value = '';
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const storedPassword = localStorage.getItem(username);

    if (storedPassword === null) {
        alert("User not found. Please register first.");
    } else if (storedPassword === password) {
        alert("Login successful!");
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
        showSecuredPage(username);
    } else {
        alert("Incorrect password. Please try again.");
    }
}

function showSecuredPage(username) {
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('secured-section').style.display = 'block';
    document.getElementById('user').innerText = username;
}

function logout() {
    document.getElementById('register-section').style.display = 'block';
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('secured-section').style.display = 'none';
}
