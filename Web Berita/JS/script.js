function handleRegister(event) {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const gmail = document.getElementById('gmail').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (fullname && gmail && username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Data sebelum disimpan:', users);

        const userExists = users.some(user => user.gmail === gmail);
        if (userExists) {
            alert('Akun dengan email ini sudah terdaftar!');
        } else {
            users.push({ fullname, gmail, username, password });
            console.log('Data yang akan disimpan:', users);

            localStorage.setItem('users', JSON.stringify(users));
            console.log('Data setelah disimpan:', JSON.parse(localStorage.getItem('users')));

            alert('Pendaftaran berhasil! Silakan login.');
            setTimeout(() => {
                window.location.href = "register.html"; // Path relatif
            }, 200);
        }
    } else {
        alert('Harap lengkapi semua data!');
    }
}


// Handle Login
function handleLogin(event) {
    event.preventDefault();

    const gmail = document.getElementById('gmail').value;
    const password = document.getElementById('password').value;

    if (!gmail || !password) {
        alert('Harap isi email dan password!');
        return;
    }

    // Login sebagai Admin
    if (gmail === 'admin@gmail.com' && password === 'admin123') {
        alert('Selamat datang, Admin!');
        setTimeout(() => {
            window.location.href = 'admin.html'; // Redirect ke halaman admin
        }, 500);
        return;
    }

    // Login sebagai User
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Data users di localStorage:', users); // Debugging
    const user = users.find(user => user.gmail === gmail && user.password === password);

    if (user) {
        alert(`Selamat datang, ${user.fullname}!`);
        setTimeout(() => {
            window.location.href = '/HTML/Homepage.html'; // Redirect ke homepage
        }, 500);
    } else {
        alert('Gagal login! Akun tidak ditemukan atau password salah.');
    }
}
