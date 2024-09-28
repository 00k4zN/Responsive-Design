window.onload = function() {
    let score = 0;
    let gameInProgress = false;

    // HTML öğelerine erişim
    const targetImage = document.getElementById('target');
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('message');
    const resetButton = document.getElementById('reset-btn');

    // Slap sesi tanımlama
    const slapSound = new Audio('slap.mp3');

    // HTML elementlerinin varlığını kontrol et
    if (!targetImage || !scoreElement || !messageElement || !resetButton) {
        console.error('HTML elementlerine erişim başarısız oldu. ID\'leri kontrol et!');
        return;
    }

    // Tıklama olayını tanımla
    targetImage.addEventListener('click', () => {
        if (!gameInProgress) return;  // Oyun devam etmiyorsa çıkış yap
        score++;
        scoreElement.textContent = `Skor: ${score}`;

        // Tokat sesi çal
        slapSound.play();

        // Tokat animasyonu
        targetImage.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            targetImage.style.transform = 'translateX(0px)';
        }, 100);
    });

    // Tekrar Oyna butonuna tıklama olayı
    resetButton.addEventListener('click', resetGame);

    // Oyun başlatma fonksiyonu
    function startGame() {
        score = 0;
        gameInProgress = true; // Oyun başladı
        scoreElement.textContent = `Skor: 0`;
        messageElement.textContent = '';
        resetButton.style.display = 'none'; // Tekrar oyna butonunu gizle
        setTimeout(endGame, 10000); // 10 saniye sonra oyunu bitir
    }

    // Oyun sonlandırma fonksiyonu
    function endGame() {
        gameInProgress = false; // Oyun sona erdi
        if (score < 57) {
            messageElement.textContent = "Aybüke'den yeteri kadar nefret etmiyorsun. Biraz daha sohbet edip öyle gel.";
        } else {
            messageElement.textContent = "Aybüke'den Gerçekten Nefret Ediyorsun Tebrikler!";
        }
        resetButton.style.display = 'block'; // Tekrar oyna butonunu göster
    }

    // Oyunu sıfırlama fonksiyonu
    function resetGame() {
        score = 0;
        scoreElement.textContent = `Skor: 0`;
        messageElement.textContent = '';
        resetButton.style.display = 'none'; // Tekrar oyna butonunu gizle
        gameInProgress = false; // Oyun sıfırlandı, bekleme durumunda
    }

    // Sayfa yüklendiğinde oyunu başlat
    startGame();
};
