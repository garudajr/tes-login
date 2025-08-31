document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen-elemen DOM ---
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const classInput = document.getElementById('kelas');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const eyeHidden = document.getElementById('eyeHidden');
    const eyeVisible = document.getElementById('eyeVisible');
    const errorMessage = document.getElementById('errorMessage');

    const verificationSection = document.getElementById('verificationSection');
    const loginButton = document.getElementById('loginButton');
    const buttonText = document.getElementById('buttonText');

    const characterElement = document.getElementById('cartoonCharacter');
    const characterStatus = document.getElementById('characterStatus');
    const characterInput = document.getElementById('characterInput');
    const verifyButton = document.getElementById('verifyCharacter');
    const clearInputButton = document.getElementById('clearInput');

    let characterMood = 'neutral';

    // --- Daftar Kata untuk Verifikasi ---
    const happyWords = ['lucu', 'haha', 'senang', 'bahagia', 'tertawa', 'gembira', 'ceria', 'senyum', 'pizza', 'main', 'game', 'musik', 'kucing', 'teman', 'keren', 'hebat', 'mantap'];
    const sadWords = ['sedih', 'nangis', 'marah', 'kesal', 'benci', 'takut', 'sepi', 'sakit', 'jelek', 'gagal', 'susah', 'bosan'];

    // --- Fungsi-fungsi ---

    /** Menampilkan atau menyembunyikan password */
    function togglePasswordVisibility() {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        eyeHidden.classList.toggle('hidden', isPassword);
        eyeVisible.classList.toggle('hidden', !isPassword);
    }

    /** Mengupdate tampilan karakter berdasarkan input */
    function updateCharacter() {
        const inputText = characterInput.value.toLowerCase().trim();
        
        if (inputText === '') {
            setCharacterSet('neutral');
            return;
        }

        const hasHappyWord = happyWords.some(word => inputText.includes(word));
        const hasSadWord = sadWords.some(word => inputText.includes(word));

        if (hasHappyWord && !hasSadWord) {
            setCharacterSet('happy');
        } else if (hasSadWord) {
            setCharacterSet('sad');
        } else {
            setCharacterSet('thinking');
        }
    }

    /** Mengatur state karakter (emoji, status, warna, tombol) */
    function setCharacterSet(mood) {
        characterMood = mood;
        const states = {
            neutral: { emoji: '😐', text: 'Karakter menunggu...', color: 'text-gray-600', btnDisabled: true },
            happy: { emoji: '😊', text: 'Karakter senang! ✨', color: 'text-green-600', btnDisabled: false },
            sad: { emoji: '😢', text: 'Coba kata yang lebih positif!', color: 'text-red-600', btnDisabled: true },
            thinking: { emoji: '🤔', text: 'Karakter berpikir...', color: 'text-yellow-600', btnDisabled: true }
        };
        const { emoji, text, color, btnDisabled } = states[mood];
        
        characterElement.textContent = emoji;
        characterStatus.textContent = text;
        characterStatus.className = `text-sm font-medium ${color}`;
        verifyButton.disabled = btnDisabled;
    }
    
    /** Menampilkan pesan error */
    function showError(message) {
        errorMessage.textContent = message;
        setTimeout(() => errorMessage.textContent = '', 3000); // Hapus pesan setelah 3 detik
    }

    /** Proses setelah verifikasi berhasil */
    async function handleVerification() {
        if (characterMood !== 'happy') return;

        verifyButton.disabled = true;
        verifyButton.innerHTML = '⏳ Memverifikasi...';
        setCharacterSet('happy'); // Keep happy state
        characterElement.textContent = '🥳';
        characterStatus.textContent = 'Verifikasi berhasil! 🎉';

        await new Promise(resolve => setTimeout(resolve, 1500));
        
        verifyButton.innerHTML = '✅ Terverifikasi!';
        verifyButton.classList.remove('bg-green-500');
        verifyButton.classList.add('bg-green-600');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        proceedToLogin();
    }
    
    /** Proses akhir login dan menampilkan halaman sambutan */
    async function proceedToLogin() {
        verificationSection.classList.add('hidden');
        loginButton.style.display = 'block';

        buttonText.textContent = '⏳ Memproses...';
        loginButton.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 1200));

        buttonText.textContent = '✅ Berhasil!';
        loginButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showWelcomePage(usernameInput.value, classInput.value);
    }
    
    /** Membuat dan menampilkan halaman sambutan */
    function showWelcomePage(username, kelas) {
        const loginCard = document.getElementById('loginCard');
        loginCard.style.display = 'none';

        const welcomePage = document.createElement('div');
        welcomePage.className = 'login-card w-full max-w-lg p-8 rounded-3xl shadow-2xl text-center fade-in';
        welcomePage.innerHTML = `
            <div class="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg animate-pulse">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h1 class="text-4xl font-bold text-gray-800 mb-4">🎉 Selamat Datang!</h1>
            <div class="bg-gray-100 p-6 rounded-xl border mb-6">
                <p class="text-3xl font-bold text-indigo-600">${username}</p>
                <p class="text-lg font-medium text-gray-600">Kelas: ${kelas}</p>
            </div>
            <div class="space-y-3">
                <button 
                    onclick="alert('Demo: Menuju halaman dashboard berita kelas!')" 
                    class="w-full bg-[#F5F5DC] text-gray-800 py-3 rounded-xl font-semibold hover:bg-[#E0E0C6] transition-all">
                    📰 Lihat Berita Kelas
                </button>
                <button 
                    onclick="location.reload()" 
                    class="w-full bg-gray-300 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-400 transition-all">
                    🔄 Kembali ke Login
                </button>
            </div>
        `;
        document.body.appendChild(welcomePage);
    }

    // --- Event Listeners ---
    togglePassword.addEventListener('click', togglePasswordVisibility);
    characterInput.addEventListener('input', updateCharacter);
    clearInputButton.addEventListener('click', () => {
        characterInput.value = '';
        updateCharacter();
    });
    verifyButton.addEventListener('click', handleVerification);

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (usernameInput.value && classInput.value && passwordInput.value) {
            loginButton.style.display = 'none';
            verificationSection.classList.remove('hidden');
            verificationSection.classList.add('fade-in');
            verificationSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            showError('Mohon isi semua kolom yang wajib diisi!');
        }
    });
});
